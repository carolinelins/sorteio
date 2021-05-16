import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Configure from './Configuration'
import Result from './Result'

function App() {
  return (
    <div id="root">
      <Router>
        <Switch>
          <Route path="/" exact component={Configure} />
          <Route path="/result" component={Result} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
