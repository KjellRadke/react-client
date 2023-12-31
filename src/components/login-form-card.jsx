import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import {useState} from "react";

export function LoginFormCard(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const handleUserNameChanged = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }
    function handleLoginButtonClicked(){
        props.setLoggedIn(true)
    }
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>

            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input onChange={handleUserNameChanged} size="lg" label="Username"/>
                    <Input onChange={handlePasswordChange} type="password" size="lg" label="Password"/>
                </div>

                <Button onClick={handleLoginButtonClicked} className="mt-6" fullWidth>
                    Login
                </Button>

            </form>
        </Card>
    );
}