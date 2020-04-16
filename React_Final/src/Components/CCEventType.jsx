import React, { Component, useState } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import ReactDOM from "react-dom";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../CssFiles/EventType.css";
import Swal from "sweetalert2";
import { Checkbox } from "react-bootstrap";
import { useLocation} from "react-router";
import Agodit from "../image/Agodit.png"

const columns =  [
  {
    label: 'סוג אירוע',
    field: 'EventName',
    sort: 'asc',
    width: 150
    },
  {
    label:'פעולות',
    field:'actions',
    sort:'asc',
    width:130
  }]
class CCEventType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TasksTypeVar: this.props.TasksTypeVar,
      EquipmentVar: this.props.EquipmentVar,
      EventsTypeVar: this.props.EventsTypeVar,
      searchedEquipment: "",
      searchedTasks: "",
      TaskClickedArr: [{ TaskName: "", TaskNo: "" }],
      EquipClickedArr: [{ Name: "", Code: "" }],
      TaskClickedArrOld:[],
      EquipClickedArrOld:[],
      EventNameEntered: "",
      redirected: false,
      rows: [],
      EditTableShow:false,
      BackToEditButtons: false,
      EditBtn: false,
      EventCode:"",
      PrevLocation:this.props.PrevLocation,
      Homeclicked: false,
      Logoutclicked:false
    };
  }
  componentDidMount() {
    console.log(this.state.PrevLocation)
    setTimeout(
      function() {

        this.props.GetEquipmentTable();
        this.props.GetTasks();
        this.props.GetEvents();

        this.setState({
          TasksTypeVar: this.props.TasksTypeVar,
          EquipmentVar: this.props.EquipmentVar
        });

        const index = this.state.EquipClickedArr.findIndex(user => user.Code == "");
        console.log(index);
        const newArr = this.state.EquipClickedArr.filter(
          (person, key) => key !== index
        ); 
        this.setState({ EquipClickedArr: newArr });


        const index2 = this.state.TaskClickedArr.findIndex(user => user.TaskNo == "");
        console.log(index2);
        const newArr2 = this.state.TaskClickedArr.filter(
          (person, key) => key !== index2
        );
        this.setState({ TaskClickedArr: newArr2 });
             
        this.setState({rows: this.props.EventTypeVar.map(data => (            
          {
              EventName: data.EventName,      
              actions: <div style={{textAlign:'center'}}>
                        <MDBBtn onClick={()=>this.editUser(data)} color="warning">  <img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                        <MDBBtn onClick={()=>this.deleteUser(data)} color="danger"><img src="https://img.icons8.com/material/25/000000/delete--v1.png"/></MDBBtn>
                    </div>
          }
          ))})   
          if ((this.state.PrevLocation=='/EquipmentType'&& this.props.location.state!=undefined)||(this.state.PrevLocation=='/TasksType'&& this.props.location.state!=undefined)) {
            this.setState({TaskClickedArr:this.props.location.state.TaskClickedArr,
                           EquipClickedArr:this.props.location.state.EquipClickedArr,
                           EventNameEntered:this.props.location.state.EventNameEntered,
                           TasksTypeVar:this.props.TasksTypeVar,
                           EquipmentVar: this.props.EquipmentVar
            })
          }
      }.bind(this),
      500
    );
  }

  EditTableShow=()=>{ 
    this.setState({EditTableShow: true,
      BackToEditButtons: false })
        setTimeout(
          function() {
            this.setState({rows: this.props.EventTypeVar.map(data => (            
              {
                  EventName: data.EventName,      
                  actions: <div style={{textAlign:'center'}}>
                  <MDBBtn onClick={()=>this.editUser(data)} color="warning">  <img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                  <MDBBtn onClick={()=>this.deleteUser(data)} color="danger"><img src="https://img.icons8.com/material/25/000000/delete--v1.png"/></MDBBtn>
                        </div>
              }
              ))})           
          }.bind(this),
          1000
        );

  }

  addNewEventType = ()=>{
    this.setState({BackToEditButtons: true,
      EditTableShow: false,
      TaskClickedArr: [{ TaskName: "", TaskNo: "" }],
      EquipClickedArr: [{ Name: "", Code: "" }],
      EventNameEntered: "",
      TasksTypeVar: this.props.TasksTypeVar,
      EquipmentVar: this.props.EquipmentVar
    })

  }
  editUser = (data)=>{
    this.setState({
      BackToEditButtons: true,
      EditTableShow: false,
      EditBtn:true
    })
        
    let EveCode= data.EventCode;
    this.setState({EventCode: EveCode})
    let EveName= data.EventName;
    this.setState({EventNameEntered: EveName})
    this.props.GetTasks();
    this.props.GetEquipmentTable();   
    this.props.GetEvent_Type_EquipmentType();
    this.props.GetEvent_Type_Task();
    let EquipCodesArr= [];
    let TaskNoArr= [];
    let EquipClickedArrTemp= [{ Name:"", Code:"" }];
    let TaskClickedArrTemp= [{ TaskName: "", TaskNo: "" }]

    setTimeout(
      function() {
      
    for (let index = 0; index < this.props.Event_Type_EquipmentTypeVar.length; index++) {
      const element = this.props.Event_Type_EquipmentTypeVar[index].Event_TypeEventCode;
      if (element==EveCode ) {

        EquipCodesArr.push(this.props.Event_Type_EquipmentTypeVar[index].EquipmentTypeCode)
      }
    }
    for (let index1 = 0; index1 < this.props.EquipmentVar.length; index1++) {
      const element1 = this.props.EquipmentVar[index1].Code;
      for (let index = 0; index < EquipCodesArr.length; index++) {
        const element2 = EquipCodesArr[index];
        if (element1===element2) {
          EquipClickedArrTemp.push({
            Name: this.props.EquipmentVar[index1].Name,
            Code: element1
          })
        }
      }     
    }
    this.setState({
      EquipClickedArr:EquipClickedArrTemp
    })
      }.bind(this),
      1500
    );


    setTimeout(
      function() {
        const index = this.state.EquipClickedArr.findIndex(user => user.Code == "");
        console.log(index);
        const newArr = this.state.EquipClickedArr.filter(
          (person, key) => key !== index
        ); 
    
        this.setState({ EquipClickedArr: newArr,
          EquipClickedArrOld: newArr });
    
      
      }.bind(this),
      1500
    );


    setTimeout(
      function() {
        for (let index = 0; index < this.props.Event_Type_TaskVar.length; index++) {
          const element = this.props.Event_Type_TaskVar[index].Event_TypeEventCode;
          if (element==EveCode ) {
  
            TaskNoArr.push(this.props.Event_Type_TaskVar[index].TaskTaskNo)
            console.log(TaskNoArr)
          }
        }
      }.bind(this),
      1500
    );
    setTimeout(
      function() {           
        for (let index1 = 0; index1 < this.props.TasksTypeVar.length; index1++) {
          const element1 = this.props.TasksTypeVar[index1].TaskNo;
          for (let index = 0; index < TaskNoArr.length; index++) {
            const element2 = TaskNoArr[index];
            if (element1===element2) {
              TaskClickedArrTemp.push({
                TaskName: this.props.TasksTypeVar[index1].TaskName,
                TaskNo: element1
              })
            }
          }     
        }       
      }.bind(this),
      1500
    );
    
    setTimeout(
      function() {
        this.setState({
          TaskClickedArr:TaskClickedArrTemp
        })
      }.bind(this),
      1500
    );

    setTimeout(
      function() {
        const index2 = this.state.TaskClickedArr.findIndex(user => user.TaskNo == "");
        console.log(index2);
        const newArr2 = this.state.TaskClickedArr.filter(
          (person, key) => key !== index2
        );
    
        this.setState({ TaskClickedArr: newArr2,
          TaskClickedArrOld: newArr2
        });
      }.bind(this),
      1500
    ); 

  }

  deleteChoose= async(data)=>{
    await this.props.GetEvent_Type_EquipmentType();
    await this.props.GetEvent_Type_Task();
    
    setTimeout(
      function() {
        for (let index = 0; index < this.props.Event_Type_EquipmentTypeVar.length; index++) {
          const element = this.props.Event_Type_EquipmentTypeVar[index];
          if(data.EventCode== element.Event_TypeEventCode){
            let Event_Type_EquipmentType={
              Event_TypeEventCode: data.EventCode,
              EquipmentTypeCode: element.EquipmentTypeCode
            }
             this.props.DeleteEvent_Type_EquipmentType(Event_Type_EquipmentType);
          }
          
        }
        
        for (let index = 0; index < this.props.Event_Type_TaskVar.length; index++) {
          const element = this.props.Event_Type_TaskVar[index];
          if(data.EventCode== element.Event_TypeEventCode){
            let Event_Type_Task={
              Event_TypeEventCode: data.EventCode,
              TaskTaskNo: element.TaskTaskNo
            }
             this.props.DeleteEvent_Type_Task(Event_Type_Task);
          }  
        }
        let Event_Type={
          EventCode: data.EventCode,
          EventName: data.EventName
        }
         this.props.DeleteEventType(Event_Type);
      }.bind(this),
      1000
    ); 
    
    
    const index2 = this.state.rows.findIndex(user => user.EventCode == data.EventCode);
    console.log(index2);
    const newArr2 = this.state.rows.filter(
      (person, key) => key !== index2
    );
       
    this.setState({ rows: newArr2
    });
    await this.props.GetEvents();
    setTimeout(
      function() {
        this.setState({rows: this.props.EventTypeVar.map(data => (            
          {
              EventName: data.EventName,      
              actions: <div style={{textAlign:'center'}}>
              <MDBBtn onClick={()=>this.editUser(data)} color="warning">  <img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
              <MDBBtn onClick={()=>this.deleteUser(data)} color="danger"><img src="https://img.icons8.com/material/25/000000/delete--v1.png"/></MDBBtn>
                    </div>
          }
          ))})           
      }.bind(this),
      1200
    );
    
  } 

  deleteUser=async(data)=>{
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
        this.deleteChoose(data);
        Swal.fire(
          '!נמחק',
          'פרטי האירוע נמחקו',
          'success'
        )       
      }
    })   
  }

  PutExistEvent=async()=>{
    if(this.state.EventNameEntered==""||this.state.EventNameEntered==null){
      Swal.fire({
        icon: "error",
        title: "שם סוג האירוע ריק",
        text: "אנא הזן שם סוג אירוע"
      });
    }
    else if(this.state.TaskClickedArr.length==0){
      Swal.fire({
        icon: "error",
        title: "לא נבחרו משימות לסוג האירוע",
        text: "אנא בחר סוגי משימות"
      });
    }
    else if(this.state.EquipClickedArr.length==0){
      Swal.fire({
        icon: "error",
        title: "לא נבחרו סוגי ציוד לסוג האירוע",
        text: "אנא בחר סוגי ציוד"
      });
    }
    else{
      for (let index = 0; index < this.state.EquipClickedArrOld.length; index++) {
        const element = this.state.EquipClickedArrOld[index];
        let Event_Type_EquipmentType={
          EquipmentTypeCode: element.Code,
          Event_TypeEventCode: this.state.EventCode
        }
     
       await this.props.DeleteEvent_Type_EquipmentType(Event_Type_EquipmentType);     
      }      
      for (let index = 0; index < this.state.TaskClickedArrOld.length; index++) {
        const element = this.state.TaskClickedArrOld[index];
        let Event_Type_Task = {
          Event_TypeEventCode: this.state.EventCode,
          TaskTaskNo: element.TaskNo
        };
       await this.props.DeleteEvent_Type_Task(Event_Type_Task);
      }

      let Event_Type = {
        EventName: this.state.EventNameEntered,
        EventCode: this.state.EventCode
      };
      await this.props.UpdateEventType(Event_Type);

      for (let index = 0; index < this.state.EquipClickedArr.length; index++) {
        let Event_Type_EquipmentType={
          EquipmentTypeCode: this.state.EquipClickedArr[index].Code,
          Event_TypeEventCode: this.state.EventCode
        }
        await this.props.PostEvent_Type_EquipmentType(Event_Type_EquipmentType);
        
      }             

      for (let index = 0; index < this.state.TaskClickedArr.length; index++) {
        const element = this.state.TaskClickedArr[index];
        let Event_Type_Task = {
          Event_typeEventCode: this.state.EventCode,
          TaskTaskNo: element.TaskNo
        };
        await this.props.PostEvent_Type_Task(Event_Type_Task);
      }
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "האירוע עודכן במערכת בהצלחה",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(
        function() {
          this.setState({redirected:true})
        }.bind(this),
        1500
      );     
    }    
  }

  EquipmentClicked = e => {
    for (let index = 0; index < this.state.EquipClickedArr.length; index++) {
      const element = this.state.EquipClickedArr[index];
      if (element.Code==e.target.value) {
        Swal.fire({
          icon: 'error',
          title: 'שים לב',
          text:  'ציוד זה כבר קיים ברשימת הציוד',
        })
        return;
      }
    }
      let Name = "";
      for (let index = 0; index < this.props.EquipmentVar.length; index++) {
        const element = this.props.EquipmentVar[index];
        if (this.props.EquipmentVar[index].Code == e.target.value) {
          Name = element.Name;
        }
      }
      let EquipClicked = this.state.EquipClickedArr;
      EquipClicked.push({ Name: Name, Code: e.target.value });
      this.setState({ EquipClickedArr: EquipClicked });
      const index2 = this.state.EquipmentVar.findIndex(user => user.Code == e.target.value);
      console.log(index2);
      const newEquipmentVar = this.state.EquipmentVar.filter(
      (person, key) => key !== index2
       );
       console.log(this.state.EquipClickedArr)

       this.setState({EquipmentVar:newEquipmentVar})
    }


  UncheckedEquip = e => {
    for (let index = 0; index < this.state.EquipmentVar.length; index++) {
      const element = this.state.EquipmentVar[index];
      if (element.Code==e.target.value) {
        const index = this.state.EquipClickedArr.findIndex(
          user => user.Code == e.target.value
        );
        console.log(index);
        const newArr = this.state.EquipClickedArr.filter(
          (person, key) => key !== index
        );
        this.setState({ EquipClickedArr: newArr });
    
        console.log(this.state.EquipClickedArr)
        return;
      }
    }
 
    const index = this.state.EquipClickedArr.findIndex(
      user => user.Code == e.target.value
    );
   this.state.EquipmentVar.unshift(this.state.EquipClickedArr[index]); 
    console.log(index);
    const newArr = this.state.EquipClickedArr.filter(
      (person, key) => key !== index
    );
    this.setState({ EquipClickedArr: newArr });

    console.log(this.state.EquipClickedArr)
  };

  UncheckedTasks = e => {
    for (let index = 0; index < this.state.TasksTypeVar.length; index++) {
      const element = this.state.TasksTypeVar[index];
      if (element.TaskNo==e.target.value) {
        const index = this.state.TaskClickedArr.findIndex(
          user => user.TaskNo == e.target.value
        );
        console.log(index);
        const newArr = this.state.TaskClickedArr.filter(
          (person, key) => key !== index
        );
        this.setState({ TaskClickedArr: newArr });
        return;
      }
    }
    const index = this.state.TaskClickedArr.findIndex(
      user => user.TaskNo == e.target.value
    );
    this.state.TasksTypeVar.unshift(this.state.TaskClickedArr[index]); 
    console.log(index);
    const newArr = this.state.TaskClickedArr.filter(
      (person, key) => key !== index
    );
    this.setState({ TaskClickedArr: newArr });
  };
  

  TaskClicked = e => {
    for (let index = 0; index < this.state.TaskClickedArr.length; index++) {
      const element = this.state.TaskClickedArr[index];
      if (element.TaskNo==e.target.value) {
        Swal.fire({
          icon: 'error',
          title: 'שים לב',
          text:  'משימה זו כבר קיימת ברשימת המשימות',
        })
        return;
      }
    }
    console.log(this.state.TaskClickedArr);
      let Name = "";
            for (let index = 0; index < this.props.TasksTypeVar.length; index++) {
        const element = this.props.TasksTypeVar[index];
        if (this.props.TasksTypeVar[index].TaskNo == e.target.value) {
          Name = element.TaskName;
        }
      }
      let TaskClicked = this.state.TaskClickedArr;
      TaskClicked.push({ TaskName: Name, TaskNo: e.target.value });
      this.setState({ TaskClickedArr: TaskClicked });

      const index2 = this.state.TasksTypeVar.findIndex(user => user.TaskNo == e.target.value);
console.log(index2);
const newTasksTypeVar = this.state.TasksTypeVar.filter(
  (person, key) => key !== index2
);

console.log(this.state.TaskClickedArr)

this.setState({TasksTypeVar:newTasksTypeVar})

  };

  searchedEquipment = e => {
    this.setState({ searchedEquipment: e.target.value });
  };
  searchedTasks = e => {
    this.setState({ searchedTasks: e.target.value });
  };
  EventNameChanged = e => {
    let counter = 0;
    this.setState({ EventNameEntered: e.target.value });
    setTimeout(
      function() {
        for (let index = 0; index < this.props.EventTypeVar.length; index++) {
          if (
            this.props.EventTypeVar[index].EventName ===
            this.state.EventNameEntered
          ) {
            counter = counter + 1;
            if ((counter = 1 | counter > 1)) {
              Swal.fire({
                icon: "error",
                title: "שם האירוע שהזנת קיים כבר במערכת",
                text: "אנא בחר שם אירוע שונה"
              });
              this.setState({ EventNameEntered: "" });
              continue;
            }
          }
        }
      }.bind(this),
      3000
    );
  };
  SaveNewEvent = async () => {
    if(this.state.EventNameEntered==""||this.state.EventNameEntered==null){
      Swal.fire({
        icon: "error",
        title: "שם סוג האירוע ריק",
        text: "אנא הזן שם סוג אירוע"
      });
    }
    else if(this.state.TaskClickedArr.length==0){
      Swal.fire({
        icon: "error",
        title: "לא נבחרו משימות לסוג האירוע",
        text: "אנא בחר סוגי משימות"
      });
    }
    else if(this.state.EquipClickedArr.length==0){
      Swal.fire({
        icon: "error",
        title: "לא נבחרו סוגי ציוד לסוג האירוע",
        text: "אנא בחר סוגי ציוד"
      });
    }
    else{
      let EventCode = 0;
      const Event_Type = {
        EventName: this.state.EventNameEntered
      };
      await this.props.PostEventType(Event_Type);
       this.props.GetEvents(); 
      setTimeout(
        function() {
          for (let index = 0; index < this.props.EventTypeVar.length; index++) {
            const element = this.props.EventTypeVar[index];
            console.log(this.props.EventTypeVar[index].EventName);
            if (
              this.props.EventTypeVar[index].EventName ==
              this.state.EventNameEntered
            ) {
              EventCode = element.EventCode;
              console.log(element.EventCode);
            }
          }
        }.bind(this),
        1000
      );    
      setTimeout(
        function() {
          for (
            let index = 0;
            index < this.state.EquipClickedArr.length;
            index++
          ) {
            const element = this.state.EquipClickedArr[index];
            let Event_Type_EquipmentType = {
              Event_TypeEventCode: EventCode,
              EquipmentTypeCode: element.Code
            };
            this.props.PostEvent_Type_EquipmentType(Event_Type_EquipmentType);
          }
        }.bind(this),
        1000
      );
  
      setTimeout(
        function() {
          for (let index = 0; index < this.state.TaskClickedArr.length; index++) {
            const element = this.state.TaskClickedArr[index];
            let Event_Type_Task = {
              Event_typeEventCode: EventCode,
              TaskTaskNo: element.TaskNo
            };
            this.props.PostEvent_Type_Task(Event_Type_Task);
          }
        }.bind(this),
        1000
      );
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "האירוע הוגדר במערכת בהצלחה",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(
        function() {
          this.setState({redirected:true})
        }.bind(this),
        1500
      );     
    } 
    
  
  };

  MoveToEquipTable=()=>{
    this.props.MyPreviousLocation('/EventTypes');
    this.props.history.push({
      pathname:'/EquipmentType',
      state:{TaskClickedArr: this.state.TaskClickedArr,
        EquipClickedArr: this.state.EquipClickedArr,
        TasksTypeVar: this.state.TasksTypeVar,
        EquipmentVar: this.state.EquipmentVar,
        EventNameEntered:this.state.EventNameEntered}
    })
  }
  MoveToTasksTable=()=>{
    this.props.MyPreviousLocation('/EventTypes');
    this.props.history.push({
      pathname:'/TasksType',
      state:{TaskClickedArr: this.state.TaskClickedArr,
        EquipClickedArr: this.state.EquipClickedArr,
        TasksTypeVar: this.state.TasksTypeVar,
        EquipmentVar: this.state.EquipmentVar,
        EventNameEntered:this.state.EventNameEntered}
    })
  }
  BackClicked=()=>{
    if(this.props.PrevLocation==="/Resources"&&!this.state.EditTableShow){
      this.props.MyPreviousLocation(window.location.pathname)
      this.props.history.push({
        pathname:'/Resources'
      })
    }
    else if(this.state.EditTableShow){
      this.setState({EditTableShow: false})
      this.props.history.push({
        pathname:'/EventTypes'
      })
    }
    else if(this.props.PrevLocation==="/ManageActivities"){
      this.props.MyPreviousLocation(window.location.pathname)
      this.props.history.push({
        pathname:'/ManageActivities'
      })
    }
    else{
      this.setState({EditTableShow: true})
    }
  }
  Homeclicked=()=>{
    this.setState({Homeclicked: true})
  }
  Logoutclicked=()=>{
    this.setState({Logoutclicked: true})

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'התנתקת מהמערכת בהצלחה',
      showConfirmButton: false,
      timer: 1200
    })  
  }

  render() {
    if(this.state.redirected){
      this.props.MyPreviousLocation(window.location.pathname)
      return <Redirect to='/'/>
    } 
    else if(this.state.Homeclicked){
      this.props.MyPreviousLocation(window.location.pathname)
      return <Redirect to='/'/>
    }
    else if(this.state.Logoutclicked){
      this.props.MyPreviousLocation(window.location.pathname)
      return <Redirect to='/login'/>
    }
    return (
      <div>

<div className="header">   
            
            <button className="back" onClick={this.BackClicked}></button>
            <button
              id="HomeBtn"
              className="home"
              onClick={this.Homeclicked}
            ></button>
 
            <button
            onClick={this.Logoutclicked}
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
        {this.state.EditTableShow?
           <div style={{padding:'0%'}}>
                        
           <MDBBtn id="IDMDBBTNn" onClick={this.addNewEventType} color="success">הוסף סוג אירוע חדש</MDBBtn>
           <MDBDataTable
           theadColor="#B5DBF8"
           paging={true}
           className='dataTable'
           sortable
           striped
           bordered
           hover
           paginationLabel={["הקודם", "הבא"]} 
           data={{
             columns:columns,
             rows:this.state.rows
           }}
           />
       </div>:     

      <div id="ManActDiv">
        
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>סוגי אירועים</h1>
            </div>
          </div>
        </nav>
        <div id="idDivInput">
          <input
          placeholder="אנא הזן שם סוג אירוע"
            id="ID_Input_EventType"
            value={this.state.EventNameEntered}
            onChange={this.EventNameChanged}
          ></input>{" "}
          <span id="IdSpan">שם סוג האירוע</span>
        
          <MDBBtn
          onClick={this.EditTableShow}
            id="idMDBBtnEditEvents"
            rounded
            color="warning"
          >
           הצג אירועים קיימים 
          </MDBBtn>
        {
          this.state.EditBtn?
          <div>
          <MDBBtn
            id="idMDBBtnSave"
            color="primary"
            onClick={this.PutExistEvent}
          >
            שמור עריכת אירוע קיים
          </MDBBtn>      
          </div>
          :
 <MDBBtn
 id="idMDBBtnSave"
 color="dark-green"
 onClick={this.SaveNewEvent}
>
 שמור אירוע חדש
</MDBBtn>
        }        
         
        </div>
        <div className="TaskEventsDiv">
          <table>
            <tr>
              <td id="tdLeft">
                <div id="divEquipment">
                  <h2>סוגי ציוד</h2>
                 
                    <MDBBtn rounded outline id="idMDBBtn" color="success" onClick={this.MoveToEquipTable}>
                    הוספה/עריכה
                    </MDBBtn>
              
                 
                  <input id="idInputSearchEq" onChange={this.searchedEquipment} placeholder="הזן סוג ציוד לחיפוש"></input>{" "}
                  <img src="https://img.icons8.com/material-outlined/20/000000/search.png" />
                  <div id="selectedEq">
                    {" "}
                    <h2>סוגי ציוד שנבחרו</h2>
                    {this.state.EquipClickedArr.map(data =>
                      data.Code == "" ? (
                        ""
                      ) : (
                        <div>
                          <label id="label_checkbox">{data.Name}</label>
                          <input id="input_checkbox"
                            value={data.Code}
                            checked
                            type="checkbox"
                            name={data}
                            label={data}
                            onChange={this.UncheckedEquip}
                          ></input>
                          
                        </div>
                      )
                    )}
                  </div>
                  {this.state.EquipmentVar.map(data =>
                    data.Name.includes(this.state.searchedEquipment) ? (
                      <div>
                        <button
                          className="btnEqs"
                          value={data.Code}
                          shaded
                          onClick={this.EquipmentClicked}
                          label="Button Success"
                          variant="success"
                        >
                          {" "}
                          {data.Name}
                        </button>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </td>
              <td id="tdRight">
                <div id="upperRight"> 
                  <h2>סוגי משימות</h2>
               
                    <MDBBtn rounded outline id="idMDBBtn" color="success" onClick={this.MoveToTasksTable}>
                  הוספה/עריכה
                    </MDBBtn>
                  
                  
                  <input id="intupTask" onChange={this.searchedTasks} placeholder="הזן סוג משימה לחיפוש"></input>{" "}
                  <img src="https://img.icons8.com/material-outlined/20/000000/search.png" />
                  <div id="selectedEq">
                    {" "}
                    <h2 id="IDH2">סוגי משימות שנבחרו</h2>
                    {this.state.TaskClickedArr.map(data =>
                      data.TaskNo == "" ? (
                        ""
                      ) : (
                        <div>
                           <label id="label_checkbox">{data.TaskName}</label>
                          <input id="input_checkbox"
                            value={data.TaskNo}
                            checked
                            type="checkbox"
                            name={data}
                            label={data}
                            onChange={this.UncheckedTasks}
                          ></input>
                         
                        </div>
                      )
                    )}
                  </div>
                  {this.state.TasksTypeVar.map(data =>
                    data.TaskName.includes(this.state.searchedTasks) ? (
                      <div className="DivOfBtn">
                        <button
                          className="btnTaskss"
                          value={data.TaskNo}
                          shaded
                          onClick={this.TaskClicked}
                          label="Button Success"
                          variant="success"
                        >
                          {" "}
                          {data.TaskName}
                        </button>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>}
      </div>
    );
  }
}

export default withRouter (CCEventType);
