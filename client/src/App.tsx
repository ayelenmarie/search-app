import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list:query" component={List} />
      </Switch>
    </div>
  );
};

export default App;
