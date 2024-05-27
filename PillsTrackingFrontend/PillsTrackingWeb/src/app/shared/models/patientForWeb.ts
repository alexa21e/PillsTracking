import { Gender } from "./gender";

export interface PatientForweb{
    id: string,
    name: string,
    phoneNumber: string,
    gender: Gender,
    dateOfBirth: Date
}