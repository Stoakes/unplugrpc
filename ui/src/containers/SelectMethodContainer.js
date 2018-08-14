import { connect } from 'react-redux';

import View from '../components/SelectMethod';
import { addNotification } from '../actions/notifications';
import { setPackages, setSelectedPackage } from '../actions/packages';
import { selectMethod, selectPackage } from '../actions/proto';

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.params,
        call: state.app.proto.call,
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
        selectPackage: pack => {
            dispatch(selectPackage(pack));
            fetch(`${process.env.REACT_APP_API_URL}/packages/${pack}`)
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
        },
        selectMethod: (service, method) => {
            dispatch(selectMethod(service, method));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
