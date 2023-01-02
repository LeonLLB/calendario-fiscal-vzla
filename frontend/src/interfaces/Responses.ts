
export interface DBCoreResponse{
    error?: string
    id?: number
    rows?: number

}

export interface DBCreateResponse extends DBCoreResponse {


}

export interface DBUpdateResponse extends DBCoreResponse {


}