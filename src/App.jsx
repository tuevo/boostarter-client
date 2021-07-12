import { UpOutlined } from '@ant-design/icons';
import { BackTop, Button } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import AppLayout from './components/AppLayout';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute';
import CampaignDetail from './pages/CampaignDetail';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import { pages } from './pages/pages';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp/SignUp';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <AppLayout>
                        {/* <ScrollToTop /> */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/sign-in" component={SignIn} />
                            <Route exact path="/sign-up" component={SignUp} />
                            <Route exact path="/campaign/:id" component={CampaignDetail} />
                            {pages.map(p => (
                                <PrivateRoute key={p.id} exact {...p} />
                            ))}
                            <Route exact path="/not-found" component={NotFound} />
                            <Route component={NotFound} />
                        </Switch>
                        <BackTop>
                            <Button className="btn-back-top" icon={<UpOutlined />} shape="circle" />
                        </BackTop>
                        <div className="elfsight-app-b79df0b3-0e95-4167-a1cd-f5214781a392"></div>
                    </AppLayout>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
