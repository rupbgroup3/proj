import React , { Component } from 'react';
import { MDBDataTable,MDBBtn } from 'mdbreact';
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Agodit from "../image/Agodit.png";
import { stack as Menu } from "react-burger-menu";


const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
//הגדרת העמודות מראש

class CCHumanResources extends React.Component{

constructor(props) {
  super(props);
}
    state={    
        //את השורות תקבלו ממסד הנתונים
        rows:   [],
        modal:false,
        EmpFirstName: "",
        EmpLastName: "",
        cellPhone: "",
        Email: "",
        IsActive: "true",
        DepartmnetDepartmentCode: "",
        ActiveTillYear: "",
        StudyingStartyear: "",
        ISEMPLOYEE: "",
        editMode: false,
        Empcode: "",
        EditRoleEmp: false,
        RoleEmployee: "",
        RoleDescription: ""
    }   
    deleteUser = (Email)=>{
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
            'פרטי האדם נמחקו',
            'success'
          )
          this.deleteChoose(Email);
        }
      })   
    }
    deleteChoose=async(Email)=>{
      await this.props.DeletePerson(Email);
      await this.props.GetPersonDetails();   

        const index = this.state.rows.findIndex((user)=>user.Email===Email);
        console.log(index);
        const newRows = this.state.rows.filter((person,key)=>key!==index);
        this.setState({rows:newRows});

    }
    editUser = (data)=>{
      this.props.GetRole_Employee(); 
      let empcodetemp="";
      setTimeout(
        function() {        
 
      for (let index = 0; index < this.props.PersonVar.length; index++) {
        const element = this.props.PersonVar[index];

        if (element.EmpCode==data.EmpCode) {
          empcodetemp= element.EmpCode;
          this.setState({Empcode: element.EmpCode})
        }        
      }
      this.setState({editMode: true})
      let Active= true;
      if (!data.IsActive) {
        Active= false;
      }
      this.setState({modal:true});
      if(data.IsEmployee){
        this.setState({EditRoleEmp: true})
      }
      else if(!data.IsEmployee){
          this.setState({EditRoleEmp:false})   
      }
      this.setState({EmpFirstName: data.EmpFirstName,
                     EmpLastName: data.EmpLastName,       
                     cellPhone: data.CellPhone,
                     Email: data.Email,
                     IsActive: Active,
                     DepartmnetDepartmentCode: data.DepartmnetDepartmentCode,
                     ActiveTillYear: data.ActiveTillYear,
                     StudyingStartyear: data.StudyingStartyear,
                     ISEMPLOYEE: data.IsEmployee
      });

        }
        .bind(this),
        750
    );

    setTimeout(
      function() {        

        if(data.IsEmployee==1){
        
          let RoleCode="";
          for (let index = 0; index < this.props.Role_EmployeeVar.length; index++) {
            const element = this.props.Role_EmployeeVar[index];
            if (empcodetemp==element.EmployeeEmpCode) {          
              RoleCode= element.RoleCode;
            }
          }
          let description="";
          for (let index = 0; index < this.props.RoleVar.length; index++) {
            const element = this.props.RoleVar[index];
            if(RoleCode== element.RoleCode){
              description= element.description;
            }
          }
          this.setState({
            RoleEmployee: RoleCode,
            RoleDescription: description,
            ISEMPLOYEE: "true"
          })
        }
      }
      .bind(this),
      750
  );


    }  
    addNewUser = ()=>{
      this.setState({modal:true});
      this.setState({EmpFirstName: "",
      EmpLastName: "",
      cellPhone: "",
      Email: "",
      IsActive: "",
      DepartmnetDepartmentCode:"",
      ActiveTillYear: "",
      StudyingStartyear: "",
      ISEMPLOYEE: "",})     
    }
    FirstNameChanged = e => {
      this.setState({ EmpFirstName: e.target.value });
    };
    LastNameChanged=e=>{
      this.setState({ EmpLastName: e.target.value });
    }
    cellPhoneChanged=e=>{
      this.setState({cellPhone: e.target.value})
    }
    EmailChanged=e=>{
      this.setState({Email: e.target.value})
    }
    IsActiveChanged=e=>{
      this.setState({IsActive: e.target.value})
    }
    DepartmnetChanged=e=>{
      this.setState({DepartmnetDepartmentCode: e.target.value})
    }
    ActiveTillYearChanged=e=>{
      this.setState({ActiveTillYear: e.target.value})   
    }
    StudyingStartyearChanged=e=>{
      this.setState({StudyingStartyear: e.target.value})
    }
    ISEMPLOYEEChanged=e=>{
      this.setState({ISEMPLOYEE: e.target.value})

      if(e.target.value=="true"){
        this.setState({
          EditRoleEmp: true,
          RoleEmployee:"",
          RoleDescription: ""                 
        })
      }
      else if(e.target.value=="false"&& this.state.EditRoleEmp==true){
        this.setState({
          EditRoleEmp: false
        })
      }
    }
    RoleEmployeeChanged=e=>{
      this.setState({RoleEmployee: e.target.value})
      for (let index = 0; index < this.props.RoleVar.length; index++) {
        const element = this.props.RoleVar[index];
        let Descrip="";
        if(e.target.value== element.RoleCode){
          Descrip= element.description;
          this.setState({
            RoleDescription: Descrip
          })
        }
      }
    }
    RoleDescriptionChanged=e=>{
      this.setState({
        RoleDescription: e.target.value
      })
    }
    submitted=async (e)=>{           
      if (!this.state.editMode) {
        if(this.state.ISEMPLOYEE==="true"){
          for (let index = 0; index < this.props.Role_EmployeeVar.length; index++) {
            const element = this.props.Role_EmployeeVar[index];
            if (element.RoleCode==this.state.RoleEmployee  && element.RoleCode!="9") {
              e.preventDefault();
              Swal.fire({
                icon: 'error',
                title: 'קיים במערכת עובד בתפקיד הנבחר',
                text: 'אנא שנה את התפקיד או שנה את העובד הנמצא בתפקיד זה לתפקיד שונה או השתמש באופציית אחר'
              })          
              return;
            }
          }
        }
      this.setState({modal:false}); 
      const Person = {
        EmpFirstName: this.state.EmpFirstName,
        EmpLastName: this.state.EmpLastName,
        cellPhone: this.state.cellPhone,
        Email: this.state.Email,
        IsActive: this.state.IsActive,
        DepartmnetDepartmentCode: this.state.DepartmnetDepartmentCode,
        ActiveTillYear: this.state.ActiveTillYear,
        StudyingStartyear: this.state.StudyingStartyear,
        IsEmployee: this.state.ISEMPLOYEE,               
       }
      await this.props.PostPerson(Person);
      await this.props.GetPersonDetails();

      let empCode="";
      for (let index = 0; index < this.props.PersonVar.length; index++) {
        const element = this.props.PersonVar[index];
        if(this.state.Email== element.Email){
          empCode= element.EmpCode;
        }
      }
      
      if(this.state.ISEMPLOYEE=="true"){    
        const Role_Employee={
          RoleCode: this.state.RoleEmployee,
          EmployeeEmpCode: empCode
        }
        await this.props.PostRole_Employee(Role_Employee);

        let RoleName="";
        for (let index = 0; index < this.props.RoleVar.length; index++) {
          const element = this.props.RoleVar[index];
          if(this.state.RoleEmployee==element.RoleCode){
            RoleName= element.RoleName;
          }
        }
        const Role={
          RoleCode: this.state.RoleEmployee,
          RoleName: RoleName,
          description: this.state.RoleDescription
        }
        await this.props.PUTRole(Role);
      
      }
     
      setTimeout(
        function() {
            this.setState({rows: this.props.PersonVar.map(data => (            
              {          
                EmpCode: data.EmpCode,
                EmpFirstName: data.EmpFirstName,
                EmpLastName: data.EmpLastName,
                cellPhone: data.CellPhone,
                Email: data.Email,
                IsActive: data.IsActive==0? "לא פעיל": "פעיל",
                DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
                data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,
                ActiveTillYear: data.ActiveTillYear,
                StudyingStartyear: data.StudyingStartyear,
                ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
                actions: <div style={{textAlign:'center'}}>
                            
                <MDBBtn onClick={()=>this.editUser(data)} color="warning"><img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                <MDBBtn onClick={()=>this.deleteUser(data.Email)} color="danger"> <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/></MDBBtn>
                <MDBBtn onClick={()=>this.TotalHours(data)} color="info"> <img src="https://img.icons8.com/material/25/000000/clock--v1.png"/></MDBBtn>                        </div>
              }
              ))}) 

              this.setState({modal:false});   
        }
        .bind(this),
        1500
    );
      Toast.fire({
        icon: 'success',
        title: 'הזנת כוח אדם חדש התבצעה בהצלחה'
      })        
      }    
      else{

        if(this.state.ISEMPLOYEE==="true"){
          for (let index = 0; index < this.props.Role_EmployeeVar.length; index++) {
            const element = this.props.Role_EmployeeVar[index];
            if (element.RoleCode==this.state.RoleEmployee && element.EmployeeEmpCode !=this.state.Empcode && element.RoleCode!="9") {
              e.preventDefault();
              Swal.fire({
                icon: 'error',
                title: 'קיים במערכת עובד בתפקיד הנבחר',
                text: 'אנא שנה את התפקיד או שנה את העובד הנמצא בתפקיד זה לתפקיד שונה או השתמש באופציית אחר'
              })
              return;
            }
          }
        }
        this.setState({modal:false});  
        const Person2 = {
          EmpCode: this.state.Empcode,
          EmpFirstName: this.state.EmpFirstName,
          EmpLastName: this.state.EmpLastName,
          cellPhone: this.state.cellPhone,
          Email: this.state.Email,
          IsActive: this.state.IsActive,
          DepartmnetDepartmentCode: this.state.DepartmnetDepartmentCode,
          ActiveTillYear: this.state.ActiveTillYear,
          StudyingStartyear: this.state.StudyingStartyear,
          IsEmployee: this.state.ISEMPLOYEE,               
         }
         await this.props.UpdatePerson(Person2);
         await this.props.GetPersonDetails();        
         await this.props.GetRole_Employee();

        
         if(this.state.ISEMPLOYEE==="true"){
          let RoleName="";
          for (let index = 0; index < this.props.RoleVar.length; index++) {
            const element = this.props.RoleVar[index];
            if(this.state.RoleEmployee==element.RoleCode){
              RoleName= element.RoleName;
            }
          }
          let counter=0;
          for (let index = 0; index < this.props.Role_EmployeeVar.length; index++) {
            const element = this.props.Role_EmployeeVar[index];
            
            if (element.EmployeeEmpCode==this.state.Empcode) {
              counter++;
              const Role_Employee={
                RoleCode: this.state.RoleEmployee,
                EmployeeEmpCode: this.state.Empcode
              }
              await this.props.PUTRole_Employee(Role_Employee);
      
              const Role={
                RoleCode: this.state.RoleEmployee,
                RoleName: RoleName,
                description: this.state.RoleDescription
              }
              await this.props.PUTRole(Role);
            }
          }

          if(counter<1){
            const Role_Employee={
              RoleCode: this.state.RoleEmployee,
              EmployeeEmpCode: this.state.Empcode
            }
            await this.props.PostRole_Employee(Role_Employee);
            

            const Role={
              RoleCode: this.state.RoleEmployee,
              RoleName: RoleName,
              description: this.state.RoleDescription
            }
            await this.props.PUTRole(Role);
          }
         }
         if(this.state.ISEMPLOYEE=="false"){
          const Role_Employee={
            RoleCode: this.state.RoleEmployee,
            EmployeeEmpCode: this.state.Empcode
          }
          await this.props.DeleteRole_Employee(Role_Employee);
        }
          setTimeout(
            function() {
    
              let NrwRows= this.props.PersonVar.map(data => (            
                {          
                  EmpCode: data.EmpCode,
                  EmpFirstName: data.EmpFirstName,
                  EmpLastName: data.EmpLastName,
                  cellPhone: data.CellPhone,
                  Email: data.Email,
                  IsActive: data.IsActive==0? "לא פעיל": "פעיל",
                  DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
                  data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,
                  ActiveTillYear: data.ActiveTillYear,
                  StudyingStartyear: data.StudyingStartyear,
                  ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
                  actions: <div style={{textAlign:'center'}}>
                              
                  <MDBBtn onClick={()=>this.editUser(data)} color="warning"><img src="https://img.icons8.com/android/25/000000/edit.png"/></MDBBtn>
                  <MDBBtn onClick={()=>this.deleteUser(data.Email)} color="danger"> <img src="https://img.icons8.com/material/25/000000/delete--v1.png"/></MDBBtn>
                  <MDBBtn onClick={()=>this.TotalHours(data)} color="info"> <img src="https://img.icons8.com/material/25/000000/clock--v1.png"/></MDBBtn>                          </div>
                }
                ))
             
                this.setState({rows: NrwRows});
            }
            .bind(this),
            1500
        );             

          Toast.fire({
            icon: 'success',
            title: 'עדכון כוח אדם קיים התבצע בהצלחה'
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
    componentDidMount(){

      setTimeout(
        function() {
          this.props.GetRole();  
          this.props.GetRole_Employee();       
            this.setState({rows: this.props.PersonVar.map(data => (            
              {          
                EmpCode: data.EmpCode,
                EmpFirstName: data.EmpFirstName,
                EmpLastName: data.EmpLastName,
                cellPhone: data.CellPhone,
                Email: data.Email,
                IsActive: data.IsActive==0? "לא פעיל": "פעיל",
                DepartmnetDepartmentCode: data.DepartmnetDepartmentCode ==1? "הנדסה": data.DepartmnetDepartmentCode ==2?"כלכלה ומנהל עסקים":data.DepartmnetDepartmentCode ==3? "מדעי החברה והקהילה":
                data.DepartmnetDepartmentCode ==4? "מדעי הים":data.DepartmnetDepartmentCode ==5? "הנדסאים- המכללה הטכנולוגית": data.DepartmnetDepartmentCode ==6? "מכינות" :"אחר" ,
                ActiveTillYear: data.ActiveTillYear,
                StudyingStartyear: data.StudyingStartyear,
                ISEMPLOYEE: data.IsEmployee==0? "מתנדב": "עובד",
                actions: <div id="colAction">
                            
                            <MDBBtn id="BTN3_table"  onClick={()=>this.editUser(data)} color="warning"><img src="https://img.icons8.com/android/20/000000/edit.png"/></MDBBtn>
                            <MDBBtn id="BTN3_table"  onClick={()=>this.deleteUser(data.Email)} color="danger"> <img src="https://img.icons8.com/material/20/000000/delete--v1.png"/></MDBBtn>
                            <MDBBtn id="BTN3_table"  onClick={()=>this.TotalHours(data)} color="info"> <img src="https://img.icons8.com/material/20/000000/clock--v1.png"/></MDBBtn>
                           
                        </div>
              }
              ))}) 
        }
        .bind(this),
        1500
    );  
    }

    TotalHours=(data)=>{
      this.props.history.push({
        pathname:'/TotalHours',
        state:{ data: data
        }
      })
    }

    LogOutClicked=()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'התנתקת מהמערכת בהצלחה',
        showConfirmButton: false,
        timer: 1200
      })
      this.props.history.push({
        pathname:'/'
      })
    }

    TotalHoursReport=()=>{
      this.props.history.push({
        pathname:'/AllEmpsHoursReport'
      })
    }
    ManageActivitiesClicked=()=>{
      this.props.history.push({
        pathname:'/ManageActivities'
      })
    }
    ResourcesClicked=()=>{
      this.props.history.push({
        pathname: "/Resources",
      });
    }
    CalendarClicked=()=>{
      this.props.history.push({
        pathname: "/Calendar",
      });
    }
    BackClicked=()=>{
      this.props.history.push({
        pathname: "/Resources",
      });
    }
    
    render(){
      const columns =  [
        {
          label: ' עובד/מתנדב ',
          field: 'ISEMPLOYEE',
          sort: 'asc',
          width: 100
          },
        {
          label: 'תחילת-לימודים',
          field: 'StudyingStartyear',
          sort: 'asc',
          width: 150
          },
        {
          label: 'סיום-פעילות  ',
          field: 'ActiveTillYear',
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
        label: 'סטטוס ',
        field: 'IsActive',
        sort: 'asc',
        width: 150
        },
        {
        label: 'מייל',
        field: 'Email',
        sort: 'asc',
        width: 270
        },
        {
        label: 'טלפון ',
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
        width: 150
        },
        {
          label:'פעולות',
          field:'actions',
          sort:'asc',
          width:130
        }]   
         return(
          <div>
            
            {this.state.modal ? (
          <div>
                  <div id="BeforeHeader">
                  <div className="header">
                    <Menu disableAutoFocus right>
                      <Link to={"/home"}>
                        <a className="menu-item">
                          <i id="homei" class="fas fa-home">
                            {" "}
                          </i>
                          מסך הבית
                        </a>
                      </Link>
          
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
          
                    <button className="back" onClick={this.BackClicked}></button>
          
                    <div className="LogoDiv">
                      <img className="Agodit" src={Agodit}></img>
                      <h1 className="AgoditText">אגודית</h1>
                    </div>
                  </div>
                  <br />
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <h1>כוח אדם</h1>
                      </div>
                    </div>
                  </nav>
                  </div>
          <div className="Root">
            <br />
            <br />
            <br /> <br />
            <div className="container">
              <div id="header-Privacy">
                {this.state.editMode ? (
                  <h3 className="privacyList">עריכת כוח אדם קיים</h3>
                ) : (
                  <h3 className="privacyList">הוספת כוח אדם חדש</h3>
                )}
                <br /> <br />
              </div>
              <div id="editDiv">
                <form
                  class="modal-content animate"
                  action="/action_page.php"
                  onSubmit={this.submitted}
                >
                  <card id="idCard1">
                    <div className="form-group row">
                      <div className="form-group_col-sm-3">
                        <h1 id="h1Titele">פרטים אישיים</h1>
                        <div>
                          <label for="FirstName">
                            <span className="red-star">שם פרטי </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="FirstName"
                            required
                            value={this.state.EmpFirstName}
                            onChange={this.FirstNameChanged}
                          />
                        </div>
                      </div>
                      <div className="form-group_col-sm-3">
                        <label for="LastName">
                          <span className="red-star"> שם משפחה</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="FullName"
                          required
                          value={this.state.EmpLastName}
                          onChange={this.LastNameChanged}
                        />
                      </div>
                      <div className="form-group_col-sm-3">
                        <label for="year">
                          <span className="red-star"> טלפון</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="מספר בעל 10 ספרות"
                          pattern="^[0-9]{10}$"
                          title="חייב להיות בעל 10 ספרות"
                          className="form-control"
                          id="PhoneNum"
                          value={this.state.cellPhone}
                          onChange={this.cellPhoneChanged}
                          required
                        />
                      </div>
                      <div className="form-group_col-sm-3">
                        <label for="color">
                          <span className="red-star">מייל </span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="Mail"
                          value={this.state.Email}
                          onChange={this.EmailChanged}
                          required
                        />
                      </div>
                    </div>
                  </card>

                  <card id="idCard">
                    <div className="form-group row">
                      <div className="form-group_col-sm-3">
                        <h1 id="h1Titele">פרטים נוספים</h1>
                        <label for="color">
                          <span className="red-star">סטטוס </span>
                        </label>
                        <select
                          placeholder="בחר "
                          className="form-control"
                          id="color"
                          value={this.state.IsActive}
                          onChange={this.IsActiveChanged}
                          required
                        >
                          <option value="">בחר </option>
                          <option value="true">פעיל</option>
                          <option value="false"> לא פעיל </option>
                        </select>
                      </div>

                      <div className="form-group_col-sm-3">
                        <label for="color">
                          <span className="red-star">מחלקה </span>
                        </label>
                        <select
                          placeholder="בחר "
                          className="form-control"
                          id="color"
                          value={this.state.DepartmnetDepartmentCode}
                          onChange={this.DepartmnetChanged}
                          required
                        >
                          <option value="">בחר </option>
                          <option value="1">הנדסה</option>
                          <option value="2">כלכלה ומנהל עסקים </option>
                          <option value="3">מדעי החברה והקהילה</option>
                          <option value="4">מדעי הים</option>
                          <option value="5">הנדסאים- המכללה הטכנולוגית</option>
                          <option value="6">מכינות</option>
                          <option value="8">אחר</option>
                        </select>
                      </div>

                      <div className="form-group_col-sm-3">
                        <label>
                          <span className="red-star">סיום פעילות </span>
                        </label>
                        <input
                          placeholder="מספר בעל 4 ספרות"
                          pattern="^[0-9]{4}$"
                          type="tel"
                          className="form-control"
                          id="ActiveTillYear"
                          title=" חייב להיות בעל 4 ספרות "
                          required
                          onChange={this.ActiveTillYearChanged}
                          value={this.state.ActiveTillYear}
                        />
                      </div>

                      <div className="form-group_col-sm-3">
                        <label>
                          <span className="red-star"> תחילת הלימודים </span>
                        </label>
                        <input
                          title=" חייב להיות בעל 4 ספרות "
                          pattern="^[0-9]{4}$"
                          type="tel"
                          className="form-control"
                          id="StudyingStartyear"
                          placeholder="מספר בעל 4 ספרות"
                          required
                          onChange={this.StudyingStartyearChanged}
                          value={this.state.StudyingStartyear}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="form-group_col-sm-3">
                        <label for="color">
                          <span className="red-star"> עובד/מתנדב </span>
                        </label>
                        <select
                          placeholder=" בחר "
                          className="form-control"
                          id="color"
                          value={this.state.ISEMPLOYEE}
                          onChange={this.ISEMPLOYEEChanged}
                          required
                        >
                          <option value="">בחר </option>
                          <option value="false">מתנדב</option>
                          <option value="true"> עובד</option>
                        </select>
                      </div>
                      {this.state.EditRoleEmp ? (
                        <div className="form-group_col-sm-3">
                          <label for="color">
                            <span className="red-star">תפקיד </span>
                          </label>
                          <select
                            placeholder=" בחר "
                            className="form-control"
                            id="color"
                            value={this.state.RoleEmployee}
                            onChange={this.RoleEmployeeChanged}
                            required
                          >
                            <option value=""> בחר </option>
                            <option value="1">יושב ראש אגודה</option>
                            <option value="2"> סגן יושב ראש</option>
                            <option value="3">רמ"ד תרבות</option>
                            <option value="4"> רמ"ד אקדמיה</option>
                            <option value="5">רמ"ד לוגיסטיקה</option>
                            <option value="6"> רמ"ד רווחה</option>
                            <option value="7">גזבר</option>
                            <option value="8">רמ"ד שיווק</option>
                            <option value="9">אחר</option>
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.EditRoleEmp ? (
                        <div className="form-group_col-sm-3">
                          <label for="color" id="RoleId">
                            <span className="red-star">תיאור תפקיד </span>
                          </label>
                          <textarea
                            placeholder=" תאר בקצרה את התפקיד הנבחר"
                            rows="4"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.RoleDescription}
                            onChange={this.RoleDescriptionChanged}
                          ></textarea>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="Fotterdiv2BTN">
                    <button
                      
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


                  </card>
                
                </form>
              </div>
            </div>
          </div>
          </div>
        ) : (
          <div>
          <div id="BeforeHeaderMainHr">
          <div className="header">
            <Menu disableAutoFocus right>
              <Link to={"/home"}>
                <a className="menu-item">
                  <i id="homei" class="fas fa-home">
                    {" "}
                  </i>
                  מסך הבית
                </a>
              </Link>
  
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
  
            <button className="back" onClick={this.BackClicked}></button>
  
            <div className="LogoDiv">
              <img className="Agodit" src={Agodit}></img>
              <h1 className="AgoditText">אגודית</h1>
            </div>
          </div>
          <br />
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <h1>כוח אדם</h1>
              </div>
            </div>
          </nav>
          
          <div style={{ padding: "0%" }}>
            <MDBBtn
              id="IDMDBBTN"
              onClick={() => this.addNewUser()}
              color={"rgba(255,196,12,0.7)"}
              
            >
              הוסף אדם חדש
            </MDBBtn>
            <MDBBtn
              id="IDMDBBTNRRight"
              onClick={() => this.TotalHoursReport()}
              color={"rgba(255,196,12,0.7)"}
            >
              {" "}
              דו"ח שעות כולל
              
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
                rows: this.state.rows,
              }}
            />
          </div>
          </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter (CCHumanResources)
