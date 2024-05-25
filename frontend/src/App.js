import "./App.css";
import HospitalList from "./components/hospitalList";
import TriageChat from "./components/traigeChat";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <HospitalList />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <TriageChat />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
