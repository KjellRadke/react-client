import {Button, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import React, {useState} from "react";



export default function EmployeeFormCard(props) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [team, setTeam] = useState(props.team)
    const [job, setJob] = useState(props.job);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleFirstNameChanged = event => {
        setFirstName(event.target.value)
    };

    const handleLastNameChanged = event => {
        setLastName(event.target.value)
    };

    const handleJobChanged = event => {
        setJob(event.target.value)
    };

    const handleTeamChanged = event => {
        setTeam(event.target.value)
    };

    function handleOkButtonClicked() {
        if (props.title === "Hinzufügen") {
            const requestBody = {firstName: firstName, lastName: lastName, job: job, team: team}
            props.onCreate(requestBody);
            props.setIsAddEmployeeOpen(false)
        } else if (props.title === "Bearbeiten") {

            const requestBody = {firstName: firstName, lastName: lastName, job: job, team: team}
            props.onUpdate(props.employee, requestBody)
            props.setIsEditEmployeeOpen(false)
        }
    }

    function handleCancelButtonClicked() {
        if (props.title === "Hinzufügen") {
            props.setIsAddEmployeeOpen(false)
        } else if (props.title === "Bearbeiten") {
            props.setIsEditEmployeeOpen(false)
        }
    }

    return (
        <>
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        {props.title}
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        value={firstName}
                        onChange={handleFirstNameChanged}
                        label="Vorname" size="lg"/>
                    <Input
                        value={lastName}
                        onChange={handleLastNameChanged} label="Nachname" size="lg"/>
                    <Input
                        value={team}
                        onChange={handleTeamChanged}
                        label="Team" size="lg"/>

                    <Input
                        value={job}
                        onChange={handleJobChanged}
                        label="Job" size="lg"/>
                    {/*<UpdateAlert openAlert={openAlert} setOpenAlert={setOpenAlert} />*/}
                </CardBody>
                <CardFooter className="pt-0">
                    <div className={"flex flex-row gap-4"}>
                        <Button onClick={handleOkButtonClicked} variant="gradient" fullWidth color={"green"}>
                            Ok
                        </Button>

                        <Button onClick={handleCancelButtonClicked} variant="gradient" fullWidth color={"red"}>
                            Abbrechen
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}