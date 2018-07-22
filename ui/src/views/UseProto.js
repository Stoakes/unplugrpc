import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.js";

class UseProto extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Use Protofile"
              />
            </Col>
            <Col md={4}>
              
            </Col>
          </Row>
        </Grid>>
      </div>
    );
  }
}

export default UseProto;
