import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContextProvider.jsx";
import { SocketContextProvider } from "./context/SocketContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </UserContextProvider>
);
