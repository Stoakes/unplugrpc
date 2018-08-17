import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { TextareaInput } from '../components/inputs/TextareaInput.js';
import Button from '../components/themes/CustomButton.js';

let UseProto = props => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <Field
                name="message"
                id="message"
                component={TextareaInput}
                label="Message"
                placeholder="Your message"
                rows={15}
            />
            <br />
            <Button bsStyle="success" fill type="submit">
                Submit
            </Button>
        </form>
    );
};

UseProto.propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default reduxForm({ form: 'useProto' })(UseProto);
