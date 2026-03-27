import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Navigate } from "react-router-dom";  

function App() {
  return (
    <div className="App">
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
