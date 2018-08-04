import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

export class StatsCard extends Component {
    render() {
        return (
            <div className="card card-stats">
                <div className="content">
                    <Row>
                        <Col xs={5}>
                            <div className="icon-big text-center icon-warning">
                                {this.props.bigIcon}
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className="numbers">
                                <p>{this.props.statsText}</p>
                                {this.props.statsValue}
                            </div>
                        </Col>
                    </Row>
                    <div className="footer">
                        <hr />
                        <div className="stats">
                            {this.props.statsIcon} {this.props.statsIconText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StatsCard.propTypes = {
    bigIcon: PropTypes.string,
    statsText: PropTypes.string,
    statsValue: PropTypes.string,
    statsIcon: PropTypes.string,
    statsIconText: PropTypes.string,
};

StatsCard.defaultProps = {
    bigIcon: '',
    statsText: '',
    statsValue: '',
    statsIcon: '',
    statsIconText: '',
};

export default StatsCard;
