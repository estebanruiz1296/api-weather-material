
export interface WeatherInterfaz {
    id : number | undefined,
    ciudad : string,
    clima : string | undefined,
    descripcion : string, 
    temperatura? : number , 
    pais : string | undefined
}
export interface ConsultaInterfaz {
    id : number | undefined,
    ciudad : string,
    descripcion : string,
}


