import './Map.css';
import { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useInitialFetch } from "../../hooks/useInitialFetch";
import Routes from "./routes/Routes";
import { RoutesType } from "../../types/RoutesType";
import { useEffect, useState } from "react";
import { useContinuousFetch } from "../../hooks/useContinuousFetch";
import L from "leaflet";
import { getDirection, getVehicleRoute } from "../../util/direction";
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

                        const { direction }: DirectionType = getDirection(vehicle.heading);
                        const vehicleRoute = getVehicleRoute(vehicle.direction) === undefined ? "Unknown" : getVehicleRoute(vehicle.direction);

                        const vehicleDivIcon = `
                            <div class="vehicle-icon-container">
                                <img src="${vehicleRoute === "Unknown" ? "/TTC_UNKNOWN.png" : "/TTC.png"}" alt="vehicle icon" class="vehicle-icon" />
                                <div class="direction-icons">
                                    ${vehicleRoute + " - " + direction}
                                </div>
                            </div>
                        `;

                        const icon = L.divIcon({
                            html: vehicleDivIcon,
                            iconSize: [100, 15],
                            iconAnchor: [50, 0]
                        })

                        return (
                            <Fragment key={key}>
                                <Marker position={[vehicle.lat, vehicle.lon]} icon={icon}>
                                    <Popup>
                                        <h3>{"id: " + vehicle.id}</h3>
                                        <h3>{"route: " + vehicleRoute}</h3>
                                        <h3>{"currently heading: " + direction}</h3>
                                    </Popup>
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