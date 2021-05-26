import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import AppLayout from './components/AppLayout';
import PrivateRoute from './components/PrivateRoute';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import { pages } from './pages/pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AppLayout>
          {/* <ScrollToTop /> */}
          <Route path="/" exact component={Home} />
          <Switch>
            {pages.map(p => (
              <PrivateRoute {...p} key={p.id} />
            ))}
          </Switch>
        </AppLayout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
