import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import {Employee} from "./employee";
import React, {useState} from "react";
import AddEmployeeDialog from "./add-employee-dialog";

export default function EmployeeTable(props) {
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
    // const [search, setSearch] = useState("");
    const TABLE_HEAD = [
        {id: "employee", title: "Mitarbeiter"},
        {id: "role", title: "Rolle"},
        {id: "manager", title: "Verantwortlicher"},
        {id: "actions", title: ""},
    ];

    function handleAddButtonClicked() {
        setIsAddEmployeeOpen((cur) => !cur)
    }

    function handleNavFirst(e) {
        e.preventDefault();
        props.onNavigate(props.links.first.href)
    }

    function handleNavPrev(e) {
        e.preventDefault();
        props.onNavigate(props.links.prev.href)
    }

    function handleNavNext(e) {
        e.preventDefault();
        props.onNavigate(props.links.next.href)
    }

    function handleNavLast(e) {
        e.preventDefault()
        props.onNavigate(props.links.last.href)
    }

    function handleSearch(e) {
        // setSearch(e.target.value)
    }

    const navLinks = [];
    if ("first" in props.links) {
        navLinks.push(<Button onClick={handleNavFirst} variant="outlined" color="blue-gray" size="sm">
            Anfang
        </Button>);
    }
    if ("prev" in props.links) {
        navLinks.push(<Button onClick={handleNavPrev} variant="outlined" color="blue-gray" size="sm">
            Zurück
        </Button>);
    }
    if ("next" in props.links) {
        navLinks.push(<Button onClick={handleNavNext} variant="outlined" color="blue-gray" size="sm">
            Vor
        </Button>);
    }
    if ("last" in props.links) {
        navLinks.push(<Button onClick={handleNavLast} variant="outlined" color="blue-gray" size="sm">
            Ende
        </Button>);
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Mitarbeiter
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">

                        </Typography>
                    </div>

                    <div className="flex shrink-0 f d lex-col gap-2 sm:flex-row">
                        <Button onClick={handleAddButtonClicked} className="flex items-center gap-3" color="blue"
                                size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4"/> Mitarbeiter hinzufügen
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <Input label="Suchen" onChange={handleSearch}
                               icon={<MagnifyingGlassIcon className="h-5 w-5"/>}/>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-fixed text-left ">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head.id} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head.title}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.employees.map((employee) => (
                        <Employee key={employee.id} employee={employee} onDelete={props.onDelete}
                                  onUpdate={props.onUpdate}/>
                    ))}
                    </tbody>
                </table>
                <AddEmployeeDialog onCreate={props.onCreate} setIsAddEmployeeOpen={setIsAddEmployeeOpen}
                                   isAddEmployeeOpen={isAddEmployeeOpen}/>

            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Seite {props.currentPage + 1} von {props.pageSize}
                </Typography>
                <div className="flex gap-2">
                    {navLinks}
                </div>
            </CardFooter>
        </Card>
    );
}