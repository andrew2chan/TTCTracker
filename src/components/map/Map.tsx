import { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useInitialFetch } from "../../hooks/useInitialFetch";
import Routes from "./routes/Routes";
import { RoutesType } from "../../types/RoutesType";
import { useEffect, useState } from "react";
import { useContinuousFetch } from "../../hooks/useContinuousFetch";
import L from "leaflet";
import { getDirection } from "../../util/direction";
import { DirectionType } from "../../types/DirectionType";

const Maps = () => {
    const data: RoutesType | null = useInitialFetch("https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc");
    const [localData, setLocalData] = useState<RoutesType | null>(null);
    const vehicleLocations = useContinuousFetch(localData);

    // sets localData to the initial data fetched from the API
    useEffect(() => {
        if (data) {
            setLocalData(data);
        } else {
            console.log("No data fetched yet.");
        }
    }, [data]);

    return (
        <>
            <Routes data={data} setLocalData={setLocalData} />
            <MapContainer center={[43.6532, -79.3832]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    Object.keys(vehicleLocations).length > 0 && Object.keys(vehicleLocations).map((key: string) => {
                        const vehicle = vehicleLocations[key];
                        const icon = new L.Icon({
                            iconUrl: "/TTC.png",
                            iconSize: [25, 25],
                        });

                        const { direction, imgPath: directionImgPath }: DirectionType = getDirection(vehicle.heading);
                        const directionIcon = new L.Icon({
                            iconUrl: directionImgPath,
                            iconSize: [30, 25],
                        })

                        return (
                            <Fragment key={key}>
                                <Marker position={[vehicle.lat, vehicle.lon]} icon={icon}>
                                    <Popup>
                                        {vehicle.vehicleNumber} - {vehicle.direction}
                                    </Popup>
                                </Marker>
                                <Marker position={[vehicle.lat + 0.000075, vehicle.lon]} icon={icon}>
                                    <span>TEST</span>
                                </Marker>
                            </Fragment>
                        )
                    })
                }
            </MapContainer>
        </>
    )
}

export default Maps;