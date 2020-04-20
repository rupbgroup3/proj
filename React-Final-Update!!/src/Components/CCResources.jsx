import React, { Component } from "react";
import Agodit from "../image/Agodit.png"
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { stack as Menu } from "react-burger-menu";


//import Button from '@bit/nexxtway.react-rainbow.button';

const buttonHome = { margin: 30 };

class CCResources extends Component {

  MoveToEventTypes=()=>{
    this.props.MyPreviousLocation('/Resources')
    this.props.history.push({
      pathname:'/EventTypes'
    })
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
  MoveToEquipmentType=()=>{
    this.props.MyPreviousLocation('/Resources')
    this.props.history.push({
      pathname:'/EquipmentType'
    })
  }
  MoveToTasksType=()=>{
    this.props.MyPreviousLocation('/Resources')
    this.props.history.push({
      pathname:'/TasksType'
    })
  }
  MoveToHumanResources=()=>{
    this.props.MyPreviousLocation('/Resources')
    this.props.history.push({
      pathname:'/HumanResources'
    })
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

<Link to="/ManageActivities">
<a className="menu-item">
<i id="manageactivitiesi" class="fas fa-bell"></i>
  פעילויות
</a>
</Link>

<a className="menu-item">
<i id="resourcesi" class="fas fa-globe"></i>
  משאבים
</a>

<Link to="/Calendar">
<a className="menu-item" onClick={this.CalendarClicked}>
<i id="calendari" class="far fa-calendar-alt"></i>
  לוח שנה
</a>
</Link>

<a className="menu-item" onClick={this.LogOutClicked}>
<i id="logouti" class="fas fa-sign-out-alt"></i>
  התנתק
</a>

</Menu> 
            <Link to="/home">
              <button className="back"></button>
            </Link>

            <div className="LogoDiv">
          <img className="Agodit" src={Agodit}></img>
          <h1 className="AgoditText">אגודית</h1>
        </div>
            </div>
        <br />
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>משאבים</h1>
            </div>
          </div>
        </nav>
        <br />
        <br />
        <br />
        <br />
        <br />
<div className="btnResDiv">

      
        <button
        onClick={this.MoveToHumanResources}
          className="buttonHome"
          style={buttonHome}
          shaded
          label="Button Success"
          variant="success"
        >
          {" "}
          כוח אדם
        </button>

   
        <button
        onClick={this.MoveToEquipmentType}
          className="buttonHome"
          style={buttonHome}
          shaded
          label="Button Destructive"
          variant="destructive"
        >
          {" "}
          סוגי ציוד
        </button>
     
              
        <button
        onClick={this.MoveToEventTypes}
          className="buttonHome"
          style={buttonHome}
          shaded
          label="Button Success"
          variant="success"
        >
          {" "}
          סוגי אירועים
        </button>
       
        <button
        onClick={this.MoveToTasksType}
          className="buttonHome"
          style={buttonHome}
          shaded
          label="Button Success"
          variant="success"
        >
          {" "}
          סוגי משימות
        </button>
   
        </div>
      </div>
    );
  }
}

export default withRouter (CCResources);
