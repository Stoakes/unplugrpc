import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import { FormInput } from '../components/FormInput/FormInput.js';
import { TextareaInput } from '../components/FormInput/TextareaInput.js';
import Button from '../components/CustomButton/CustomButton.js';

let AddProto = props => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <Row>
                <Col md={6} sm={6} xs={12}>
                    <Field
                        name="path"
                        id="path"
                        component={FormInput}
                        type="text"
                        label="Protofile path"
                        placeholder="Path to the file in the protofile storage folder. / accepted."
                    />
                </Col>
                <Col md={6} sm={6} xs={12}>
                    <Field
                        name="name"
                        id="name"
                        component={FormInput}
                        type="text"
                        label="Protofile name"
                        placeholder="A nice name for your protofile"
                    />
                </Col>
            </Row>
            <Field
                name="proto"
                id="proto"
                component={TextareaInput}
                label="Textarea"
                placeholder="Your protofile content"
                rows={20}
            />
            <br />
            <Button bsStyle="success" fill type="submit">
                Add protofile
            </Button>
        </form>
    );
};

AddProto.propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default reduxForm({ form: 'addProto' })(AddProto);
