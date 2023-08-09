import React from "react";
import { Alert, Button } from "@material-tailwind/react";

export function UpdateAlert(props) {

    return (
        <>

            <Alert open={props.openAlert} onClose={() => props.setOpenAlert(false)}>
                A dismissible alert for showing message.
            </Alert>
        </>
    );
}