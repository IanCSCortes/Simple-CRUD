import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useNavigate, Link } from "react-router-dom";


const Students = () => {
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:8080/students", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            } else {
                console.error("Failed to fetch students");
            }
        } catch (error) {
            console.error("An error occurred while fetching students", error);
        }
    };

    const handleDeletion = async (e) => {

        if (!window.confirm("Deseja mesmo remover este aluno?")) return;

        await fetch(`http://localhost:8080/students/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        await fetchStudents();
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h1 className="mb-4">Alunos</h1>
            <Link to="/students/create"  className="btn btn-primary">Cadastrar</Link>
            <div className="table-responsive mt-4">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr className="text-center" key={student.id}>
                                    <td>
                                        <img 
                                            src={`http://localhost:8080/${student.profile_picture_uri}` || "https://via.placeholder.com/50x50"} 
                                            alt="Student Photo" 
                                            className="img-fluid"
                                            width={70}
                                        />
                                    </td>
                                    <td style={{verticalAlign:"middle"}}>{student.name}</td>
                                    <td style={{verticalAlign:"middle"}}>{student.email}</td>
                                    <td style={{verticalAlign:"middle"}}>{student.address}</td>
                                    <td style={{verticalAlign:"middle"}}>{student.phone}</td>
                                    <td>
                                        <div>
                                            <Link to={`/students/edit/${student.id}`} className="btn btn-warning text-white m-2" >Editar</Link>
                                            <button onClick={(e) => handleDeletion(e)} data-id={student.id} className="btn btn-danger">Excluir</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhum aluno cadastrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default Students;
