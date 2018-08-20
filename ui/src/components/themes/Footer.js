import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Grid fluid>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="https://github.com/Stoakes/unplugrpc">
                                    UnplugRPC on Github
                                </a>
                            </li>
                        </ul>
                    </nav>
                </Grid>
            </footer>
        );
    }
}

export default Footer;
