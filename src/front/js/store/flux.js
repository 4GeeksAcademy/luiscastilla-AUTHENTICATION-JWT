const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			usuarios: []
		},
		actions: {
			crear_usuario: async (email, password) => {
				try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/signup`,{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					});
                    if (!res.ok) {
						throw new Error("Error al registrar usuario");
					}
					const data = await res.json();
					console.log(data.msg);
					return data;
                } catch (error) {
                    console.error("Error al cargar los personajes:", error);
                }
			},
			iniciarSesion: async (email, contrasena) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password: contrasena }),
					});
					if (!res.ok) {
						throw new Error("Error en la solicitud de login");
					}
					const data = await res.json();
					localStorage.setItem("jwt-token", data.access_token);
					setStore({ token: data.access_token });
					console.log("Usuario autenticado:", data);
					return data;
				} catch (error) {
					console.error("Error en la solicitud de login:", error);
				}
			},
			cerrarSesion: () => {
				localStorage.removeItem("jwt-token");
				setStore({ token: null });
				console.log("Usuario deslogueado");
			}
		}
	};
};

export default getState;
