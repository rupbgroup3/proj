import React, { Component } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import {useLocation} from "react-router-dom";
import Agodit from "../image/Agodit.png";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

class CCEquipmentType extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    //את השורות נקבל ממסד הנתונים
    rows: [],
    Name: " ",
    Quantity: "",
    modal: false,
    editMode: false,
    Code: "",
    PrevLocation:this.props.PrevLocation,
    BackClicked: false
  };
  deleteUser = async EquipmentName => {
    console.log(this.state.equip)
    Swal.fire({
      title: "? האם אתה בטוח שברצונך למחוק",
      text: "לא תהיה אפשרות לשחזור",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן",
      cancelButtonText: "לא"
    }).then(result => {
      if (result.value) {
        Swal.fire("!נמחק", "סוג הציוד נמחק", "success");
        this.deleteChoose(EquipmentName);
      }
    });
  };

  deleteChoose = async EquipmentName => {
    await this.props.DeleteEquipmentType(EquipmentName);
    await this.props.GetEquipmentTable();

    const index = this.state.rows.findIndex(user => user.Name == EquipmentName);
    console.log(index);
    const newRows = this.state.rows.filter((person, key) => key !== index);
    this.setState({ rows: newRows });
  };
  editUser = data => {
    for (let index = 0; index < this.props.EquipmentVar.length; index++) {
      const element = this.props.EquipmentVar[index];
      console.log(element.Name);
      if (element.Code == data.Code) {
        this.setState({ Code: element.Code });
      }
    }
    this.setState({ editMode: true });
    this.setState({ modal: true });
    this.setState({ Name: data.Name, Quantity: data.Quantity });
  };
  showUser = Name => {
    alert(`show user ${Name}`);
  };
  addNewUser = () => {
    this.setState({ modal: true });
    this.setState({ Name: "", Quantity: "" });
  };
  EquipNameChanged = e => {
    this.setState({
      Name: e.target.value
    });
  };
  QuantityChanged = e => {
    this.setState({
      Quantity: e.target.value
    });
  };

  modalClosed = () => {
    this.setState({ modal: false });
    if (this.state.editMode) {
      this.setState({ editMode: false });
    }
  };

  submitted = async () => {
    this.setState({ modal: false });
    if (!this.state.editMode) {
      const EquipmentType = {
        Name: this.state.Name,
        Quantity: this.state.Quantity
      };
      await this.props.PostEquipmentType(EquipmentType);
      await this.props.GetEquipmentTable();
      setTimeout(
        function() {
          this.setState({
            rows: this.props.EquipmentVar.map(data => ({
              Name: data.Name,
              Quantity: data.Quantity,
              actions: (
                <div style={{ textAlign: "center" }}>
                  <MDBBtn onClick={() => this.editUser(data)} color="warning">
                  <img src="https://img.icons8.com/android/25/000000/edit.png"/>
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => this.deleteUser(data.Name)}
                    color="danger"
                  >
                   <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/>
                  </MDBBtn>
                </div>
              )
            }))
          });
        }.bind(this),
        1500
      );
      Toast.fire({
        icon: "success",
        title: "הזנת סוג ציוד חדש התבצעה בהצלחה"
      });
    } else {
      const EquipmentType2 = {
        Code: this.state.Code,
        Name: this.state.Name,
        Quantity: this.state.Quantity
      };
      await this.props.UpdateEquipment(EquipmentType2);
      await this.props.GetEquipmentTable();
      setTimeout(
        function() {
          this.setState({
            rows: this.props.EquipmentVar.map(data => ({
              Name: data.Name,
              Quantity: data.Quantity,
              actions: (
                <div style={{ textAlign: "center" }}>
                  <MDBBtn onClick={() => this.editUser(data)} color="warning">
                  <img src="https://img.icons8.com/android/25/000000/edit.png"/>
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => this.deleteUser(data.Name)}
                    color="danger"
                  >
                    <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/>
                  </MDBBtn>
                </div>
              )
            }))
          });
        }.bind(this),
        1500
      );

      Toast.fire({
        icon: "success",
        title: "עדכון סוג ציוד קיים התבצע בהצלחה"
      });
      this.setState({ editMode: false });
    }
  };

  componentDidMount() {
   
    setTimeout(
      function() {
        this.props.GetActualEvent();
        this.setState({
          rows: this.props.EquipmentVar.map(data => ({
            Name: data.Name,
            Quantity: data.Quantity,
            actions: (
              <div style={{ textAlign: "center" }}>
                <MDBBtn onClick={() => this.editUser(data)} color="warning">
                <img src="https://img.icons8.com/android/25/000000/edit.png"/>
                </MDBBtn>
                <MDBBtn
                  onClick={() => this.deleteUser(data.Name)}
                  color="danger"
                >
                  <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/>
                </MDBBtn>
              </div>
            )
          }))
        });

        
      }.bind(this),
      1500
    );
  }

  BackClicked=()=>{
    if(this.props.PrevLocation=="/EventTypes"&&this.props.location.state==undefined ){
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/EventTypes'
      })
    }
    else if(this.props.PrevLocation=="/EventTypes"){
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/EventTypes',
        state:{TaskClickedArr: this.props.location.state.TaskClickedArr,
          EquipClickedArr: this.props.location.state.EquipClickedArr,
          EventNameEntered:this.props.location.state.EventNameEntered,
          TasksTypeVar:this.props.location.state.TasksTypeVar,
          EquipmentVar: this.props.location.state.EquipmentVar }
      })
    }
    else if(this.props.PrevLocation==="/EquipAndTaskInActualEvent"&&this.props.location.state!=undefined){
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/EquipAndTaskInActualEvent',
        state:{TaskClickedArr: this.props.location.state.TaskClickedArr,
          EquipClickedArr: this.props.location.state.EquipClickedArr,
          TasksTypeVar: this.props.location.state.TasksTypeVar,
          EquipmentVar: this.props.location.state.EquipmentVar,
          EventName:this.props.location.state.EventName }
      })
    }
    else{
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/'     
      })
    }
  }
  LogOutClicked=()=>{
    if(this.props.PrevLocation=="/EquipAndTaskInActualEvent" && this.props.location.state!=undefined){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור התנתק תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייך למשימות וציוד, כדי להמשיך את התהליך לחץ על לחצן חזור     ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) {
           this.DeleteActualEvent(this.props.Actual_Event[this.props.Actual_Event.length-1].Barcode);
           Swal.fire(
             'התנתקות',
             'התנתקת מהמערכת בהצלחה',
             'success'
           )
           this.props.history.push({
            pathname:'/login'
          })       
        }
      }) 
    }
    else{
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
  }

  DeleteActualEvent=(Barcode)=>{

    this.props.DeleteActualEvent(Barcode);
  }

  HomeClicked=()=>{
    if(this.props.PrevLocation=="/EquipAndTaskInActualEvent" && this.props.location.state!=undefined){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור הבית תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייך למשימות וציוד, כדי להמשיך את התהליך לחץ על לחצן חזור     ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) {
           this.DeleteActualEvent(this.props.Actual_Event[this.props.Actual_Event.length-1].Barcode);
           Swal.fire(
             '!בוטל',
             'תהליך תזמון האירוע ושיוך משימות וציוד בוטל',
             'success'
           ) 
           this.props.history.push({
            pathname:'/'
          })      
        }
      }) 
    }
    else{
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/'
      })
    }
  }
  
  render() {
    //הגדרת העמודות מראש
    const columns = [
      {
        label: "כמות",
        field: "Quantity",
        sort: "asc",
        width: 80
      },
      {
        label: "שם ציוד",
        field: "Name",
        sort: "asc",
        width: 80
      },
      {
        label: "פעולות",
        field: "actions",
        sort: "asc",
        width: 80
      }
    ];
    return (
      <div>
        <div className="header">   
            
              <button className="back" onClick={this.BackClicked}></button>
            
          
              <button
              onClick={this.HomeClicked}
                id="HomeBtn"
                className="home"
         
              ></button>
     
            
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
            <br/>
            <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>סוגי ציוד</h1>
            </div>
          </div>
        </nav>
        {this.state.modal ? (
          <div className="Root">
            <br />
            <br />
            <br /> <br />
            <div className="container">
              <div id="header-Privacy">
                {this.state.editMode ? (
                  <h3 className="privacyList">עריכת סוג ציוד קיים </h3>
                ) : (
                  <h3 className="privacyList">הוספת סוג ציוד חדש </h3>
                )}
                <br /> <br />
              </div>
              <div id="editDiv">
                <form
                  class="modal-content animate"
                  action="/action_page.php"
                  onSubmit={this.submitted}
                >
                  <div className="form-group row">
                    <div className="form-group_col-sm-3">
                      <label for="FirstName">
                        <span className="red-star">★ </span>שם ציוד
                      </label>
                      <input
                        placeholder="הזן שם ציוד"
                        type="text"
                        className="form-control"
                        id="EquipName"
                        required
                        value={this.state.Name}
                        onChange={this.EquipNameChanged}
                      />
                                            
                    </div>
                    <div className="form-group_col-sm-3">
                      <label for="LastName">
                        <span className="red-star">★ </span> כמות
                      </label>
                      <input
                        type="tel"
                        placeholder="הזן כמות"
                        title="חייב להכיל ספרה אחת לפחות"
                        className="form-control"
                        id="Quantity"
                        value={this.state.Quantity}
                        onChange={this.QuantityChanged}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ margin: 20 }}
                      type="submit"
                      className="btn btn-primary btn-lg"
                      id="saveBTN"
                    >
                      שמור
                    </button>
                    <input
                      type="button"
                      className="btn btn-warning btn-lg"
                      id="cancelSaveBTN"
                      value="ביטול"
                      onClick={this.modalClosed}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "0%" }}>
            <MDBBtn id="IDMDBBTN"
              onClick={() => this.addNewUser("Ashton Cox")}
              color="success"
            >
              הוסף סוג ציוד חדש
            </MDBBtn>
            <MDBDataTable
              theadColor="#B5DBF8"
              paging={true}
              className="dataTable"
              sortable
              striped
              bordered
              hover
              paginationLabel={["הקודם", "הבא"]}
              data={{
                columns: columns,
                rows: this.state.rows
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter (CCEquipmentType)
