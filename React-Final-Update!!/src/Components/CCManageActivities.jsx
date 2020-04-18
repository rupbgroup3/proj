import React, { Component, useState } from "react";
import CCHome from "./CCHome";
import ReactDOM from "react-dom";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { stack as Menu } from "react-burger-menu";



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
      pathname:'/'
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
  ResourcesClicked=()=>{
    this.props.history.push({
      pathname: "/Resources",
    });
  }
  CalendarClicked=()=>{
    this.props.history.push({
      pathname: "/Calendar",
    });
  }

  render() {
    return (

      <div>
         <div className="header">  
         <Menu disableAutoFocus right >

<Link to="/home">
<a className="menu-item">
<i id="homei" class="fas fa-home"> </i>
  מסך הבית
</a>
</Link>

<a className="menu-item">
<i id="manageactivitiesi" class="fas fa-bell"></i>
  פעילויות
</a>

<a className="menu-item" onClick={this.ResourcesClicked}>
<i id="resourcesi" class="fas fa-globe"></i>
  משאבים
</a>


<a className="menu-item" onClick={this.CalendarClicked}>
<i id="calendari" class="far fa-calendar-alt"></i>
  לוח שנה
</a>

<a className="menu-item" onClick={this.LogOutClicked}>
<i id="logouti" class="fas fa-sign-out-alt"></i>
  התנתק
</a>

</Menu> 
            <Link to={"/home"}>
              <button className="back"></button>
              </Link>

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

        <div id="containerr">
        <div id="btnsManAct">

          <button  id="btnTestaTsk" onClick={this.changeHandler1}>
            משימות <img id="imgIcon"  src="https://img.icons8.com/offices/30/000000/copy-2.png"/>
          </button>

          <button  id="btnTestEvent" onClick={this.changeHandler2}>
            אירועים <img id="imgIcon"  src="https://img.icons8.com/offices/30/000000/org-unit.png"/>
            {/* className="btn btn-success" */}
          </button>


        </div>
        <div id="btnsManAct">
          
          
          {/* <MDBBtn  onClick={this.MoveToTaskType} color="success"  id="NewTaskType"><img  onClick={this.MoveToTaskType} src="https://img.icons8.com/color/60/000000/plus--v1.png"/></MDBBtn> */}
          <img id="NewTaskPlas" onClick={this.MoveToTaskType}  src="https://img.icons8.com/material-outlined/30/000000/plus.png"/>
          {/* <MDBBtn  onClick={this.MoveToEventType} color="success" id="NewEventType">הוסף סוג אירוע חדש</MDBBtn> */}
          <img id="NewEventPlas" onClick={this.MoveToEventType}   src="https://img.icons8.com/material-outlined/30/000000/plus.png"/>
          </div>
          <br/>
        <div id="SearchManageActDiv">
        <input id="SearchManageAct" onChange={this.searched} value={this.state.searchedEnter}></input>{" "}
        <img src="https://img.icons8.com/material-outlined/20/000000/search.png" />
        </div>

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
                    <br/>
                   
                    <img id="imgIcon" src="https://img.icons8.com/offices/30/000000/copy-2.png"/>
                   
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
                  
                    label="Button Success"
                    variant="success"
                  >
                    {" "}
                    
                    {data.EventName}
                    <img id="imgIcon"  src="https://img.icons8.com/offices/30/000000/org-unit.png"/>
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
