import { useEffect, useState } from "react";
import { RoutesType } from "../types/RoutesType";

export const useInitialFetch = (url: string, options: object = {}) => {
    const [data, setData] = useState<RoutesType | null>(null);

    //useEffect for initial fetch
    useEffect(() => {
        const fetchData = async (url: string, options: object) => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const listOfRoutes: RoutesType = {};

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(await response.text(), "text/xml");
                const routes = xmlDoc.getElementsByTagName("route");
                for(const route of routes) {
                    if(route.getAttribute("tag") !== null) {
                        const tag = route.getAttribute("tag");
                        if (tag !== null) {
                            listOfRoutes[tag] = {
                                "tag": tag,
                                "title": route.getAttribute("title"),
                                "active": false
                            };
                        }
                    }
                }
                setData(listOfRoutes);
            }
            catch (error) {
                throw error;
            }
        }

        fetchData(url, options);

        // Cleanup function to avoid memory leaks
        return () => {
            setData(null);
        }
    }, [url])

    return data;
}