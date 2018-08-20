import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class FormInput extends Component {
    render() {
        const { disabled, input, label, meta, placeholder, type } = this.props;

        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    disabled={disabled}
                />
                {meta.touched && (meta.error && <span>{meta.error}</span>)}
            </FormGroup>
        );
    }
}

FormInput.propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

FormInput.defaultProps = {
    disabled: false,
    meta: {},
    placeholder: '',
};

export default FormInput;
