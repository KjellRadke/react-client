import {IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {TrashIcon, PencilIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import EditEmployeeDialog from "./edit-employee-dialog";


export function Employee(props) {
    const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);

    function handleDeleteEmployee() {
        props.onDelete(props.employee)
    }

    function handleEditEmployee() {
        setIsEditEmployeeOpen((cur) => !cur)
    }

    return (
        <tr key={props.employee._links.self.href}>
            <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                    {/*<Avatar src={img} alt={name} size="sm"/>*/}
                    <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {props.employee.firstName + " " + props.employee.lastName}
                        </Typography>
                    </div>
                </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {props.employee.team}
                    </Typography>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                    >
                        {props.employee.job}
                    </Typography>
                </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Mitarbeiter bearbeiten">
                    <IconButton onClick={handleEditEmployee} variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4"/>
                    </IconButton>
                </Tooltip>
                <Tooltip content="Mitarbeiter löschen">
                    <IconButton onClick={handleDeleteEmployee} variant="text" color="blue-gray">
                        <TrashIcon className="h-4 w-4"/>
                    </IconButton>
                </Tooltip>
                <EditEmployeeDialog employee={props.employee}
                                    isEditEmployeeOpen={isEditEmployeeOpen}
                                    setIsEditEmployeeOpen={setIsEditEmployeeOpen}
                                    onUpdate={props.onUpdate}/>
            </td>
        </tr>
    );
}






