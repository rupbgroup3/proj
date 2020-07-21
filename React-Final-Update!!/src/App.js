import React, { Component } from "react";
import Agodit from "../src/image//Agodit.png";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "../src/CssFiles/Login+home+Resources.css";
import "../src/CssFiles/Header.css";
import "../src/CssFiles/HumanResources.css";
import CCHome from "./Components/CCHome";
import CCLogIn from "./Components/CCLogIn";
import CCHumanResources from "./Components/CCHumanResources";
import "../src/CssFiles/PrivacyInfo.css";
import CCResources from "./Components/CCResources";
import CCManageActivities from "./Components/CCManageActivities";
import "../src/CssFiles/ManageActivities.css";
import Swal from "sweetalert2";
import CCEventType from "./Components/CCEventType.jsx";
import CCEquipmentType from "./Components/CCEquipmentType.jsx";
import CCTaskType from "./Components/CCTaskType";
import CCActualTask from "./Components/CCActualTask";
import CCActualEvent from "./Components/CCActualEvent";
import CCEquipAndTaskInActualEvent from "./Components/CCEquipAndTaskInActualEvent";
import CCTotalHours from "./Components/CCTotalHours";
import CCAllEmpsHoursReport from "./Components/CCAllEmpsHoursReport";
import CCCalendar from "./Components/CCCalendar";
import "react-calendar/dist/Calendar.css";
import "./CssFiles/Calendar.css";
import "./CssFiles/BurgerMenu.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NameOfUser: "",
      TasksTypeVar: [],
      EventTypeVar: [],
      PersonVar: [],
      EquipmentVar: [],
      Event_Type_EquipmentTypeVar: [],
      Event_Type_TaskVar: [],
      PrevLocation: "",
      ActualTaskVar: [],
      RoleVar: [],
      Role_EmployeeVar: [],
      EmpInfoRoles: [],
      Actual_Event: [],
      Person_plan_TasksInEvent: [],
      TotalTaskPerVar: [],
      TotalTaskInEventPerVar: [],
      TasksInEventHoursReport: [],
      TasksHoursReport: [],
      CalendarActualEventOneDate: [],
      CalendarActualEventRangeDate: [],
      CalendarActualTaskOneDate: [],
      CalendarActualTaskRangeDate: [],
      EquipmentType_Actual_Event: [],
      CalendarActualTaskInEventOneDate: [],
      CalendarActualTaskInEventRangeDate: [],
    };
    let local = false;

    this.apiCalendarActualTaskInEventRangeDateUrl =
      "http://localhost:57661/api/CalendarActualTaskInEventRangeDate";
    if (!local) {
      this.apiCalendarActualTaskInEventRangeDateUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/CalendarActualTaskInEventRangeDate";
    }

    this.apiCalendarActualTaskInEventOneDateUrl =
      "http://localhost:57661/api/CalendarActualTaskInEventOneDate";
    if (!local) {
      this.apiCalendarActualTaskInEventOneDateUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/CalendarActualTaskInEventOneDate";
    }

    this.apiCalendarActualTaskRangeDateUrl =
      "http://localhost:57661/api/CalendarActualTaskRangeDate";
    if (!local) {
      this.apiCalendarActualTaskRangeDateUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/CalendarActualTaskRangeDate";
    }

    this.apiCalendarActualTaskOneDateUrl =
      "http://localhost:57661/api/CalendarActualTaskOneDate";
    if (!local) {
      this.apiCalendarActualTaskOneDateUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/CalendarActualTaskOneDate";
    }

    this.apiCalendarActualEventRangeDateUrl =
      "http://localhost:57661/api/CalendarActualEventRangeDate";
    if (!local) {
      this.apiCalendarActualEventRangeDateUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/CalendarActualEventRangeDate";
    }

    this.apiCalendarActualEventOneDateUrl =
      "http://localhost:57661/api/CalendarActualEventOneDate";
    if (!local) {
      this.apiCalendarActualEventOneDateUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/CalendarActualEventOneDate";
    }

    this.apiTasksHoursReportUrl = "http://localhost:57661/api/TasksHoursRep";
    if (!local) {
      this.apiTasksHoursReportUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/TasksHoursRep";
    }

    this.apiTasksInEventHoursReportUrl =
      "http://localhost:57661/api/TasksInEventHoursRep";
    if (!local) {
      this.apiTasksInEventHoursReportUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/TasksInEventHoursRep";
    }

    this.apiTotalTasksPerUrl = "http://localhost:57661/api/TotalTasksPer";
    if (!local) {
      this.apiTotalTasksPerUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/TotalTasksPer";
    }

    this.apiTotalTasksInEventPerUrl =
      "http://localhost:57661/api/TotalTasksInEventPer";
    if (!local) {
      this.apiTotalTasksInEventPerUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/TotalTasksInEventPer";
    }

    this.apiActual_EventUrl = "http://localhost:57661/api/Actual_Event";
    if (!local) {
      this.apiActual_EventUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Actual_Event";
    }

    this.apiPerson_plan_TasksInEventUrl =
      "http://localhost:57661/api/Person_plan_TasksInEvent";
    if (!local) {
      this.apiPerson_plan_TasksInEventUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Person_plan_TasksInEvent";
    }

    this.apiEquipmentType_Actual_EventUrl =
      "http://localhost:57661/api/EquipmentType_Actual_Event";
    if (!local) {
      this.apiEquipmentType_Actual_EventUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/EquipmentType_Actual_Event";
    }

    this.apiEmpInfoRolesUrl = "http://localhost:57661/api/EmpInfoRoles";
    if (!local) {
      this.apiEmpInfoRolesUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/EmpInfoRoles";
    }
    this.apiRoleUrl = "http://localhost:57661/api/Role";
    if (!local) {
      this.apiRoleUrl = "http://proj.ruppin.ac.il/bgroup3/prod/api/Role";
    }

    this.apiRoleEmployeeUrl = "http://localhost:57661/api/Role_Employee";
    if (!local) {
      this.apiRoleEmployeeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Role_Employee";
    }

    this.apiActualTaskUrl = "http://localhost:57661/api/Task_Person";
    if (!local) {
      this.apiActualTaskUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Task_Person";
    }

    this.apiTasksTypeUrl = "http://localhost:57661/api/Task";
    if (!local) {
      this.apiTasksTypeUrl = "http://proj.ruppin.ac.il/bgroup3/prod/api/Task";
    }
    this.apiUpdateTaskUrl = "http://localhost:57661/api/Task/UpdateTask";
    if (!local) {
      this.apiUpdateTaskUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Task/UpdateTask";
    }

    this.apiDeleteTaskType = "http://localhost:57661/api/Task/DeleteTask";
    if (!local) {
      this.apiDeleteTaskType =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Task/DeleteTask";
    }

    this.apiEventsTypeUrl = "http://localhost:57661/api/Event_Type";
    if (!local) {
      this.apiEventsTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Event_Type";
    }

    this.apiEvent_Type_EquipmentTypeUrl =
      "http://localhost:57661/api/Event_Type_EquipmentType";
    if (!local) {
      this.apiEvent_Type_EquipmentTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Event_Type_EquipmentType";
    }
    this.apiEvent_Type_TaskUrl = "http://localhost:57661/api/Event_Type_Task";
    if (!local) {
      this.apiEvent_Type_TaskUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/Event_Type_Task";
    }
    this.apiPersonUrl = "http://localhost:57661/api/person";
    if (!local) {
      this.apiPersonUrl = "http://proj.ruppin.ac.il/bgroup3/prod/api/person";
    }

    this.apiUpdatePersonUrl = "http://localhost:57661/api/UpdatePerson";
    if (!local) {
      this.apiUpdatePersonUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/UpdatePerson";
    }

    this.apiDeletePerson = "http://localhost:57661/api/PersonDelete";
    if (!local) {
      this.apiDeletePerson =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/PersonDelete";
    }

    this.apiEquipmentTableUrl = "http://localhost:57661/api/EquipmentType";
    if (!local) {
      this.apiEquipmentTableUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/EquipmentType";
    }
    this.apiPostEquipmentTypeUrl = "http://localhost:57661/api/EquipmentType";
    if (!local) {
      this.apiPostEquipmentTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/api/EquipmentType";
    }
  }

  componentDidMount() {
    this.GetTasks();
    this.GetEvents();
    this.GetPersonDetails();
    this.GetEquipmentTable();
  }

  MyPreviousLocation = (PrevLocation) => {
    this.setState({ PrevLocation: PrevLocation });
  };
  NameOfUser = (Name) => {
    this.setState({ NameOfUser: Name });
  };
  GetPerson_plan_TasksInEvent = async () => {
    await fetch(this.apiPerson_plan_TasksInEventUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ Person_plan_TasksInEvent: result });
          console.log(this.state.Person_plan_TasksInEvent);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  PostPerson_plan_TasksInEvent = async (Person_plan_TasksInEvent) => {
    console.log(Person_plan_TasksInEvent);
    await fetch(this.apiPerson_plan_TasksInEventUrl, {
      method: "POST",
      body: JSON.stringify(Person_plan_TasksInEvent),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  DeletePerson_plan_TasksInEvent = async (Person_plan_TasksInEvent) => {
    console.log(Person_plan_TasksInEvent);
    await fetch(this.apiPerson_plan_TasksInEventUrl, {
      method: "DELETE",
      body: JSON.stringify(Person_plan_TasksInEvent),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState({ Person_plan_TasksInEvent: result });
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };

  GetEquipmentType_Actual_Event = async () => {
    await fetch(this.apiEquipmentType_Actual_EventUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ EquipmentType_Actual_Event: result });
          console.log(this.state.EquipmentType_Actual_Event);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  PostEquipmentType_Actual_Event = async (EquipmentType_Actual_Event) => {
    await fetch(this.apiEquipmentType_Actual_EventUrl, {
      method: "POST",
      body: JSON.stringify(EquipmentType_Actual_Event),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  DeleteEquipmentType_Actual_Event = async (EquipmentType_Actual_Event) => {
    console.log(EquipmentType_Actual_Event);
    await fetch(this.apiEquipmentType_Actual_EventUrl, {
      method: "DELETE",
      body: JSON.stringify(EquipmentType_Actual_Event),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState({ EquipmentType_Actual_Event: result });
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };

  GetActualEvent = async () => {
    await fetch(this.apiActual_EventUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ Actual_Event: result });
          console.log(this.state.Actual_Event);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  PutActual_Event = async (Actual_Event) => {
    await fetch(this.apiActual_EventUrl, {
      method: "PUT",
      body: JSON.stringify(Actual_Event),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState({ Actual_Event: result });
          console.log("fetch PUT= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err PUT=", error);
        }
      );
  };

  PostActualEvent = async (Actual_Event) => {
    await fetch(this.apiActual_EventUrl, {
      method: "POST",
      body: JSON.stringify(Actual_Event),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  DeleteActualEvent = async (Barcode) => {
    console.log(Barcode);
    await fetch(this.apiActual_EventUrl, {
      method: "DELETE",
      body: Barcode,
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };

  GetActualTask = async () => {
    await fetch(this.apiActualTaskUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ ActualTaskVar: result });
          console.log(this.state.ActualTaskVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  PostActualTask = async (Task_Person) => {
    await fetch(this.apiActualTaskUrl, {
      method: "POST",
      body: JSON.stringify(Task_Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  DeleteActualTask = async (Task_Person) => {
    await fetch(this.apiActualTaskUrl, {
      method: "DELETE",
      body: JSON.stringify(Task_Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          this.setState({ ActualTaskVar: result });
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };

  GetEquipmentTable = async () => {
    await fetch(this.apiEquipmentTableUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ EquipmentVar: result });
          console.log(this.state.EquipmentVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  DeleteEquipmentType = (Name) => {
    fetch(this.apiEquipmentTableUrl, {
      method: "PUT",
      body: JSON.stringify({
        Name: Name,
      }),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  PostEquipmentType = (EquipmentType) => {
    fetch(this.apiPostEquipmentTypeUrl, {
      method: "POST",
      body: JSON.stringify(EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  UpdateEquipment = (EquipmentType) => {
    console.log(EquipmentType);
    fetch(this.apiEquipmentTableUrl, {
      method: "DELETE",
      body: JSON.stringify(EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };

  GetTasks = async () => {
    await fetch(this.apiTasksTypeUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ TasksTypeVar: result });
          console.log(this.state.TasksTypeVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  PostTaskType = (TaskType) => {
    console.log(TaskType);
    fetch(this.apiTasksTypeUrl, {
      method: "POST",
      body: JSON.stringify(TaskType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  UpdateTask = (Task) => {
    fetch(this.apiUpdateTaskUrl, {
      method: "DELETE",
      body: JSON.stringify(Task),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };
  DeleteTaskType = (TaskName) => {
    fetch(this.apiDeleteTaskType, {
      method: "PUT",
      body: JSON.stringify({
        TaskName: TaskName,
      }),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  GetEvents = async () => {
    await fetch(this.apiEventsTypeUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ EventTypeVar: result });
          console.log(this.state.EventTypeVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  PostEventType = async (Event_Type) => {
    console.log(Event_Type);
    await fetch(this.apiEventsTypeUrl, {
      method: "POST",
      body: JSON.stringify(Event_Type),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  DeleteEventType = async (Event_Type) => {
    console.log(Event_Type);
    await fetch(this.apiEventsTypeUrl, {
      method: "DELETE",
      body: JSON.stringify(Event_Type),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };
  UpdateEventType = async (EventType) => {
    await fetch(this.apiEventsTypeUrl, {
      method: "PUT",
      body: JSON.stringify(EventType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  GetEvent_Type_EquipmentType = async () => {
    await fetch(this.apiEvent_Type_EquipmentTypeUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ Event_Type_EquipmentTypeVar: result });
          console.log(this.state.Event_Type_EquipmentTypeVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  PostEvent_Type_EquipmentType = async (Event_Type_EquipmentType) => {
    console.log(Event_Type_EquipmentType);
    await fetch(this.apiEvent_Type_EquipmentTypeUrl, {
      method: "POST",
      body: JSON.stringify(Event_Type_EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  DeleteEvent_Type_EquipmentType = async (Event_Type_EquipmentType) => {
    console.log(Event_Type_EquipmentType);
    await fetch(this.apiEvent_Type_EquipmentTypeUrl, {
      method: "DELETE",
      body: JSON.stringify(Event_Type_EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };
  GetEvent_Type_Task = async () => {
    await fetch(this.apiEvent_Type_TaskUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ Event_Type_TaskVar: result });
          console.log(this.state.Event_Type_TaskVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  DeleteEvent_Type_Task = async (Event_Type_Task) => {
    console.log(Event_Type_Task);
    await fetch(this.apiEvent_Type_TaskUrl, {
      method: "DELETE",
      body: JSON.stringify(Event_Type_Task),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };
  PostEvent_Type_Task = async (Event_Type_Task) => {
    console.log(Event_Type_Task);
    await fetch(this.apiEvent_Type_TaskUrl, {
      method: "POST",
      body: JSON.stringify(Event_Type_Task),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetPersonDetails = async () => {
    await fetch(this.apiPersonUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ PersonVar: result });
          console.log(this.state.PersonVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  PostPerson = (Person) => {
    fetch(this.apiPersonUrl, {
      method: "POST",
      body: JSON.stringify(Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  UpdatePerson = async (Person) => {
    console.log(Person);
    await fetch(this.apiUpdatePersonUrl, {
      method: "DELETE",
      body: JSON.stringify(Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };
  DeletePerson = (Email) => {
    fetch(this.apiDeletePerson, {
      method: "PUT",
      body: JSON.stringify({
        Email: Email,
      }),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetRole = async () => {
    await fetch(this.apiRoleUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ RoleVar: result });
          console.log(this.state.RoleVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  PUTRole = async (Role) => {
    await fetch(this.apiRoleUrl, {
      method: "PUT",
      body: JSON.stringify(Role),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetRole_Employee = async () => {
    await fetch(this.apiRoleEmployeeUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ Role_EmployeeVar: result });
          console.log(this.state.Role_EmployeeVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  PostRole_Employee = async (Role_Employee) => {
    await fetch(this.apiRoleEmployeeUrl, {
      method: "POST",
      body: JSON.stringify(Role_Employee),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  PUTRole_Employee = async (Role_Employee) => {
    await fetch(this.apiRoleEmployeeUrl, {
      method: "PUT",
      body: JSON.stringify(Role_Employee),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  DeleteRole_Employee = async (Role_Employee) => {
    await fetch(this.apiRoleEmployeeUrl, {
      method: "DELETE",
      body: JSON.stringify(Role_Employee),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        (error) => {
          console.log("err delete=", error);
        }
      );
  };
  GetEmpInfoRoles = async () => {
    await fetch(this.apiEmpInfoRolesUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ EmpInfoRoles: result });
          console.log(this.state.EmpInfoRoles);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetTotalTasksPer = async () => {
    await fetch(this.apiTotalTasksPerUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ TotalTaskPerVar: result });
          console.log(this.state.TotalTaskPerVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetTotalTasksInEventPer = async () => {
    await fetch(this.apiTotalTasksInEventPerUrl)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          // console.log(result);
          this.setState({ TotalTaskInEventPerVar: result });
          console.log(this.state.TotalTaskInEventPerVar);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetTasksInEventHoursReport = async (t) => {
    fetch(this.apiTasksInEventHoursReportUrl, {
      method: "POST",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          this.setState({ TasksInEventHoursReport: result });
          console.log(this.state.TasksInEventHoursReport);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetTasksHoursReport = async (t) => {
    await fetch(this.apiTasksHoursReportUrl, {
      method: "POST",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          this.setState({ TasksHoursReport: result });
          console.log(this.state.TasksHoursReport);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetCalendarActualEventOneDate = async (t) => {
    await fetch(this.apiCalendarActualEventOneDateUrl, {
      method: "POST",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          this.setState({ CalendarActualEventOneDate: result });
          console.log(this.state.CalendarActualEventOneDate);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetCalendarActualEventRangeDate = async (t) => {
    await fetch(this.apiCalendarActualEventRangeDateUrl, {
      method: "PUT",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch put= ", result);
          this.setState({ CalendarActualEventRangeDate: result });
          console.log(this.state.CalendarActualEventRangeDate);
        },
        (error) => {
          console.log("err put=", error);
        }
      );
  };

  GetCalendarActualTaskOneDate = async (t) => {
    await fetch(this.apiCalendarActualTaskOneDateUrl, {
      method: "POST",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          this.setState({ CalendarActualTaskOneDate: result });
          console.log(this.state.CalendarActualTaskOneDate);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetCalendarActualTaskRangeDate = async (t) => {
    await fetch(this.apiCalendarActualTaskRangeDateUrl, {
      method: "PUT",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch put= ", result);
          this.setState({ CalendarActualTaskRangeDate: result });
          console.log(this.state.CalendarActualTaskRangeDate);
        },
        (error) => {
          console.log("err put=", error);
        }
      );
  };

  GetCalendarActualTaskInEventOneDate = async (t) => {
    await fetch(this.apiCalendarActualTaskInEventOneDateUrl, {
      method: "POST",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          this.setState({ CalendarActualTaskInEventOneDate: result });
          console.log(this.state.CalendarActualTaskInEventOneDate);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  GetCalendarActualTaskInEventRangeDate = async (t) => {
    await fetch(this.apiCalendarActualTaskInEventRangeDateUrl, {
      method: "PUT",
      body: JSON.stringify(t),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
      }),
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch put= ", result);
          this.setState({ CalendarActualTaskInEventRangeDate: result });
          console.log(this.state.CalendarActualTaskInEventRangeDate);
        },
        (error) => {
          console.log("err put=", error);
        }
      );
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <CCLogIn
              PersonVar={this.state.PersonVar}
              NameOfUser={this.NameOfUser}
              GetPersonDetails={this.GetPersonDetails}
            />
          </Route>
          <Route path="/home">
            <CCHome
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              NameOfUser={this.state.NameOfUser}
            />
          </Route>
          <Route path="/HumanResources">
            <CCHumanResources
              PersonVar={this.state.PersonVar}
              GetPersonDetails={this.GetPersonDetails}
              DeletePerson={this.DeletePerson}
              PostPerson={this.PostPerson}
              UpdatePerson={this.UpdatePerson}
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              RoleVar={this.state.RoleVar}
              GetRole={this.GetRole}
              PostRole_Employee={this.PostRole_Employee}
              PUTRole={this.PUTRole}
              RoleVar={this.state.RoleVar}
              PUTRole_Employee={this.PUTRole_Employee}
              GetRole_Employee={this.GetRole_Employee}
              Role_EmployeeVar={this.state.Role_EmployeeVar}
              DeleteRole_Employee={this.DeleteRole_Employee}
            />
          </Route>
          <Route path="/Resources">
            <CCResources
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
            />
          </Route>
          <Route path="/ManageActivities">
            <CCManageActivities
              TasksTypeVar={this.state.TasksTypeVar}
              EventTypeVar={this.state.EventTypeVar}
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              GetTasks={this.GetTasks}
              GetEvents={this.GetEvents}
            />
          </Route>
          <Route path="/EventTypes">
            <CCEventType
              GetEvents={this.GetEvents}
              EventTypeVar={this.state.EventTypeVar}
              EquipmentVar={this.state.EquipmentVar}
              TasksTypeVar={this.state.TasksTypeVar}
              GetEquipmentTable={this.GetEquipmentTable}
              GetTasks={this.GetTasks}
              PostEvent_Type_EquipmentType={this.PostEvent_Type_EquipmentType}
              PostEvent_Type_Task={this.PostEvent_Type_Task}
              GetEvent_Type_EquipmentType={this.GetEvent_Type_EquipmentType}
              GetEvent_Type_Task={this.GetEvent_Type_Task}
              Event_Type_EquipmentTypeVar={
                this.state.Event_Type_EquipmentTypeVar
              }
              Event_Type_TaskVar={this.state.Event_Type_TaskVar}
              DeleteEvent_Type_EquipmentType={
                this.DeleteEvent_Type_EquipmentType
              }
              DeleteEvent_Type_Task={this.DeleteEvent_Type_Task}
              PostEventType={this.PostEventType}
              UpdateEventType={this.UpdateEventType}
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              DeleteEventType={this.DeleteEventType}
            />
          </Route>
          <Route path="/EquipmentType">
            <CCEquipmentType
              EquipmentVar={this.state.EquipmentVar}
              DeleteEquipmentType={this.DeleteEquipmentType}
              GetEquipmentTable={this.GetEquipmentTable}
              PostEquipmentType={this.PostEquipmentType}
              UpdateEquipment={this.UpdateEquipment}
              PrevLocation={this.state.PrevLocation}
              MyPreviousLocation={this.MyPreviousLocation}
              DeleteActualEvent={this.DeleteActualEvent}
              GetActualEvent={this.GetActualEvent}
              Actual_Event={this.state.Actual_Event}
            />
          </Route>
          <Route path="/TasksType">
            <CCTaskType
              TasksTypeVar={this.state.TasksTypeVar}
              DeleteTaskType={this.DeleteTaskType}
              GetTasks={this.GetTasks}
              PostTaskType={this.PostTaskType}
              UpdateTask={this.UpdateTask}
              PrevLocation={this.state.PrevLocation}
              MyPreviousLocation={this.MyPreviousLocation}
              DeleteActualEvent={this.DeleteActualEvent}
              GetActualEvent={this.GetActualEvent}
              Actual_Event={this.state.Actual_Event}
            />
          </Route>
          <Route path="/ActualTask">
            <CCActualTask
              PrevLocation={this.state.PrevLocation}
              ActualTaskVar={this.state.ActualTaskVar}
              PostActualTask={this.PostActualTask}
              PersonVar={this.state.PersonVar}
              GetActualTask={this.GetActualTask}
              MyPreviousLocation={this.MyPreviousLocation}
              PostPerson_plan_TasksInEvent={this.PostPerson_plan_TasksInEvent}
              PostEquipmentType_Actual_Event={
                this.PostEquipmentType_Actual_Event
              }
              GetPerson_plan_TasksInEvent={this.GetPerson_plan_TasksInEvent}
              Person_plan_TasksInEvent={this.state.Person_plan_TasksInEvent}
              GetActualEvent={this.GetActualEvent}
              Actual_Event={this.state.Actual_Event}
              DeleteActualEvent={this.DeleteActualEvent}
              DeletePerson_plan_TasksInEvent={
                this.DeletePerson_plan_TasksInEvent
              }
              DeleteActualTask={this.DeleteActualTask}
            />
          </Route>
          <Route path="/ActualEvent">
            <CCActualEvent
              PrevLocation={this.state.PrevLocation}
              EmpInfoRoles={this.state.EmpInfoRoles}
              MyPreviousLocation={this.MyPreviousLocation}
              EventTypeVar={this.state.EventTypeVar}
              GetEmpInfoRoles={this.GetEmpInfoRoles}
              PostActualEvent={this.PostActualEvent}
              GetActualEvent={this.GetActualEvent}
              Actual_Event={this.state.Actual_Event}
              GetEquipmentTable={this.GetEquipmentTable}
              GetEvents={this.GetEvents}
              GetEvent_Type_EquipmentType={this.GetEvent_Type_EquipmentType}
              GetEvent_Type_Task={this.GetEvent_Type_Task}
              GetTasks={this.GetTasks}
              GetActualTask={this.GetActualTask}
              ActualTaskVar={this.state.ActualTaskVar}
              GetPerson_plan_TasksInEvent={this.GetPerson_plan_TasksInEvent}
              Person_plan_TasksInEvent={this.state.Person_plan_TasksInEvent}
              PutActual_Event={this.PutActual_Event}
            />
          </Route>
          <Route path="/EquipAndTaskInActualEvent">
            <CCEquipAndTaskInActualEvent
              GetEvents={this.GetEvents}
              EventTypeVar={this.state.EventTypeVar}
              EquipmentVar={this.state.EquipmentVar}
              TasksTypeVar={this.state.TasksTypeVar}
              GetEquipmentTable={this.GetEquipmentTable}
              GetTasks={this.GetTasks}
              PostEvent_Type_EquipmentType={this.PostEvent_Type_EquipmentType}
              PostEvent_Type_Task={this.PostEvent_Type_Task}
              GetEvent_Type_EquipmentType={this.GetEvent_Type_EquipmentType}
              GetEvent_Type_Task={this.GetEvent_Type_Task}
              Event_Type_EquipmentTypeVar={
                this.state.Event_Type_EquipmentTypeVar
              }
              Event_Type_TaskVar={this.state.Event_Type_TaskVar}
              DeleteEvent_Type_EquipmentType={
                this.DeleteEvent_Type_EquipmentType
              }
              DeleteEvent_Type_Task={this.DeleteEvent_Type_Task}
              PostEventType={this.PostEventType}
              UpdateEventType={this.UpdateEventType}
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              DeleteEventType={this.DeleteEventType}
              GetActualEvent={this.GetActualEvent}
              Actual_Event={this.state.Actual_Event}
              DeleteActualEvent={this.DeleteActualEvent}
            />
          </Route>
          <Route path="/TotalHours">
            <CCTotalHours
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              GetTotalTasksPer={this.GetTotalTasksPer}
              TotalTaskPerVar={this.state.TotalTaskPerVar}
              GetTotalTasksInEventPer={this.GetTotalTasksInEventPer}
              TotalTaskInEventPerVar={this.state.TotalTaskInEventPerVar}
            />
          </Route>
          <Route path="/AllEmpsHoursReport">
            <CCAllEmpsHoursReport
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              GetTotalTasksPer={this.GetTotalTasksPer}
              TotalTaskPerVar={this.state.TotalTaskPerVar}
              GetTotalTasksInEventPer={this.GetTotalTasksInEventPer}
              TotalTaskInEventPerVar={this.state.TotalTaskInEventPerVar}
              PersonVar={this.state.PersonVar}
              GetTasksInEventHoursReport={this.GetTasksInEventHoursReport}
              TasksInEventHoursReport={this.state.TasksInEventHoursReport}
              GetTasksHoursReport={this.GetTasksHoursReport}
              TasksHoursReport={this.state.TasksHoursReport}
            />
          </Route>
          <Route path="/Calendar">
            <CCCalendar
              GetCalendarActualEventOneDate={this.GetCalendarActualEventOneDate}
              CalendarActualEventOneDate={this.state.CalendarActualEventOneDate}
              GetTotalTasksInEventPer={this.GetTotalTasksInEventPer}
              TotalTaskInEventPerVar={this.state.TotalTaskInEventPerVar}
              CalendarActualEventRangeDate={
                this.state.CalendarActualEventRangeDate
              }
              GetCalendarActualEventRangeDate={
                this.GetCalendarActualEventRangeDate
              }
              CalendarActualTaskOneDate={this.state.CalendarActualTaskOneDate}
              GetCalendarActualTaskOneDate={this.GetCalendarActualTaskOneDate}
              GetCalendarActualTaskRangeDate={
                this.GetCalendarActualTaskRangeDate
              }
              CalendarActualTaskRangeDate={
                this.state.CalendarActualTaskRangeDate
              }
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation}
              DeletePerson_plan_TasksInEvent={
                this.DeletePerson_plan_TasksInEvent
              }
              DeleteEquipmentType_Actual_Event={
                this.DeleteEquipmentType_Actual_Event
              }
              GetPerson_plan_TasksInEvent={this.GetPerson_plan_TasksInEvent}
              Person_plan_TasksInEvent={this.state.Person_plan_TasksInEvent}
              GetEquipmentType_Actual_Event={this.GetEquipmentType_Actual_Event}
              EquipmentType_Actual_Event={this.state.EquipmentType_Actual_Event}
              DeleteActualEvent={this.DeleteActualEvent}
              DeleteActualTask={this.DeleteActualTask}
              GetCalendarActualTaskInEventOneDate={
                this.GetCalendarActualTaskInEventOneDate
              }
              CalendarActualTaskInEventOneDate={
                this.state.CalendarActualTaskInEventOneDate
              }
              GetCalendarActualTaskInEventRangeDate={
                this.GetCalendarActualTaskInEventRangeDate
              }
              CalendarActualTaskInEventRangeDate={
                this.state.CalendarActualTaskInEventRangeDate
              }
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
