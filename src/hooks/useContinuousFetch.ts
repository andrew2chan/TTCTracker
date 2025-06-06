import { useEffect, useState } from "react";
import { secondsToMilliseconds } from "../util/time";
import { RoutesListType, RoutesType } from "../types/RoutesType";
import { VehicleType } from "../types/VehicleType";

export const useContinuousFetch = (data: RoutesType | null): VehicleType => {
    const [listOfVehicles, setListOfVehicles] = useState<VehicleType>({});

    // stringifies it so I can check whenever the active routes change.
    // This is run every time the data changes
    const activeItems = data ? Object.keys(data).map((key) => data[key].active).join("") : null;

    useEffect(() => {
        if(!data) return;

        const activeRoutes: RoutesListType[] = [];
        for(const [key, value] of Object.entries(data)) {
            if(value.active) {
                activeRoutes.push(value);
            }
        }

        const fetchData = async () => {
            const tmpListOfVehicles: VehicleType = {};
            const currentTime = Date.now() - secondsToMilliseconds(45); // need to subtract 45 seconds to make sure the API has time to load the data

            for(const route of activeRoutes) {
                const url = "https://retro.umoiq.com/service/publicXMLFeed?command=vehicleLocations&a=ttc&r=" + route.tag + "&t=" + currentTime;

                try {
                    const response = await fetch(url);
                    if(!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
    
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(await response.text(), "text/xml");
                    const vehicles = xmlDoc.getElementsByTagName("vehicle");
                    for(const vehicle of vehicles) {
                        const id: string | null = vehicle.getAttribute("id");
    
                        if(id === null) continue;
                        
                        const vehicleNumber: string | null = vehicle.getAttribute("routeTag");
                        const direction: string | null= vehicle.getAttribute("dirTag");
                        const lat: number = parseFloat(vehicle.getAttribute("lat") || "0");
                        const lon: number = parseFloat(vehicle.getAttribute("lon") || "0");
                        const heading: number = parseInt(vehicle.getAttribute("heading") || "0");
                        tmpListOfVehicles[id] = {
                            id: id,
                            vehicleNumber: vehicleNumber,
                            direction: direction,
                            lat: lat,
                            lon: lon,
                            heading: heading
                        }
                    }
                    //console.log(tmpListOfVehicles);
                    setListOfVehicles((prevList) => {
                        const updatedList = { ...prevList };
                        for(const [key, value] of Object.entries(tmpListOfVehicles)) {
                            updatedList[key] = value;
                        }
                        return updatedList;
                    });
                }
                catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }

        const recurringTimer = setInterval(fetchData, secondsToMilliseconds(10));

        return () => {
            clearInterval(recurringTimer);
        }
    }, [activeItems])

    return listOfVehicles;
}