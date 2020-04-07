import React, { Component } from "react";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Swal from "sweetalert2";
import Agodit from "../image/Agodit.png";
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

//הגדרת העמודות מראש

class CCTaskType extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    //את השורות תקבלו ממסד הנתונים
    rows: [],
    modal: false,
    editMode: false,
    TaskNo: "",
    TaskName:"",
    Description: "אין תיאור"
  };
  deleteUser = async (TaskName) => {
    Swal.fire({
      title: "? האם אתה בטוח שברצונך למחוק",
      text: "לא תהיה אפשרות לשחזור",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן',
      cancelButtonText: "לא"
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '!נמחק',
          'סוג המשימה נמחק',
          'success'
        )
        this.deleteChoose(TaskName);
      }
    })
  };

  deleteChoose= async(TaskName)=>{
    await this.props.DeleteTaskType(TaskName);
    await this.props.GetTasks();
    
  const index = this.state.rows.findIndex((user)=>user.TaskName==TaskName);
  console.log(index);
  const newRows = this.state.rows.filter((person,key)=>key!==index);
  this.setState({rows:newRows}); 
  }
  editUser = data => {
    for (let index = 0; index < this.props.TasksTypeVar.length; index++) {
      const element = this.props.TasksTypeVar[index];
      if (element.TaskNo==data.TaskNo) {
        this.setState({TaskNo: element.TaskNo})
      }        
    }
    this.setState({editMode: true})  
    this.setState({modal:true});
    this.setState({TaskName: data.TaskName,
                   Description: data.Description
    });
  };
  addNewUser = () => {
    this.setState({modal:true});
    this.setState({TaskName: "",
    Description: ""}) 
  };

  submitted= async()=>{
    this.setState({modal:false});  
    if (!this.state.editMode) {   
    const Task = {
      TaskName: this.state.TaskName,
      Description: this.state.Description          
     }
     await this.props.PostTaskType(Task);
     await this.props.GetTasks();
     setTimeout(
      function() {
          this.setState({     rows: this.props.TasksTypeVar.map(data => ({
            TaskName: data.TaskName,
            Description: data.Description,
    
            actions: (
              <div style={{ textAlign: "center" }}>
                  <MDBBtn id="MDBBTH_DELET_EDIT" onClick={()=>this.editUser(data)} color="warning"><img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                    <MDBBtn
                      onClick={() => this.deleteUser(data.TaskName)}
                      color="danger"
                    >
                      <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/>
                    </MDBBtn>
              </div>
            )
          }))
        });
      }
      .bind(this),
      1500
  );   
    Toast.fire({
      icon: 'success',
      title: 'הזנת סוג משימה חדש התבצעה בהצלחה'
    })        
    }    
    else{      
      const Task2 = {
        TaskNo: this.state.TaskNo,
        TaskName: this.state.TaskName,
        Description: this.state.Description
       }
        await this.props.UpdateTask(Task2);
        await this.props.GetTasks();
        setTimeout(
          function() {
              this.setState({     rows: this.props.TasksTypeVar.map(data => ({
                TaskName: data.TaskName,
                Description: data.Description,
        
                actions: (
                  <div style={{ textAlign: "center" }}>
                    <MDBBtn id="MDBBTH_DELET_EDIT" onClick={()=>this.editUser(data)} color="warning"><img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                    <MDBBtn
                      onClick={() => this.deleteUser(data.TaskName)}
                      color="danger"
                    >
                      <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/>
                    </MDBBtn>
                  </div>
                )
              }))
            });
          }
          .bind(this),
          1500
      );
      
        Toast.fire({
          icon: 'success',
          title: 'עדכון סוג משימה חדש התבצע בהצלחה'
        })           
      this.setState({editMode: false})
    }
  }

  modalClosed=()=>{
    this.setState({modal:false});
    if (this.state.editMode) {
      this.setState({editMode: false});        
    }
  }

  TaskNameChanged=(e)=>{
    this.setState({TaskName: e.target.value })
  }

  DescriptionChanged=(e)=>{
    this.setState({Description: e.target.value})
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
    else if(this.props.PrevLocation=="/EquipAndTaskInActualEvent"&&this.props.location.state!=undefined){
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
    else if(this.props.PrevLocation=="/ManageActivities"){
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/ManageActivities'
      })
    }
    else{
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname:'/'     
      })
    }
  }
  componentDidMount() {
    
    setTimeout(
      function() {
        this.props.GetActualEvent();
          this.setState({     rows: this.props.TasksTypeVar.map(data => ({
            TaskName: data.TaskName,
            Description: data.Description,
    
            actions: (
              <div style={{ textAlign: "center" }}>
                <MDBBtn id="MDBBTH_DELET_EDIT" onClick={()=>this.editUser(data)} color="warning"><img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                <MDBBtn
                  onClick={() => this.deleteUser(data.TaskName)}
                  color="danger"
                >
                 <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/>
                </MDBBtn>
              </div>
            )
          }))
        });
      }
      .bind(this),
      1500
  );
  }
  LogOutClicked=()=>{
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
    const columns = [
      {
        label: "תיאור",
        field: "Description",
        sort: "asc",
        width: 100
      },

      {
        label: "שם משימה",
        field: "TaskName",
        sort: "asc",
        width: 130
      },
      {
        label: "פעולות",
        field: "actions",
        sort: "asc",
        width: 130
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

        
        {this.state.modal ? (
          <div className="Root">
            <br />
            <br />
            <br /> <br />
            <div className="container">
              <div id="header-Privacy">
                {this.state.editMode?
                <h3 className="privacyList">עריכת סוג משימה קיים </h3>:
                <h3 className="privacyList">הוספת סוג משימה חדש </h3>
                }
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
                        <span className="red-star">★ </span>שם משימה
                      </label>
                      <input
                        placeholder="הזן שם משימה"
                        type="text"
                        className="form-control"
                        id="TaskName"
                        required
                        value={this.state.TaskName}
                        onChange={this.TaskNameChanged}
                      />
                    </div>
                    <div className="form-group_col-sm-3">
                      <label for="LastName">
                        <span className="red-star">★ </span> תיאור
                      </label>
                      <input
                        placeholder="הזן תיאור משימה"
                        type="text"
                        className="form-control"
                        id="Description"
                        required
                        value={this.state.Description}
                        onChange={this.DescriptionChanged}
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
             <br/>
            <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>סוגי משימות</h1>
            </div>
          </div>
        </nav>
            <MDBBtn id="IDMDBBTN"
              onClick={() => this.addNewUser("Ashton Cox")}
              color="success"
            >
              הוסף סוג משימה חדש
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
export default withRouter (CCTaskType)
