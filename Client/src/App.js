import './App.css';

import Login from './Login';
import Home from './Home';
import { Route, Link } from 'react-router-dom';
import Verify from './Verify';
import BookVaxx from './BookVaxx';
import Nav from './Nav';
import Preview from "./Preview";
import Vaccine from './Vaccine';
import BookedSlots from './BookedSlots';

function App() {
  return (
    <div className="App">
      <Route exact path="/bookedslots" component={BookedSlots} />
      <Route exact path="/bookvaxx" component={BookVaxx} />
      <Route exact path="/preview" component={Preview} />
      <Route exact path="/vaccine" component={Vaccine} />
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/verify" component={Verify} />
       
    </div>
  );
}

export default App;