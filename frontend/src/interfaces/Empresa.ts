import { main } from "../../wailsjs/go/models";

export interface Empresa extends main.Empresa {

}

export class EmpresaClass implements Empresa{
    id?: number | undefined;
    nombre!: string;
    rif!: string;
}