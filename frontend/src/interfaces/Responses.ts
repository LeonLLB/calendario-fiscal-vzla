
export interface DBCoreResponse{
    error?: string
    rows?: number
}

interface DBID{
    id?: number
}

export interface DBCreateResponse extends DBCoreResponse, DBID {
    
}

export interface DBUpdateResponse extends DBCoreResponse, DBID {

}

export interface DBDeleteResponse extends DBCoreResponse {
    ok?: boolean
}