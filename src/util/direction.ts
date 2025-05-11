import { DirectionType } from "../types/DirectionType";

export const getDirection = (heading: number): DirectionType => {
    const directionType: DirectionType = {
        direction: "Unknown",
        imgPath: "/Unknown.png"
    };

    if (heading >= 315 || heading < 45) {
        directionType.direction = "N";
        directionType.imgPath = "/N.png";
    } else if (heading >= 45 && heading < 135) {
        directionType.direction = "E";
        directionType.imgPath = "/E.png";
    } else if (heading >= 135 && heading < 225) {
        directionType.direction = "S";
        directionType.imgPath = "/S.png";
    } else if (heading >= 225 && heading < 315) {
        directionType.direction = "W";
        directionType.imgPath = "/W.png";
    }

    return directionType;
}