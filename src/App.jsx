import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import AppLayout from './components/AppLayout';
import PrivateRoute from './components/PrivateRoute';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { pages } from './pages/pages';
import CampaignDetail from './pages/CampaignDetail';
import { Button, BackTop } from 'antd';
import { UpOutlined } from '@ant-design/icons';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <AppLayout>
                        {/* <ScrollToTop /> */}
                        <Route path="/" exact component={Home} />
                        <Route path="/sign-in" exact component={SignIn} />
                        <Route path="/campaign/:id" exact component={CampaignDetail} />
                        <Switch>
                            {pages.map(p => (
                                <PrivateRoute {...p} key={p.id} />
                            ))}
                        </Switch>
                        <BackTop>
                            <Button className="btn-back-top" icon={<UpOutlined />} shape="circle" />
                        </BackTop>
                    </AppLayout>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
