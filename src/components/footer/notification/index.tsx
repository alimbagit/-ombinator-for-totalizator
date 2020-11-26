import { Typography, Drawer, SwipeableDrawer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { WrapperNotification } from "./elements";

interface NotificationProps {
    /**Виден ли компонент */
    isVisible: boolean;
    /**Надпись на компоненте */
    description: string;
}
/**
 * Оповещения для пользователя
 */
const Notification = ({ isVisible, description }: NotificationProps) => {
    const [shown, setShown] = useState(isVisible);

    // useEffect(() => {
    //     disableShown();
    // }, [isVisible])
    console.log("disable shown");
    const disableShown = () => {
        console.log("disable shown");
        setTimeout(setShown(false), 6000);
    }

    return (
        <WrapperNotification>
            <SwipeableDrawer anchor="top" open={shown} variant="temporary" onOpen={disableShown} onClose={() => { }}>
                <Typography>{description}</Typography>
            </SwipeableDrawer>
        </WrapperNotification>
    );
};

export default Notification;
