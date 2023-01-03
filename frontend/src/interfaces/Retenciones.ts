import { main } from "../../wailsjs/go/models";


export interface RetencionFromDB extends main.RetencionISLR{}

export interface FechaRetenciones {
    conjuntoId: number
    rif1: number
    rif2: number
    enero: number
    febrero: number
    marzo: number
    abril: number
    mayo: number
    junio: number
    julio: number
    agosto: number
    septiembre: number
    octubre: number
    noviembre: number
    diciembre: number
}

export class FechaRetencionesClass implements FechaRetenciones {
    conjuntoId!: number
    rif1!: number;
    rif2!: number;
    enero!: number;
    febrero!: number;
    marzo!: number;
    abril!: number;
    mayo!: number;
    junio!: number;
    julio!: number;
    agosto!: number;
    septiembre!: number;
    octubre!: number;
    noviembre!: number;
    diciembre!: number;

}