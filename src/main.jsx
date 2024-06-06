import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./font.css"
import MouseParticles from "react-mouse-particles";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
          <ToastContainer />
          <MouseParticles
            g={2.3}
            num={1}
            radius={8}
            life={0.8}
            v={1.2}
            color="#fff"
            alpha={0.16}
            level={6}
          />
          <App />
      </Provider>
  </React.StrictMode>
);
