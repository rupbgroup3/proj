import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Agodit from "../image/Agodit.png";
import "react-datepicker/dist/react-datepicker.css";
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
            today: ""
          }
    }
    componentDidMount(){
      this.props.GetActualTask();
      this.props.GetPerson_plan_TasksInEvent();
      this.props.GetActualEvent();
      this.props.GetEmpInfoRoles();
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
        FinishHour: FullCurrenttime})
      }
      .bind(this),
      1000
  );
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
                        
                        <MDBBtn onClick={()=>this.AddPersonToActualEvent(data)} color="warning">שבץ לאירוע</MDBBtn>
                    </div>
          }
         
          ))}) 
    }
    .bind(this),
    1000
);

    
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
                                            
                                      <MDBBtn onClick={()=>this.AddPersonToActualEvent(data)} color="warning">שבץ לאירוע</MDBBtn>
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
                                              
                                <MDBBtn onClick={()=>this.deleteFromEvent(data)} color="danger">הסר שיבוץ מאירוע</MDBBtn>
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
      text: "בלחיצה על כפתור הבית תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא סיימת אותו ולא תוזמנו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
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
<h1> בחר אחראי אירוע{ this.props.location.state.data.TaskName}</h1>
            </div>
          </div>
        </nav>
    <div style={{padding:'0%'}}>
                <MDBBtn onClick={()=>this.MoveBackToActualEvent()} color="success">  חזרה לתזמון אירוע  </MDBBtn>
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
  
 אירוע בפועל- {this.props.location.state== undefined?"":
  this.props.location.state.data.EventName}
<br/>
<br/>
<br/>
<label>
<input type="date" name="Date" min={this.state.today} onChange={this.DateChanged} value={this.state.DateEx} required />
:תאריך ביצוע

</label>
<br/>

<br/>
<label>
<input type="time" name="FromHour" onChange={this.StartHour} value={this.state.StartHour} required />
       :שעת התחלה

</label>
<br/>

<br/>
<label>
<input type="time" name="ToHour" onChange={this.FinishHour} value={this.state.FinishHour} required/>
:שעת סיום
</label>
<br/>

<button onClick={this.ChooseEventRules}
>בחר אחראי אירוע</button> 
<br/>
<br/>
<label>
<input type="text" name="Location" onChange={this.Location} value={this.state.Location}/>
:מיקום
</label>
<br/>

<MDBBtn  type="submit" value="Submit" color="success">  המשך</MDBBtn>

</form>

}

            </div>
          );
    }
}
 
export default withRouter (CCActualEvent);