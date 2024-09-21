import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/IngresarSesion.css";

const Login = () => {
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const { actions } = useContext(Context);
	const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.iniciarSesion(email, password).then(() => {
            navigate('/private');
        });
    };

	return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>

                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                    required
                />

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
