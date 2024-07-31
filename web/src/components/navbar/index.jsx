import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/auth");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{borderBottom: "1px solid #007bff"}}>
                <a className="navbar-brand" href="/">CRUD Delta</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Página Inicial</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/students">Alunos</Link>
                        </li>
                    </ul>
                    <button className="btn btn-danger my-2 my-sm-0" onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}>Sair</button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;