import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class SelectInput extends Component {
    render() {
        const { disabled, input, label, meta, placeholder } = this.props;
        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    disabled={disabled}
                >
                    {this.props.children}
                </FormControl>
                {meta.touched && (meta.error && <span>{meta.error}</span>)}
            </FormGroup>
        );
    }
}

SelectInput.propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    placeholder: PropTypes.string,
};

SelectInput.defaultProps = {
    children: '',
    disabled: false,
    meta: {},
    placeholder: '',
};

export default SelectInput;
