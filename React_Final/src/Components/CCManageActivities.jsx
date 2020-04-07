import React, { Component, useState } from "react";
import CCHome from "./CCHome";
import ReactDOM from "react-dom";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";
import { MDBDataTable, MDBBtn } from "mdbreact";

const buttonHome = { margin: 30 };

class CCManageActivities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TasksClicked: true,
      TasksTypeVar: this.props.TasksTypeVar,
      EventsTypeVar: this.props.EventTypeVar,
      searchedEnter: ""
    };
  }

  changeHandler1 = () => {
    this.setState({
      TasksClicked: true
    });
  };

  changeHandler2 = () => {
    this.setState({
      TasksClicked: false
    });
  };

  searched=(e)=>{
this.setState({searchedEnter:e.target.value})
  }

  LogOutClicked=()=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'התנתקת מהמערכת בהצלחה',
      showConfirmButton: false,
      timer: 1200
    })
    this.props.history.push({
      pathname:'/login'
    })
  }
  MoveToActualEvent=(data2)=>{
    this.props.MyPreviousLocation('/ManageActivities');
    this.props.history.push({
      pathname:'/ActualEvent',
      state: {data: data2}
    })
  }
  MoveToActualTask=(data1)=>{
    this.props.MyPreviousLocation('/ManageActivities');
    this.props.history.push({
      pathname:'/ActualTask',
      state: {data: data1}
    })
  }
  MoveToEventType=()=>{
    this.props.MyPreviousLocation('/ManageActivities');
    this.props.history.push({
      pathname:'/EventTypes'
    })
  }
  MoveToTaskType=()=>{
    this.props.MyPreviousLocation('/ManageActivities');
    this.props.history.push({
      pathname:'/TasksType'
    })
  }

  componentDidMount(){
    this.props.GetTasks();
    this.props.GetEvents();

  }

  render() {
    return (

      <div>
         <div className="header">   
            <Link to={"/"}>
              <button className="back"></button>
              </Link>
            <Link to={"/"}>
              <button
                id="HomeBtn"
                className="home"
         
              ></button>
            </Link>
           
              <button
              onClick={this.LogOutClicked}
                id="LogOutBtn"
                className="LogOut"
              >
                התנתק
              </button>
            
            <div className="LogoDiv">
          <img className="Agodit" src={Agodit}></img>
          <h1 className="AgoditText">אגודית</h1>
        </div>
            </div>

      <div id="ManActDiv">
        <br/>   
                <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>ניהול פעילויות</h1>
            </div>
          </div>
        </nav>
        <div id="btnsManAct">


          <button  id="btnTest" onClick={this.changeHandler1}>
            משימות
          </button>

          <button  id="btnTest" onClick={this.changeHandler2}>
            אירועים
            {/* className="btn btn-success" */}
          </button>


        </div>
        <div id="btnsManAct">
          
          
          <MDBBtn onClick={this.MoveToTaskType} color="warning" id="NewTaskType">הוסף סוג משימה חדש</MDBBtn>
          <MDBBtn onClick={this.MoveToEventType} color="success" id="NewEventType">הוסף סוג אירוע חדש</MDBBtn>
          </div>
          <br/>
        <div id="SearchManageActDiv">
        <input id="SearchManageAct" onChange={this.searched} value={this.state.searchedEnter}></input>{" "}
        <img src="https://img.icons8.com/material-outlined/20/000000/search.png" />
        </div>


         <div className="row">        
        <div className="TasksEventsDiv">
          {this.state.TasksClicked
            ? this.state.TasksTypeVar.map(data => (
              data.TaskName.includes(this.state.searchedEnter)?
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 center">
              
                  <button
                    className="btnTasks"
                    style={buttonHome}
                    shaded
                    onClick={() =>this.MoveToActualTask(data)}
                    label="Button Success"
                    variant="success"
                  >
                    {" "}
                    {data.TaskName}
                  </button>
               
                </div>:""
              ))
            : this.state.EventsTypeVar.map(data => (
              data.EventName.includes(this.state.searchedEnter)?
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col center">
                 
                  <button
                    className="btnEvents"
                    style={buttonHome}
                    shaded
                    onClick={() =>this.MoveToActualEvent(data)}
                    label="Button Success"
                    variant="success"
                  >
                    {" "}
                    {data.EventName}
                  </button>
               
                </div>:""
              ))}
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter (CCManageActivities);
