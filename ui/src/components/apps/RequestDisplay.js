import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display a request object for a gRPC method
 */
class RequestDisplay extends React.Component {
    /**
     * Remove all attributes which value is {}, [] or null
     */
    reduceInput = input => {
        let cloneInput = JSON.parse(JSON.stringify(input));
        for (const key in cloneInput) {
            if (
                cloneInput[key] === null ||
                (Object.keys(cloneInput[key]).length === 0 &&
                    cloneInput[key].constructor === Object) ||
                (Array.isArray(cloneInput[key]) && cloneInput[key].length === 0)
            ) {
                delete cloneInput[key];
            }
            if (key === 'fields') {
                for (const index in cloneInput['fields']) {
                    const field = cloneInput['fields'][index];
                    for (const nKey in field) {
                        if (
                            field[nKey] === null ||
                            (Object.keys(field[nKey]).length === 0 &&
                                field[nKey].constructor === Object) ||
                            (Array.isArray(field[nKey]) &&
                                field[nKey].length === 0)
                        ) {
                            delete field[nKey];
                        }
                    }
                }
            }
        }
        return JSON.stringify(cloneInput, null, 2);
    };

    render() {
        return (
            <div>
                <label>Request</label>
                <pre>
                    {this.props.selectedMethod &&
                    this.props.selectedMethod.method !== undefined &&
                    this.props.selectedMethod.method.client_streaming ? (
                        <span style={{ color: 'green' }}>
                            # Stream of
                            <br />
                        </span>
                    ) : (
                        ''
                    )}
                    {this.props.selectedMethod &&
                        this.props.selectedMethod.input !== undefined &&
                        this.reduceInput(this.props.selectedMethod.input)}
                </pre>
            </div>
        );
    }
}

RequestDisplay.propTypes = {
    selectedMethod: PropTypes.object,
};

export default RequestDisplay;
