import {useEffect, useState} from "react";
import {follow} from "../utility/follow";
import {deleteRequest, getRequest, postRequest, putRequest} from "../api/api-service";
import EmployeeTable from "../components/employee-table";
import {registerWebSocket} from "../utility/web-socket-listener";
import {useDispatch} from "react-redux";


function Home() {

    const rootPath = "/api";
    const [state, setState] = useState({
        employees: [],
        attributes: [],
        pageSize: 2,
        links: {},
        totalPages: 1,
        currentPage: 0,
        loggedInManager: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        loadFromServer(state.pageSize);
    }, [state.pageSize]);


    useEffect(() => {
        registerWebSocket([
            {route: '/topic/newEmployee', callback: refreshAndGoToLastPage},
            {route: '/topic/updateEmployee', callback: refreshCurrentPage},
            {route: '/topic/deleteEmployee', callback: refreshCurrentPage}
        ]);
    }, []);


    async function onNavigate(navUri) {
        try {
            const employeeCollection = await getRequest(navUri);
            const employees = await Promise.all(employeeCollection._embedded.employees.map(employee => getRequest(employee._links.self.href)));

            localStorage.setItem('currentPage', employeeCollection.page.number)

            setState({
                employees: employees,
                attributes: state.attributes,
                pageSize: state.pageSize,
                links: employeeCollection._links,
                totalPages: employeeCollection.page.totalPages,
                currentPage: employeeCollection.page.number
            });
        } catch (error) {
            console.error("Fehler beim Navigieren:", error);
        }
    }

    async function loadFromServer(pageSize) {
        try {
            const employeeCollection = await follow(rootPath, [{rel: "employees", params: {size: pageSize}}]);
            const schema = await getRequest(employeeCollection._links.profile.href);
            const attributes = Object.keys(schema)
            const employees = await Promise.all(employeeCollection._embedded.employees.map(employee => getRequest(employee._links.self.href)));

            setState({
                employees: employees,
                attributes: attributes,
                pageSize: pageSize,
                links: employeeCollection._links,
                totalPages: employeeCollection.page.totalPages,
                currentPage: employeeCollection.page.number
            });
            localStorage.setItem('currentPage', employeeCollection.page.number)
        } catch (error) {
            console.error("Fehler beim laden der Daten:", error);
        }
    }

    function onCreate(newEmployee) {
        follow(rootPath, [{rel: 'employees', params: {size: state.pageSize}}]).then(response => {
            postRequest(response._links.self.href, newEmployee)
        });
    }

    function onUpdate(employee, updatedEmployee) {
        if (employee.manager.name === state.loggedInManager) {
            updatedEmployee["manager"] = employee.manager;
            putRequest(employee._links.self.href, employee, updatedEmployee).then(response => {
            }, response => {
                if (response.status === 412) {
                    alert("DNIED: Bearbeitung nicht möglich " +
                        employee._links.self.href + ".")
                }
                if (response.status === 403) {
                    alert("ACCESS DENIED: You are not authorized to update" + employee._links.self.href)
                }
            })
        } else {
            alert("You are not authorized to update");
        }

    }


    function onDelete(employee) {
        deleteRequest(employee._links.self.href).then(response => {
            },
            response => {
                if (response.status.code === 403) {
                    alert("ACCESS DENIED: You are not authorized to delete" + employee._links.self.href)
                }
            })
    }


    function refreshAndGoToLastPage() {
        follow(rootPath, [{rel: "employees", params: {size: state.pageSize}}]).then(response => {
            if (response._links.last !== undefined) {
                onNavigate(response._links.last.href);
            } else {
                onNavigate(response._links.self.href)
            }
        })
    }


    async function refreshCurrentPage() {

        const employeeCollection = await follow(rootPath, [{
            rel: "employees",
            params: {size: state.pageSize, page: localStorage.getItem('currentPage')}
        }])
        const employees = await Promise.all(employeeCollection._embedded.employees.map(employee => getRequest(employee._links.self.href)));
        setState({
            employees: employees,
            attributes: state.attributes,
            pageSize: state.pageSize,
            links: employeeCollection._links,
            totalPages: employeeCollection.page.totalPages,
            currentPage: employeeCollection.page.number // Hier den Wert der aktuellen Seite setzen
        });
        localStorage.setItem('currentPage', employeeCollection.page.number)
    }


    return (
        <>
            <EmployeeTable links={state.links} employees={state.employees} onCreate={onCreate} onNavigate={onNavigate}
                           onDelete={onDelete} pageSize={state.totalPages} currentPage={state.currentPage}
                           onUpdate={onUpdate}/>
        </>
    );

}


export default Home;
