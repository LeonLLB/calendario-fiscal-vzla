import { Empresa } from "../interfaces/Empresa";
import * as empresaBackend from '../../wailsjs/go/main/Empresa'
import { DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";

class EmpresaController {

    async Create(dto: Empresa): Promise<DBCreateResponse>{
        return empresaBackend.Create(dto)
        .then( (res: DBCreateResponse) => res)
    }
    async GetAll(): Promise<Empresa[]>{
        return empresaBackend.GetAll()
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