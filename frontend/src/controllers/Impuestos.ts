import { FechaImpuestos, ImpuestosFromDB } from "../interfaces/Impuestos";
import * as impuestoBackend from '../../wailsjs/go/main/Impuesto'
import { DBCoreResponse, DBCreateResponse, DBDeleteResponse, DBUpdateResponse } from "../interfaces/Responses";

class ImpuestoController {

    async Assign(quincena:number,terminalRif:number,dto: ImpuestosFromDB[]): Promise<DBCoreResponse>{
        return impuestoBackend.Assign(quincena,terminalRif,dto)
        .then( (res: DBCoreResponse) => res)
    }
    async GetAll(quincena: 1 | 2): Promise<FechaImpuestos[]>{
        return impuestoBackend.GetAll(quincena).then(res=>{
            if(res.length === 0) return []
            const data: FechaImpuestos[] = []            
            for (let i = 0; i <= 9; i++) {
                data.push({
                    quincena,
                    terminal_rif: i,
                    enero:res.find(fechaRaw=>fechaRaw.mes===1 && fechaRaw.terminalRif === i)?.dia || 0,
                    febrero:res.find(fechaRaw=>fechaRaw.mes===2 && fechaRaw.terminalRif === i)?.dia || 0,
                    marzo:res.find(fechaRaw=>fechaRaw.mes===3 && fechaRaw.terminalRif === i)?.dia || 0,
                    abril:res.find(fechaRaw=>fechaRaw.mes===4 && fechaRaw.terminalRif === i)?.dia || 0,
                    mayo:res.find(fechaRaw=>fechaRaw.mes===5 && fechaRaw.terminalRif === i)?.dia || 0,
                    junio:res.find(fechaRaw=>fechaRaw.mes===6 && fechaRaw.terminalRif === i)?.dia || 0,
                    julio:res.find(fechaRaw=>fechaRaw.mes===7 && fechaRaw.terminalRif === i)?.dia || 0,
                    agosto:res.find(fechaRaw=>fechaRaw.mes===8 && fechaRaw.terminalRif === i)?.dia || 0,
                    septiembre:res.find(fechaRaw=>fechaRaw.mes===9 && fechaRaw.terminalRif === i)?.dia || 0,
                    octubre:res.find(fechaRaw=>fechaRaw.mes===10 && fechaRaw.terminalRif === i)?.dia || 0,
                    noviembre:res.find(fechaRaw=>fechaRaw.mes===11 && fechaRaw.terminalRif === i)?.dia || 0,
                    diciembre:res.find(fechaRaw=>fechaRaw.mes===12 && fechaRaw.terminalRif === i)?.dia || 0,
                })          
            }
            return data
        })
    }    
    // async Update(id: number, dto: ImpuestoFromDB){
    //     return empresaBackend.Update(id,dto)
    //     .then( (res: DBUpdateResponse) => res)
    // }
    async Delete(quincena: number){
        return impuestoBackend.DeleteAllFromQuincena(quincena).then((res:DBDeleteResponse)=>res)
    }

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

    Prepare(data: FechaImpuestos): ImpuestosFromDB[] {
        return [
            {terminalRif:data.terminal_rif,dia:data.enero,mes:1,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.febrero,mes:2,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.marzo,mes:3,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.abril,mes:4,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.mayo,mes:5,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.junio,mes:6,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.julio,mes:7,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.agosto,mes:8,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.septiembre,mes:9,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.octubre,mes:10,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.noviembre,mes:11,quincena:data.quincena},
            {terminalRif:data.terminal_rif,dia:data.diciembre,mes:12,quincena:data.quincena},
        ]
    }

}

export const impuestoController = new ImpuestoController()