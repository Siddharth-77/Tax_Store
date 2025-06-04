/* eslint-disable arrow-parens */
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'enquires' },

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'enquires' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then(
                        (m) => m.LandingHomeModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'example',
                loadChildren: () =>
                    import('app/modules/admin/example/example.module').then(
                        (m) => m.ExampleModule
                    ),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('app/modules/admin/users/users.module').then(
                        (m) => m.UsersModule
                    ),
            },
            {
                path: 'enquires',
                loadChildren: () =>
                    import('app/modules/admin/Enquires/enquires.module').then(
                        (m) => m.EnquiresModule
                    ),
            },
            {
                path: 'cases',
                loadChildren: () =>
                    import('app/modules/admin/Cases/cases.module').then(
                        (m) => m.CasesModule
                    ),
            },
            {
                path: 'gst',
                loadChildren: () =>
                    import('app/modules/admin/gst/gst.module').then(
                        (m) => m.GstModule
                    ),
            },
            {
                path: 'Tasks',
                loadChildren: () =>
                    import('app/modules/admin/Tasks/tasks.module').then(
                        (m) => m.TasksModule
                    ),
            },
        ],
    },
    // {
    //     path: 'teamusers',
    //     canActivate: [AuthGuard],
    //     children: [
    //         {loadChildren: () => import('app/modules/components/users/teamusers/teamusers/teamusers.module').then(m => m.TeamusersModule)}
    //     ]
    // }
];
