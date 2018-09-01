import { connect } from 'react-redux';
import { change } from 'redux-form';

import View from '../views/UseProto';
import { addHosts, selectHost } from '../actions/hosts';
import {
    setResponse,
    selectMethod,
    selectPackage,
    selectService,
    setSelectedMethod,
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
        selectedMethod: state.app.proto.selectedMethod,
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
                // Try to fetch method details
                fetch(
                    `${process.env.REACT_APP_API_URL}/${
                        callParameters.package
                    }.${callParameters.service}/${formValues.method}/`
                )
                    .then(response => response.json())
                    .then(responseJson => {
                        // store method details in store
                        dispatch(setSelectedMethod(responseJson));
                        // set Textarea helper text
                        setHelperText(responseJson, dispatch);
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
        },
        submit: (callParameters, formValues) => {
            fetch(
                `${process.env.REACT_APP_API_URL}/${callParameters.package}.${
                    callParameters.service
                }/${callParameters.method}/`,
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

function setHelperText(responseJson, dispatch) {
    const intTypes = [
        'int32',
        'int64',
        'uint32',
        'uint64',
        'sint32',
        'sint64',
        'fixed32',
        'fixed64',
    ];
    if (
        responseJson &&
        responseJson.input !== undefined &&
        responseJson.input.fields !== undefined
    ) {
        const helpText = `{${responseJson.input.fields.map(field => {
            const typeText =
                field.type === 'string'
                    ? `""`
                    : field.type === 'bool'
                        ? `false`
                        : field.type === 'double' || field.type === 'float'
                            ? 0.0
                            : intTypes.indexOf(field.type) !== -1
                                ? 0
                                : `${field.type}`;
            return `\n"${field.name}": ${typeText}`;
        })}\n}`;
        dispatch(change('useProto', 'message', helpText));
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
