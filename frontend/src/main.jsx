import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContextProvider.jsx";
import { SocketContextProvider } from "./context/SocketContextProvider.jsx";
import { MessageContextProvider } from "./context/MessageContextProvider";
createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <SocketContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </SocketContextProvider>
  </UserContextProvider>
);
