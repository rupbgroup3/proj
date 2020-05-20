import React, { Component, useState } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import ReactDOM from "react-dom";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../CssFiles/EventType.css";
import Swal from "sweetalert2";
import { Checkbox } from "react-bootstrap";
import { useLocation } from "react-router";
import Agodit from "../image/Agodit.png";
import { stack as Menu } from "react-burger-menu";

class CCEquipAndTaskInActualEvent extends Component {
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
      TaskClickedArrOld: [],
      EquipClickedArrOld: [],
      EventName: "",
      EventCode: "",
      PrevLocation: this.props.PrevLocation,
      counter: 0,
    };
  }
  componentDidMount() {
    console.log(this.state.PrevLocation);
    setTimeout(
      function () {
        this.props.GetEquipmentTable();
        this.props.GetTasks();
        this.props.GetActualEvent();
        this.props.GetEvent_Type_EquipmentType();
        this.props.GetEvent_Type_Task();
        this.setState({
          TasksTypeVar: this.props.TasksTypeVar,
          EquipmentVar: this.props.EquipmentVar,
        });

        const index = this.state.EquipClickedArr.findIndex(
          (user) => user.Code == ""
        );
        console.log(index);
        const newArr = this.state.EquipClickedArr.filter(
          (person, key) => key !== index
        );
        this.setState({ EquipClickedArr: newArr, EquipClickedArrOld: newArr });

        const index2 = this.state.TaskClickedArr.findIndex(
          (user) => user.TaskNo == ""
        );
        console.log(index2);
        const newArr2 = this.state.TaskClickedArr.filter(
          (person, key) => key !== index2
        );
        this.setState({ TaskClickedArr: newArr2, TaskClickedArrOld: newArr2 });

        let EquipClickedArr = this.state.EquipClickedArr;
        let TaskClickedArr = this.state.TaskClickedArr;
        const EventCode = this.props.location.state.EventCode;

        if (this.props.PrevLocation == "/ActualEvent") {
          for (
            let index = 0;
            index < this.props.Event_Type_EquipmentTypeVar.length;
            index++
          ) {
            for (
              let index2 = 0;
              index2 < this.props.EquipmentVar.length;
              index2++
            ) {
              const element2 = this.props.EquipmentVar[index2];
              const element = this.props.Event_Type_EquipmentTypeVar[index];

              if (
                element.Event_TypeEventCode == EventCode &&
                element.EquipmentTypeCode == element2.Code
              ) {
                EquipClickedArr.push({
                  Name: element2.Name,
                  Code: element2.Code,
                });
              }
            }
          }

          for (
            let index = 0;
            index < this.props.Event_Type_TaskVar.length;
            index++
          ) {
            for (
              let index2 = 0;
              index2 < this.props.TasksTypeVar.length;
              index2++
            ) {
              const element2 = this.props.TasksTypeVar[index2];
              const element = this.props.Event_Type_TaskVar[index];

              if (
                element.Event_TypeEventCode == EventCode &&
                element.TaskTaskNo == element2.TaskNo
              ) {
                TaskClickedArr.push({
                  TaskName: element2.TaskName,
                  TaskNo: element2.TaskNo,
                });
              }
            }
          }
          this.setState({
            EquipClickedArr: EquipClickedArr,
            TaskClickedArr: TaskClickedArr,
            EventName: this.props.location.state.EventName,
          });
        } else if (
          this.props.PrevLocation == "/EquipmentType" &&
          this.props.location.state != undefined
        ) {
          this.setState({
            TaskClickedArr: this.props.location.state.TaskClickedArr,
            EquipClickedArr: this.props.location.state.EquipClickedArr,
            EventName: this.props.location.state.EventName,
          });
        } else if (
          this.props.PrevLocation == "/TasksType" &&
          this.props.location.state != undefined
        ) {
          this.setState({
            TaskClickedArr: this.props.location.state.TaskClickedArr,
            EquipClickedArr: this.props.location.state.EquipClickedArr,
            EventName: this.props.location.state.EventName,
          });
        }
      }.bind(this),
      1500
    );
  }

  PutExistEvent = async () => {
    if (this.state.TaskClickedArr.length == 0) {
      Swal.fire({
        icon: "error",
        title: "לא נבחרו משימות לסוג האירוע",
        text: "אנא בחר סוגי משימות",
      });
    } else if (this.state.EquipClickedArr.length == 0) {
      Swal.fire({
        icon: "error",
        title: "לא נבחרו סוגי ציוד לסוג האירוע",
        text: "אנא בחר סוגי ציוד",
      });
    } else {
      setTimeout(
        function () {
          for (
            let index = 0;
            index < this.state.EquipClickedArrOld.length;
            index++
          ) {
            const element = this.state.EquipClickedArrOld[index];
            let Event_Type_EquipmentType = {
              EquipmentTypeCode: element.Code,
              Event_TypeEventCode: this.props.location.state.EventCode,
            };
            this.props.DeleteEvent_Type_EquipmentType(Event_Type_EquipmentType);
          }

          for (
            let index = 0;
            index < this.state.TaskClickedArrOld.length;
            index++
          ) {
            const element = this.state.TaskClickedArrOld[index];
            let Event_Type_Task = {
              Event_TypeEventCode: this.props.location.state.EventCode,
              TaskTaskNo: element.TaskNo,
            };
            this.props.DeleteEvent_Type_Task(Event_Type_Task);
          }

          this.PostNewValues();
        }.bind(this),
        1000
      );
    }
  };

  PostNewValues = () => {
    setTimeout(
      function () {
        for (
          let index = 0;
          index < this.state.EquipClickedArr.length;
          index++
        ) {
          let Event_Type_EquipmentType = {
            EquipmentTypeCode: this.state.EquipClickedArr[index].Code,
            Event_TypeEventCode: this.props.location.state.EventCode,
          };
          this.props.PostEvent_Type_EquipmentType(Event_Type_EquipmentType);
        }
        for (let index = 0; index < this.state.TaskClickedArr.length; index++) {
          const element = this.state.TaskClickedArr[index];
          let Event_Type_Task = {
            Event_typeEventCode: this.props.location.state.EventCode,
            TaskTaskNo: element.TaskNo,
          };
          this.props.PostEvent_Type_Task(Event_Type_Task);
        }
      }.bind(this),
      1000
    );
  };

  EquipmentClicked = (e) => {
    for (let index = 0; index < this.state.EquipClickedArr.length; index++) {
      const element = this.state.EquipClickedArr[index];
      if (element.Code == e.target.value) {
        Swal.fire({
          icon: "error",
          title: "שים לב",
          text: "ציוד זה כבר קיים ברשימת הציוד",
        });
        return;
      }
    }
    let Name = "";
    let counter = this.state.counter;
    for (let index = 0; index < this.props.EquipmentVar.length; index++) {
      const element = this.props.EquipmentVar[index];
      if (this.props.EquipmentVar[index].Code == e.target.value) {
        Name = element.Name;
      }
    }
    let EquipClicked = this.state.EquipClickedArr;
    EquipClicked.push({ Name: Name, Code: e.target.value });
    this.setState({ EquipClickedArr: EquipClicked });
    const index2 = this.state.EquipmentVar.findIndex(
      (user) => user.Code == e.target.value
    );
    console.log(index2);
    const newEquipmentVar = this.state.EquipmentVar.filter(
      (person, key) => key !== index2
    );
    console.log(this.state.EquipClickedArr);

    this.setState({ EquipmentVar: newEquipmentVar, counter: counter + 1 });
  };

  UncheckedEquip = (e) => {
    for (let index = 0; index < this.state.EquipmentVar.length; index++) {
      const element = this.state.EquipmentVar[index];
      if (element.Code == e.target.value) {
        let counter = this.state.counter;
        const index = this.state.EquipClickedArr.findIndex(
          (user) => user.Code == e.target.value
        );
        console.log(index);
        const newArr = this.state.EquipClickedArr.filter(
          (person, key) => key !== index
        );
        this.setState({ EquipClickedArr: newArr, counter: counter + 1 });

        console.log(this.state.EquipClickedArr);
        return;
      }
    }
    let counter = this.state.counter;
    const index = this.state.EquipClickedArr.findIndex(
      (user) => user.Code == e.target.value
    );
    this.state.EquipmentVar.unshift(this.state.EquipClickedArr[index]);
    console.log(index);
    const newArr = this.state.EquipClickedArr.filter(
      (person, key) => key !== index
    );
    this.setState({ EquipClickedArr: newArr, counter: counter + 1 });

    console.log(this.state.EquipClickedArr);
  };

  UncheckedTasks = (e) => {
    for (let index = 0; index < this.state.TasksTypeVar.length; index++) {
      const element = this.state.TasksTypeVar[index];
      if (element.TaskNo == e.target.value) {
        let counter = this.state.counter;
        const index = this.state.TaskClickedArr.findIndex(
          (user) => user.TaskNo == e.target.value
        );
        console.log(index);
        const newArr = this.state.TaskClickedArr.filter(
          (person, key) => key !== index
        );
        this.setState({ TaskClickedArr: newArr, counter: counter + 1 });
        return;
      }
    }

    let counter = this.state.counter;
    const index = this.state.TaskClickedArr.findIndex(
      (user) => user.TaskNo == e.target.value
    );
    this.state.TasksTypeVar.unshift(this.state.TaskClickedArr[index]);
    console.log(index);
    const newArr = this.state.TaskClickedArr.filter(
      (person, key) => key !== index
    );
    this.setState({ TaskClickedArr: newArr, counter: counter + 1 });
  };

  TaskClicked = (e) => {
    for (let index = 0; index < this.state.TaskClickedArr.length; index++) {
      const element = this.state.TaskClickedArr[index];
      if (element.TaskNo == e.target.value) {
        Swal.fire({
          icon: "error",
          title: "שים לב",
          text: "משימה זו כבר קיימת ברשימת המשימות",
        });
        return;
      }
    }
    console.log(this.state.TaskClickedArr);
    let Name = "";
    let counter = this.state.counter;
    for (let index = 0; index < this.props.TasksTypeVar.length; index++) {
      const element = this.props.TasksTypeVar[index];
      if (this.props.TasksTypeVar[index].TaskNo == e.target.value) {
        Name = element.TaskName;
      }
    }
    let TaskClicked = this.state.TaskClickedArr;
    TaskClicked.push({ TaskName: Name, TaskNo: e.target.value });
    this.setState({ TaskClickedArr: TaskClicked, counter: counter + 1 });

    const index2 = this.state.TasksTypeVar.findIndex(
      (user) => user.TaskNo == e.target.value
    );
    console.log(index2);
    const newTasksTypeVar = this.state.TasksTypeVar.filter(
      (person, key) => key !== index2
    );

    console.log(this.state.TaskClickedArr);

    this.setState({ TasksTypeVar: newTasksTypeVar });
  };

  searchedEquipment = (e) => {
    this.setState({ searchedEquipment: e.target.value });
  };
  searchedTasks = (e) => {
    this.setState({ searchedTasks: e.target.value });
  };
  // SaveNewEvent = async () => {

  //    if(this.state.TaskClickedArr.length==0){
  //     Swal.fire({
  //       icon: "error",
  //       title: "לא נבחרו משימות לסוג האירוע",
  //       text: "אנא בחר סוגי משימות"
  //     });
  //   }
  //   else if(this.state.EquipClickedArr.length==0){
  //     Swal.fire({
  //       icon: "error",
  //       title: "לא נבחרו סוגי ציוד לסוג האירוע",
  //       text: "אנא בחר סוגי ציוד"
  //     });
  //   }
  //   else{
  //     let EventCode = 0;
  //     const Event_Type = {
  //       EventName: this.state.EventNameEntered
  //     };
  //     await this.props.PostEventType(Event_Type);
  //      this.props.GetEvents();
  //     setTimeout(
  //       function() {
  //         for (let index = 0; index < this.props.EventTypeVar.length; index++) {
  //           const element = this.props.EventTypeVar[index];
  //           console.log(this.props.EventTypeVar[index].EventName);
  //           if (
  //             this.props.EventTypeVar[index].EventName ==
  //             this.state.EventNameEntered
  //           ) {
  //             EventCode = element.EventCode;
  //             console.log(element.EventCode);
  //           }
  //         }
  //       }.bind(this),
  //       1000
  //     );
  //     setTimeout(
  //       function() {
  //         for (
  //           let index = 0;
  //           index < this.state.EquipClickedArr.length;
  //           index++
  //         ) {
  //           const element = this.state.EquipClickedArr[index];
  //           let Event_Type_EquipmentType = {
  //             Event_TypeEventCode: EventCode,
  //             EquipmentTypeCode: element.Code
  //           };
  //           this.props.PostEvent_Type_EquipmentType(Event_Type_EquipmentType);
  //         }
  //       }.bind(this),
  //       1000
  //     );

  //     setTimeout(
  //       function() {
  //         for (let index = 0; index < this.state.TaskClickedArr.length; index++) {
  //           const element = this.state.TaskClickedArr[index];
  //           let Event_Type_Task = {
  //             Event_typeEventCode: EventCode,
  //             TaskTaskNo: element.TaskNo
  //           };
  //           this.props.PostEvent_Type_Task(Event_Type_Task);
  //         }
  //       }.bind(this),
  //       1000
  //     );

  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "האירוע הוגדר במערכת בהצלחה",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });

  //     setTimeout(
  //       function() {

  //         this.setState({redirected:true})
  //       }.bind(this),
  //       1500
  //     );
  //   }

  // };

  MoveToEquipTable = () => {
    this.props.GetActualEvent();
    this.props.MyPreviousLocation("/EquipAndTaskInActualEvent");
    this.props.history.push({
      pathname: "/EquipmentType",
      state: {
        TaskClickedArr: this.state.TaskClickedArr,
        EquipClickedArr: this.state.EquipClickedArr,
        TasksTypeVar: this.state.TasksTypeVar,
        EquipmentVar: this.state.EquipmentVar,
        EventName: this.state.EventName,
        Barcode: this.props.Actual_Event[this.props.Actual_Event.length - 1]
          .Barcode,
      },
    });
  };
  MoveToTasksTable = () => {
    this.props.GetActualEvent();
    this.props.MyPreviousLocation("/EquipAndTaskInActualEvent");
    this.props.history.push({
      pathname: "/TasksType",
      state: {
        TaskClickedArr: this.state.TaskClickedArr,
        EquipClickedArr: this.state.EquipClickedArr,
        TasksTypeVar: this.state.TasksTypeVar,
        EquipmentVar: this.state.EquipmentVar,
        EventName: this.state.EventName,
        Barcode: this.props.Actual_Event[this.props.Actual_Event.length - 1]
          .Barcode,
      },
    });
  };
  DeleteActualEvent = (Barcode) => {
    this.props.DeleteActualEvent(Barcode);
  };
  BackClicked = () => {
    if (this.props.PrevLocation == "/ActualEvent") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור חזור תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/ManageActivities",
          });
        }
      });
    } else if (this.props.PrevLocation == "/EquipmentType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור חזור תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/ManageActivities",
          });
        }
      });
    } else if (this.props.PrevLocation == "/TasksType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור חזור תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/ManageActivities",
          });
        }
      });
    } else {
      this.props.history.push({
        pathname: "/ManageActivities",
      });
    }
  };
  Homeclicked = () => {
    if (this.props.PrevLocation == "/ActualEvent") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור הבית תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/home",
          });
        }
      });
    } else if (this.props.PrevLocation == "/EquipmentType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור הבית תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/home",
          });
        }
      });
    } else if (this.props.PrevLocation == "/TasksType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור הבית תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/home",
          });
        }
      });
    } else {
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname: "/home",
      });
    }
  };

  ManageActivitiesClicked = () => {
    if (this.props.PrevLocation == "/ActualEvent") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/ManageActivities",
          });
        }
      });
    } else if (this.props.PrevLocation == "/EquipmentType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/ManageActivities",
          });
        }
      });
    } else if (this.props.PrevLocation == "/TasksType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/ManageActivities",
          });
        }
      });
    } else {
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname: "/ManageActivities",
      });
    }
  };

  ResourcesClicked = () => {
    if (this.props.PrevLocation == "/ActualEvent") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/Resources",
          });
        }
      });
    } else if (this.props.PrevLocation == "/EquipmentType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/Resources",
          });
        }
      });
    } else if (this.props.PrevLocation == "/TasksType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/Resources",
          });
        }
      });
    } else {
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname: "/Resources",
      });
    }
  };
  CalendarClicked = () => {
    if (this.props.PrevLocation == "/ActualEvent") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/Calendar",
          });
        }
      });
    } else if (this.props.PrevLocation == "/EquipmentType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/Calendar",
          });
        }
      });
    } else if (this.props.PrevLocation == "/TasksType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          " תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire(
            "!בוטל",
            "תהליך תזמון האירוע ושיוך משימות וציוד בוטל",
            "success"
          );
          this.props.history.push({
            pathname: "/Calendar",
          });
        }
      });
    } else {
      this.props.MyPreviousLocation(window.location.pathname);
      this.props.history.push({
        pathname: "/Calendar",
      });
    }
  };

  Logoutclicked = () => {
    if (this.props.PrevLocation == "/ActualEvent") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור התנתק תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire("התנתקות", "התנתקת מהמערכת בהצלחה", "success");
          this.props.history.push({
            pathname: "/",
          });
        }
      });
    } else if (this.props.PrevLocation == "/EquipmentType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור התנתק תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire("התנתקות", "התנתקת מהמערכת בהצלחה", "success");
          this.props.history.push({
            pathname: "/",
          });
        }
      });
    } else if (this.props.PrevLocation == "/TasksType") {
      Swal.fire({
        title: "?האם לבטל את התהליך שהתחלת",
        text:
          "בלחיצה על כפתור התנתק תהליך תזמון האירוע שהתחלת יבוטל ולא יישמר משום שלא שוייכו לו משימות בפועל וציוד, כדי להמשיך את התהליך לחץ על לא",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.DeleteActualEvent(
            this.props.Actual_Event[this.props.Actual_Event.length - 1].Barcode
          );
          Swal.fire("התנתקות", "התנתקת מהמערכת בהצלחה", "success");
          this.props.history.push({
            pathname: "/",
          });
        }
      });
    } else {
      this.props.history.push({
        pathname: "/",
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "התנתקת מהמערכת בהצלחה",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };
  DefiningTasksStepClicked = () => {
    if (this.state.TaskClickedArr.length == 0) {
      Swal.fire({
        icon: "error",
        title: "לא נבחרו משימות לסוג האירוע",
        text: "אנא בחר סוגי משימות",
      });
    } else if (this.state.EquipClickedArr.length == 0) {
      Swal.fire({
        icon: "error",
        title: "לא נבחרו סוגי ציוד לסוג האירוע",
        text: "אנא בחר סוגי ציוד",
      });
    } else if (this.state.counter > 0) {
      Swal.fire({
        title: "שינוי שיוכים לסוג האירוע לשימוש עתידי",
        text:
          "בלחיצה על כן- סוגי המשימות וסוגי הציוד ששוייכו מחדש יישמרו לשימוש עתידי ויבחרו אוטומטית בהגדרת אותו סוג אירוע בעתיד",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "לא",
      }).then((result) => {
        if (result.value) {
          this.PutExistEvent();
          this.props.GetActualEvent();
          this.props.MyPreviousLocation("/EquipAndTaskInActualEvent");
          Swal.fire(
            "נשמר",
            "שיוכי  סוגי הציוד והמשימות ששונו נשמרו במערכת לשימוש עתידי באותו סוג האירוע",
            "success"
          );
          this.props.history.push({
            pathname: "/ActualTask",
            state: {
              TaskClickedArr: this.state.TaskClickedArr,
              EquipClickedArr: this.state.EquipClickedArr,
              EventName: this.state.EventName,
              Barcode: this.props.Actual_Event[
                this.props.Actual_Event.length - 1
              ].Barcode,
            },
          });
        } else {
          this.props.GetActualEvent();
          this.props.MyPreviousLocation("/EquipAndTaskInActualEvent");
          this.props.history.push({
            pathname: "/ActualTask",
            state: {
              TaskClickedArr: this.state.TaskClickedArr,
              EquipClickedArr: this.state.EquipClickedArr,
              EventName: this.state.EventName,
              Barcode: this.props.Actual_Event[
                this.props.Actual_Event.length - 1
              ].Barcode,
            },
          });
        }
      });
    } else {
      this.props.GetActualEvent();
      this.props.MyPreviousLocation("/EquipAndTaskInActualEvent");
      this.props.history.push({
        pathname: "/ActualTask",
        state: {
          TaskClickedArr: this.state.TaskClickedArr,
          EquipClickedArr: this.state.EquipClickedArr,
          EventName: this.state.EventName,
          Barcode: this.props.Actual_Event[this.props.Actual_Event.length - 1]
            .Barcode,
        },
      });
    }
  };

  render() {
    return (
      <div>
        <div className="header">
          <Menu disableAutoFocus right>
            <a className="menu-item" onClick={this.Homeclicked}>
              <i id="homei" class="fas fa-home">
                {" "}
              </i>
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

            <a className="menu-item" onClick={this.Logoutclicked}>
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

        <div id="ManActDiv">
          <br />
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <h1>משימות וציוד לאירוע בפועל</h1>
              </div>
            </div>
          </nav>
          <div id="idDivInput">
            <span id="IdSpan"> אירוע : {this.state.EventName} </span>
            <br />
            <br />
            <br />

            <MDBBtn
              id="idMDBBtnSave"
              color="dark-green"
              onClick={this.DefiningTasksStepClicked}
            >
              המשך לניהול משימות
            </MDBBtn>
          </div>
          <div className="TaskEventsDiv">
            <table>
              <tr>
                <td id="tdLeft">
                  <div id="divEquipment">
                    <h2>סוגי ציוד</h2>
                    <MDBBtn
                      rounded
                      outline
                      id="idMDBBtn"
                      color={"rgba(255,196,12,0.7)"}
                      onClick={this.MoveToEquipTable}
                    >
                      ערוך ציוד / הוסף חדש
                    </MDBBtn>
                    <br></br>
                    <input
                      id="idInputSearchEq"
                      onChange={this.searchedEquipment}
                      placeholder="הזן סוג ציוד לחיפוש"
                    ></input>{" "}
                    <img src="https://img.icons8.com/material-outlined/20/000000/search.png" />
                    <br></br>
                    <div id="selectedEq">
                      {" "}
                      {this.state.EquipClickedArr.length != 0 ? (
                        <h2 id="IDH2">סוגי ציוד שנבחרו</h2>
                      ) : (
                        ""
                      )}
                      {this.state.EquipClickedArr.map((data) =>
                        data.Code == "" ? (
                          ""
                        ) : (
                          <div>
                            <label id="label_checkbox">{data.Name}</label>
                            <input
                              id="input_checkbox"
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
                    {this.state.EquipmentVar.map((data) =>
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
                    <MDBBtn
                      rounded
                      outline
                      id="idMDBBtn"
                      color={"rgba(255,196,12,0.7)"}
                      onClick={this.MoveToTasksTable}
                    >
                      ערוך משימה / הוסף חדשה
                    </MDBBtn>
                    <br></br>
                    <input
                      id="intupTask"
                      onChange={this.searchedTasks}
                      placeholder="הזן סוג משימה לחיפוש"
                    ></input>{" "}
                    
                    <img src="https://img.icons8.com/material-outlined/20/000000/search.png" />
                    <div id="selectedEq">
                      {" "}
                      {this.state.TaskClickedArr.length != 0 ? (
                        <h2 id="IDH2">סוגי משימות שנבחרו</h2>
                      ) : (
                        ""
                      )}
                      {this.state.TaskClickedArr.map((data) =>
                        data.TaskNo == "" ? (
                          ""
                        ) : (
                          <div>
                            <label id="label_checkbox">{data.TaskName}</label>
                            <input
                              id="input_checkbox"
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
                    {this.state.TasksTypeVar.map((data) =>
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
        </div>
      </div>
    );
  }
}

export default withRouter(CCEquipAndTaskInActualEvent);
