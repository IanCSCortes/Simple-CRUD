import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const Homepage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/auth");
        }
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="row text-center">
                    <div className="col-md-12">
                        <h1 className="display-4 mb-4">Bem-vindo ao CRUD Delta</h1>
                        <p className="lead mb-4">
                            Gerencie os alunos e suas informações de forma simples e eficiente.
                        </p>
                        <a href="https://www.linkedin.com/in/iancortes" className="btn btn-primary btn-lg text-white">
                            Meu Perfil no Linkedin
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;