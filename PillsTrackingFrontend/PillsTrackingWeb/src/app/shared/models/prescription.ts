import { Drug } from "./drug";

export interface Prescription{
    name: string,
    duration: number,
    creationDate: Date,
    drugs: Drug[]
}