import { main } from "../../wailsjs/go/models";


export interface PatrimonioFromDB extends main.GranPatrimonio{}

export interface FechaPatrimonio {
    conjuntoId: number
    rif1: number
    rif2: number
    octubre: number
    noviembre: number
}

export class FechaPatrimonioClass {
    conjuntoId!: number
    rif1!: number
    rif2!: number
    octubre!: number
    noviembre!: number
}