import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API'
import { withRouter } from 'react-router-dom';
import {getData, fileDelete, handleFolder,folderDelete,getGroups,addGroup,deleteGroup} from '../action/index';
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
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'




class Groups extends Component{
    componentWillMount(){
        console.log("Groups component mounted");
        API.checkSession().then((status)=>{
            if(status===201){
                console.log("the session is on");
                API.getGroups().then((data)=> {
                    console.log("The state of the groups about to change");
                    this.props.getGroups(data);

                })
            }
            else {
                this.props.history.push("/")
            }
        })
    }

    logout = () => {
        console.log("inside logout function");
        API.doLogout().then((status)=>{
            if(status===201){
                this.props.history.push("/");
            }
        })
    }

    state= {
        groupName:null,
        member:''
    }

    createGroup(data){
        console.log("inside the group creation");
      var payload = {
         groupname : data
      }
     API.createGroup(payload).then((status)=>{
          if (status===201){
              console.log("Group created and added in the database");
              payload =  {
                  groupname : data ,
                  members: [this.props.userdata.username],
                  owner : this.props.userdata.username,
                  files:[],
                  folder:[]
              }
              this.props.addGroup(payload);
          }
     })
    }


    addMember(member ,groupname){
        console.log("****************************");
        console.log(member ,"+++++++" , groupname);
        var payload = {
            member:member,
            groupname:groupname
        }
        var data = {shareUsername : member}

        API.validateUser(data).then((status)=>{

            if(status===201){

                API.addMember(payload).then((status)=>{
                    if (status===201){
                        console.log("Adding member success full ");

                    }
                })

            }
            else {
                console.log("Username is not valid");
            }

        })
    }

    deleteGroup(groupname,index){
        console.log("I am inside the delete group function");
        var payload = {
            groupname: groupname
        }
        API.deleteGroup(payload).then((status)=>{
            if (status===201){
                console.log("Group deleted from the database ");
                this.props.deleteGroup(index);


            }
        })
    }

    myComponent(){
     return(   <VisibilitySensor>
            <Img className= "size" src='https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg'/>
        </VisibilitySensor>);
    }
    rendermembers(group){
        return group.members.map((member,index)=>{
            return(<Accordion>
                <Panel header={member} eventKey={index} key={index}>
                    <ButtonToolbar>
                        <Button
                            bsStyle="danger"
                        >
                            Delete
                        </Button>
                    </ButtonToolbar>
                </Panel>
            </Accordion>);
        });
    }
    renderListGroups(){

        if(this.props.userdata.groups.length===0){
            return(<h4>You have no Groups</h4>);
        }
        else {
            return this.props.userdata.groups.map((group, index) => {
                return (
                    <Accordion>
                        <Panel collapsible header={group.groupname}
                               key={index}
                               eventKey={index}
                               bsStyle="primary"
                        >   <h4>Members</h4>
                            {this.rendermembers(group)}
                            <ButtonToolbar>
                                <Button
                                    bsStyle="danger"
                                    onClick={()=>{this.deleteGroup(group.groupname,index)}}
                                >
                                    Delete
                                </Button>

                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                    <Popover id="popover-trigger-click-root-close" title="Add Files">
                                        <form>
                                            <FormGroup
                                                controlId="formBasicText"
                                            >
                                                <FormControl
                                                    type="text"
                                                    value={this.state.member}
                                                    placeholder="Enter Member's Name"
                                                    onChange={(event) => {
                                                        this.setState({member: event.target.value});
                                                    }}

                                                />

                                                <Button
                                                    bsStyle="primary"
                                                    onClick={()=>{this.addMember(this.state.member,group.groupname )}}
                                                    active>
                                                    Add
                                                </Button>

                                            </FormGroup>
                                        </form>
                                    </Popover>
                                }>
                                    <Button
                                        bsStyle="primary"
                                        active>
                                        Add Member
                                    </Button>


                                </OverlayTrigger>
                                <Button
                                    bsStyle="primary"
                                    active>
                                    Add File
                                </Button>

                            </ButtonToolbar>
                        </Panel>
                    </Accordion>

                );

            });

        }
    }
    render () {
        return (
            <div className="row">

                <div className="col-md-4">

                    <div>
                        <div>
                            <ul className="sidebar-nav">
                                <li>
                                    <a href="#">
                                        <h2>Dropbox</h2>
                                        {this.myComponent()}
                                    </a>
                                </li>
                                <br/>
                                <br/>

                                <li>
                                   <h3>Groups</h3>
                                </li>

                                <li>
                                    <a href="/dashboard"><h3>Dashboard</h3></a>
                                </li>
                                <li>
                                        <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                            <Popover id="popover-trigger-click-root-close" title="Group Name">
                                                <form>
                                                    <FormGroup
                                                        controlId="formBasicText"
                                                    >
                                                        <FormControl
                                                            type="text"
                                                            value={this.state.groupName}
                                                            placeholder="Enter Group Name"
                                                            onChange={(event) => {
                                                                this.setState({groupName: event.target.value});
                                                            }}
                                                        />

                                                        <Button
                                                            bsStyle="primary"
                                                            onClick={()=>{this.createGroup(this.state.groupName)}}
                                                            active>
                                                            create
                                                        </Button>

                                                    </FormGroup>
                                                </form>
                                            </Popover>
                                        }>
                                        <h3>Create a group</h3>
                                        </OverlayTrigger>
                                </li>
                                <li>
                                    <a href=""><h3>Logs</h3></a>
                                </li>
                                <li>
                                    <a href="/About"><h3>About</h3></a>
                                </li>
                                <li>
                                    <a href=""><h3>Contact</h3></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                  <div className="col-md-3">
                      <br/>
                      <br/>
                          <h2>Groups</h2>
                          <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      {this.renderListGroups()}

                  </div>
                <div className="col-md-5">
                    <br/>
                    <Button
                        bsStyle="danger"
                        onClick={()=>{this.logout()}}
                    >
                        logout
                    </Button>
                </div>

            </div>
        );
    }
}

function mapStateToProps(userdata) {
    return {userdata};
}



function mapDispatchToProps(dispatch) {
    return {
        getData : (data) => dispatch(getData(data)),
        fileDelete : (data) => dispatch(fileDelete(data)),
        handleFolder : (data) => dispatch(handleFolder(data)),
        folderDelete : (data) => dispatch(folderDelete(data)),
        getGroups : (data) => dispatch(getGroups(data)),
        addGroup : (data) => dispatch(addGroup(data)),
        deleteGroup : (data) => dispatch(deleteGroup(data))
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups));
