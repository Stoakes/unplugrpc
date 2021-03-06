import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from '../components/themes/Card.js';
import AddProtoForm from '../forms/AddProtoForm';

class View extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card title="Add a Protofile">
                                <div>
                                    <AddProtoForm
                                        onSubmit={values => {
                                            this.props.addProto(values);
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

View.propTypes = {
    addProto: PropTypes.func,
};

export default View;
