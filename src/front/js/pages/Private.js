import React , { useContext, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/UsuarioVip.css";
import { Context } from "../store/appContext";

const Private = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleLogout = () => {
        actions.cerrarSesion();
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate('/');
        } else {
            console.log("Token válido, usuario autenticado");
        }
    }, [navigate]);

    return (
        <div>
            <div className="vip-container">
                <h2>Bienvenido a la Página Privada</h2>
                <img
                    src="https://via.placeholder.com/400x200"
                    alt="Bienvenido"
                    className="welcome-image"
                />
                <p>Estamos encantados de tenerte aquí.</p>
            </div>
            <div className="private-container">
                <p>Solo los usuarios autenticados pueden ver este contenido.</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Private;