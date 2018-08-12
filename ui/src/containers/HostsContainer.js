import { connect } from 'react-redux';

import View from '../views/Hosts';
import { addHost, addHosts, removeHost } from '../actions/hosts';
import { addNotification } from '../actions/notifications';

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.params,
        hosts: state.app.hosts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addHost: formValues => {
            fetch(`${process.env.REACT_APP_API_URL}/hosts`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(addNotification(responseJson));
                    dispatch(addHost(formValues));
                })
                .catch(error =>
                    dispatch(
                        addNotification({
                            message: error.message,
                            level: 'error',
                        })
                    )
                );
        },
        fetchHosts: () => {
            fetch(`${process.env.REACT_APP_API_URL}/hosts`)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.length > 0) {
                        dispatch(addHosts(responseJson));
                    }
                });
        },
        deleteHost: (host, port) => {
            fetch(`${process.env.REACT_APP_API_URL}/hosts/${host}:${port}`, {
                method: 'delete',
            })
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(addNotification(responseJson));
                    dispatch(removeHost(host, port));
                });
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
