import React from "react";
import {Dialog} from "@material-tailwind/react";
import EmployeeFormCard from "./employee-form-card";
import {UpdateAlert} from "./update-alert";

export default function EditEmployeeDialog(props) {
    return (
        <React.Fragment>
            <Dialog
                size="xs"
                open={props.isEditEmployeeOpen}
                className="bg-transparent shadow-none"
            >

                <EmployeeFormCard
                    title={"Bearbeiten"}
                    employee={props.employee}
                    firstName={props.employee.firstName}
                    lastName={props.employee.lastName}
                    team={props.employee.team}
                    job={props.employee.job}
                    setIsEditEmployeeOpen={props.setIsEditEmployeeOpen}
                    onUpdate={props.onUpdate}
                />

            </Dialog>
        </React.Fragment>
    );
}
