import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/context";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: "10px",
    transition: transitions.SCALE,
};

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <AlertProvider template={AlertTemplate} {...options}>
                <App />
            </AlertProvider>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
