import React from "react";
import {
    Dialog,
} from "@material-tailwind/react";

import EmployeeFormCard from "./employee-form-card";

export default function AddEmployeeDialog(props) {

    return (
        <React.Fragment>
            <Dialog
                size="xs"
                open={props.isAddEmployeeOpen}
                className="bg-transparent shadow-none"
            >
                <EmployeeFormCard onCreate={props.onCreate} title={"Hinzufügen"}  setIsAddEmployeeOpen={props.setIsAddEmployeeOpen} />
            </Dialog>
        </React.Fragment>
    );
}