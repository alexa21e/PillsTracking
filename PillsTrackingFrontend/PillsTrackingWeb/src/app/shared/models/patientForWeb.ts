import { Gender } from "./gender";

export interface PatientForWeb{
    id: string,
    name: string,
    phoneNumber: string,
    gender: Gender,
    dateOfBirth: Date
}