import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Row } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import { TextareaInput } from '../components/inputs/TextareaInput.js';
import Button from '../components/themes/CustomButton.js';
import RequestDisplay from '../components/apps/RequestDisplay.js';

function canSubmit(callParameters) {
    return (
        callParameters !== undefined &&
        callParameters.host !== undefined &&
        callParameters.host !== '' &&
        callParameters.package !== undefined &&
        callParameters.package !== '' &&
        callParameters.service !== undefined &&
        callParameters.service !== '' &&
        callParameters.method !== undefined &&
        callParameters.method !== ''
    );
}

let UseProto = props => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <Row>
                <Col md={8}>
                    <Field
                        name="message"
                        id="message"
                        component={TextareaInput}
                        label="Message"
                        placeholder="Your message"
                        rows={15}
                        disabled={
                            props.callParameters.method === '' ? true : false
                        }
                    />
                    {props.selectedMethod &&
                    props.selectedMethod.method !== undefined &&
                    props.selectedMethod.method.client_streaming ? (
                        <Alert bsStyle="info">
                            This method expects a stream of objects, represented
                            here as an array. More details in the doc.
                        </Alert>
                    ) : (
                        ''
                    )}
                </Col>
                <Col md={4}>
                    <RequestDisplay selectedMethod={props.selectedMethod} />
                </Col>
            </Row>
            <Button
                bsStyle="success"
                fill
                type="submit"
                disabled={canSubmit(props.callParameters) ? false : true}
            >
                Submit
            </Button>
        </form>
    );
};

UseProto.propTypes = {
    callParameters: PropTypes.object,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    selectedMethod: PropTypes.object,
};

export default reduxForm({ form: 'useProto' })(UseProto);
