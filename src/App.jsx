import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import AppLayout from './components/AppLayout';
import 'antd/dist/antd.css';
import Home from './pages/Home/Home';
import { privatePages } from './pages/pages';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AppLayout>
          <Route path="/" exact component={Home} />
          <Switch>
            {privatePages.map(p => (
              <PrivateRoute {...p} key={p.id} />
            ))}
          </Switch>
        </AppLayout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
