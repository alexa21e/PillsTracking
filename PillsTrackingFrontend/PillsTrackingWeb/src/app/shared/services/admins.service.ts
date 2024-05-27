import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Doctor } from "../models/doctor";
import { environment } from "../../../environments/environment";

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

    addDoctor(values: any){
        return this.http.post<Doctor>(this.baseUrl + 'addDoctor', values);
    }
}