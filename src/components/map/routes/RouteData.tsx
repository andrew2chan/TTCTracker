import { RoutesProps } from "./Routes";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { RoutesType } from "../../../types/RoutesType";

import "./RouteData.css";

/**
 * This component is used to display the list of routes available in the swipeable drawer
 */
const RouteData = (props: RoutesProps) => {
    const { data, setLocalData } = props;

    const handleToggle = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
        let tag = (event.target as HTMLInputElement).value;

        setLocalData((prevData: RoutesType | null): RoutesType | null => {
            if(!prevData) return null;

            const updatedData: RoutesType = { ...prevData };
            if(prevData) {
                if (updatedData[tag]) {
                    updatedData[tag].active = checked;
                }
            }
            //console.log(updatedData);
            return updatedData;
        })
    }


    return (
        <div className="routes-list">
            <FormGroup>
                {
                    data && Object.keys(data).map((key: string) => {
                        const route = data[key];
                        return (
                            <div key={key} className="route-item">
                                <FormControlLabel control={<Switch />} label={route.title} labelPlacement="start" value={route.tag} onChange={handleToggle} />
                            </div>
                        )
                    })
                }
            </FormGroup>
        </div>
    )

}

export default RouteData;