import React, { Component,Fragment } from 'react'
import { BrowserRouter  as Router,Route,Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import  AlertTemplate from '../node_modules/react-alert-template-basic';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

import Login from './components/account/Login'
import Register from './components/account/Register';
import Home from './components/layout/Home';
import Dashboard from './components/layout/Dashboard';

import { loadUser } from './actions/auth';
const alertOptions = {
    timeout: 5000,
    position : "top right"
}

class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            {/* <Header />
                            <Alerts />
                            <div className='container'>
                                <div className='row'> */}
                                    <Switch>
                                        <Route exact path ='/' component={Home}></Route>
                                        <PrivateRoute path ='/home' component={Dashboard}></PrivateRoute>
                                        <Route exact path ='/register' component={Register}></Route>
                                        <Route path ='/login' component={Login}></Route>
                                    </Switch>
                                {/* </div>
                            </div> */}
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

export default App

