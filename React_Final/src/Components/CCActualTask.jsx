import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";
import "../CssFiles/ActualTask.css";

class CCActualTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TasksTypeVar: this.props.TasksTypeVar,
      data:"",
      StartHour: "",
      FinishHour: "",
      DateEx: new Date(),
      ActualTaskVar: this.props.ActualTaskVar,
      EmpCodesArr: [],
      AddingEmpsModal: false,
      rows: [],
      today: "",
      TaskClickedArr: [],
      EquipClickedArr:[],
      EventName: "",
      Barcode: "",
      TaskIndex: 0,
      Person_plan_TasksInEvent:[]
    }
  }
  
  SaveActualTask=async(evt)=>{
    evt.preventDefault();
    let counter=0;
    let StartTimeToSQL= 0;
    let FinishTimeToSQL=0;
    
    // מניפולצייה לשעת התחלת המשימה כדי להכניס בפוסט לאסקיואל
    let SplittedStartHour= this.state.StartHour.split(':');
    let hours= SplittedStartHour[0];
    let mins= SplittedStartHour[1];
    let Starthoursmanip= hours*60;
    let Startminsmanip= mins/60;
   // את המשתנה הבא נכניס בפוסט בתוך שעת התחלה בתוך הג'ייסון
    StartTimeToSQL= Starthoursmanip+Startminsmanip;
   // מניפולציה לשעת סיום המשימה כדי להכניס בפוסט לאסקיואל
    let SplittedFinishHour= this.state.FinishHour.split(':');
    let hoursF= SplittedFinishHour[0];
    let minsF= SplittedFinishHour[1];
    let Finishhoursmanip= hoursF*60;
    let Finishminsmanip= minsF/60;
    // את המשתנה הבא נכניס בפוסט בתור שעת סיום בתוך הג'ייסון
     FinishTimeToSQL= Finishhoursmanip+Finishminsmanip;
     if(this.props.PrevLocation=='/EquipAndTaskInActualEvent'){
      for (let index1 = 0; index1 < this.props.ActualTaskVar.length; index1++) {
        const element = this.props.ActualTaskVar[index1];
        for (let index2 = 0; index2 < this.state.EmpCodesArr.length; index2++) {
          const element2 = this.state.EmpCodesArr[index2];
          for (let index3 = 0; index3 < this.props.Person_plan_TasksInEvent.length; index3++) {
            const element3 = this.props.Person_plan_TasksInEvent[index3];
            for (let index4 = 0; index4 < this.props.Actual_Event.length; index4++) {
              const element4 = this.props.Actual_Event[index4];
              if ((((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour> FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
              ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour< FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
              ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour> FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) &&(element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
              ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour< FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) && (element.ToHour>StartTimeToSQL)&& (element.FromHour< FinishTimeToSQL))
              
      
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode)&&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode) &&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode) &&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) &&(element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))  
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode)&&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) && (element3.ToHour>StartTimeToSQL)&& (element3.FromHour< FinishTimeToSQL))   
              
              
             ) {
              counter++;
               Swal.fire({
                 icon: 'error',                      
                 title: 'מתנדב אחד או יותר משובצים למשימה חופפת',
                 text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ מתנדב אחר למשימה- ניתן לבדק שיבוצים בלוח משימות ואירועים עתידיים' ,
               })        
               return;
             }
             else if(
              ((((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode)&&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
              ||(((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode) &&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
              ||(((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode) &&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) &&(element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))  
              ||(((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode)&&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) && (element4.ToHour>StartTimeToSQL)&& (element4.FromHour< FinishTimeToSQL)) )  
             ) {
              counter++;
              Swal.fire({
                icon: 'error',                      
                title: 'אחראי האירוע משובץ בתור אחראי',
                text: 'לא ניתן לשבץ אחראי אירוע גם בתור מבצע משימה, אנא בטל שיבוץ זה במשימה הנוכחית' ,
              })        
              return;
             }
            }
          }
        }
      }
    }
    else if(this.props.PrevLocation=='/Calendar'){
      let Person_plan_TasksInEvent={
        PersonEmpCode: this.props.location.state.data.PersonEmpCode,
        plan_TasksInEventActual_EventBarcode: this.props.location.state.data.plan_TasksInEventActual_EventBarcode,
        plan_TasksInEventTaskTaskNo: this.props.location.state.data.plan_TasksInEventTaskTaskNo
      }
      await this.DeletePerson_plan_TasksInEvent(Person_plan_TasksInEvent);

      let EmpCodesArr= [];
      EmpCodesArr.push(this.props.location.state.data.PersonEmpCode);

      for (let index1 = 0; index1 < this.props.ActualTaskVar.length; index1++) {
        const element = this.props.ActualTaskVar[index1];
        for (let index2 = 0; index2 < EmpCodesArr.length; index2++) {
          const element2 = EmpCodesArr[index2];
          for (let index3 = 0; index3 < this.props.Person_plan_TasksInEvent.length; index3++) {
            const element3 = this.props.Person_plan_TasksInEvent[index3];
            for (let index4 = 0; index4 < this.props.Actual_Event.length; index4++) {
              const element4 = this.props.Actual_Event[index4];
              if ((((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour> FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
              ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour< FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
              ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour> FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) &&(element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
              ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour< FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) && (element.ToHour>StartTimeToSQL)&& (element.FromHour< FinishTimeToSQL))
              
      
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode)&&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode) &&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode) &&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) &&(element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))  
              ||(((element3.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode)&&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) && (element3.ToHour>StartTimeToSQL)&& (element3.FromHour< FinishTimeToSQL))   
                    
             ) {
              counter++;
               Swal.fire({
                 icon: 'error',                      
                 title: 'מתנדב אחד או יותר משובצים למשימה חופפת',
                 text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ מתנדב אחר למשימה- ניתן לבדק שיבוצים בלוח משימות ואירועים עתידיים' ,
               })        
               return;
             }
             else if(
              ((((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode)&&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
              ||(((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode) &&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
              ||(((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode) &&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) &&(element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))  
              ||(((element4.date.toString())==(this.state.DateEx.toString()))&& (element2==element4.EmployeeEmpCode)&&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) && (element4.ToHour>StartTimeToSQL)&& (element4.FromHour< FinishTimeToSQL)) )  
             ) {
              counter++;
              Swal.fire({
                icon: 'error',                      
                title: 'אחראי האירוע משובץ בתור אחראי',
                text: 'לא ניתן לשבץ אחראי אירוע גם בתור מבצע משימה, אנא בטל שיבוץ זה במשימה הנוכחית' ,
              })        
              return;
             }
            }
          }
        }
      }   
    }
    else if(this.props.PrevLocation=='/Calendar2'){
      let Task_Person={
        TaskTaskNo: this.props.location.state.data.TaskTaskNo,
        PersonEmpCode: this.props.location.state.data.PersonEmpCode,
        FromHour: this.props.location.state.data.FromHour
      }
      await this.props.DeleteActualTask(Task_Person);

      let EmpCodesArr= [];
      EmpCodesArr.push(this.props.location.state.data.PersonEmpCode);

      for (let index1 = 0; index1 < this.props.ActualTaskVar.length; index1++) {
        const element = this.props.ActualTaskVar[index1];
        for (let index2 = 0; index2 < EmpCodesArr.length; index2++) {
          const element2 = EmpCodesArr[index2];
          if ((((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour> FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
           ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour< FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
           ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour> FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) &&(element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
           ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour< FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) && (element.ToHour>StartTimeToSQL)&& (element.FromHour< FinishTimeToSQL))
                 
          ) {
           counter++;
            Swal.fire({
              icon: 'error',                      
              title: 'מתנדב אחד או יותר משובצים למשימה חופפת',
              text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ מתנדב אחר למשימה- ניתן לבדק שיבוצים בלוח משימות ואירועים עתידיים' ,
            })        
            return;
          } 
        }
      }
    }
    else{
      for (let index1 = 0; index1 < this.props.ActualTaskVar.length; index1++) {
        const element = this.props.ActualTaskVar[index1];
        for (let index2 = 0; index2 < this.state.EmpCodesArr.length; index2++) {
          const element2 = this.state.EmpCodesArr[index2];
          if ((((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour> FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
           ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour< FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
           ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode) &&(element.ToHour> FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) &&(element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
           ||(((element.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element.PersonEmpCode)&&(element.ToHour< FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) && (element.ToHour>StartTimeToSQL)&& (element.FromHour< FinishTimeToSQL))
                 
          ) {
           counter++;
            Swal.fire({
              icon: 'error',                      
              title: 'מתנדב אחד או יותר משובצים למשימה חופפת',
              text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ מתנדב אחר למשימה- ניתן לבדק שיבוצים בלוח משימות ואירועים עתידיים' ,
            })        
            return;
          } 
        }
      }
    }
 
        if(this.state.EmpCodesArr.length==0&& this.props.PrevLocation!='/Calendar' && this.props.PrevLocation!='/Calendar2'){
          Swal.fire({
            icon: 'error',
            title: 'לא נבחרו מבצעי משימה',
            text: 'אנא בחר מבצעי משימה למשימה זו',
          })
          evt.preventDefault();
         }
         else if(this.state.StartHour==this.state.FinishHour){
          Swal.fire({
            icon: 'error',
            title: 'שעת ההתחלה ושעת הסיום אינם יכולים להיות זהים',
            text: 'אנא שנה את שעת ההתחלה או הסיום כרצונך',
          })
          evt.preventDefault();
         }
         else if(this.state.StartHour>this.state.FinishHour){
          Swal.fire({
            icon: 'error',
            title: 'שעת סיום אינה יכולה להיות מוקדמת יותר משעת ההתחלה',
            text: 'אנא שנה את שעת ההתחלה או הסיום כאשר שעת הסיום תהיה מאוחרת יותר משעת ההתחלה',
          })
          evt.preventDefault();
         }
         else if(counter<1 &&this.props.PrevLocation=='/Calendar'){
          let Person_plan_TasksInEvent={
            PersonEmpCode : this.props.location.state.data.PersonEmpCode,
            plan_TasksInEventActual_EventBarcode: this.props.location.state.data.plan_TasksInEventActual_EventBarcode,
            plan_TasksInEventTaskTaskNo: this.props.location.state.data.plan_TasksInEventTaskTaskNo,
            FromHour: StartTimeToSQL,
            ToHour: FinishTimeToSQL,
            executionDate: this.state.DateEx.toString()
           }
           await this.PostToActualOneTaskInEvent(Person_plan_TasksInEvent);


       Swal.fire({
        position: 'center',
      icon: 'success',
      title: 'המשימה עודכנה בהצלחה',
      showConfirmButton: false,
      timer: 1200
     });
     this.props.MyPreviousLocation('/ActualTask');
     this.props.history.push({
      pathname:'/Calendar'
    }) 
  }
  else if(counter<1 &&this.props.PrevLocation=='/Calendar2'){
  
    let Task_Person={
      TaskTaskNo:  this.props.location.state.data.TaskTaskNo,
      PersonEmpCode: this.props.location.state.data.PersonEmpCode,
      FromHour: StartTimeToSQL,
      ToHour: FinishTimeToSQL,
      ReportedByPerson: "false",
      ApprovedByManager: "false",
      exceutionDate: this.state.DateEx.toString()
    }
    
     this.props.PostActualTask(Task_Person);
    
    Swal.fire({
      position: 'center',
    icon: 'success',
    title: 'המשימה עודכנה בהצלחה',
    showConfirmButton: false,
    timer: 1200
   });
   this.props.MyPreviousLocation('/ActualTask');
   this.props.history.push({
    pathname:'/Calendar'
  }) 
  }
         else if(counter<1&& this.props.PrevLocation=='/EquipAndTaskInActualEvent'  && this.state.TaskIndex!= this.props.location.state.TaskClickedArr.length-1){
           let Person_plan_TasksInEventState= this.state.Person_plan_TasksInEvent;

         for (let index = 0; index < this.state.EmpCodesArr.length; index++) {
          const element = this.state.EmpCodesArr[index];
          console.log(element)
          let Person_plan_TasksInEvent={
            PersonEmpCode : element,
            plan_TasksInEventActual_EventBarcode: this.props.location.state.Barcode,
            plan_TasksInEventTaskTaskNo: this.props.location.state.TaskClickedArr[this.state.TaskIndex].TaskNo,
            FromHour: StartTimeToSQL,
            ToHour: FinishTimeToSQL,
            executionDate: this.state.DateEx.toString()
           }

         Person_plan_TasksInEventState.push(Person_plan_TasksInEvent);
        }        
        this.setState({Person_plan_TasksInEvent:Person_plan_TasksInEventState })
        this.TaskIndex();
        this.CleanValues();
         }

         else if(counter<1&& this.props.PrevLocation=='/EquipAndTaskInActualEvent'  && this.state.TaskIndex== this.props.location.state.TaskClickedArr.length-1){
          let Person_plan_TasksInEventState= this.state.Person_plan_TasksInEvent;

          for (let index = 0; index < this.state.EmpCodesArr.length; index++) {
           const element = this.state.EmpCodesArr[index];
           console.log(element)
           let Person_plan_TasksInEvent={
             PersonEmpCode : element,
             plan_TasksInEventActual_EventBarcode: this.props.location.state.Barcode,
             plan_TasksInEventTaskTaskNo: this.props.location.state.TaskClickedArr[this.state.TaskIndex].TaskNo,
             FromHour: StartTimeToSQL,
             ToHour: FinishTimeToSQL,
             executionDate: this.state.DateEx.toString()
            }
 
          Person_plan_TasksInEventState.push(Person_plan_TasksInEvent);
         }
         this.setState({Person_plan_TasksInEvent:Person_plan_TasksInEventState })

         this.PostAllTasksIntoActualEvent(evt);

         }
        else if(counter<1 &&this.props.PrevLocation!='/EquipAndTaskInActualEvent'){  
        for (let index = 0; index < this.state.EmpCodesArr.length; index++) {
       
          const element = this.state.EmpCodesArr[index];
          console.log(element)
          let Task_Person={
          TaskTaskNo:  this.props.location.state.data.TaskNo,
          PersonEmpCode: element,
          FromHour: StartTimeToSQL,
          ToHour: FinishTimeToSQL,
          ReportedByPerson: "false",
          ApprovedByManager: "false",
          exceutionDate: this.state.DateEx.toString()
        }
         this.props.PostActualTask(Task_Person);
        }
        
        Swal.fire({
          position: 'center',
        icon: 'success',
        title: 'המשימה נשמרה בהצלחה',
        showConfirmButton: false,
        timer: 1200
       });
       this.props.MyPreviousLocation('/ActualTask');
       this.props.history.push({
        pathname:'/ManageActivities'
      }) 

    }   
  }

  PostToActualOneTaskInEvent=async(Person_plan_TasksInEvent)=>{
    await this.props.PostPerson_plan_TasksInEvent(Person_plan_TasksInEvent);
  }

DeletePerson_plan_TasksInEvent=async(Person_plan_TasksInEvent)=>{
  await this.props.DeletePerson_plan_TasksInEvent(Person_plan_TasksInEvent);
}

  PostAllTasksIntoActualEvent=async(evt)=>{
    evt.preventDefault();

    setTimeout(
     await function() {
        for (let index = 0; index < this.state.Person_plan_TasksInEvent.length; index++) {
          const element = this.state.Person_plan_TasksInEvent[index];
          console.log(element);
          let Person_plan_TasksInEvent={
            PersonEmpCode: element.PersonEmpCode,
            plan_TasksInEventActual_EventBarcode: element.plan_TasksInEventActual_EventBarcode,
            plan_TasksInEventTaskTaskNo: element.plan_TasksInEventTaskTaskNo,
            FromHour: element.FromHour,
            ToHour: element.ToHour,
            executionDate: element.executionDate
          }
           this.props.PostPerson_plan_TasksInEvent(Person_plan_TasksInEvent);
        } 
        
      }.bind(this),
      1500
    );
      
    setTimeout(
      await function() {
        for (let index = 0; index < this.props.location.state.EquipClickedArr.length; index++) {
          const element = this.props.location.state.EquipClickedArr[index];
          let EquipmentType_Actual_Event={
            EquipmentTypeCode: element.Code,
            Actual_EventBarcode: this.props.location.state.Barcode 
          }
           this.props.PostEquipmentType_Actual_Event(EquipmentType_Actual_Event);
        }

        this.props.MyPreviousLocation('/ActualTask');
        this.props.history.push({
         pathname:'/'
       }) 

let timerInterval
Swal.fire({
  title: 'אנא המתן להזנת פרטי האירוע',
  timer: 2000,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
    Swal.fire({
      position: 'center',
    icon: 'success',
    title: 'כל שלבי הגדרת אירוע בפועל ושיוך משימות וציוד לאירוע הסתיימו',
    showConfirmButton: false,
    timer: 2000
   });
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})     
      }.bind(this),
      1500
    );
   
  }

  ChooseTaskRules=()=>{
    this.setState({AddingEmpsModal: true});
  }

  AddPersonToActualTask=(data)=>{
    setTimeout(
      function() {
        let tempRows= this.state.rows;
        for (let index = 0; index < tempRows.length; index++) {
          const element = tempRows[index];
          if (element.EmpCode== data.EmpCode) {
         
            const index2 = tempRows.findIndex((user)=>user.EmpCode===data.EmpCode);
            console.log(index2);
            const newRows = tempRows.filter((person,key)=>key!==index);

            let SpecificPerson={
              EmpCode: data.EmpCode,
              EmpFirstName: data.EmpFirstName,
              EmpLastName: data.EmpLastName,
              cellPhone: data.CellPhone,
              DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
              data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
              ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
              actions: <div style={{textAlign:'center'}}>
                                        
                          <MDBBtn id="deleteFromTask" onClick={()=>this.deleteFromTask(data)} color="danger">הסר שיבוץ ממשימה</MDBBtn>
                      </div>
            }
            newRows.unshift(SpecificPerson)         
            this.setState({rows:newRows
              })}           
          }
          let counter= 0;
          for (let index = 0; index < this.state.EmpCodesArr.length; index++) {
            const element = this.state.EmpCodesArr[index];
            if (element== data.EmpCode) {
             counter++;
            }
          }
          if (counter<1) {
            let EmpCodesArrNew= this.state.EmpCodesArr;
            EmpCodesArrNew.push(data.EmpCode);

            this.setState({EmpCodesArr:EmpCodesArrNew
            })
            console.log(this.state.EmpCodesArr)
          }           
  }
    .bind(this),
    1000);               
  }

  deleteFromTask=(data)=>{
    setTimeout(
      function() {
        let tempRows= this.state.rows;
        for (let index = 0; index < tempRows.length; index++) {
          const element = tempRows[index];
          if (element.EmpCode== data.EmpCode) {
         
            const index2 = tempRows.findIndex((user)=>user.EmpCode===data.EmpCode);
            console.log(index2);
            const newRows = tempRows.filter((person,key)=>key!==index);

            let SpecificPerson={
              EmpCode: data.EmpCode,
              EmpFirstName: data.EmpFirstName,
              EmpLastName: data.EmpLastName,
              cellPhone: data.CellPhone,
              DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
              data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
              ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
              actions: <div style={{textAlign:'center'}}>
                                        
                                  <MDBBtn onClick={()=>this.AddPersonToActualTask(data)} color="warning">שבץ למשימה</MDBBtn>
                      </div>
            }
            newRows.push(SpecificPerson)

            let EmpCodesArrNew= this.state.EmpCodesArr;
            const index3 = EmpCodesArrNew.findIndex((user)=>user===data.EmpCode);
            console.log(index3);
            const EmpCodesArrNewToState = EmpCodesArrNew.filter((person,key)=>key!==index);
            this.setState({ EmpCodesArr : EmpCodesArrNewToState})
            this.setState({rows:newRows
              })}           
          } 
          console.log(this.state.EmpCodesArr)
  }
    .bind(this),
    1000);   
  }

  ExplenationFun(){
    // ככה נגדיר את התאריך שמתקבל מהפורם בתוך הסטייט
     DateEx: new Date()
    //את השעה המוזנת נעשה מניפולציות הבאות כדי להכניס לאסקיואל בתור אינט
    let SplittedStartHour= this.state.StartHour.split(':');
    let hours= SplittedStartHour[0];
    let mins= SplittedStartHour[1];
    console.log(hours);
    console.log(mins);
    let hoursmanip= hours*60;
    let minsmanip= mins/60;
    // את המשתנה הבא נכניס לאסקיואל בתור מספר אינט
    let TimeToSQL= hoursmanip+minsmanip;
    console.log(TimeToSQL);
    //כדי לחשב את השעות בנפרד והדקות בנפרד שקיבלנו מהגט מהאסקיואל אלו יהיו המשתנים והמניפולציות
    let HoursFRomsql= (Math.trunc(TimeToSQL))/60;
    let MinsFromSql= Math.trunc((TimeToSQL-(Math.trunc(TimeToSQL)))*60);
    console.log(HoursFRomsql);
    console.log(MinsFromSql);
    //אחרי שקיבלנו את השעות והדקות בנפרד נחבר את הדקות והשעות ונכניס את המשתנה הבא בפורם
    let InsertToForm= (HoursFRomsql*100)+ MinsFromSql

    // נמשוך את התאריך שהוזן מהסטייט
    let DateEx= this.state.DateEx;
    console.log(DateEx);
    console.log(DateEx.toString())
    // ככה נכניס את התאריך לאסקיואל בצורת סטרינג
    let insertToSql= DateEx.toString();

    // נעשה מניפולציות כדי לקבל את היום הנוכחי ולהכניס אותו לאסקיואל
    let TempDate= insertToSql;
    let DayToSQL=new Date(TempDate); 
    console.log(DayToSQL);
    console.log(DayToSQL.getDay()+1)
    // את המשתנה הבא נכניס כאינט כמספר היום של השבוע לאסקיואל
    let DayToSql= DayToSQL.getDay()+1;

    // ככה נקבל את התאריך מהאסקיואל בצורת סטרינג
    let DateFromSql= "2020-03-16"
    // כדי להכניס לריאקט ולהשתיל אותו בתוך הפורם נמיר אותו למשתנה דייט
    let DayToReact=new Date(DateFromSql); 
    console.log(DayToReact)
    //כדי לקבל רק תאריך עם מספרים ונקודות נעשה מניפולציה
    let DateToReactManipulate= (DayToReact.toDateString());
    console.log(DateToReactManipulate);
    let FullDateFromSql= (DayToReact.toLocaleDateString()).split(',');
    console.log(FullDateFromSql);
    // המשתנה הבא זה המשתנה שנכניס בטבלה כדי להציג תאריך
    let DateToPreview= FullDateFromSql[0];
    console.log(DateToPreview);
    console.log(DateToReactManipulate);
    // כדי להציג יום בצורת טקסט נעשה מניפולציה הבאה
    let TextDay= DateToReactManipulate.split(" ")
    console.log(TextDay[0]);
  }

  StartHour=(e)=>{
      this.setState({StartHour: e.target.value})
  }
  FinishHour=(e)=>{
      this.setState({FinishHour: e.target.value})
  }
  DateChanged=(e)=>{
      
      this.setState({DateEx: e.target.value})
  }
  MoveBackToActualTask=(data)=>{
    this.setState({AddingEmpsModal: false})
    console.log(this.state.EmpCodesArr)
  }
  TaskIndex=()=>{
    let TaskIndex= this.state.TaskIndex;
    this.setState({TaskIndex: (TaskIndex+1)})
  }
  CleanValues=()=>{
   
    Swal.fire({
      position: 'center',
    icon: 'success',
    title: 'המשימה תוזמנה, אנא המשך לתיזמון המשימה הבאה',
    showConfirmButton: false,
    timer: 2000
   });
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

    let hours="";
    let mins ="";
    if ((today.getMinutes())<10) {
       mins= "0"+(today.getMinutes());
    }
    else{
      mins=(today.getMinutes());
    }
     if((today.getHours().toString())<10){
      hours= "0"+(today.getHours().toString());
     }
     else{
      hours= (today.getHours().toString());
     }
    let FullCurrenttime= (hours.toString())+":"+(mins.toString());
    console.log(FullCurrenttime)   
    setTimeout(
      function() {
        this.setState({today: FullCurrentDate})
        this.setState({DateEx:FullCurrentDate })
        this.setState({StartHour: FullCurrenttime,
        FinishHour: FullCurrenttime,
        EmpCodesArr: [],
        rows: this.props.PersonVar.map(data => (    
          data.IsActive==1?          
          {   
            EmpCode: data.EmpCode,
            EmpFirstName: data.EmpFirstName,
            EmpLastName: data.EmpLastName,
            cellPhone: data.CellPhone,
            DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
            data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
            ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
            actions: <div style={{textAlign:'center'}}>
                        
                        <MDBBtn onClick={()=>this.AddPersonToActualTask(data)} color="warning">שבץ למשימה</MDBBtn>
                    </div>
          }
          :""
          ))  })

      
      }
      .bind(this),
      2000
  ); 
  }
  componentDidMount(){
    this.props.GetActualTask();
    this.props.GetPerson_plan_TasksInEvent();
    this.props.GetActualEvent();
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

    let hours="";
    let mins ="";
    if ((today.getMinutes())<10) {
       mins= "0"+(today.getMinutes());
    }
    else{
      mins=(today.getMinutes());
    }
     if((today.getHours().toString())<10){
      hours= "0"+(today.getHours().toString());
     }
     else{
      hours= (today.getHours().toString());
     }
    let FullCurrenttime= (hours.toString())+":"+(mins.toString());
    console.log(FullCurrenttime)   
    setTimeout(
      function() {
        if(this.state.PrevLocation=='/EquipAndTaskInActualEvent'&& this.props.location.state!=undefined)
        {
          this.setState({
            TaskClickedArr: this.props.location.state.TaskClickedArr,
            EquipClickedArr: this.props.location.state.EquipClickedArr,
            EventName:this.props.location.state.EventName,
            Barcode: this.props.location.state.Barcode            
          })
        }
        else if(this.props.PrevLocation=='/Calendar'){
          let data= this.props.location.state.data;
          this.setState({
            StartHour: (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
            FinishHour: (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",
            DateEx: data.executionDate 
          })
        }
        else if(this.props.PrevLocation=='/Calendar2'){
          let data= this.props.location.state.data;
          this.setState({
            StartHour: (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
            FinishHour: (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",
            DateEx: data.exceutionDate 
          })
        }
        else{
          this.setState({today: FullCurrentDate})
          this.setState({DateEx:FullCurrentDate })
          this.setState({StartHour: FullCurrenttime,
          FinishHour: FullCurrenttime})
        }
      }
      .bind(this),
      1000
  );

      setTimeout(
      function() {
          this.setState({rows: this.props.PersonVar.map(data => (            
            {   
              EmpCode: data.EmpCode,
              EmpFirstName: data.EmpFirstName,
              EmpLastName: data.EmpLastName,
              cellPhone: data.CellPhone,
              DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
              data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
              ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
              actions: <div style={{textAlign:'center'}}>
                          
                          <MDBBtn onClick={()=>this.AddPersonToActualTask(data)} color="warning">שבץ למשימה</MDBBtn>
                      </div>
            }
            ))}) 
      }
      .bind(this),
      1000
  );
  
  }
  DeleteActualEvent=(Barcode)=>{

    this.props.DeleteActualEvent(Barcode);
  }

  BackClicked=()=>{
    if(this.props.PrevLocation=="/EquipAndTaskInActualEvent"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור חזור תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא תוזמנו לו משימות בפועל, כדי להמשיך את התהליך לחץ על לא",
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
            pathname:'/ManageActivities'
          })       
        }
      }) 
    }
    else if(this.props.PrevLocation=="/ManageActivities"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור חזור תהליך תזמון משימה בפועל יבוטל ולא יישמר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) {   
           Swal.fire(
            '!בוטל',
            'תהליך תזמון משימה בפועל בוטל',
            'success'
          ) 
           this.props.history.push({
            pathname:'/ManageActivities'
          })       
        }
      }) 
    }
    else if(this.props.PrevLocation=="/Calendar"|| this.props.PrevLocation=='/Calendar2'){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור חזור תהליך עדכון משימה בפועל יבוטל ולא יישמר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) {   
           Swal.fire(
            '!בוטל',
            'תהליך עדכון משימה בפועל בוטל',
            'success'
          ) 
           this.props.history.push({
            pathname:'/Calendar'
          })       
        }
      }) 
    }
    else{
      this.props.history.push({
        pathname:'/ManageActivities'
      })
    }
  }
  HomeClicked=()=>{
    if(this.props.PrevLocation=="/EquipAndTaskInActualEvent"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור הבית תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא תוזמנו לו משימות בפועל, כדי להמשיך את התהליך לחץ על לא",
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
    else if(this.props.PrevLocation=="/ManageActivities"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור הבית תהליך תזמון משימה בפועל יבוטל ולא יישמר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) { 
           Swal.fire(
            '!בוטל',
            'תהליך תזמון משימה בפועל בוטל',
            'success'
          ) 
           this.props.history.push({
            pathname:'/'
          })       
        }
      }) 
    }
    else if(this.props.PrevLocation=="/Calendar"|| this.props.PrevLocation=='/Calendar2'){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור הבית תהליך עדכון משימה בפועל יבוטל ולא יישמר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) { 
           Swal.fire(
            '!בוטל',
            'תהליך עדכון משימה בפועל בוטל',
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
  LogOutClicked=()=>{
    if(this.props.PrevLocation=="/EquipAndTaskInActualEvent"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור התנתק תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא תוזמנו לו משימות בפועל, כדי להמשיך את התהליך לחץ על לא",
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
            'תהליך תזמון משימה בפועל בוטל',
            'success'
          ) 
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
      }) 
    }
    else if(this.props.PrevLocation=="/ManageActivities"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור התנתק תהליך תזמון משימה בפועל יבוטל ולא יישמר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) {  
           Swal.fire(
            '!בוטל',
            'תהליך תזמון משימה בפועל בוטל',
            'success'
          ) 
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
      }) 
    }
    else if(this.props.PrevLocation=="/Calendar"|| this.props.PrevLocation=='/Calendar2'){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: "בלחיצה על כפתור התנתק תהליך עדכון משימה בפועל יבוטל ולא יישמר",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
        cancelButtonText: "לא"
      }).then((result) => {
        if (result.value) {  
           Swal.fire(
            '!בוטל',
            'תהליך עדכון משימה בפועל בוטל',
            'success'
          ) 
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

    render() {
      const columns =  [
        {
          label: 'עובד או מתנדב',
          field: 'ISEMPLOYEE',
          sort: 'asc',
          width: 150
          },
          {
            label: 'מחלקה',
            field: 'DepartmnetDepartmentCode',
            sort: 'asc',
            width: 150
            },
        {
        label: 'טלפון סלולרי',
        field: 'cellPhone',
        sort: 'asc',
        width: 200
        },
        {
        label: 'שם משפחה',
        field: 'EmpLastName',
        sort: 'asc',
        width: 150
        },
        {
        label: 'שם פרטי',
        field: 'EmpFirstName',
        sort: 'asc',
        width: 100
        },
        {
          label:'פעולות',
          field:'actions',
          sort:'asc',
          width:130
        }]
        return (
        
            <div>
                <div className="header">  
                  
              <button onClick={this.BackClicked} className="back"></button>   
                   
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
              <br/>
              <br/>
              <br/>
              <br/>
{this.state.AddingEmpsModal?

<div id="editDiv">
<div
  class="modal-content animate"
  action="/action_page.php"

>
  <div className="form-group row">
    <div className="form-group_col-sm-3">
    <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              {
                this.props.PrevLocation=='/EquipAndTaskInActualEvent'?
                <h1>שיבוץ למשימה: {this.props.location.state.TaskClickedArr[this.state.TaskIndex].TaskName}</h1>:

                <h1>שיבוץ למשימה: {this.props.location.state== undefined?"": this.props.location.state.data.TaskName}</h1>
              }

            </div>
          </div>
        </nav>
    <div style={{padding:'0%'}}>
                <MDBBtn id="IDMDBBTNn" onClick={()=>this.MoveBackToActualTask()} color="success">המשך  </MDBBtn>
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
            </div>
    </div>
  </div>
</div>
</div>

:
<form  onSubmit={this.SaveActualTask}>
  <div id="container">
 {this.props.PrevLocation=='/EquipAndTaskInActualEvent'?
  <h1 id="H1Header">הגדרת משימה: {this.props.location.state.TaskClickedArr[this.state.TaskIndex].TaskName}</h1>

 :this.props.PrevLocation=='/Calendar'|| this.props.PrevLocation=='/Calendar2'? <h1 id="H1Header">עדכון משימה: {this.props.location.state.data== undefined?"":
 this.props.location.state.data.TaskName}</h1> 
  :<h1 id="H1Header">הגדרת משימה: {this.props.location.state.data== undefined?"":
 this.props.location.state.data.TaskName}</h1> 
}

<label>
<input className="inputActualTask" type="date" name="Date" min={this.state.today} onChange={this.DateChanged} value={this.state.DateEx} required />

<img className="ImgActualType" src="https://img.icons8.com/office/30/000000/overtime.png"/>
 <h3 className="H3ActualType">תאריך ביצוע</h3>
</label>

<label>
<input className="inputActualTask" type="time" name="FromHour" onChange={this.StartHour} value={this.state.StartHour} required />
<img  className="ImgActualType" src="https://img.icons8.com/office/30/000000/hourglass-sand-top.png"/>
       <h3 className="H3ActualType">שעת התחלה</h3>

</label>

<label>
<input className="inputActualTask" type="time" name="ToHour" onChange={this.FinishHour} value={this.state.FinishHour} required/>
<img className="ImgActualType" src="https://img.icons8.com/office/30/000000/hourglass-sand-bottom.png"/>
<h3 className="H3ActualType">שעת סיום</h3></label>

<label>
{/* <img   className="ImgActualType" src="https://img.icons8.com/office/30/000000/employee-card.png"/> */}
{
  this.props.PrevLocation!='/Calendar'&& this.props.PrevLocation!= '/Calendar2'?
  <button id="BTNActualTask" onClick={this.ChooseTaskRules}><b>בחר מבצעי משימה</b> </button> :""
}


</label>

{
    this.props.PrevLocation!='/Calendar' && this.props.PrevLocation!='/Calendar2'?
    <MDBBtn id="MDBBtnActualTask_save" type="submit" value="Submit" color="success"><b>שמור משימה חדשה</b>  </MDBBtn>:
    <MDBBtn id="MDBBtnActualTask_save" type="submit" value="Submit" color="success"><b>עדכן משימה</b>  </MDBBtn>
}

</div>
</form>

}

                
            </div>
        );
    }
}

export default withRouter (CCActualTask);