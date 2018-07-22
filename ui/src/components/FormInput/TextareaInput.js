import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export class TextareaInput extends Component {
  render () {

    const { placeholder, rows, input, label} = this.props;

    return (
      <FormGroup controlId={input.name}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass="textarea" rows={rows} placeholder={placeholder} value={input.value} onChange={input.onChange} />
      </FormGroup>
    );
  }
}

export default TextareaInput;
