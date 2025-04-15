import { MailOpen } from "lucide-react";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button>
        <MailOpen /> Login with Email
      </Button>
    </div>
  );
};

export default App;
