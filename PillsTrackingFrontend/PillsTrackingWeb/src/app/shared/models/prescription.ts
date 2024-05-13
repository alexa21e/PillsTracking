import { Drug } from "./drug";

export interface Prescription{
    duration: number
    drugs: Drug[]
}