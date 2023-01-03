import { FechaLiquidacion, LiquidacionFromDB } from "../interfaces/Liquidaciones";
import * as liquidacionBackend from '../../wailsjs/go/main/Liquidacion'
import { DBCoreResponse, DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";
import { ConjuntoRif } from "../interfaces/ConjuntoRif";

class LiquidacionController {

    async Assign(idConjuntoRif: number,dto: LiquidacionFromDB): Promise<DBCoreResponse>{
        return liquidacionBackend.Assign(idConjuntoRif,dto)
        .then( (res: DBCoreResponse) => res)
    }
    async GetAll(conjuntosRif: ConjuntoRif[]): Promise<FechaLiquidacion[]>{
        return liquidacionBackend.GetAll().then(res=>{
            if(res.length === 0) return []
            const data: FechaLiquidacion[] = [] 
            for (let conjuntoRif of conjuntosRif) {                
                data.push({
                    conjuntoId: conjuntoRif.id!,
                    rif1: conjuntoRif.rif1,
                    rif2: conjuntoRif.rif2,
                    fecha:res.find(fechaRaw=>this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.fecha || 'N/A'
                })          
            }
            return data
        })
    }   
    
    private evalConjuntoRifCond = (fechaRaw: LiquidacionFromDB, conjuntoRif: ConjuntoRif): boolean => (fechaRaw.conjuntoRif?.rif1 === conjuntoRif.rif1 && fechaRaw.conjuntoRif?.rif2 === conjuntoRif.rif2 )

    async Delete(){
        return liquidacionBackend.DeleteAll().then((res:DBDeleteResponse)=>res)
    }

    defSeed(conjuntos: ConjuntoRif[]): FechaLiquidacion[]{
        const data: FechaLiquidacion[] = []
        for (let i = 0; i < 5; i++) {
            data.push({
                conjuntoId: conjuntos[i].id!,
                rif1:conjuntos[i].rif1,
                rif2:conjuntos[i].rif2,
                fecha:'N/A'
            })          
        }
        return data
    }

    Prepare(data: FechaLiquidacion): LiquidacionFromDB {
        return {
            conjuntoRifId: data.conjuntoId,
            fecha: data.fecha
        } as any
    }



}

export const liquidacionController = new LiquidacionController()