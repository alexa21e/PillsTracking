import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Doctor } from "../models/doctor";

@Injectable({
    providedIn: 'root'
})

export class AdminsService {
    baseUrl = 'https://localhost:7137/api/Admins/'
    
    constructor(private http: HttpClient) {
    }

    addDoctor(values: any){
        return this.http.post<Doctor>(this.baseUrl + 'addDoctor', values);
    }
}