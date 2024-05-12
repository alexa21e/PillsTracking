import { Gender } from "./gender"

export interface Patient{
    name: string
    phoneNumber: string
    address: string
    gender: Gender 
    dateOfBirth: Date
}

