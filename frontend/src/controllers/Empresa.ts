import { Empresa } from "../interfaces/Empresa";
import * as empresaBackend from '../../wailsjs/go/main/Empresa'
import { DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";
import { ConjuntoRif } from "../interfaces/ConjuntoRif";

class EmpresaController {

    async Create(dto: Empresa): Promise<DBCreateResponse>{
        return empresaBackend.Create(dto)
        .then( (res: DBCreateResponse) => res)
    }
    async GetAll(): Promise<Empresa[]>{
        return empresaBackend.GetAll()
    }    
    async GetAllByTerminal(terminalRif: string): Promise<Empresa[]>{
        return empresaBackend.GetAllByTerminalRif(terminalRif)
    }    
    async GetAllByConjunto(conjuntoRif: ConjuntoRif): Promise<Empresa[]>{
        return empresaBackend.GetAllByConjuntoRif(conjuntoRif.rif1.toString(),conjuntoRif.rif2.toString())
    }    
    async Update(id: number, dto: Empresa){
        return empresaBackend.Update(id,dto)
        .then( (res: DBUpdateResponse) => res)
    }
    async Delete(id: number){
        return empresaBackend.Delete(id).then((res:DBDeleteResponse)=>res)
    }

}

export const empresaController = new EmpresaController()