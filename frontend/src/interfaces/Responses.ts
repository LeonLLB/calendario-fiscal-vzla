

export interface DBCreateResponse {

    error?: string
    id?: number
    rows?: number

}

export interface DBUpdateResponse extends DBCreateResponse {


}