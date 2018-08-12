import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Grid, Row, Table } from 'react-bootstrap';

import Card from '../components/Card/Card.js';
import AddHostForm from '../forms/AddHostForm.js';

class View extends Component {
    componentDidMount() {
        this.props.fetchHosts();
    }
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card title="Add a Host">
                                <div>
                                    <p>
                                        A host is a service you can connect to.
                                        Manage your list of hosts from here.
                                    </p>
                                    <AddHostForm
                                        onSubmit={values => {
                                            this.props.addHost(values);
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Card title="Hosts">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Host</th>
                                            <th>Port</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.hosts &&
                                            this.props.hosts.map(host => {
                                                return (
                                                    <tr
                                                        key={
                                                            host.host +
                                                            host.port
                                                        }
                                                    >
                                                        <td>{host.name}</td>
                                                        <td>{host.host}</td>
                                                        <td>{host.port}</td>
                                                        <td>
                                                            <Button
                                                                bsStyle="danger"
                                                                bsSize="small"
                                                                onClick={() =>
                                                                    this.props.deleteHost(
                                                                        host.host,
                                                                        host.port
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

View.propTypes = {
    addHost: PropTypes.func,
    fetchHosts: PropTypes.func,
    deleteHost: PropTypes.func,
    hosts: PropTypes.array,
};

View.defaultProps = {
    hosts: [],
};

export default View;
