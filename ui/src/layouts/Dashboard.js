import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotificationSystem from '../containers/NotificationSystemContainer';

import Header from '../components/themes/Header';
import Footer from '../components/themes/Footer';
import Sidebar from '../components/themes/Sidebar';

import dashboardRoutes from '../routes/dashboard.js';

class Dashboard extends Component {
    componentDidUpdate(e) {
        if (
            window.innerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf('nav-open') !== -1
        ) {
            document.documentElement.classList.toggle('nav-open');
        }
        if (e.history.action === 'PUSH') {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
        }
    }
    render() {
        return (
            <div className="wrapper">
                <NotificationSystem
                    ref={c => {
                        this.notificationSystem = c;
                    }}
                />
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel">
                    <Header {...this.props} />
                    <Switch>
                        {dashboardRoutes.map((prop, key) => {
                            if (prop.redirect)
                                return (
                                    <Redirect
                                        from={prop.path}
                                        to={prop.to}
                                        key={key}
                                    />
                                );
                            return (
                                <Route
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}
                    </Switch>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Dashboard;
