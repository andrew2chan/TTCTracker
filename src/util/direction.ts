import { DirectionType } from "../types/DirectionType";

export const getDirection = (heading: number): DirectionType => {
    const directionType: DirectionType = {
        direction: "Unknown",
    };

    if (heading >= 315 || heading < 45) {
        directionType.direction = "N";
    } else if (heading >= 45 && heading < 135) {
        directionType.direction = "E";
    } else if (heading >= 135 && heading < 225) {
        directionType.direction = "S";
    } else if (heading >= 225 && heading < 315) {
        directionType.direction = "W";
    }

    return directionType;
}

export const getVehicleRoute = (direction: string | null): string | undefined => {
    if(!direction) return undefined;
    const [route = undefined, _, exactRoute = undefined] = direction.split("_") || [];
    return exactRoute;
}