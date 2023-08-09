import {LoginFormCard} from "../components/login-form-card";

function Login(props) {


    return (
        <div className={"flex items-center justify-center h-screen"}>
            <LoginFormCard setLoggedIn={props.setLoggedIn}/>
        </div>

    )
}

export default Login;