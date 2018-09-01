import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import { SelectInput } from '../components/inputs/SelectInput';

let SelectMethod = props => {
    return (
        <Row>
            <Col md={4} sm={4} xs={12}>
                <Field
                    name="package"
                    id="package"
                    component={SelectInput}
                    type="text"
                    label="Package"
                >
                    <option />
                    {props.packages.map(pack => {
                        return (
                            <option value={pack.name} key={pack.name}>
                                {pack.name}
                            </option>
                        );
                    })}
                </Field>
            </Col>
            <Col md={4} sm={4} xs={12}>
                <Field
                    name="service"
                    id="service"
                    component={SelectInput}
                    type="text"
                    label="Service"
                    disabled={
                        props.callParameters !== undefined &&
                        props.callParameters.package !== undefined &&
                        props.callParameters.package !== ''
                            ? false
                            : true
                    }
                >
                    <option />
                    {props.services.map(service => {
                        return (
                            <option value={service.name} key={service.name}>
                                {service.name}
                            </option>
                        );
                    })}
                </Field>
            </Col>
            <Col md={4} sm={4} xs={12}>
                <Field
                    name="method"
                    id="method"
                    component={SelectInput}
                    type="text"
                    label="Method"
                    disabled={
                        props.callParameters !== undefined &&
                        props.callParameters.service !== undefined &&
                        props.callParameters.service !== ''
                            ? false
                            : true
                    }
                >
                    <option />
                    {props.methods.map(method => {
                        return (
                            <option
                                value={method.name}
                                key={method.name}
                                disabled={
                                    method.client_streaming &&
                                    method.server_streaming
                                }
                            >
                                {method.name}
                            </option>
                        );
                    })}
                </Field>
            </Col>
        </Row>
    );
};

SelectMethod.propTypes = {
    callParameters: PropTypes.object,
    methods: PropTypes.array,
    packages: PropTypes.array,
    services: PropTypes.array,
};

SelectMethod.defaultProps = {
    methods: [],
    packages: [],
    services: [],
};

export default connect(state => ({ initialValues: state.app.proto.call }))(
    reduxForm({ form: 'selectMethod' })(SelectMethod)
);
