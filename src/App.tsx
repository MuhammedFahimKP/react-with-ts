import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";
function App() {
  // const eventHandler = (text: string) => console.log(text);

  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          <strong>My Alert</strong>
        </Alert>
      )}
      <Button onClick={() => setAlertVisibility(true)} color="danger">
        Hello Word
      </Button>
    </div>
  );
}

export default App;
