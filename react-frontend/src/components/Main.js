import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Dashboard from "./Dashboard" ;
import HomePage from "./HomePage";
import Groups from "./Groups";
import {Jumbotron} from 'react-bootstrap';
import About from "./About";

class Main extends Component {


    render() {

        return (

            <div>
                <Route exact path="/" render={() => (
                   <div>
                    <HomePage/>
                   </div>
                )}/>

                <Route exact path="/dashboard" render={() => (
                    <div>
                    <Dashboard/>
                    </div>
                )}/>

                <Route exact path="/Groups" render={() => (
                    <div>
                        <Groups/>
                    </div>
                )}/>

                <Route exact path="/About" render={() => (
                    <div>
                        <About/>
                    </div>
                )}/>
            </div>


        );

    }
}
export default withRouter(Main);