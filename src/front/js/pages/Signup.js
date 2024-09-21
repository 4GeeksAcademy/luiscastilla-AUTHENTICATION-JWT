import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/CrearUsuario.css";

const Signup = () => {
	const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
	const { actions } = useContext(Context);
    const navigate = useNavigate();

	const handleSubmit = (e) => {
        e.preventDefault();
        actions.crear_usuario(correo, contrasena).then(() => {
            navigate('/login');
        });
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
