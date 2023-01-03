import { main } from "../../wailsjs/go/models";


export interface LiquidacionFromDB extends main.Liquidacion{}

export interface FechaLiquidacion {
    conjuntoId: number
    rif1: number
    rif2: number
    fecha: string
}