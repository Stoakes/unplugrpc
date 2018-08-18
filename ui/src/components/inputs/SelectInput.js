import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class SelectInput extends Component {
    render() {
        const { placeholder, input, label, meta } = this.props;

        return (
            <FormGroup controlId={input.name}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
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
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    placeholder: PropTypes.string,
};

SelectInput.defaultProps = {
    children: '',
    meta: {},
    placeholder: '',
};

export default SelectInput;
