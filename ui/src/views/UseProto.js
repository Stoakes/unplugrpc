import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../components/themes/Card';
import SelectMethodForm from '../forms/SelectMethodForm';
import UseProtoForm from '../forms/UseProtoForm';
import SelectHostForm from '../forms/SelectHostForm';

class View extends Component {
    componentDidMount() {
        this.props.fetchHosts();
        this.props.fetchPackages();
    }
    render() {
        const callParameters = this.props.call;
        let methods = [];
        if (
            this.props.selectedPackage.schema !== undefined &&
            this.props.call.service !== ''
        ) {
            const services = this.props.selectedPackage.schema.services.filter(
                s => s.name === this.props.call.service
            );
            if (services.length === 1) {
                methods = services[0].methods;
            }
        }

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <SelectHostForm
                                    onChange={value => {
                                        this.props.selectHost(value);
                                    }}
                                    hosts={this.props.hosts}
                                />
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <SelectMethodForm
                                    onChange={value => {
                                        this.props.selectMethod(
                                            value,
                                            callParameters
                                        );
                                    }}
                                    callParameters={callParameters}
                                    methods={methods}
                                    packages={this.props.packages}
                                    services={
                                        this.props.selectedPackage.schema !==
                                        undefined
                                            ? this.props.selectedPackage.schema
                                                  .services
                                            : []
                                    }
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Card>
                        <UseProtoForm
                            onSubmit={values => {
                                this.props.submit(callParameters, values);
                            }}
                            callParameters={callParameters}
                            selectedMethod={this.props.selectedMethod}
                        />
                    </Card>
                    <Card>
                        <label>Response</label>
                        <pre>
                            {JSON.stringify(this.props.response, null, 2)}
                        </pre>
                    </Card>
                </Grid>
            </div>
        );
    }
}

View.propTypes = {
    call: PropTypes.object,
    fetchHosts: PropTypes.func,
    fetchPackages: PropTypes.func,
    hosts: PropTypes.array,
    packages: PropTypes.array,
    response: PropTypes.object,
    selectedMethod: PropTypes.object,
    selectedPackage: PropTypes.object,
    selectHost: PropTypes.func,
    selectMethod: PropTypes.func,
    submit: PropTypes.func,
};

View.defaultProps = {
    hosts: [],
    packages: [],
};

export default View;
