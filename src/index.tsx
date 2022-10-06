import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard!</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>This page is about me!</h1>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
      <Outlet />
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    {/* Step 3. Inside the <BrowserRouter>, use the <Routes> component in which we can define all our individual <Route>'s*/}
    <Routes>
      {/* Step 4. Define the individual <Route>'s */}
      <Route path="/" element={<App />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
