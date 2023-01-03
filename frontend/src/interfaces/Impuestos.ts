import { main } from "../../wailsjs/go/models";


export interface ImpuestosFromDB extends main.Impuesto{

}

export interface FechaImpuestos {
    quincena: 0 | 1 | 2
    terminal_rif: number
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

export class FechaImpuestosClass implements FechaImpuestos{
    quincena!: 0 | 1 | 2;
    terminal_rif!: number;
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