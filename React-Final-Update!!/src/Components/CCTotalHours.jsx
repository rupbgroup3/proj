import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";
import "../CssFiles/TotalHours.css";
import { stack as Menu } from "react-burger-menu";

class CCTotalHours extends Component {
    constructor(props) {
        super(props);
        this.state={
          Modal: true,
          DateEx: new Date(),
          today: "",
          FromDate: "",
          ToDate:"",
          rows: [],
          totalHours: "",
          ShowAllTasks: false
        }
    }

    submitted= async(evt)=>{
      evt.preventDefault();
      let TotalHours=0;

      for (let index = 0; index < this.props.TotalTaskPerVar.length; index++) {
          const element = this.props.TotalTaskPerVar[index];
          if (element.exceutionDate>=this.state.FromDate&& element.exceutionDate<=this.state.ToDate&& this.props.location.state.data.EmpCode== element.PersonEmpCode) {
            TotalHours += (element.ToHour- element.FromHour)
          }       
      }

      for (let index2 = 0; index2 < this.props.TotalTaskInEventPerVar.length; index2++) {
        const element2 = this.props.TotalTaskInEventPerVar[index2];


         if(element2.executionDate>=this.state.FromDate&& element2.executionDate<=this.state.ToDate&& this.props.location.state.data.EmpCode== element2.PersonEmpCode){
          TotalHours += (element2.ToHour- element2.FromHour)
        }
        
      }
      let data= {
        TotalHours: TotalHours
      };
      TotalHours= (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)>9? "0"+ (Math.trunc(data.TotalHours/60))+ ":"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)): (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)<10?  "0"+ (Math.trunc(data.TotalHours/60))+ ":0"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)): (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0 &&Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))>9? "0"+ (Math.trunc(data.TotalHours/60))+ ":"+ Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)): (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0 &&Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))<10? "0"+ (Math.trunc(data.TotalHours/60))+ ":0"+ Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)): (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0&& Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))>9? (Math.trunc(data.TotalHours/60))+ ":"+Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)) : (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0&& Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))<10? (Math.trunc(data.TotalHours/60))+ ":0"+Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)): (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0&& Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)>9? (Math.trunc(data.TotalHours/60))+ ":"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)) : (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0&& Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)<10?  (Math.trunc(data.TotalHours/60))+ ":0"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)):"";
   
      let RowsToInsert= [];
      for (let index = 0; index <  this.props.TotalTaskPerVar.length; index++) {
        const data =  this.props.TotalTaskPerVar[index];
        if (data.exceutionDate>=this.state.FromDate&& data.exceutionDate<=this.state.ToDate&& this.props.location.state.data.EmpCode== data.PersonEmpCode) {
          RowsToInsert.push({
            TaskName: data.TaskName,
            executionDate: new Date(data.exceutionDate).toLocaleDateString().split(','),
            FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
            ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",
            TotalHours: (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc((data.ToHour-data.FromHour))))*60)!=0 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)>9? "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)!=0 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)<10?  "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0 &&Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))>9? "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+ Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0 &&Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))<10? "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+ Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0&& Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))>9? (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)) : (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0&& Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))<10? (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)!=0&& Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)>9? (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)) : (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)!=0&& Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)<10?  (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)):"" 
          })
        }
      }

      for (let index = 0; index < this.props.TotalTaskInEventPerVar.length; index++) {
        const data = this.props.TotalTaskInEventPerVar[index];
        if ( data.executionDate>=this.state.FromDate&& data.executionDate<=this.state.ToDate&& this.props.location.state.data.EmpCode== data.PersonEmpCode) {
          RowsToInsert.push({
             TaskName: data.TaskName,
             executionDate: new Date(data.executionDate).toLocaleDateString().split(','),
             FromHour:(Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  "0"+ (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? "0"+ (Math.trunc(data.FromHour/60))+ ":"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) <10 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0 &&Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? "0"+ (Math.trunc(data.FromHour/60))+ ":0"+ Math.round(Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)==0&& Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60))<10? (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour/60-(Math.trunc(data.FromHour/60)))*60)): (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)>9? (Math.trunc(data.FromHour/60))+ ":"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)) : (Math.trunc(data.FromHour/60)) >9 && Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)!=0&& Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)<10?  (Math.trunc(data.FromHour/60))+ ":0"+Math.round( Math.trunc((data.FromHour-(Math.trunc(data.FromHour)))*60)):"",
             ToHour:(Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  "0"+ (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? "0"+ (Math.trunc(data.ToHour/60))+ ":"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) <10 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0 &&Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? "0"+ (Math.trunc(data.ToHour/60))+ ":0"+ Math.round(Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)==0&& Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60))<10? (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour/60-(Math.trunc(data.ToHour/60)))*60)): (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)>9? (Math.trunc(data.ToHour/60))+ ":"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)) : (Math.trunc(data.ToHour/60)) >9 && Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)!=0&& Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)<10?  (Math.trunc(data.ToHour/60))+ ":0"+Math.round( Math.trunc((data.ToHour-(Math.trunc(data.ToHour)))*60)):"",
             TotalHours: (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc((data.ToHour-data.FromHour))))*60)!=0 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)>9? "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)!=0 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)<10?  "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0 &&Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))>9? "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+ Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) <10 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0 &&Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))<10? "0"+ (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+ Math.round(Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0&& Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))>9? (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)) : (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)==0&& Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60))<10? (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+Math.round( Math.trunc(((data.ToHour-data.FromHour)/60-(Math.trunc((data.ToHour-data.FromHour)/60)))*60)): (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)!=0&& Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)>9? (Math.trunc((data.ToHour-data.FromHour)/60))+ ":"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)) : (Math.trunc((data.ToHour-data.FromHour)/60)) >9 && Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)!=0&& Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)<10?  (Math.trunc((data.ToHour-data.FromHour)/60))+ ":0"+Math.round( Math.trunc(((data.ToHour-data.FromHour)-(Math.trunc(data.ToHour-data.FromHour)))*60)):"" 
            })
        }
      }

      this.setState({ rows: RowsToInsert,     
         totalHours: TotalHours,
         Modal:false
      })       
    }

    FromDateChanged=(e)=>{
        this.setState({FromDate: e.target.value})
    }
    ToDateChanged=(e)=>{
        this.setState({ToDate: e.target.value})
    }
    ChangeDatesSort=()=>{
      this.setState({Modal: true})
    }
    componentDidMount(){
      this.props.GetTotalTasksPer();
      this.props.GetTotalTasksInEventPer();
     
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

        this.setState({FromDate: FullCurrentDate,
        ToDate: FullCurrentDate})
        this.setState({DateEx:FullCurrentDate })
    }
    ShowAllTasks=()=>{
      this.setState({
        ShowAllTasks: true
      })
    }

    HideAllTasks=()=>{
      this.setState({
        ShowAllTasks: false
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
    
    render() { 
        const columns =  [
          {           
            label: 'סה"כ שעות',
            field: 'TotalHours',
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
                label: 'תאריך ביצוע',
                field: 'executionDate',
                sort: 'asc',
                width: 150
                },
            {
            label: 'שם משימה ',
            field: 'TaskName',
            sort: 'asc',
            width: 200
            },]         
        return ( 

            <div>
             <div className="header">  
             <Menu disableAutoFocus right >

<Link to='/home'>  
<a className="menu-item" >
<i id="homei" class="fas fa-home"> </i>
  מסך הבית
</a>
</Link>  

<Link to='/ManageActivities'> 
<a className="menu-item">
<i id="manageactivitiesi" class="fas fa-bell"></i>
  פעילויות
</a>
</Link>

<Link to='/Resources'> 
<a className="menu-item">
<i id="resourcesi" class="fas fa-globe"></i>
  משאבים
</a>
</Link>

<Link to='/Calendar'> 
<a className="menu-item" >
<i id="calendari" class="far fa-calendar-alt"></i>
  לוח שנה
</a>
</Link>

<a className="menu-item" onClick={this.LogOutClicked}>
<i id="logouti" class="fas fa-sign-out-alt"></i>
  התנתק
</a>

</Menu> 
             <Link to='/HumanResources'>             
                <button onClick={this.BackClicked} className="back"></button> 
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
        <h1>דו"ח שעות </h1>
            </div>
          </div>
        </nav>
        {this.state.Modal?
                <div id="editDiv">          
                <form  class="modal-content animate" action="/action_page.php" onSubmit={this.submitted}>
                          <card id="idCard1">
                          <div className="form-group row">
                            
                          <div className="form-group_col-sm-6">
                            <h1 id="h1Titele">תאריכים לסינון</h1>
                              <label for="FirstName">
                                <span className="red-star">תאריך התחלה </span>
                              </label>
                              <input
                              placeholder="אנא הכנס תאריך התחלה להפקדת הדוח"
                               type="date"
                                
                                id="StartDate"
                                required
                                value={this.state.FromDate}
                                onChange={this.FromDateChanged}
                              />
                            </div>
                            <div className="form-group_col-sm-6">
                              <label for="LastName">
                                <span className="red-star"> תאריך סיום</span> 
                              </label>
                              <input
                               placeholder="אנא הכנס תאריך סיום להפקדת הדוח"
                               type="date"
                               
                                id="EndDate"
                                required
                                value={this.state.ToDate}
                                onChange={this.ToDateChanged}
                              />
                            </div>
                  
                                                                             
                          </div>
                          <div className="Fotterdiv2BTN">
                            
                            <MDBBtn
                            color={"rgba(255,196,12,0.7)"}
                              style={{ margin: 30 }}
                              type="submit"
                              
                              id="saveBTN"
                            >
                              הפק דו"ח
                            </MDBBtn>
                          </div>
                          </card >
        
                     
                        </form>
                </div>:  
                <div>
                   <div id="DivTatalHour">
                    
                   <h1 id="h1one">  דו"ח שעות של  {this.props.location.state.data.EmpFirstName+ " "+this.props.location.state.data.EmpLastName} </h1>
                    <h1 id="h1two"> :סה"כ שעות  שבוצעו     </h1>
                    <h1 id="h1three">{this.state.totalHours}</h1>
                      <div style={{padding:'0%'}}>
                    
                <MDBBtn id="IDMDBBTN" color={"rgba(255,196,12,0.7)"} onClick={()=>this.ChangeDatesSort()}>בחירת תאריכים </MDBBtn>

{
  this.state.ShowAllTasks?
  <MDBBtn id="IDMDBBTN" color={"rgba(255,196,12,0.7)"} onClick={()=>this.HideAllTasks()} >הסתר פירוט משימות</MDBBtn> 
  :
  <MDBBtn id="IDMDBBTN" color={"rgba(255,196,12,0.7)"} onClick={()=>this.ShowAllTasks()} >הצג פירוט משימות</MDBBtn>
}

     </div>           
                {
                    this.state.ShowAllTasks?
                    <div>
                      <br/>
                    <h1 > פירוט משימות</h1>
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
                    :""
                }

            </div>


            </div>
        }
<br/><br/><br/>
        <footer>
        <p id="copyright">Copyright, 2020 &#169; <br/> Bar, Almog and Ron.  All rights reserved. </p>

     </footer>
            </div>
         );
    }
}
 
export default withRouter (CCTotalHours) ;