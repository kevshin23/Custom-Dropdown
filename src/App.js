import './App.css';
import Dropdown from './Dropdown';
import {states} from './enums';

function App() {
  return (
    <div className="container">
      <h1 style= {{textAlign: 'center'}}>
        Picking States
      </h1>
      <Dropdown title="Select State(s)" items={states} />
    </div>
  );
}

export default App;
