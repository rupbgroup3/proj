import React, { Component } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Agodit from "../image/Agodit.png";
import { MDBDataTable,MDBBtn } from 'mdbreact';
import Swal from "sweetalert2";
import { stack as Menu } from "react-burger-menu";

 
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
 
class CCCalendar extends Component {
    constructor(props) {
        super(props);
        this.state={
            date: new Date(),
            ToggleRange: false,
            showTableActualEventAndActualTasks: false,
            rowsActualEvent: [],
            rowsTasksInActualEvent:[],
            rowsActualTasks:[],
            showTableTasksInActualEvent: false,
            SpecificEventName: "",
            DateVal: ""
        }
    }

    EditActualEvent=(data)=>{
      this.props.MyPreviousLocation('/Calendar');
      this.props.history.push({
        pathname:'/ActualEvent',
        state:{
          data: data
        }
      })
    }
    EditTaskInEvent=(data)=>{
      this.props.MyPreviousLocation('/Calendar');
      this.props.history.push({
        pathname:'/ActualTask',
        state:{
          data: data
        }
      })
    }
    EditActualTask=(data)=>{
      this.props.MyPreviousLocation('/Calendar2');
      this.props.history.push({
        pathname:'/ActualTask',
        state:{
          data: data
        }
      })
    }
    DeleteTaskInEvent=async(data)=>{
      Swal.fire({
        title: "?האם ברצונך למחוק את המשימה ",
        text: "לאחר אישור המחיקה לא ניתן יהיה לשחזר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then(async(result) => {
        if (result.value) {
          let Person_plan_TasksInEvent={
            PersonEmpCode: data.PersonEmpCode,
            plan_TasksInEventActual_EventBarcode: data.plan_TasksInEventActual_EventBarcode,
            plan_TasksInEventTaskTaskNo: data.plan_TasksInEventTaskTaskNo
          }
          await this.props.DeletePerson_plan_TasksInEvent(Person_plan_TasksInEvent);
          await this.props.GetTotalTasksInEventPer();
         
           Swal.fire(
            '!נמחק',
            'המשימה נמחקה',
            'success'
          )  
          setTimeout(
            function() {
              this.show(this.state.DateVal);
            }
            .bind(this),
            700
        );

        }
      })   
    }
    DeleteActualEvent=async(data)=>{
      Swal.fire({
        title: "?האם ברצונך למחוק את האירוע ",
        text: "לאחר אישור המחיקה ימחקו המשימות והציוד המשוייכים לאירוע זה",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then(async(result) => {
        if (result.value) {

          for (let index = 0; index < this.props.Person_plan_TasksInEvent.length; index++) {
            const element = this.props.Person_plan_TasksInEvent[index];
            if (element.plan_TasksInEventActual_EventBarcode==data.Barcode) {
              let Person_plan_TasksInEvent={
                PersonEmpCode: element.PersonEmpCode,
                plan_TasksInEventActual_EventBarcode: element.plan_TasksInEventActual_EventBarcode,
                plan_TasksInEventTaskTaskNo: element.plan_TasksInEventTaskTaskNo
              }
               this.props.DeletePerson_plan_TasksInEvent(Person_plan_TasksInEvent);
            }
          }
    
          for (let index = 0; index < this.props.EquipmentType_Actual_Event.length; index++) {
            const element = this.props.EquipmentType_Actual_Event[index];
            if (element.Actual_EventBarcode== data.Barcode) {
              let EquipmentType_Actual_Event={
                Actual_EventBarcode: data.Barcode
              }
               this.props.DeleteEquipmentType_Actual_Event(EquipmentType_Actual_Event);
            }
          }   
          let Barcode= data.Barcode;

          setTimeout(
            function() {
              this.DeleteActualEventFromApp(Barcode); 
              this.show(this.state.DateVal);
            }
            .bind(this),
            900
        );
        
                             
           Swal.fire(
            '!נמחק',
            'האירוע והמשוייך לו נמחקו',
            'success'
          )  
              

        }
      })   
    }

    DeleteActualEventFromApp=(Barcode)=>{
      this.props.DeleteActualEvent(Barcode);
    }

    DeleteActualTask=(data)=>{
      Swal.fire({
        title: "?האם ברצונך למחוק את המשימה ",
        text: "לאחר אישור המחיקה לא ניתן יהיה לשחזר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then(async(result) => {
        if (result.value) {
          let Task_Person={
            TaskTaskNo: data.TaskTaskNo,
            PersonEmpCode: data.PersonEmpCode,
            FromHour: data.FromHour
          }
          await this.props.DeleteActualTask(Task_Person)       
           Swal.fire(
            '!נמחק',
            'המשימה נמחקה',
            'success'
          )  
          setTimeout(
            function() {
              this.show(this.state.DateVal);
            }
            .bind(this),
            700
        );

        }
      })   


    }

    ShowTasksInEvents= async(data)=>{
      this.setState({showTableActualEventAndActualTasks: false,
        showTableTasksInActualEvent: true,
      SpecificEventName: data.EventName});
        let RowstoInsert= [];
        for (let index = 0; index < this.props.TotalTaskInEventPerVar.length; index++) {
          const element = this.props.TotalTaskInEventPerVar[index];
          if (element.plan_TasksInEventActual_EventBarcode== data.Barcode) {
            RowstoInsert.push(element)
          }
        }
      await this.setState({
        rowsTasksInActualEvent: RowstoInsert.map(data => ({
           TaskName: data.TaskName,
           executionDate: new Date(data.executionDate).toLocaleDateString().split(','),
           EmpName: data.EmpFirstName + " "+ data.EmpLastName,  
           FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
           ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

           actions: (
             <div style={{ textAlign: "center" }}>
               <MDBBtn onClick={() => this.EditTaskInEvent(data)} color="warning">
               <img src="https://img.icons8.com/android/17/000000/edit.png"/>
               </MDBBtn>
               <MDBBtn
                 onClick={() => this.DeleteTaskInEvent(data)}
                 color="danger"
               >
                 <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
               </MDBBtn>

             </div>
           )
         }))
       });
    }

    GetCalendarActualEventRangeDate=async(CalendarActualEvent)=>{
      await this.props.GetCalendarActualEventRangeDate(CalendarActualEvent);
      await this.setState({
        rowsActualEvent: this.props.CalendarActualEventRangeDate.map(data => ({
           EventName: data.EventName,
           executionDate: new Date(data.date).toLocaleDateString().split(','),
           EmpName: data.EmpFirstName+ " "+ data.EmpLastName,
           FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
           ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

           actions: (
             <div style={{ textAlign: "center" }}>
                <MDBBtn
                 onClick={() => this.ShowTasksInEvents(data)}
                 color="info"
               >
                 <img src="https://img.icons8.com/material/17/000000/task.png"/>
               </MDBBtn>
               <MDBBtn onClick={() => this.EditActualEvent(data)} color="warning">
               <img src="https://img.icons8.com/android/17/000000/edit.png"/>
               </MDBBtn>
               <MDBBtn
                 onClick={() => this.DeleteActualEvent(data)}
                 color="danger"
               >
                 <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
               </MDBBtn>

             </div>
           )
         }))
       });
    }

    GetCalendarActualTaskRangeDate=async(CalendarActualTask)=>{
      await this.props.GetCalendarActualTaskRangeDate(CalendarActualTask);
      await this.props.GetCalendarActualTaskInEventRangeDate(CalendarActualTask);

      let rowstoinsert= [];

      this.props.CalendarActualTaskRangeDate.map(data => (rowstoinsert.push({
        TaskName: data.TaskName,
        exceutionDate: new Date(data.exceutionDate).toLocaleDateString().split(','),
        EmpName: data.EmpFirstName+ " "+ data.EmpLastName,
        FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
        ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

        actions: (
          <div style={{ textAlign: "center" }}>

            <MDBBtn onClick={() => this.EditActualTask(data)} color="warning">
            <img src="https://img.icons8.com/android/17/000000/edit.png"/>
            </MDBBtn>
            <MDBBtn 
              onClick={() => this.DeleteActualTask(data)}
              color="danger"
            >
              <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
            </MDBBtn>

          </div>
        )
      })))

       this.props.CalendarActualTaskInEventRangeDate.map(data => (
        rowstoinsert.push(
        {
          TaskName: data.TaskName,
          exceutionDate: new Date(data.executionDate).toLocaleDateString().split(','),
          EmpName: data.EmpFirstName + " "+ data.EmpLastName,  
          FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
          ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

          actions: (
            <div style={{ textAlign: "center" }}>
              <MDBBtn onClick={() => this.EditTaskInEvent(data)} color="warning">
              <img src="https://img.icons8.com/android/17/000000/edit.png"/>
              </MDBBtn>
              <MDBBtn
                onClick={() => this.DeleteTaskInEvent(data)}
                color="danger"
              >
                <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
              </MDBBtn>

            </div>
          )
        })))

        this.setState({
          rowsActualTasks: rowstoinsert
        })  
    }


    GetCalendarActualEventOneDate= async(CalendarActualEvent)=>{
      await this.props.GetCalendarActualEventOneDate(CalendarActualEvent);

      await this.setState({
        rowsActualEvent: this.props.CalendarActualEventOneDate.map(data => ({
           EventName: data.EventName,
           executionDate: new Date(data.date).toLocaleDateString().split(','),
           EmpName: data.EmpFirstName+ " "+ data.EmpLastName,
           FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
           ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

           actions: (
             <div style={{ textAlign: "center" }}>
                <MDBBtn 
                 onClick={() => this.ShowTasksInEvents(data)}
                 color="info"
               >
                 <img src="https://img.icons8.com/material/17/000000/task.png"/>
               </MDBBtn>
               <MDBBtn onClick={() => this.EditActualEvent(data)} color="warning">
               <img src="https://img.icons8.com/android/17/000000/edit.png"/>
               </MDBBtn>
               <MDBBtn 
                 onClick={() => this.DeleteActualEvent(data)}
                 color="danger"
               >
                 <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
               </MDBBtn>

             </div>
           )
         }))
       });
    }

    GetCalendarActualTaskOneDate=async(CalendarActualTask)=>{
      await this.props.GetCalendarActualTaskOneDate(CalendarActualTask);
      await this.props.GetCalendarActualTaskInEventOneDate(CalendarActualTask);
      let rowstoinsert= [];

      this.props.CalendarActualTaskOneDate.map(data => (rowstoinsert.push({
        TaskName: data.TaskName,
        exceutionDate: new Date(data.exceutionDate).toLocaleDateString().split(','),
        EmpName: data.EmpFirstName+ " "+ data.EmpLastName,
        FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
        ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

        actions: (
          <div style={{ textAlign: "center" }}>

            <MDBBtn onClick={() => this.EditActualTask(data)} color="warning">
            <img src="https://img.icons8.com/android/17/000000/edit.png"/>
            </MDBBtn>
            <MDBBtn 
              onClick={() => this.DeleteActualTask(data)}
              color="danger"
            >
              <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
            </MDBBtn>

          </div>
        )
      })))

       this.props.CalendarActualTaskInEventOneDate.map(data => (
        rowstoinsert.push(
        {
          TaskName: data.TaskName,
          exceutionDate: new Date(data.executionDate).toLocaleDateString().split(','),
          EmpName: data.EmpFirstName + " "+ data.EmpLastName,  
          FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
          ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",

          actions: (
            <div style={{ textAlign: "center" }}>
              <MDBBtn onClick={() => this.EditTaskInEvent(data)} color="warning">
              <img src="https://img.icons8.com/android/17/000000/edit.png"/>
              </MDBBtn>
              <MDBBtn
                onClick={() => this.DeleteTaskInEvent(data)}
                color="danger"
              >
                <img src="https://img.icons8.com/material/17/000000/delete--v1.png"/>
              </MDBBtn>

            </div>
          )
        })))

        this.setState({
          rowsActualTasks: rowstoinsert
        })
    }
    CloseTasksInEventTBL=()=>{
      this.setState({
        showTableActualEventAndActualTasks: true,
        showTableTasksInActualEvent: false
      })
    }

    show= async(value)=>{
      if(this.state.showTableTasksInActualEvent){
        this.setState({showTableTasksInActualEvent:false})
      }
      let temp= "";
      this.setState({
        showTableActualEventAndActualTasks:true
      })

        if(this.state.ToggleRange){
            setTimeout(
                function() {
                    //  alert(value[0])
                    //  alert(value[1])

                    let newdateFrom= (new Date(value[0]).toLocaleDateString()).split('.');
                    let fulldateFrom= "";
                    if (newdateFrom[1]<10&&newdateFrom[0]<10 ) {
                      fulldateFrom= newdateFrom[2]+"-0"+newdateFrom[1]+"-0"+ newdateFrom[0];
                    }
                    else if(newdateFrom[1]<10&&newdateFrom[0]<10==false){
                      fulldateFrom= newdateFrom[2]+"-0"+newdateFrom[1]+"-"+ newdateFrom[0];
                    }
                    else if(newdateFrom[1]<10==false&&newdateFrom[0]<10){
                      fulldateFrom= newdateFrom[2]+"-"+newdateFrom[1]+"-0"+ newdateFrom[0];
                    }
                    else {
                      fulldateFrom= newdateFrom[2]+"-"+newdateFrom[1]+"-"+ newdateFrom[0];
                    }

                    let newdateTo= (new Date(value[1]).toLocaleDateString()).split('.');
                    let fulldateTo= "";
                    if (newdateTo[1]<10&&newdateTo[0]<10 ) {
                      fulldateTo= newdateTo[2]+"-0"+newdateTo[1]+"-0"+ newdateTo[0];
                    }
                    else if(newdateTo[1]<10&&newdateTo[0]<10==false){
                      fulldateTo= newdateTo[2]+"-0"+newdateTo[1]+"-"+ newdateTo[0];
                    }
                    else if(newdateTo[1]<10==false&&newdateTo[0]<10){
                      fulldateTo= newdateTo[2]+"-"+newdateTo[1]+"-0"+ newdateTo[0];
                    }
                    else {
                      fulldateTo= newdateTo[2]+"-"+newdateTo[1]+"-"+ newdateTo[0];
                    }

                    let CalendarActualEvent={
                      FromDate:fulldateFrom,
                      ToDate: fulldateTo
                    }   
                    this.GetCalendarActualEventRangeDate(CalendarActualEvent); 
                    this.GetCalendarActualTaskRangeDate(CalendarActualEvent);  
                    this.setState({DateVal: value})
            }
              .bind(this),
              1000); 
     
        }
        else{

            setTimeout(
               async function() {
                    // alert(new Date(value).toLocaleDateString())
                    let newdate= (new Date(value).toLocaleDateString()).split('.');
                    let fulldate= "";
                    if (newdate[1]<10&&newdate[0]<10 ) {
                        fulldate= newdate[2]+"-0"+newdate[1]+"-0"+ newdate[0];
                    }
                    else if(newdate[1]<10&&newdate[0]<10==false){
                        fulldate= newdate[2]+"-0"+newdate[1]+"-"+ newdate[0];
                    }
                    else if(newdate[1]<10==false&&newdate[0]<10){
                        fulldate= newdate[2]+"-"+newdate[1]+"-0"+ newdate[0];
                    }
                    else {
                        fulldate= newdate[2]+"-"+newdate[1]+"-"+ newdate[0];
                    }
                    let CalendarActualEvent={
                      FromDate:fulldate
                    }   
                    this.GetCalendarActualEventOneDate(CalendarActualEvent);
                    this.GetCalendarActualTaskOneDate(CalendarActualEvent)  
                    this.setState({DateVal: value})               
            }
              .bind(this),
              1000);                       
        }         
    }

    ClickedSelectRange=()=>{
        this.setState({ToggleRange: true})
    }
    ClickedCancelSelectRange=()=>{
        this.setState({ToggleRange: false})
    }
    componentDidMount(){
      this.props.GetTotalTasksInEventPer();
      this.props.GetEquipmentType_Actual_Event();
      this.props.GetPerson_plan_TasksInEvent();

      let today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let TodayDate= (date.toString()).split('-');
      let years= TodayDate[0];
      let month="";
      let day= "";
      if (TodayDate[1]<10) {
        month= "0"+TodayDate[1];
      }
      else{
        month= TodayDate[1];
      }
      if(TodayDate[2]<10){
        day= "0"+TodayDate[2];
      }
      else{
        day= TodayDate[2];
      }
      let FullCurrentDate= years+"-"+month+"-"+ day;

      this.show(FullCurrentDate);
    }

    LogOutClicked = () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "התנתקת מהמערכת בהצלחה",
        showConfirmButton: false,
        timer: 1200,
      });
      this.props.history.push({
        pathname: "/",
      });
    };
  
    HomeClicked=()=>{
      this.props.history.push({
        pathname: "/home",
      });
    }
    ManageActivitiesClicked=()=>{
      this.props.history.push({
        pathname: "/ManageActivities",
      });
    }
    ResourcesClicked=()=>{
      this.props.history.push({
        pathname: "/Resources",
      });
    }
     
  render() {
    const columnsActualEvent =  [
      {           
        label: 'שם אחראי',
        field: 'EmpName',
        sort: 'asc',
        width: 150
        },
      {           
          label: 'עד שעה',
          field: 'ToHour',
          sort: 'asc',
          width: 150
          },
      {           
        label: 'משעה',
        field: 'FromHour',
        sort: 'asc',
        width: 150
        },
        {
          label: 'תאריך',
          field: 'executionDate',
          sort: 'asc',
          width: 150
          },
      {
      label: 'שם אירוע ',
      field: 'EventName',
      sort: 'asc',
      width: 200
      },
      {
        label: "פעולות",
        field: "actions",
        sort: "asc",
        width: 80
      }]  
      
      const columnsTasksInEvent =  [
        {           
          label: 'שם מבצע',
          field: 'EmpName',
          sort: 'asc',
          width: 150
          },
        {           
            label: 'עד שעה',
            field: 'ToHour',
            sort: 'asc',
            width: 150
            },
        {           
          label: 'משעה',
          field: 'FromHour',
          sort: 'asc',
          width: 150
          },
          {
            label: 'תאריך',
            field: 'executionDate',
            sort: 'asc',
            width: 150
            },
        {
        label: 'שם משימה ',
        field: 'TaskName',
        sort: 'asc',
        width: 200
        },
        {
          label: "פעולות",
          field: "actions",
          sort: "asc",
          width: 80
        }] 
        const columnsActualTasks =  [
          {           
            label: 'שם מבצע',
            field: 'EmpName',
            sort: 'asc',
            width: 150
            },
          {           
              label: 'עד שעה',
              field: 'ToHour',
              sort: 'asc',
              width: 150
              },
          {           
            label: 'משעה',
            field: 'FromHour',
            sort: 'asc',
            width: 150
            },
            {
              label: 'תאריך',
              field: 'exceutionDate',
              sort: 'asc',
              width: 150
              },
          {
          label: 'שם משימה ',
          field: 'TaskName',
          sort: 'asc',
          width: 200
          },
          {
            label: "פעולות",
            field: "actions",
            sort: "asc",
            width: 80
          }]       

    return (
<div >
        <div className="header"> 
        <Menu disableAutoFocus right >

<a className="menu-item"  onClick={this.HomeClicked}>
<i id="homei" class="fas fa-home"> </i>
  מסך הבית
</a>


<a className="menu-item" onClick={this.ManageActivitiesClicked}>
<i id="manageactivitiesi" class="fas fa-bell"></i>
  פעילויות
</a>


<a className="menu-item" onClick={this.ResourcesClicked}>
<i id="resourcesi" class="fas fa-globe"></i>
  משאבים
</a>


<a className="menu-item">
<i id="calendari" class="far fa-calendar-alt"></i>
  לוח שנה
</a>

<a className="menu-item" onClick={this.LogOutClicked}>
<i id="logouti" class="fas fa-sign-out-alt"></i>
  התנתק
</a>

</Menu> 
        <Link to='/home'>        
        <button className="back"></button>  
        </Link>  

      <div className="LogoDiv">
    <img className="Agodit" src={Agodit}></img>
    <h1 className="AgoditText">אגודית</h1>
  </div>

      </div>
      <br/>
      <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>לוח שנה</h1>
            
            </div>
          </div>
        </nav>
<div id="calendarDiv">
<br/>  <br/>
{
    this.state.ToggleRange?
 
 <MDBBtn outline color="light-yellow"  id="ToggleDateToRange" onClick={this.ClickedCancelSelectRange} >לחץ לבחירת תאריך ספציפי</MDBBtn>:
<MDBBtn outline color="grey"  id="ToggleDateToRange" onClick={this.ClickedSelectRange} >לחץ לבחירת טווח תאריכים</MDBBtn>
}

<Calendar

selectRange={this.state.ToggleRange}
	onChange={(value) => this.show(value)}
 calendarType='Hebrew'
  
        />
  
</div>
<br/>
{
  this.state.showTableActualEventAndActualTasks?
  
  <div style={{backgroundColor: "transparent"}} className="modal-content animate" action="/action_page.php">
    <div className='row'> 
    <div className='col-xl-6'>
    <h1 id="h1CalendarResults">:אירועים</h1>
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
                  columns:columnsActualEvent,
                  rows:this.state.rowsActualEvent
                }}
                />
   </div>
   <div className='col-xl-6'>
 <h1 id="h1CalendarResults">:משימות</h1>
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
                  columns:columnsActualTasks,
                  rows:this.state.rowsActualTasks
                }}
                />
  </div>
 </div>
</div>:""
}
{
  this.state.showTableTasksInActualEvent?
  <div style={{backgroundColor: "transparent"}}  className="modal-content animate" action="/action_page.php">
  
  <MDBBtn outline color="blue-grey"  id="BackToRegularTabelsView" onClick={this.CloseTasksInEventTBL} >חזור להצגה כוללת</MDBBtn>
     <h1 id="h1CalendarResults"> משימות שבאירוע: {this.state.SpecificEventName} </h1>
   

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
                  columns:columnsTasksInEvent,
                  rows:this.state.rowsTasksInActualEvent
                }}
                />
</div>:""
}

</div>
     

    );
  
  }
}
export default withRouter (CCCalendar)