import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SDKProvider } from "@tma.js/sdk-react";
import { TmaProvider } from "./context/tmaProvider.jsx"; // Adjust the import path as needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SDKProvider acceptCustomStyles debug>
      <TmaProvider>
        <App />
      </TmaProvider>
    </SDKProvider>
  </React.StrictMode>
);
