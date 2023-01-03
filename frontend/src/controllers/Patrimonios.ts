import { FechaPatrimonio, PatrimonioFromDB } from "../interfaces/Patrimonios";
import * as patrimonioBackend from '../../wailsjs/go/main/GranPatrimonio'
import { DBCoreResponse, DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";
import { ConjuntoRif } from "../interfaces/ConjuntoRif";

class PatrinomioController {

    async Assign(idConjuntoRif: number,dto: PatrimonioFromDB): Promise<DBCoreResponse>{
        return patrimonioBackend.Assign(idConjuntoRif,dto)
        .then( (res: DBCoreResponse) => res)
    }
    async GetAll(conjuntosRif: ConjuntoRif[]): Promise<FechaPatrimonio[]>{
        return patrimonioBackend.GetAll().then(res=>{
            if(res.length === 0) return []
            const data: FechaPatrimonio[] = [] 
            for (let conjuntoRif of conjuntosRif) {                
                data.push({
                    conjuntoId: conjuntoRif.id!,
                    rif1: conjuntoRif.rif1,
                    rif2: conjuntoRif.rif2,
                    octubre:res.find(fechaRaw=>this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.diaOctubre || 0,
                    noviembre:res.find(fechaRaw=>this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.diaNoviembre || 0
                })          
            }
            return data
        })
    }   
    
    private evalConjuntoRifCond = (fechaRaw: PatrimonioFromDB, conjuntoRif: ConjuntoRif): boolean => (fechaRaw.conjuntoRif?.rif1 === conjuntoRif.rif1 && fechaRaw.conjuntoRif?.rif2 === conjuntoRif.rif2 )

    async Delete(){
        return patrimonioBackend.DeleteAll().then((res:DBDeleteResponse)=>res)
    }

    defSeed(conjuntos: ConjuntoRif[]): FechaPatrimonio[]{
        const data: FechaPatrimonio[] = []
        for (let i = 0; i < 5; i++) {
            data.push({
                conjuntoId: conjuntos[i].id!,
                rif1:conjuntos[i].rif1,
                rif2:conjuntos[i].rif2,
                octubre:0,
                noviembre:0,
            })          
        }
        return data
    }

    Prepare(data: FechaPatrimonio): PatrimonioFromDB {
        return {
            conjuntoRifId: data.conjuntoId,
            diaNoviembre: data.noviembre,
            diaOctubre: data.octubre,
        } as any
    }



}

export const patrimonioController = new PatrinomioController()