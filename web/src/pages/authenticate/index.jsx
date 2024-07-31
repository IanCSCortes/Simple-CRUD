import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    const submit = async () => {
        const body = JSON.stringify({
            email,
            password
        });

        const request = await fetch("http://localhost:8080/authenticate/token", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (request.status !== 200) {
            alert("Usuário e/ou senha incorretos");
            return;
        }

        const data = await request.json();
        localStorage.setItem("token", data.token);
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Digite o seu endereço de e-mail"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Digite sua senha"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        submit();
                                    }}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authenticate;