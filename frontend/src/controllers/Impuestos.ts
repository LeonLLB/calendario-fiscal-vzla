import { FechaImpuestos, ImpuestosFromDB } from "../interfaces/Impuestos";
import * as empresaBackend from '../../wailsjs/go/main/Impuesto'
import { DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";

class ImpuestoController {

    // async Create(dto: ImpuestoFromDB): Promise<DBCreateResponse>{
    //     return empresaBackend.Create(dto)
    //     .then( (res: DBCreateResponse) => res)
    // }
    // async GetAll(): Promise<ImpuestoFromDB[]>{
    //     return empresaBackend.GetAll()
    // }    
    // async Update(id: number, dto: ImpuestoFromDB){
    //     return empresaBackend.Update(id,dto)
    //     .then( (res: DBUpdateResponse) => res)
    // }
    // async Delete(id: number){
    //     return empresaBackend.Delete(id).then((res:DBDeleteResponse)=>res)
    // }

    defSeed(): FechaImpuestos[]{
        const data: FechaImpuestos[] = []
        for (let i = 0; i <= 9; i++) {
            data.push({
                quincena: 0,
                terminal_rif: i,
                enero:0,
                febrero:0,
                marzo:0,
                abril:0,
                mayo:0,
                junio:0,
                julio:0,
                agosto:0,
                septiembre:0,
                octubre:0,
                noviembre:0,
                diciembre:0,
            })          
        }
        return data
    }

}

export const impuestoController = new ImpuestoController()