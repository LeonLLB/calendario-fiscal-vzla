export namespace main {
	
	export class ConjuntoRif {
	    id?: number;
	    rif1: number;
	    rif2: number;
	
	    static createFrom(source: any = {}) {
	        return new ConjuntoRif(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.rif1 = source["rif1"];
	        this.rif2 = source["rif2"];
	    }
	}
	export class Empresa {
	    id?: number;
	    nombre: string;
	    rif: string;
	
	    static createFrom(source: any = {}) {
	        return new Empresa(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.nombre = source["nombre"];
	        this.rif = source["rif"];
	    }
	}
	export class GranPatrimonio {
	    id?: number;
	    conjuntoRifId: number;
	    diaOctubre: number;
	    diaNoviembre: number;
	    conjuntoRif?: ConjuntoRif;
	
	    static createFrom(source: any = {}) {
	        return new GranPatrimonio(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.conjuntoRifId = source["conjuntoRifId"];
	        this.diaOctubre = source["diaOctubre"];
	        this.diaNoviembre = source["diaNoviembre"];
	        this.conjuntoRif = this.convertValues(source["conjuntoRif"], ConjuntoRif);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Impuesto {
	    id?: number;
	    quincena: number;
	    inicialRif: number;
	    mes: number;
	    dia: number;
	
	    static createFrom(source: any = {}) {
	        return new Impuesto(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.quincena = source["quincena"];
	        this.inicialRif = source["inicialRif"];
	        this.mes = source["mes"];
	        this.dia = source["dia"];
	    }
	}
	export class Liquidacion {
	    id?: number;
	    conjuntoRifId: number;
	    fecha: string;
	    conjuntoRif?: ConjuntoRif;
	
	    static createFrom(source: any = {}) {
	        return new Liquidacion(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.conjuntoRifId = source["conjuntoRifId"];
	        this.fecha = source["fecha"];
	        this.conjuntoRif = this.convertValues(source["conjuntoRif"], ConjuntoRif);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RetencionISLR {
	    id?: number;
	    conjuntoRifId: number;
	    mes: number;
	    dia: number;
	    conjuntoRif?: ConjuntoRif;
	
	    static createFrom(source: any = {}) {
	        return new RetencionISLR(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.conjuntoRifId = source["conjuntoRifId"];
	        this.mes = source["mes"];
	        this.dia = source["dia"];
	        this.conjuntoRif = this.convertValues(source["conjuntoRif"], ConjuntoRif);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

