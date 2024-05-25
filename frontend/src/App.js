import "./App.css";
import HospitalList from "./components/hospitalList";
import TriageChat from "./components/traigeChat";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <HospitalList />
          </div>
          <div className="w-full md:w-2/3">
            <TriageChat />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
