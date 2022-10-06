import ReactDOM from "react-dom";
import "./index.css";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard!</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
