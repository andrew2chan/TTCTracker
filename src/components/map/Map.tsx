import { MapContainer, TileLayer } from "react-leaflet";
import { useInitialFetch } from "../../hooks/useInitialFetch";
import Routes from "./routes/Routes";
import { RoutesType } from "../../types/RoutesType";
import { useEffect, useState } from "react";
import { useContinuousFetch } from "../../hooks/useContinuousFetch";

const Maps = () => {
    const data: RoutesType | null = useInitialFetch("https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc");
    const [localData, setLocalData] = useState<RoutesType | null>(null);
    useContinuousFetch(localData);

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
            </MapContainer>
        </>
    )
}

export default Maps;