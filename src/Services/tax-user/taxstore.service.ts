/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaxstoreService {
    url = environment.api + environment.version;
    constructor(private http: HttpClient) {}

    getAllTeam(params) {
        return this.http.get(this.url + 'team/list' + params);
    }

    createData(data: any) {
        return this.http.post(this.url + 'team/createUpdate', data);
    }

    getUserList() {
        return this.http.get(this.url + 'team/users/list');
    }

    getAllTors(params) {
        return this.http.get(this.url + 'user/list' + params);
    }

    createTors(body: any) {
        return this.http.post(this.url + 'user/createUpdate', body);
    }

    updateTors(data: any): any {
        return this.http.post(this.url + 'user/createUpdate', data);
    }

    deleteTorsUser(id: any) {
        return this.http.delete(this.url + 'user/' + id);
    }

    toggleTors(id: any) {
        return this.http.get(this.url + 'user/status/' + id);
    }

    deactivateUser(body: any) {
        return this.http.post(this.url + 'user/inactive', body);
    }

    activateUser(body: any) {
        return this.http.post(this.url + 'user/active', body);
    }

    getAttendence(params) {
        return this.http.get(this.url + 'user/attendence/report' + params);
    }

    getAllEnquires(params) {
        return this.http.get(this.url + 'enquiry/list?tfnExists=false' + params);
    }
    enquiresDownload(){
      return this.http.get('http://localhost:7910/enquiresReport.xlsx');
    }
    loginLog(params) {
        return this.http.get(this.url + 'enquiry/list?tfnExists=true' + params);
    }

    createEnquiry(body: any) {
        return this.http.post(this.url + 'enquiry/createUpdate', body);
    }

    enquiryById(id: any) {
        return this.http.get(this.url + 'enquiry/get/' + id);
    }

    updateEnquiry(data: any) {
        return this.http.post(this.url + 'enquiry/clientUpdate', data);
    }

    getPortalEnquiry(params) {
        return this.http.get(this.url + 'enquiry/portal/list' + params);
    }

    getAlloctedCases(params) {
        return this.http.get(this.url + 'enquiry/allocated/cases' + params);
    }
    getUnallocatedCases(params) {
        return this.http.get(this.url + 'enquiry/unallocated/cases' + params);
    }
    getUnalloInter(id: any) {
        return this.http.get(this.url + 'enquiry/interview/' + id);
    }

    getGstList(params) {
        return this.http.get(this.url + 'gst/list' + params);
    }
    getGstexistingData() {
        return this.http.get(this.url + 'enquiry/list');
    }
    addGstCase(body: any) {
        return this.http.post(this.url + 'gst/update', body);
    }

    getAllTasks(params) {
        return this.http.get(this.url + 'tasks/getAllTasks' + params);
    }
}
