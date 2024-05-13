import { Doctor } from "./doctor"
import { Gender } from "./gender"
import { Prescription } from "./prescription"

export interface Patient{
    name: string
    phoneNumber: string
    address: string
    gender: Gender 
    dateOfBirth: Date
    prescriptions: Prescription[]
    doctors: Doctor[]
}