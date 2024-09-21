import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<Login />} path="/" />
                    <Route element={<Signup />} path="/signup" />
                    <Route element={<Private />} path="/private" />
                    <Route element={<h1>Not found!</h1>} path="*" />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);