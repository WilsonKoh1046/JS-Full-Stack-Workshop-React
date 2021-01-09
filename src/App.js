import './App.css';
import NavBar from './components/NavBar';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      {/* -- nav bar -- */}
      <NavBar />
      {/* -- end of nav bar -- */}
      <Main />
    </div>
  );
}

export default App;
