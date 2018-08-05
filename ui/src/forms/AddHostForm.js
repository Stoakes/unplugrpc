import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import { FormInput } from '../components/FormInput/FormInput.js';
import Button from '../components/CustomButton/CustomButton.js';

const required = value =>
    value || typeof value === 'number' ? undefined : 'Required';

let AddHost = props => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <Row>
                <Col md={4} sm={4} xs={12}>
                    <Field
                        name="name"
                        id="name"
                        component={FormInput}
                        type="text"
                        label="Label"
                        placeholder="(Optional) A nice name for your host"
                    />
                </Col>
                <Col md={4} sm={4} xs={12}>
                    <Field
                        name="host"
                        id="host"
                        component={FormInput}
                        type="text"
                        label="Host"
                        placeholder="Address of your host"
                        validate={required}
                    />
                </Col>
                <Col md={4} sm={4} xs={12}>
                    <Field
                        name="port"
                        id="port"
                        component={FormInput}
                        type="number"
                        label="Port"
                        placeholder="Port of the gRPC service"
                        validate={required}
                    />
                </Col>
            </Row>
            <br />
            <Button bsStyle="success" fill type="submit">
                Add Host
            </Button>
        </form>
    );
};

AddHost.propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default reduxForm({ form: 'addHost' })(AddHost);
