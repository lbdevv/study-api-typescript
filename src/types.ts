export enum Weather{
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Windy = 'windy',
    Stormy = 'stormy'
}

export enum Visibility{
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor'
}

export interface DiaryEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

//Con esto se crea otra interface o entidad de la cual se le especifica que datos va a tomar de la entidad de la cual hereda
//export type NonSensitiveInfoDiaryEntry = pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility' >

//Al contrario de arriba aquí tomas todos los campos de la entidad o interface y le dice que campo quieres omitir
export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>




