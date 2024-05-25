import "./App.css";
import HospitalList from "./components/hospitalList";
import TriageChat from "./components/traigeChat";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex">
          <div className="max-w-200">
            <HospitalList />
          </div>
          <TriageChat />
        </div>
      </header>
    </div>
  );
}

export default App;
