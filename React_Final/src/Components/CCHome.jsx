import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import CCManageActivities from "./CCManageActivities";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";


const buttonHome = { margin: 30 };

class CCHome extends Component {
  state = {
    date: new Date(),
  }
  constructor(props) { 
    super(props);

  }

  onChange = date => this.setState({ date })

  LogOut=()=>{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/login'
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
              <button className="back"></button>         
              <button
                id="HomeBtn"
                className="home"
         
              ></button>         
              <button
              onClick={this.LogOut}
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

      <div className="homeDiv">
        <br />
        <br />
        <br />
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
          לוח שנה
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
            פעילויות
          </button>
        
      </div>
      </div>
    );
  }
}
export default withRouter (CCHome);
