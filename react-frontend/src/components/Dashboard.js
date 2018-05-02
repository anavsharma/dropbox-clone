import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import Brand from './Brand';
import UserDetails from './UserDetails';
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'



import { withRouter } from 'react-router-dom';
import {getData, fileDelete, handleFolder,folderDelete,star} from '../action/index';
import {connect} from 'react-redux';

import {Panel,
       Accordion,
       Jumbotron,
        Button,
        ButtonToolbar,
        OverlayTrigger,
        Popover,
        FormGroup,
        FormControl,
        Glyphicon,
        Addon} from 'react-bootstrap';
 
class Dashboard extends Component {

    componentWillMount(){

         console.log("Inside component will mount");
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        console.log(payload);
        console.log("payload for upload");
        API.uploadFile(payload)
            .then((status) => {
                if (status === 201) {
                    console.log("upload successfull , calling get Images");
                    API.getImages()
                        .then((data) => {
                           this.props.getData(data);
                        });
                }
            });

    };
    handleDelete = (data,index) =>{
   console.log(data);
        API.deleteFile(data).then((status)=>
        {

            if(status===201){
                console.log("inside here after delete");
                this.props.fileDelete(index);
            }
        })
    };

    myComponent(){
        return(   <VisibilitySensor>
            <Img className= "size" src='https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg'/>
        </VisibilitySensor>);
    }
   
    logout = () => {
        console.log("inside logout function");
        API.doLogout().then((status)=>{
            if(status===201){
                this.props.history.push("/");
            }
        })
    }
    componentDidMount() {
        console.log("componentDidMount function");
         };
    state={
        shareUsername:'',
        foldername:''


    }

    handlefolder(data){
        console.log("inside folder creation");
         var test ={folder: "UserFiles/"+this.props.userdata.username+"/"+data}
         console.log(test);
        API.uploadFolder(test).then((status)=>
        {
            if(status===201){
                this.props.handleFolder(test);
            }
            else{
                console.log("error while uploading");
            }
        })
    }

    deleteFolder(data,index){
        console.log("inside delete folder thingy");
        console.log(data);
        var payload = {folder: data}
        API.deleteFolder(payload).then((status)=>{
            if(status===201){
                console.log("folder deleted from the database");
                this.props.folderDelete(index);


            }
        })


    }

    validate(username,file){
        console.log("inside validate user in dashboard");
            const data = {
                'shareUsername':username
            }
            const payload = {
                'shareUsername': this.state.shareUsername,
                'img' : file
            }
            API.validateUser(data).then((status)=>{
           if(status===201) {

               console.log("correct username");
               API.share(payload).then((status)=>
               {
                   if(status===201){
                       console.log("file shared succesfully");
                   }else{
                       console.log("unable to share");
                   }
               }).catch((error)=>{
                   console.log(error);
               })
           }


           else{
               console.log("Username doesnot exist");
           }
        }).catch((error) => {
            console.log("Error Occured while checking the username")
        })

    }


    Panelheader(file,index){
    var star;
console.log(file);
    if(file.starred ===true){
        star = "star"
    }
    else {
        star = "star-empty"
    }
        return(<div>
        <h5><Glyphicon glyph={star}
            onClick={()=>{
                console.log("the star is clicked");
                this.props.star(index)}}
        />{file.filename}</h5>
    </div>);}

    renderListFiles(){

        if(this.props.userdata.files.length===0){
            return(<h4>You have no Files...</h4>);
        }
        else {
            return this.props.userdata.files.map((file, index) => {
                return (
                    <Accordion>

                        <Panel collapsible header={this.Panelheader(file, index)}
                               key={index}
                               eventKey={index}
                        >
                            <ButtonToolbar>
                                <Button
                                    bsStyle="danger"
                                    onClick={() => this.handleDelete(file, index)}>
                                    Delete
                                </Button>

                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                    <Popover id="popover-trigger-click-root-close" title="Enter Username">
                                        <form>
                                            <FormGroup
                                                controlId="formBasicText"
                                            >
                                                <FormControl
                                                    type="text"
                                                    value={this.state.shareUsername}
                                                    placeholder="Enter username"
                                                    onChange={(event) => {
                                                        this.setState({shareUsername: event.target.value});
                                                    }}
                                                />

                                                <Button
                                                    bsStyle="primary"
                                                    onClick={() => this.validate(this.state.shareUsername, file.filename)}
                                                    active>
                                                    share
                                                </Button>

                                            </FormGroup>
                                        </form>

                                    </Popover>

                                }>
                                    <Button
                                        bsStyle="primary"
                                        active>
                                        share
                                    </Button>
                                </OverlayTrigger>
                                <Button
                                    bsStyle="success"
                                    active>
                                    Download
                                </Button>
                            </ButtonToolbar>
                        </Panel>
                    </Accordion>

                );


            });
        }
    }

   renderListFolders(){
        if(this.props.userdata.folder.length===0){
            return(<h4>You have no Folders</h4>);
        }
       else {
            return this.props.userdata.folder.map((folders, index) => {

                console.log("inside Accordion for folders");
                var check = folders.split('/');
                console.log(check , check.length);

                console.log("after folder ");

                var head = (check[check.length-1]).toUpperCase() + "   Parent-> "  + check[check.length-2]
                    return (
                        <Accordion>
                            <Panel collapsible header={head}
                                   key={index}
                                   eventKey={index}
                                   bsStyle="info"
                            >
                                <ButtonToolbar>
                                    <Button
                                        bsStyle="danger"
                                        onClick={()=>{this.deleteFolder(folders,index)}}
                                    >
                                        Delete
                                    </Button>

                                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                        <Popover id="popover-trigger-click-root-close" title="Add Files">
                                            <form>

                                            </form>

                                        </Popover>

                                    }>
                                        <Button
                                            bsStyle="primary"
                                            active>
                                            AddFiles
                                        </Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                        <Popover id="popover-trigger-click-root-close" title="Share Folder">
                                            <form>
                                                <FormGroup
                                                    controlId="formBasicText"
                                                >
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.shareUsername}
                                                        placeholder="Enter username"
                                                        onChange={(event) => {
                                                            this.setState({shareUsername: event.target.value});
                                                        }}
                                                    />

                                                    <Button
                                                        bsStyle="primary"

                                                        active>
                                                        share
                                                    </Button>

                                                </FormGroup>

                                            </form>

                                        </Popover>

                                    }>
                                        <Button
                                            bsStyle="primary"
                                            active>
                                            Share
                                        </Button>
                                    </OverlayTrigger>
                                </ButtonToolbar>
                            </Panel>
                        </Accordion>

                    );

            });

        }
    }

    render(){
        var containerStyle = {
            fontFamily: '"Lato", sans-serif',
            margin: '40px 0',
            overflow: 'hidden'
        };

     
    return(
      <div className="row">

         <div className="col-md-3">

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
                          <h3>Dashboard</h3>
                      </li>

                      <li>
                          <a href="/Groups"><h3>Groups</h3></a>
                      </li>

                      <li>
                          <a href=""><h3>Interests</h3></a>
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

          <div className="col-md-8">
              <h1>Dashboard</h1>
                  <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>

                  <div className="row">
                      <div className="col-md-9">
                          <label className="custom-file">
                              <input type="file" id="file"
                                     name="mypic"
                                     className="custom-file-input"
                                     onChange={this.handleFileUpload}/>
                              <span className="custom-file-control"></span>
                          </label>
                          <div className="row">
                          <div className="col-md-6">
                          <h3> User Files </h3>
                              {this.renderListFiles()}
                          </div>
                          <div className="col-md-6">
                          <h3> Folders </h3>
                          {this.renderListFolders()}
                          </div>
                          </div>
                      </div>


                      <div className="col-md-3">

                          <Jumbotron>
                              <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                  <Popover id="popover-trigger-click-root-close" title="Enter FolderName">
                                      <form>
                                          <FormGroup
                                              controlId="formBasicText"
                                          >
                                              <FormControl
                                                  type="text"
                                                  value={this.state.foldername}
                                                  placeholder="Enter username"
                                                  onChange={(event)=>{
                                                      this.setState({ foldername: event.target.value });
                                                  }}
                                              />

                                              <Button
                                                  bsStyle="primary"
                                                  onClick={() => this.handlefolder(this.state.foldername)}
                                              >
                                                  create
                                              </Button>

                                          </FormGroup>
                                      </form>

                                  </Popover>

                              }  >

                                  <Button
                                      bsStyle="primary"
                                      center>
                                      New Folder
                                  </Button>

                              </OverlayTrigger>
                          </Jumbotron>

                      </div>
                  </div>
          </div>

       <div className="col-md-1">
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
        star: (data) => dispatch(star(data)),
        getData : (data) => dispatch(getData(data)),
        fileDelete : (data) => dispatch(fileDelete(data)),
        handleFolder : (data) => dispatch(handleFolder(data)),
        folderDelete : (data) => dispatch(folderDelete(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));