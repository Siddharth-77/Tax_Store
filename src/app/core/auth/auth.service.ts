/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    set user(user: any) {
        localStorage.setItem('userDetails', user);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials): Observable<any> {

        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(
                environment.api + environment.version + 'user/login',
                credentials
            )
            .pipe(
                switchMap((response: any) =>
                    of(response)
                )
            );
    }

    otpVerify(credentials: { email: string; otp: number }): Observable<any> {

        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(
                environment.api + environment.version + 'user/verifyotp',
                credentials
            )
            .pipe(
                switchMap((response: any) => {
                    this.accessToken = response.data.token;

                    this.user = JSON.stringify(response.data.getUser);

                    this._authenticated = true;

                    this._userService.user = response.user;

                    return of(response);
                })
            );
    }

    signInUsingToken(): Observable<any> {

        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>

                of(false)
                ),
                switchMap((response: any) => {

                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    this._authenticated = true;

                    this._userService.user = response.user;

                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');

        this._authenticated = false;

        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
