import { useEffect, useState } from "react";
import { RoutesType } from "../../../types/RoutesType";
import { Button, SwipeableDrawer } from "@mui/material";
import RouteData from "./RouteData";

import "./Routes.css";

export type RoutesProps ={
    data: RoutesType | null,
    setLocalData: React.Dispatch<React.SetStateAction<RoutesType | null>>;
}

/**
 * This component is use to handle the routes button interaction and the swipeable drawer itself
 */
const Routes = (props: RoutesProps) => {
    const [data, setData] = useState<RoutesType | null>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const toggleDrawer = (open: boolean) => {
        return () => setOpenDrawer(open);
    }

    return (
        <>
            <section className="routes">
                <Button variant="contained" color="darkGray" size="small" onClick={toggleDrawer(true)}>Routes</Button>
                <SwipeableDrawer open={openDrawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
                    <p>Please note: Data updates every 10 seconds, please wait a bit if nothing shows up.</p>
                    <RouteData data={data} setLocalData={props.setLocalData} />
                </SwipeableDrawer>
            </section>
        </>
    )
}

export default Routes;