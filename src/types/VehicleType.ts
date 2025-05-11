export type VehicleType = {
    [id: string]: VehicleListType
}

export type VehicleListType = {
    id: string | null,
    vehicleNumber: string | null,
    direction: string | null,
    lat: number,
    lon: number,
    heading: number
}