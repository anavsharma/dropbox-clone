import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import { withRouter } from 'react-router-dom';
import {getData,fileDelete} from '../actions/index';
import {connect} from 'react-redux';

import {Panel,
    Accordion,
    Jumbotron,
    Button,
    ButtonToolbar,
    OverlayTrigger,
    Popover,
    FormGroup,
    FormControl} from 'react-bootstrap';





class UserDetails extends Component {
    render() {
        return (
            <div>
                Welcome to the Dropbox : {this.props.userdata.username}
            </div>

        );
    }
}

function mapStateToProps(userdata) {
    return {userdata};
}


export default connect(mapStateToProps)(UserDetails)