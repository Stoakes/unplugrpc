import { connect } from 'react-redux';
import View from '../views/Hosts';

import { addHosts } from '../actions/hosts';

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.params,
        hosts: state.app.hosts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addHost: formValues => {
            fetch(process.env.REACT_APP_API_URL + '/hosts', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log('response', responseJson);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchHosts: () => {
            fetch(process.env.REACT_APP_API_URL + '/hosts').then(response => {
                if (response.length > 0) {
                    dispatch(addHosts(response));
                }
            });
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
