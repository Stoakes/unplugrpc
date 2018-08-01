import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput } from "components/FormInput/FormInput.js";
import { TextareaInput } from "components/FormInput/TextareaInput.js";
import Button from "components/CustomButton/CustomButton.js";

let AddProto = props => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      <Field name="name" id="name" 
            component={FormInput} type="text" label="Protofile name" 
            placeholder= "A nice name for your protofile" />
      <Field name="proto" id="proto" 
        component={TextareaInput} label="Textarea" 
        placeholder= "Your protofile content" rows={20}/>
      <br/>
      <Button bsStyle="success" fill type="submit">
        Add protofile
      </Button>
    </form>
  )
}

export default reduxForm({form: 'addProto'})(AddProto)