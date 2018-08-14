import { connect } from 'react-redux';

import View from '../views/UseProto';
import { setResponse } from '../actions/proto';
import { addNotification } from '../actions/notifications';

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.params,
        response: state.app.proto.response,
        call: state.app.proto.call,
        packages: state.app.proto.package,
        selectedPackage: state.app.proto.selectedPackage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
