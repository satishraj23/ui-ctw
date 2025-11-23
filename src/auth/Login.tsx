import { useState } from "react";

interface LoginUser {
    username: string;
    password: string;
}

const Login = () => {

    const [loginUser, setLoginUser] = useState<LoginUser>({
        username: '',
        password: ''
    });

    const [token, setToken] = useState<string>('');

    function updateLoginUser(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setLoginUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch("http://localhost:9091/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: loginUser.username,
                password: loginUser.password
            })
        });

        const data = await response.json();
        console.log("response from server", data);

        if (data.token) {
            setToken(data.token);
        } else {
            setToken("NO TOKEN RECEIVED");
        }
    }

    return (
        <div>
            <form onSubmit={submitLogin}>
                <input type="text" name="username" value={loginUser.username} placeholder="username" onChange={updateLoginUser} />
                <input type="password" name="password" value={loginUser.password} placeholder="password" onChange={updateLoginUser} />
                <button type="submit">Login Here</button>
            </form>

            {token && (
                <h2 style={{ color: "green" }}>
                    Token: {token}
                </h2>
            )}
        </div>
    );
}

export default Login;
