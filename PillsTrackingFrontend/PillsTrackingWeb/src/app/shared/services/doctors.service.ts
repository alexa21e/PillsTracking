import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Patient } from "../models/patient";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DoctorsService {
    baseUrl = environment.baseUrl + 'Doctors/'
    
    constructor(private http: HttpClient) {
    }

    addPatient(values: any){
        return this.http.post<Patient>(this.baseUrl + 'addPatient', values);
    }

    updatePrescription(values: any){
        return this.http.post<Drug>(this.baseUrl + 'updatePrescription', values);
    }
}_