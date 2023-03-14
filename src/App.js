import logo from './logo.svg';
import Calculator from './components/Calculator'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App mt-4">
      <div className='d-flex justify-content-center'>
        <img class='react-logo' src={logo} alt='react-logo'/>
        <div className='d-flex'>
          <h1 className='mt-auto mb-4'>React calculator</h1>
        </div>
      </div>
      <Calculator />
    </div>
  );
}

export default App;
