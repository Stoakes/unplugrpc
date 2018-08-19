import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class TextareaInput extends Component {
    render() {
        const { disabled, input, label, placeholder, rows } = this.props;

        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    rows={rows}
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    disabled={disabled}
                />
            </FormGroup>
        );
    }
}

TextareaInput.propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
};

TextareaInput.defaultProps = {
    disabled: false,
    placeholder: '',
    rows: 10,
};

export default TextareaInput;
