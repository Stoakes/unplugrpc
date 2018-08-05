import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

import { Card } from '../components/Card/Card.js';

class Dashboard extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <Card
                                title="UnplugRPC"
                                category="Making your gRPC endpoints accessible"
                            >
                                <div>
                                    <Alert bsStyle="warning">
                                        <strong>Warning</strong> This version is
                                        under development.
                                    </Alert>
                                    <h3>How to use UnplugRPC</h3>
                                    <p>
                                        Add your protofile, and then use them.
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
