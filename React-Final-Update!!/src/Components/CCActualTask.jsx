import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";
import "../CssFiles/ActualTask.css";
import { stack as Menu } from "react-burger-menu";


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
      TaskIndex: 0
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
    
        if(this.state.EmpCodesArr.length==0){
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

        else if(counter<1){  
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
                                        
                                  <MDBBtn id="AddToTask" onClick={()=>this.AddPersonToActualTask(data)} color="warning">שבץ למשימה</MDBBtn>
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
                        
                        <MDBBtn id="AddToTask" onClick={()=>this.AddPersonToActualTask(data)} color="warning">שבץ למשימה</MDBBtn>
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
                          
                          <MDBBtn id="AddToTask" onClick={()=>this.AddPersonToActualTask(data)} color="warning">שבץ למשימה</MDBBtn>
                      </div>
            }
            ))}) 
      }
      .bind(this),
      1000
  );
  
  }

  BackClicked=()=>{

    if(this.props.PrevLocation=="/ManageActivities"){
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
        text: " תהליך תזמון משימה בפועל יבוטל ולא יישמר",
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
  LogOutClicked=()=>{
  
    if(this.props.PrevLocation=="/ManageActivities"){
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

  ManageActivitiesClicked=()=>{
  
    if(this.props.PrevLocation=="/ManageActivities"){
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text: " תהליך תזמון משימה בפועל יבוטל ולא יישמר",
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
        text: " תהליך תזמון משימה בפועל יבוטל ולא יישמר",
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
        text: " תהליך תזמון משימה בפועל יבוטל ולא יישמר",
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
              {

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
 {<h1 id="H1Header">הגדרת משימה: {this.props.location.state.data== undefined?"":
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
  <button id="BTNActualTask" onClick={this.ChooseTaskRules}><b>בחר מבצעי משימה</b> </button>
}


</label>

{

    <MDBBtn id="MDBBtnActualTask_save" type="submit" value="Submit" color="success"><b>שמור משימה חדשה</b>  </MDBBtn>

}

</div>
</form>

}

                
            </div>
        );
    }
}

export default withRouter (CCActualTask);