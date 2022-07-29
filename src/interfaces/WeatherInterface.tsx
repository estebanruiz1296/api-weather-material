
export interface WeatherInterfaz {
    coord:      Coord;
    weather:    Weather[];
    main:       Main;
    sys:        Sys;
    name: string

}
export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp: number;
}

export interface Sys {
    country: string;
}

export interface Weather {
    main:        string;
    description: string;
}


