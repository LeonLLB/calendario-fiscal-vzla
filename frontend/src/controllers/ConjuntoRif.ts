import { ConjuntoRif } from "../interfaces/ConjuntoRif";
import * as conjuntoRifBackend from '../../wailsjs/go/main/ConjuntoRif'
import { DBCoreResponse, DBCreateResponse, DBUpdateResponse } from "../interfaces/Responses";

class ConjuntoRifController {

    async Create(dto: ConjuntoRif): Promise<DBCreateResponse>{
        return conjuntoRifBackend.Create(dto)
        .then( (res: DBCreateResponse) => res)
    }
    async GetAll(): Promise<ConjuntoRif[]>{
        return conjuntoRifBackend.GetAll()
    }
    async Reset(): Promise<DBCoreResponse>{
        return conjuntoRifBackend.Reset()
    }
    async Update(id: number, dto: ConjuntoRif){
        return conjuntoRifBackend.Update(id,dto)
        .then( (res: DBUpdateResponse) => res)
    }

}

export const conjuntoRifController = new ConjuntoRifController()