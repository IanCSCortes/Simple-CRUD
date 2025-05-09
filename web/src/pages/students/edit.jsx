import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState("");
    const [picturePreview, setPicturePreview] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing student data
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:8080/students/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }

                const student = await response.json();
                setName(student.name);
                setEmail(student.email);
                setAddress(student.address);
                setPhone(student.phone);
                setPicture(student.profilePicture);
                setPicturePreview(`http://localhost:8080/${student.profile_picture_uri}`);
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        };

        fetchStudent();
    }, [id]);

    const parseImage = (files) => {
        if (files[0]) {
            const file = files[0];

            // Check if the file is a JPEG image
            if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
                alert('Only JPEG images are allowed.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPicture(reader.result.split(',')[1]); // Strip out the data URL part
                setPicturePreview(URL.createObjectURL(file)); // Show image preview
            };

            reader.readAsDataURL(file);
        } else {
            setPicture("");
            setPicturePreview("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Improved validation with detailed alerts
        if (name.trim().length === 0) {
            alert("O nome do aluno é obrigatório");
            return;
        }
        if (email.trim().length === 0 || !/\S+@\S+\.\S+/.test(email)) {
            alert("O e-mail do aluno é obrigatório e deve ser válido");
            return;
        }
        if (address.trim().length === 0) {
            alert("O endereço do aluno é obrigatório");
            return;
        }
        if (phone.trim().length === 0 || !/^\d{10,15}$/.test(phone)) {
            alert("O telefone do aluno é obrigatório e deve conter apenas números (10-15 dígitos)");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/students/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, address, phone, profilePicture: picture
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update student');
            }

            navigate("/students");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">Editar aluno {id}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome do aluno"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite o endereço de e-mail do aluno"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Endereço</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Digite o endereço residencial do aluno"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Digite o número de telefone do aluno"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="picture">Foto de perfil</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="picture"
                            onChange={(e) => parseImage(e.target.files)}
                            accept="image/jpeg, image/jpg"
                        />
                        {picturePreview && (
                            <div className="mt-2">
                                <img src={picturePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Atualizar aluno</button>
                </form>
            </div>
        </>
    );
};

export default EditStudent;