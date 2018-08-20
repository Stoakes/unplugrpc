import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { SelectInput } from '../components/inputs/SelectInput';

let SelectHostForm = props => {
    return (
        <Field
            name="host"
            id="host"
            component={SelectInput}
            label="Select an host"
        >
            <option />
            {props.hosts.map(host => {
                return (
                    <option
                        value={`${host.host}:${host.port}`}
                        key={`${host.host}:${host.port}`}
                    >
                        {host.name}
                    </option>
                );
            })}
        </Field>
    );
};

SelectHostForm.propTypes = {
    hosts: PropTypes.array,
};

SelectHostForm.defaultProps = {
    hosts: [],
};

export default reduxForm({ form: 'selectHost' })(SelectHostForm);
