import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../components/themes/Card.js';
import SelectMethod from '../containers/SelectMethodContainer';
import UseProtoForm from '../forms/UseProtoForm';

class View extends Component {
    render() {
        const callParameters = {};
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={4}>
                            <Card title="Host" />
                        </Col>
                        <Col md={8}>
                            <SelectMethod />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <UseProtoForm
                                onSubmit={values => {
                                    this.props.submit(callParameters, values);
                                }}
                            />
                            <hr />
                            <pre>
                                {JSON.stringify(this.props.response, null, 2)}
                            </pre>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

View.propTypes = {
    response: PropTypes.object,
    submit: PropTypes.func,
};

export default View;
