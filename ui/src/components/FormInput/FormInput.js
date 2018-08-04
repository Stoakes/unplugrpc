import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class FormInput extends Component {
    render() {
        const { placeholder, type, input, label } = this.props;

        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                />
            </FormGroup>
        );
    }
}

FormInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
};

FormInput.defaultProps = {
    placeholder: '',
};

export default FormInput;
