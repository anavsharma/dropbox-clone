import {Button} from 'react-bootstrap';
import React, {Component} from 'react';

class Brand extends Component{
    componentWillMount(){
        console.log("Brand component mounted");
    }


    render () {
        var h1Style = {
            color: '#1866e7',
            fontSize: '28px',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
        };



        return (
            <div className="row">
            <div className="col-md-1">
            <h1 style={h1Style}>DropBox</h1>
            </div>
            </div>
        );
    }
}

export default Brand;