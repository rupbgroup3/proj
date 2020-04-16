import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Agodit from "../image/Agodit.png";
import Swal from "sweetalert2";

class CCAllEmpsHoursReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Modal: true,
      rows: [],
      totalHours: "",
      FromDate: new Date(),
      ToDate: new Date(),
    };
  }

  FromDateChanged = (e) => {
    this.setState({ FromDate: e.target.value });
  };
  ToDateChanged = (e) => {
    this.setState({ ToDate: e.target.value });
  };
  ChangeDatesSort = () => {
    this.setState({ Modal: true });
  };
  submitted = async (evt) => {
    evt.preventDefault();
    let TotalHours = 0;
    let FromDate = this.state.FromDate.toString();
    let ToDate = this.state.ToDate.toString();
    let HoursRepArr = [];
    let hours = 0;
    let t = {
      FromDate: FromDate,
      ToDate: ToDate,
    };

    await this.props.GetTasksInEventHoursReport(t);
    await this.props.GetTasksHoursReport(t);
    for (
      let index = 0;
      index < this.props.TasksInEventHoursReport.length;
      index++
    ) {
      const element = this.props.TasksInEventHoursReport[index];
      for (
        let index2 = 0;
        index2 < this.props.TasksHoursReport.length;
        index2++
      ) {
        const element2 = this.props.TasksHoursReport[index2];

        if (element.PersonEmpCode == element2.PersonEmpCode) {
          hours = element.TotalTasksInEventHours + element2.TotalTasksHours;
          HoursRepArr.push({
            PersonEmpCode: element.PersonEmpCode,
            TotalHours: hours,
            EmpFirstName: element.EmpFirstName,
            EmpLastName: element.EmpLastName,
            DepartmentName: element.DepartmentName,
          });
        }
      }
    }

    let newTasksInEventHoursReport = [];
    for (
      let index = 0;
      index < this.props.TasksInEventHoursReport.length;
      index++
    ) {
      const element = this.props.TasksInEventHoursReport[index];
      for (let index2 = 0; index2 < HoursRepArr.length; index2++) {
        const element2 = HoursRepArr[index2];
        if (element.PersonEmpCode == element2.PersonEmpCode) {
          const index = this.props.TasksInEventHoursReport.findIndex(
            (user) => user.PersonEmpCode === element.PersonEmpCode
          );
          console.log(index);
          const newHoursRep = this.props.TasksInEventHoursReport.filter(
            (person, key) => key !== index
          );
          newTasksInEventHoursReport = newHoursRep;
        }
      }
    }

    let newTasksHoursReport = [];
    for (let index = 0; index < this.props.TasksHoursReport.length; index++) {
      const element = this.props.TasksHoursReport[index];
      for (let index2 = 0; index2 < HoursRepArr.length; index2++) {
        const element2 = HoursRepArr[index2];
        if (element.PersonEmpCode == element2.PersonEmpCode) {
          const index = this.props.TasksHoursReport.findIndex(
            (user) => user.PersonEmpCode === element.PersonEmpCode
          );
          console.log(index);
          const newHoursRep = this.props.TasksHoursReport.filter(
            (person, key) => key !== index
          );
          newTasksHoursReport = newHoursRep;
        }
      }
    }

    for (let index = 0; index < newTasksInEventHoursReport.length; index++) {
      const element = newTasksInEventHoursReport[index];
      HoursRepArr.push({
        PersonEmpCode: element.PersonEmpCode,
        TotalHours: element.TotalTasksInEventHours,
        EmpFirstName: element.EmpFirstName,
        EmpLastName: element.EmpLastName,
        DepartmentName: element.DepartmentName,
      });
    }

    for (let index = 0; index < newTasksHoursReport.length; index++) {
      const element = newTasksHoursReport[index];
      HoursRepArr.push({
        PersonEmpCode: element.PersonEmpCode,
        TotalHours: element.TotalTasksHours,
        EmpFirstName: element.EmpFirstName,
        EmpLastName: element.EmpLastName,
        DepartmentName: element.DepartmentName,
      });
    }

    let HoursFRomsql = Math.trunc(TotalHours) / 60;
    let MinsFromSql = Math.trunc((TotalHours - Math.trunc(TotalHours)) * 60);
    if (MinsFromSql < 10) {
      MinsFromSql = MinsFromSql + "0";
    }
    let InsertToForm = HoursFRomsql;
    TotalHours = InsertToForm + ":" + MinsFromSql;

    await this.setState({
      rows: HoursRepArr.map((data) => ({
        EmpFirstName: data.EmpFirstName,
        EmpLastName: data.EmpLastName,
        DepartmentName: data.DepartmentName,
        TotalHours:
        (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)>9? "0"+ (Math.trunc(data.TotalHours/60))+ ":"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)): (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)<10?  "0"+ (Math.trunc(data.TotalHours/60))+ ":0"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)): (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0 &&Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))>9? "0"+ (Math.trunc(data.TotalHours/60))+ ":"+ Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)): (Math.trunc(data.TotalHours/60)) <10 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0 &&Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))<10? "0"+ (Math.trunc(data.TotalHours/60))+ ":0"+ Math.round(Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)): (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0&& Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))>9? (Math.trunc(data.TotalHours/60))+ ":"+Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)) : (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)==0&& Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60))<10? (Math.trunc(data.TotalHours/60))+ ":0"+Math.round( Math.trunc((data.TotalHours/60-(Math.trunc(data.TotalHours/60)))*60)): (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0&& Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)>9? (Math.trunc(data.TotalHours/60))+ ":"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)) : (Math.trunc(data.TotalHours/60)) >9 && Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)!=0&& Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)<10?  (Math.trunc(data.TotalHours/60))+ ":0"+Math.round( Math.trunc((data.TotalHours-(Math.trunc(data.TotalHours)))*60)):"",
      })),
      Modal: false,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "הדוח הופק בהצלחה",
      showConfirmButton: false,
      timer: 1800,
    });
  };
  componentDidMount() {
    this.props.GetTotalTasksPer();
    this.props.GetTotalTasksInEventPer();
    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    let TodayDate = date.toString().split("-");
    let years = TodayDate[0];
    let month = "";
    let day = "";
    if (TodayDate[1] < 10) {
      month = "0" + TodayDate[1];
    } else {
      month = TodayDate[1];
    }
    if (TodayDate[2] < 10) {
      day = "0" + TodayDate[2];
    } else {
      day = TodayDate[2];
    }
    let FullCurrentDate = years + "-" + month + "-" + day;

    this.setState({ FromDate: FullCurrentDate, ToDate: FullCurrentDate });
    this.setState({ DateEx: FullCurrentDate });
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
      pathname: "/login",
    });
  };

  render() {
    const columns = [
      {
        label: "סך הכל שעות",
        field: "TotalHours",
        sort: "asc",
        width: 150,
      },
      {
        label: "מחלקה",
        field: "DepartmentName",
        sort: "asc",
        width: 150,
      },
      {
        label: "שם משפחה",
        field: "EmpLastName",
        sort: "asc",
        width: 150,
      },
      {
        label: "שם פרטי ",
        field: "EmpFirstName",
        sort: "asc",
        width: 200,
      },
    ];

    return (
      <div>
        <div className="header">
          <Link to="/HumanResources">
            <button onClick={this.BackClicked} className="back"></button>
          </Link>

          <Link to="/">
            <button id="HomeBtn" className="home"></button>
          </Link>

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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>דו"ח שעות כולל</h1>
            </div>
          </div>
        </nav>

        {this.state.Modal ? (
          <div id="editDiv">
            <form
              class="modal-content animate"
              action="/action_page.php"
              onSubmit={this.submitted}
            >
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
                      className="form-control"
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
                      className="form-control"
                      id="EndDate"
                      required
                      value={this.state.ToDate}
                      onChange={this.ToDateChanged}
                    />
                  </div>
                </div>
              </card>

              <div className="Fotterdiv2BTN">
                <button
                  style={{ margin: 20 }}
                  type="submit"
                  className="btn btn-primary btn-lg"
                  id="saveBTN"
                >
                  הפק דו"ח
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ padding: "0%" }}>
              <MDBBtn
                id="IDMDBBTN"
                onClick={() => this.ChangeDatesSort()}
                color="success"
              >
                בחר טווח תאריכים אחר
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
        )}
      </div>
    );
  }
}

export default withRouter(CCAllEmpsHoursReport);
