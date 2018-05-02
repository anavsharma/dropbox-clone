import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
class SignUp extends Component {

    static propTypes = {
        handleRegister: PropTypes.func.isRequired,
        loginSignUp : PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: '',
        email : '',
        name:''

    };

    componentWillMount(){

    }

    render() {
        return (

            <div className="row justify-content-md-center">
                <div>
                    <form>
                        <div className="form-group">
                            <h1>SignUp</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="name"
                                placeholder="Enter Name"
                                value={this.state.name}
                                onChange={(event) => {
                                    this.setState({
                                        name: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <Button
                                bsStyle="primary"
                                onClick={() => this.props.handleRegister(this.state)}>
                                Register
                            </Button>
                            <img className="sizespace" src= "https://cfl.dropboxstatic.com/static/images/icons/icon_spacer-vflN3BYt2.gif" />
                            <Button
                                bsStyle="success"
                                onClick={() => this.props.loginSignUp("SignIn")}>
                                SignIn
                            </Button>
                        </div>
                    </form>
                </div>
            </div>


        );
    }
}

export default SignUp;