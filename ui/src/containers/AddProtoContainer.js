
import {connect} from "react-redux"
import View from "../views/AddProto"
// import {addProto} from "../actions/proto";

function mapStateToProps(state, ownProps) {
    return {
        params: ownProps.params
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addProto: (formValues) => {
            // TODO form values checks
            fetch(process.env.REACT_APP_API_URL + '/new', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: [encodeURIComponent('protoName')+'='+encodeURIComponent(formValues.protoName),
                encodeURIComponent('proto')+'='+encodeURIComponent(formValues.proto)]
                .join('&'),
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log('response', responseJson)
            })
            .catch((error) => {
                console.error(error)
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
