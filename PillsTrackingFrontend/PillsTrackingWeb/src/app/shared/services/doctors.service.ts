import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PatientToCreate } from "../models/patientToCreate";
import { environment } from "../../../environments/environment";
import { Patient } from "../models/patient";
import { Prescription } from "../models/prescription";
import { Observable } from "rxjs";
import { DoctorId } from "../models/doctorId";
import { PatientDetailsForWeb } from "../models/patientDetailsForWeb";
import { PatientForWeb } from "../models/patientForWeb";

@Injectable({
    providedIn: 'root'
})

export class DoctorsService {
    baseUrl = environment.baseUrl + 'Doctors/'
    
    constructor(private http: HttpClient) {
    }

    getDoctorIdByEmail(email: string){
        let params = new HttpParams();
        params = params.append('email', email);
        return this.http.get<DoctorId>(this.baseUrl, {params});
    }

    getPatientsByDoctorId(id: string): Observable<PatientForWeb[]> {
        let params = new HttpParams().set('doctorId', id);
        return this.http.get<PatientForWeb[]>(`${this.baseUrl}getPatientsOfDoctor`, { params });
    }

    getPatientById(id: string){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<PatientDetailsForWeb>(this.baseUrl + 'getPatientById', {params});
    }

    getPatients(){
        return this.http.get<PatientForWeb[]>(this.baseUrl + 'getAllPatients');
    }

    addPatient(values: any){
        return this.http.post<PatientToCreate>(this.baseUrl + 'addPatient', values);
    }

    addPatientToDoctorList(patientId: string, doctorId: string){
        let params = new HttpParams()
        .set('doctorId', doctorId)
        .set('patientId', patientId);
        return this.http.put(this.baseUrl + 'addPatientToADoctorList', null, {params});
    }

    deletePatientFromDoctorList(patientId: string, doctorId: string){
        let params = new HttpParams()
        .set('doctorId', doctorId)
        .set('patientId', patientId);
        return this.http.delete(this.baseUrl + 'deletePatientFromADoctorList', {params});
    }

    getPrescriptionById(id: string){
        let params = new HttpParams();
        params = params.append('prescriptionId', id);
        return this.http.get<Prescription>(this.baseUrl + 'getPrescriptionById', {params});
    }

    addPrescription(prescriptionData: any){
        return this.http.post(this.baseUrl + 'addPrescription', prescriptionData);
    }

    updatePrescription(values: any){
        return this.http.post<Prescription>(this.baseUrl + 'updatePrescription', values);
    }

    deletePrescription(id: string){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.delete(this.baseUrl + 'removePrescription', {params});
    }
}