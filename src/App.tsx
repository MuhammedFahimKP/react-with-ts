// import ListGroup from "./components/ListGroup";
// import Button from "./components/Button";
import Like from "./components/Like";
import "bootstrap/dist/css/bootstrap.css";
// import { FaCalendar } from "react-icons/fa";
function App() {
  // const cities = ["Cochin", "Kozikode", "Trivandrum", "Kollam"];
  return (
    <div>
      <Like onClick={() => console.log("Hello")} />
    </div>
  );
}

export default App;
