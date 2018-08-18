import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Card extends Component {
    render() {
        return (
            <div className={'card' + (this.props.plain ? ' card-plain' : '')}>
                {this.props.title !== '' || this.props.category !== '' ? (
                    <div
                        className={
                            'header' +
                            (this.props.hCenter ? ' text-center' : '')
                        }
                    >
                        <h4 className="title">{this.props.title}</h4>
                        <p className="category">{this.props.category}</p>
                    </div>
                ) : (
                    ''
                )}
                <div
                    className={
                        'content' +
                        (this.props.ctAllIcons ? ' all-icons' : '') +
                        (this.props.ctTableFullWidth
                            ? ' table-full-width'
                            : '') +
                        (this.props.ctTableResponsive
                            ? ' table-responsive'
                            : '') +
                        (this.props.ctTableUpgrade ? ' table-upgrade' : '')
                    }
                >
                    {this.props.children}

                    {this.props.legend !== '' ? (
                        <div className="footer">
                            {this.props.legend}
                            {this.props.stats != null ? <hr /> : ''}
                            <div className="stats">
                                <i className={this.props.statsIcon} />{' '}
                                {this.props.stats}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    plain: PropTypes.string,
    hCenter: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    ctAllIcons: PropTypes.string,
    ctTableFullWidth: PropTypes.string,
    ctTableResponsive: PropTypes.string,
    ctTableUpgrade: PropTypes.string,
    legend: PropTypes.string,
    stats: PropTypes.string,
    statsIcon: PropTypes.string,
};

Card.defaultProps = {
    plain: '',
    hCenter: '',
    title: '',
    category: '',
    ctAllIcons: '',
    ctTableFullWidth: '',
    ctTableResponsive: '',
    ctTableUpgrade: '',
    legend: '',
    stats: '',
    statsIcon: '',
};

export default Card;
