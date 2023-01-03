import { FechaRetenciones, RetencionFromDB } from "../interfaces/Retenciones";
import * as retencionBackend from '../../wailsjs/go/main/RetencionISLR'
import { DBCoreResponse, DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";
import { ConjuntoRif } from "../interfaces/ConjuntoRif";

class RetencionController {

    async Assign(idConjuntoRif: number,dto: RetencionFromDB[]): Promise<DBCoreResponse>{
        return retencionBackend.Assign(idConjuntoRif,dto)
        .then( (res: DBCoreResponse) => res)
    }
    async GetAll(conjuntosRif: ConjuntoRif[]): Promise<FechaRetenciones[]>{
        return retencionBackend.GetAll().then(res=>{
            if(res.length === 0) return []
            const data: FechaRetenciones[] = [] 
            for (let conjuntoRif of conjuntosRif) {                
                data.push({
                    conjuntoId: conjuntoRif.id!,
                    rif1: conjuntoRif.rif1,
                    rif2: conjuntoRif.rif2,
                    enero:res.find(fechaRaw=>fechaRaw.mes===1 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    febrero:res.find(fechaRaw=>fechaRaw.mes===2 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    marzo:res.find(fechaRaw=>fechaRaw.mes===3 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    abril:res.find(fechaRaw=>fechaRaw.mes===4 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    mayo:res.find(fechaRaw=>fechaRaw.mes===5 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    junio:res.find(fechaRaw=>fechaRaw.mes===6 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    julio:res.find(fechaRaw=>fechaRaw.mes===7 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    agosto:res.find(fechaRaw=>fechaRaw.mes===8 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    septiembre:res.find(fechaRaw=>fechaRaw.mes===9 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    octubre:res.find(fechaRaw=>fechaRaw.mes===10 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    noviembre:res.find(fechaRaw=>fechaRaw.mes===11 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                    diciembre:res.find(fechaRaw=>fechaRaw.mes===12 && this.evalConjuntoRifCond(fechaRaw,conjuntoRif))?.dia || 0,
                })          
            }
            return data
        })
    }   
    
    private evalConjuntoRifCond = (fechaRaw: RetencionFromDB, conjuntoRif: ConjuntoRif): boolean => (fechaRaw.conjuntoRif?.rif1 === conjuntoRif.rif1 && fechaRaw.conjuntoRif?.rif2 === conjuntoRif.rif2 )

    async Delete(){
        return retencionBackend.DeleteAll().then((res:DBDeleteResponse)=>res)
    }

    defSeed(conjuntos: ConjuntoRif[]): FechaRetenciones[]{
        const data: FechaRetenciones[] = []
        for (let i = 0; i < 5; i++) {
            data.push({
                conjuntoId: conjuntos[i].id!,
                rif1:conjuntos[i].rif1,
                rif2:conjuntos[i].rif2,
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

    Prepare(data: FechaRetenciones): RetencionFromDB[] {
        return [
            {conjuntoRifId:data.conjuntoId,dia:data.enero,mes:1} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.febrero,mes:2} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.marzo,mes:3} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.abril,mes:4} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.mayo,mes:5} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.junio,mes:6} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.julio,mes:7} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.agosto,mes:8} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.septiembre,mes:9} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.octubre,mes:10} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.noviembre,mes:11} as any,
            {conjuntoRifId:data.conjuntoId,dia:data.diciembre,mes:12} as any,
        ]
    }



}

export const retencionController = new RetencionController()