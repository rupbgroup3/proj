import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import CCManageActivities from "./CCManageActivities";
import Agodit from "../image/Agodit.png";
import Menulogo from "../image/Menu-512.png"
import Swal from "sweetalert2";
import { stack as Menu } from "react-burger-menu";




const buttonHome = { margin: 30 };

class CCHome extends Component {
  state = {
    date: new Date(),
  }
  constructor(props) { 
    super(props);

  }

  LogOut=()=>{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/'
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'התנתקת מהמערכת בהצלחה',
      showConfirmButton: false,
      timer: 1200
    })

  }
  Toresources=()=>{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/resources'
    })
  }
  ManageActivities=()=>{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/ManageActivities'
    })
  }
  

  render() {
    return (
      <div>

        
        
         <div className="header"> 
         <Menu disableAutoFocus right >

<a className="menu-item"  >
<i id="homei" class="fas fa-home"> </i>
מסך הבית 

</a>


<a className="menu-item" onClick={this.ManageActivities}>
<i id="manageactivitiesi" class="fas fa-bell"></i>
  פעילויות

</a>


<a className="menu-item" onClick={this.Toresources}>
<i id="resourcesi" class="fas fa-globe"></i>
  משאבים
</a>

<Link to='/Calendar'>
<a className="menu-item">
<i id="calendari" class="far fa-calendar-alt"></i>

  לוח שנה
</a>
</Link>

<a className="menu-item" onClick={this.LogOut}>
<i id="logouti" class="fas fa-sign-out-alt"></i>

  התנתק
</a>

</Menu>          
              <button className="back"></button>         

            <div className="LogoDiv">
          <img className="Agodit" src={Agodit}></img>
          <h1 className="AgoditText">אגודית</h1>
        </div>

            </div>

      <div className="homeDiv">
      <br />
      <br />
       <h1 id="h1Titele">  {this.props.NameOfUser}  שלום</h1>     
        <br />
        <br />
       <Link to='/Calendar'>
        <button
          className="buttonHome"
          style={buttonHome}
          shaded
          label="Button Brand"
          variant="brand"
        >
          {" "}
          <img src="https://img.icons8.com/clouds/100/000000/overtime.png"/>
          לוח-שנה
        </button>
        </Link>
      
          <button
          
          onClick={this.Toresources}
            className="buttonHome"
            style={buttonHome}
            shaded
            label="Button Success"
            variant="success"
          >
            {" "}
            <img src="https://img.icons8.com/clouds/100/000000/micro-sd.png"/>
            משאבים

          </button>
  

          <button
          onClick={this.ManageActivities}
            className="buttonHome"
            style={buttonHome}
            shaded
            label="Button Destructive"
            variant="destructive"
          >
            {" "}
            <img src="https://img.icons8.com/clouds/100/000000/appointment-reminders.png"/>
            פעילויות
          </button>
        
      </div>
      </div>
    );
  }
}
export default withRouter (CCHome);
