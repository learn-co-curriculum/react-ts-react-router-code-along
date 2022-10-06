import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
