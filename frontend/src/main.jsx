import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ClerkProvider>
);
