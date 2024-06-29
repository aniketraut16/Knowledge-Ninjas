import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TmaProvider } from "./context/tmaProvider.jsx";
import { WalletProvider } from "./context/walletprovider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <TmaProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TmaProvider>
    </WalletProvider>
  </React.StrictMode>
);
