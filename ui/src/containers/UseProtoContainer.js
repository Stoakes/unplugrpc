import { connect } from 'react-redux';

import View from '../views/UseProto';
import { addHosts, selectHost } from '../actions/hosts';
import {
    setResponse,
    selectMethod,
    selectPackage,
    selectService,
} from '../actions/proto';
import { addNotification } from '../actions/notifications';
import { setPackages, setSelectedPackage } from '../actions/packages';

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.params,
        response: state.app.proto.response,
        hosts: state.app.hosts,
        call: state.app.proto.call,
        packages: state.app.proto.packages,
        selectedPackage: state.app.proto.selectedPackage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHosts: () => {
            fetch(`${process.env.REACT_APP_API_URL}/hosts`)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.length > 0) {
                        dispatch(addHosts(responseJson));
                    }
                });
        },
        fetchPackages: () => {
            fetch(`${process.env.REACT_APP_API_URL}/packages`)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.length > 0) {
                        dispatch(setPackages(responseJson));
                    }
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
        selectHost: formValues => {
            if (formValues && formValues.host !== undefined) {
                const data = formValues.host.split(':');
                dispatch(selectHost(data[0], data[1]));
            }
        },
        selectMethod: (formValues, callParameters) => {
            if (formValues.package !== callParameters.package) {
                dispatch(selectPackage(formValues.package));
                fetch(
                    `${process.env.REACT_APP_API_URL}/packages/${
                        formValues.package
                    }`
                )
                    .then(response => response.json())
                    .then(responseJson => {
                        dispatch(setSelectedPackage(responseJson));
                    })
                    .catch(error =>
                        dispatch(
                            addNotification({
                                message: error.message,
                                level: 'error',
                            })
                        )
                    );
            }
            if (formValues.service !== callParameters.service) {
                dispatch(selectService(formValues.service));
            }
            if (formValues.method !== callParameters.method) {
                dispatch(selectMethod(formValues.method));
            }
        },
        submit: (callParameters, formValues) => {
            fetch(
                `${process.env.REACT_APP_API_URL}/api/${
                    callParameters.package
                }.${callParameters.service}/${callParameters.method}/`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Host': callParameters.host,
                    },
                    body: JSON.stringify(formValues),
                }
            )
                .then(response => response.json())
                .then(responseJson => {
                    dispatch(setResponse(responseJson));
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
