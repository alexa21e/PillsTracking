import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Doctor } from "../models/doctor";
import { environment } from "../../../environments/environment";
import { Admin } from "../models/admin";

@Injectable({
    providedIn: 'root'
})

export class AdminsService {
    baseUrl = environment.baseUrl + 'api/Admins/'
    
    constructor(private http: HttpClient) {
    }

    getDoctors(){
        return this.http.get<Doctor[]>(this.baseUrl + 'getDoctors');
    }

    getAdmins(){
        return this.http.get<Admin[]>(this.baseUrl + 'getAdmins');
    }

    addDoctor(doctor: Doctor){
        let params = new HttpParams()
        .set('Name', doctor.name)
        .set('Email', doctor.email)
        .set('Specialization', doctor.specialization);
      return this.http.post<Doctor>(this.baseUrl + 'addDoctor', null, { params });
    }

    addAdmin(admin: Admin){
        let params = new HttpParams()
        .set('Name', admin.name)
        .set('Email', admin.email)
      return this.http.post<Admin>(this.baseUrl + 'addAdmin', null, { params });
    }
}