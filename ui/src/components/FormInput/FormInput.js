import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class FormInput extends Component {
    render() {
        const { placeholder, type, input, label, meta } = this.props;

        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                />
                {meta.touched && (meta.error && <span>{meta.error}</span>)}
            </FormGroup>
        );
    }
}

FormInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
};

FormInput.defaultProps = {
    placeholder: '',
    meta: {},
};

export default FormInput;
