import { Gender } from "./gender";
import { PrescriptionForWeb } from "./prescriptionForWeb";

export interface PatientDetailsForWeb{
    id: string,
    name: string,
    phoneNumber: string,
    gender: Gender,
    dateOfBirth: Date,
    address: string,
    prescriptions: PrescriptionForWeb[]
}