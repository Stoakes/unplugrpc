import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import indexRoutes from './routes';
import appReducer from './reducers/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/css/light-bootstrap-dashboard.css';

const reducer = combineReducers({
    app: appReducer,
    form: formReducer,
});

const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return (
                        <Route
                            to={prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                })}
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
