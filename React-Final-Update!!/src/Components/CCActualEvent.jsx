import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Agodit from "../image/Agodit.png";
import "../CssFiles/ActualEvent.css";
import { stack as Menu } from "react-burger-menu";
import ProgressBar from 'react-bootstrap/ProgressBar'


import Swal from "sweetalert2";

class CCActualEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EventTypeVar: this.props.EventTypeVar,
            data:"",
            StartHour: "",
            FinishHour: "",
            DateEx: new Date(),
            Event_TypeEventCode:"",
            Location:"",
            AddingEmpsModal: false,
            rows: [],
            EmpCodesArr:[],
            today: "",
            ActualTaskInEventBool: false
          }
    }
    componentDidMount(){
      this.props.GetEmpInfoRoles();
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

     if(this.props.PrevLocation=='/Calendar'){
      setTimeout(
        function() {
          let data= this.props.location.state.data;
          let EmpCodesArr= [];
          EmpCodesArr.push(data.EmployeeEmpCode);
          this.setState({
           StartHour: (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) :"",
           FinishHour: (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0? (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) :"",
           DateEx: data.date ,
           Event_TypeEventCode: data.Event_TypeEventCode,
           Location: data.Location,
           EmpCodesArr: EmpCodesArr,
           rows: this.props.EmpInfoRoles.map(data => (    
            this.props.location.state.data.EmployeeEmpCode== data.EmpCode?    
            {   
              EmpCode: data.EmpCode,
              EmpFirstName: data.EmpFirstName,
              EmpLastName: data.EmpLastName,
              cellPhone: data.cellPhone,
              Email:data.Email,
              DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
              data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
             RoleName: data.RoleName,
              actions: <div style={{textAlign:'center'}}>
                           <MDBBtn id="deleteFromEvent" onClick={()=>this.deleteFromEvent(data)} color="danger">הסר שיבוץ מאירוע</MDBBtn>
   
                      </div>
            }:
            {
              EmpCode: data.EmpCode,
              EmpFirstName: data.EmpFirstName,
              EmpLastName: data.EmpLastName,
              cellPhone: data.cellPhone,
              Email:data.Email,
              DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
              data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
             RoleName: data.RoleName,
              actions: <div style={{textAlign:'center'}}>
          
                          <MDBBtn id="tblBtn" onClick={()=>this.AddPersonToActualEvent(data)} color="warning">שבץ לאירוע</MDBBtn>
                      </div>
            }
           
            ))     
         })
        }
        .bind(this),
        1000
    );
    
 
     }
     else{
      let FullCurrenttime= (hours.toString())+":"+(mins.toString());

      setTimeout(
        function() {
          this.setState({rows: this.props.EmpInfoRoles.map(data => (    
                     
            {   
              EmpCode: data.EmpCode,
              EmpFirstName: data.EmpFirstName,
              EmpLastName: data.EmpLastName,
              cellPhone: data.cellPhone,
              Email:data.Email,
              DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
              data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
             RoleName: data.RoleName,
              actions: <div style={{textAlign:'center'}}>
                          
                          <MDBBtn id="tblBtn" onClick={()=>this.AddPersonToActualEvent(data)} color="warning">שבץ לאירוע</MDBBtn>
                      </div>
            }
           
            )),
            today: FullCurrentDate,
            DateEx:FullCurrentDate,
            StartHour: FullCurrenttime,
            FinishHour: FullCurrenttime,
            ActualTaskInEventBool: true
    
          }) 
        }
        .bind(this),
        1000
    );
    
     }       
    }
    SaveActualEvent=(evt)=>{
      evt.preventDefault();
      let counter=0;
      let StartTimeToSQL= 0;
      let FinishTimeToSQL=0;

      setTimeout(
        function() {
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

        if(this.props.PrevLocation!='/Calendar'){
          for (let index1 = 0; index1 < this.props.Actual_Event.length; index1++) {
            const element = this.props.Actual_Event[index1];
            for (let index2 = 0; index2 < this.state.EmpCodesArr.length; index2++) {
              const element2 = this.state.EmpCodesArr[index2];
              for (let index3 = 0; index3 < this.props.ActualTaskVar.length; index3++) {
                const element3 = this.props.ActualTaskVar[index3];
                for (let index4 = 0; index4 < this.props.Person_plan_TasksInEvent.length; index4++) {
                  const element4 = this.props.Person_plan_TasksInEvent[index4];
                  if ((((element.date.toString())==(this.state.DateEx.toString()))&& (element2==element.EmployeeEmpCode)&&(element.ToHour> FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL)) 
                  ||(((element.date.toString())==(this.state.DateEx.toString()))&&(element2==element.EmployeeEmpCode)&&(element.ToHour< FinishTimeToSQL)&& (element.FromHour>StartTimeToSQL)&& (element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
                  ||(((element.date.toString())==(this.state.DateEx.toString()))&&(element2==element.EmployeeEmpCode)&&(element.ToHour> FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) &&(element.ToHour>StartTimeToSQL)&&(element.FromHour< FinishTimeToSQL))
                  ||(((element.date.toString())==(this.state.DateEx.toString()))&&(element2==element.EmployeeEmpCode)&&(element.ToHour< FinishTimeToSQL)&& (element.FromHour<StartTimeToSQL) && (element.ToHour>StartTimeToSQL)&& (element.FromHour< FinishTimeToSQL))            
                  )  {
                    counter++;
                    Swal.fire({
                      icon: 'error',                                             
                      title: 'פעיל אגודה זה משובץ בתור אחראי לאירוע חופף' ,
                      text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ אחראי אחר לאירוע' ,
                    })
                    return;
                  }
 
                  else if((((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode)&&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL)) 
                  ||(((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&&(element2==element3.PersonEmpCode)&&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
                  ||(((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&&(element2==element3.PersonEmpCode)&&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) &&(element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
                  ||(((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&&(element2==element3.PersonEmpCode)&&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) && (element3.ToHour>StartTimeToSQL)&& (element3.FromHour< FinishTimeToSQL))            
                  
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode)&&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode) &&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode) &&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) &&(element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))  
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode)&&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) && (element4.ToHour>StartTimeToSQL)&& (element4.FromHour< FinishTimeToSQL))   
                  
                  
                  ) {
 
                   counter++;
                   Swal.fire({
                     icon: 'error',                                             
                     title: 'פעיל אגודה זה משובץ למשימות/ אירועים באותו טווח שעות ותאריך' ,
                     text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ אחראי אחר לאירוע' ,
                   })
                   return;
 
                 } 
                }
              }
            }
          }
        }
        else{

          for (let index1 = 0; index1 < this.props.Actual_Event.length; index1++) {
            const element = this.props.Actual_Event[index1];
            for (let index2 = 0; index2 < this.state.EmpCodesArr.length; index2++) {
              const element2 = this.state.EmpCodesArr[index2];
              for (let index3 = 0; index3 < this.props.ActualTaskVar.length; index3++) {
                const element3 = this.props.ActualTaskVar[index3];
                for (let index4 = 0; index4 < this.props.Person_plan_TasksInEvent.length; index4++) {
                  const element4 = this.props.Person_plan_TasksInEvent[index4];

                  // if (((this.props.location.state.data.EmployeeEmpCode!=element.EmployeeEmpCode)&&(element2==element.EmployeeEmpCode)&&(element.date.toString()==this.state.DateEx.toString()))         
                  // )  {
                  //   counter++;
                  //   Swal.fire({
                  //     icon: 'error',                                             
                  //     title: 'פעיל אגודה זה משובץ בתור אחראי לאירוע חופף' ,
                  //     text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ אחראי אחר לאירוע' ,
                  //   })
                  //   return;
                  // }
 
                   if((((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&& (element2==element3.PersonEmpCode)&&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL)) 
                  ||(((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&&(element2==element3.PersonEmpCode)&&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour>StartTimeToSQL)&& (element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
                  ||(((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&&(element2==element3.PersonEmpCode)&&(element3.ToHour> FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) &&(element3.ToHour>StartTimeToSQL)&&(element3.FromHour< FinishTimeToSQL))
                  ||(((element3.exceutionDate.toString())==(this.state.DateEx.toString()))&&(element2==element3.PersonEmpCode)&&(element3.ToHour< FinishTimeToSQL)&& (element3.FromHour<StartTimeToSQL) && (element3.ToHour>StartTimeToSQL)&& (element3.FromHour< FinishTimeToSQL))            
                  
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode)&&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode) &&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour>StartTimeToSQL)&& (element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode) &&(element4.ToHour> FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) &&(element4.ToHour>StartTimeToSQL)&&(element4.FromHour< FinishTimeToSQL))  
                  ||(((element4.executionDate.toString())==(this.state.DateEx.toString()))&& (element2==element4.PersonEmpCode)&&(element4.ToHour< FinishTimeToSQL)&& (element4.FromHour<StartTimeToSQL) && (element4.ToHour>StartTimeToSQL)&& (element4.FromHour< FinishTimeToSQL))   
                                 
                  ) {
 
                   counter++;
                   Swal.fire({
                     icon: 'error',                                             
                     title: 'פעיל אגודה זה משובץ למשימות/ אירועים באותו טווח שעות ותאריך' ,
                     text: 'אנא בחר בטווח שעות/ תאריך שונה או שבץ אחראי אחר לאירוע' ,
                   })
                   return;
                 } 
                }
              }
            }
          }
        }

    }
      .bind(this),
      800);  

      setTimeout(
       async function() {

          if(this.state.EmpCodesArr.length==0){
            Swal.fire({
              icon: 'error',
              title: 'לא נבחר אחראי אירוע',
              text: 'אנא בחר אחראי אירוע אירוע זה',
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
           else if(counter<1){

            if(this.props.PrevLocation=='/Calendar'){
        
              this.props.GetEquipmentTable();
              this.props.GetTasks();
              this.props.GetEvents();
              this.props.GetEvent_Type_EquipmentType();      
                  for (let index = 0; index < this.state.EmpCodesArr.length; index++) {
  
                    const element = this.state.EmpCodesArr[index];
                    console.log(element)
                    let Actual_Event={
                      date: this.state.DateEx.toString(),
                      FromHour: StartTimeToSQL,
                      ToHour: FinishTimeToSQL,
                      Location: this.state.Location,
                      EmployeeEmpCode: element,
                      Barcode: this.props.location.state.data.Barcode                                     
                  }
                
                    this.props.PutActual_Event(Actual_Event);
                  } 

                   this.props.GetEvent_Type_Task();
                  
                  this.props.MyPreviousLocation('/ActualEvent');
                  this.props.history.push({
                    pathname:'/Calendar'
                  })          
          
            Swal.fire({
              position: 'center',
            icon: 'success',
            title: 'עדכון אירוע התבצע בהצלחה',
            showConfirmButton: false,
            timer: 1200
           });

            }
            else{
              this.props.GetEquipmentTable();
              this.props.GetTasks();
              this.props.GetEvents();
              this.props.GetEvent_Type_EquipmentType();      
                  for (let index = 0; index < this.state.EmpCodesArr.length; index++) {
                    const element = this.state.EmpCodesArr[index];
                    console.log(element)
                    let Actual_Event={
                      date: this.state.DateEx.toString(),
                      FromHour: StartTimeToSQL,
                      ToHour: FinishTimeToSQL,
                      Event_TypeEventCode:  this.props.location.state.data.EventCode,
                      Location: this.state.Location,
                      EmployeeEmpCode: element,                                     
                  }
                
                    this.props.PostActualEvent(Actual_Event);
                  } 
  
                   this.props.GetEvent_Type_Task();
                  
  
                  this.props.MyPreviousLocation('/ActualEvent');
                  this.props.history.push({
                    pathname:'/EquipAndTaskInActualEvent',
                    state: {EventCode: this.props.location.state.data.EventCode,
                    EventName: this.props.location.state.data.EventName}
                  })          
          
            Swal.fire({
              position: 'center',
            icon: 'success',
            title: 'השלב הראשון של תזמון האירוע התבצע בהצלחה',
            showConfirmButton: false,
            timer: 1800
           });
            }

           }   

    }
      .bind(this),
      1000);     
      }
    
      ChooseEventRules=()=>{
        this.setState({AddingEmpsModal: true});
      }
      deleteFromEvent=(data)=>{
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
                    cellPhone: data.cellPhone,
                    Email:data.Email,
                    DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
                    data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
                   RoleName: data.RoleName,
                  actions: <div style={{textAlign:'center'}}>
                                            
                                      <MDBBtn id="tblBtn" onClick={()=>this.AddPersonToActualEvent(data)} color="warning">שבץ לאירוע</MDBBtn>
                          </div>
                }
                newRows.push(SpecificPerson)

                let newempcode= [];
                this.setState({ EmpCodesArr : newempcode})
                this.setState({rows:newRows
                  })}           
              } 
              console.log(this.state.EmpCodesArr)
      }
        .bind(this),
        1000);   
      }
      AddPersonToActualEvent=(data)=>{
          if(this.state.EmpCodesArr.length==1)
          {
            Swal.fire({
                icon: 'error',
                title: 'נבחר אחראי לאירוע',
                text: 'לא ניתן לבחור יותר מאחראי אחד לאירוע',
              })
          }
          else { setTimeout(
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
                      cellPhone: data.cellPhone,
                      Email:data.Email,
                      DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
                      data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,   
                     RoleName: data.RoleName,
                    actions: <div style={{textAlign:'center'}}>
                                              
                                <MDBBtn id="deleteFromEvent" onClick={()=>this.deleteFromEvent(data)} color="danger">הסר שיבוץ מאירוע</MDBBtn>
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
Location=(e)=>{
    this.setState({Location: e.target.value})
}
MoveBackToActualEvent=()=>{
    this.setState({AddingEmpsModal: false})
}
BackClicked=()=>{
  if(this.props.PrevLocation=="/ManageActivities"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "בלחיצה על כפתור חזור תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
          'תהליך תזמון האירוע ושיוך משימות וציוד בוטל',
          'success'
        ) 
         this.props.history.push({
          pathname:'/ManageActivities'
        })       
      }
    }) 
  }
  else if(this.props.PrevLocation=="/Calendar"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "בלחיצה על כפתור חזור תהליך עדכון אירוע בפועל יבוטל ולא יישמר",
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
          'תהליך עדכון אירוע בפועל בוטל',
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
  if(this.props.PrevLocation=="/ManageActivities"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
           'תהליך תזמון האירוע ושיוך משימות וציוד בוטל',
           'success'
         ) 
         this.props.history.push({
          pathname:'/home'
        })      
      }
    }) 
  }
  else if(this.props.PrevLocation=="/Calendar"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: " תהליך עדכון אירוע בפועל יבוטל ולא יישמר",
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
          'תהליך עדכון אירוע בפועל בוטל',
          'success'
        ) 
         this.props.history.push({
          pathname:'/home'
        })       
      }
    }) 
  }
  else{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/home'
    })
  }
}

ManageActivitiesClicked=()=>{
  if(this.props.PrevLocation=="/ManageActivities"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
           'תהליך תזמון האירוע ושיוך משימות וציוד בוטל',
           'success'
         ) 
         this.props.history.push({
          pathname:'/ManageActivities'
        })      
      }
    }) 
  }
  else if(this.props.PrevLocation=="/Calendar"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "תהליך עדכון אירוע בפועל יבוטל ולא יישמר",
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
          'תהליך עדכון אירוע בפועל בוטל',
          'success'
        ) 
         this.props.history.push({
          pathname:'/ManageActivities'
        })       
      }
    }) 
  }
  else{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/ManageActivities'
    })
  }
}

ResourcesClicked=()=>{
  if(this.props.PrevLocation=="/ManageActivities"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
           'תהליך תזמון האירוע ושיוך משימות וציוד בוטל',
           'success'
         ) 
         this.props.history.push({
          pathname:'/Resources'
        })      
      }
    }) 
  }
  else if(this.props.PrevLocation=="/Calendar"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "תהליך עדכון אירוע בפועל יבוטל ולא יישמר",
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
          'תהליך עדכון אירוע בפועל בוטל',
          'success'
        ) 
         this.props.history.push({
          pathname:'/Resources'
        })       
      }
    }) 
  }
  else{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/Resources'
    })
  }
}
CalendarClicked=()=>{
  if(this.props.PrevLocation=="/ManageActivities"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
           'תהליך תזמון האירוע ושיוך משימות וציוד בוטל',
           'success'
         ) 
         this.props.history.push({
          pathname:'/Calendar'
        })      
      }
    }) 
  }
  else if(this.props.PrevLocation=="/Calendar"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "תהליך עדכון אירוע בפועל יבוטל ולא יישמר",
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
          'תהליך עדכון אירוע בפועל בוטל',
          'success'
        ) 
         this.props.history.push({
          pathname:'/Calendar'
        })       
      }
    }) 
  }
  else{
    this.props.MyPreviousLocation(window.location.pathname);
    this.props.history.push({
      pathname:'/Calendar'
    })
  }
}

LogOutClicked=()=>{
  if(this.props.PrevLocation=="/ManageActivities"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "בלחיצה על כפתור התנתק תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
          'תהליך תזמון אירוע בפועל בוטל',
          'success'
        ) 
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
    }) 
  }
  else if(this.props.PrevLocation=="/Calendar"){
    Swal.fire({
      title: "?האם לבטל את התהליך שהתחלת",
      text: "בלחיצה על כפתור התנתק תהליך עדכון אירוע בפועל יבוטל ולא יישמר",
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
          'תהליך עדכון אירוע בפועל בוטל',
          'success'
        ) 
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
    }) 
  }
  else{
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

}
    render() { 
      const columns =  [
      
         {
    
            label: 'תפקיד',
            field: 'RoleName',
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
    
                label: 'מייל',
                field: 'Email',
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
   
     
      <a className="menu-item" onClick={this.CalendarClicked}>
      <i id="calendari" class="far fa-calendar-alt"></i>
        לוח שנה
      </a>
      
      <a className="menu-item" onClick={this.LogOutClicked}>
      <i id="logouti" class="fas fa-sign-out-alt"></i>
        התנתק
      </a>

    </Menu>
              <button onClick={this.BackClicked} className="back"></button>   
                      
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
<h1> בחר אחראי אירוע{ this.props.location.state.data.TaskName}</h1>
            </div>
          </div>
        </nav>
    <div style={{padding:'0%'}}>

                <button id="IDMDBBTNn" onClick={()=>this.MoveBackToActualEvent()} color="success">  המשך  </button>
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
                
                <form style={{padding:100}} style={{textAlign:"center"}} onSubmit={this.SaveActualEvent}>
                     {this.state.ActualTaskInEventBool?
                     <div id="progressDiv">
<ProgressBar style={{height: 24}} animated now={25} label={"25%"} variant="success"/>
                     </div>
    :""
   }
 <div id="container">

  <h1 id="H1Header"> אירוע בפועל- {this.props.location.state== undefined?"":
  this.props.location.state.data.EventName}</h1>

<label>
<input className="inputActualTask" type="date" name="Date" min={this.state.today} onChange={this.DateChanged} value={this.state.DateEx} required />
<img className="ImgActual" src="https://img.icons8.com/office/30/000000/overtime.png"/>
<h3 className="H3Actual">תאריך ביצוע</h3>
</label>


<label>
<input className="inputActualTask" type="time" name="FromHour" onChange={this.StartHour} value={this.state.StartHour} required />
<img  className="ImgActual" src="https://img.icons8.com/office/30/000000/hourglass-sand-top.png"/>
<h3 className="H3Actual">שעת התחלה</h3>

</label>

<label>
<input className="inputActualTask" type="time" name="ToHour" onChange={this.FinishHour} value={this.state.FinishHour} required/>
<img className="ImgActual" src="https://img.icons8.com/office/30/000000/hourglass-sand-bottom.png"/>
<h3 className="H3Actual">שעת סיום</h3>
</label>


<label>
<input id="LocationInput" className="inputActualTask" type="text" name="Location" placeholder="אנא הזן מיקום" onChange={this.Location} value={this.state.Location}/>
<img className="ImgActual" src="https://img.icons8.com/office/30/000000/worldwide-location.png"/>
<h3 className="H3Actual">מיקום</h3>
</label>
{
     this.props.PrevLocation=='/Calendar'?
     <MDBBtn color={"rgba(255,196,12,0.7)"} id="BTNActualTask" onClick={this.ChooseEventRules}>שנה אחראי אירוע</MDBBtn>:
<MDBBtn color={"rgba(255,196,12,0.7)"} id="BTNActualTask" onClick={this.ChooseEventRules}>בחר אחראי אירוע</MDBBtn> 
}

<br/>
{
  this.props.PrevLocation=='/Calendar'?
  <MDBBtn  id="MDBBtnActualTask_save" type="submit" value="Submit"  color={"rgba(255,196,12,0.7)"} >עדכן אירוע</MDBBtn>:
<MDBBtn  color={"rgba(255,196,12,0.7)"}  id="MDBBtnActualTask_save" type="submit" value="Submit" >  שמור והמשך</MDBBtn>
}


</div>
</form>

}
<br/><br/><br/>
        <footer>
        <p id="copyright">Copyright, 2020 &#169; <br/> Bar, Almog and Ron.  All rights reserved. </p>

     </footer>
            </div>
          );
    }
}
 
export default withRouter (CCActualEvent);