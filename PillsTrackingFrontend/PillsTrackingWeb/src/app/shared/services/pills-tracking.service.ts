import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Patient } from '../models/patient';


@Injectable({
  providedIn: 'root'
})
export class PillsTrackingService {

  baseUrl = 'https://localhost:7137/api'
  constructor(private http: HttpClient) {
   }

   getPatients(){
    return this.http.get<Patient[]>(this.baseUrl + 'patients');
   }
}
