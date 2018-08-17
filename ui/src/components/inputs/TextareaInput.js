import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class TextareaInput extends Component {
    render() {
        const { placeholder, rows, input, label } = this.props;

        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    rows={rows}
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                />
            </FormGroup>
        );
    }
}

TextareaInput.propTypes = {
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    input: PropTypes.object,
    label: PropTypes.string,
};

TextareaInput.defaultProps = {
    placeholder: '',
    rows: 10,
};

export default TextareaInput;
