import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export class FormInput extends Component {
  render () {

    const { placeholder, type, input, label} = this.props;

    return (
      <FormGroup controlId={input.name}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
      </FormGroup>
    );
  }
}

export default FormInput;
