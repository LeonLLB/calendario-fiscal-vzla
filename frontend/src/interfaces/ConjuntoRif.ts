import {main} from '../../wailsjs/go/models'

export interface ConjuntoRif extends main.ConjuntoRif {} 

export class ConjuntoRifClass implements ConjuntoRif{
    id?: number | undefined;
    rif1!: number;
    rif2!: number;
}