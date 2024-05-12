import { Gender } from "./gender"

export interface PatientToCreate{
    name: string
    phoneNumber: string
    address: string
    gender: Gender 
    dateOfBirth: Date
}

