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
import CCActualTask from "./Components/CCActualTask"
import CCActualEvent from "./Components/CCActualEvent"
import CCEquipAndTaskInActualEvent from "./Components/CCEquipAndTaskInActualEvent"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TasksTypeVar: [],
      EventTypeVar: [],
      PersonVar: [],
      EquipmentVar: [],
      Event_Type_EquipmentTypeVar:[],
      Event_Type_TaskVar: [],
      PrevLocation: "",
      ActualTaskVar: [],
      RoleVar: [],
      Role_EmployeeVar: [],
      EmpInfoRoles: [],
      Actual_Event: [],
      Person_plan_TasksInEvent: []
    };
    let local = false;
    this.apiActual_EventUrl = "http://localhost:57661/api/Actual_Event";
    if (!local) {
      this.apiActual_EventUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Actual_Event";
    }

    this.apiPerson_plan_TasksInEventUrl = "http://localhost:57661/api/Person_plan_TasksInEvent";
    if (!local) {
      this.apiPerson_plan_TasksInEventUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Person_plan_TasksInEvent";
    }

    this.apiEquipmentType_Actual_EventUrl = "http://localhost:57661/api/EquipmentType_Actual_Event";
    if (!local) {
      this.apiEquipmentType_Actual_EventUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/EquipmentType_Actual_Event";
    }

    this.apiEmpInfoRolesUrl = "http://localhost:57661/api/EmpInfoRoles";
    if (!local) {
      this.apiEmpInfoRolesUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/EmpInfoRoles";
    }
     this.apiRoleUrl = "http://localhost:57661/api/Role";
    if (!local) {
      this.apiRoleUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Role";
    }

    this.apiRoleEmployeeUrl = "http://localhost:57661/api/Role_Employee";
    if (!local) {
      this.apiRoleEmployeeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Role_Employee";
    }

    this.apiActualTaskUrl = "http://localhost:57661/api/Task_Person";
    if (!local) {
      this.apiActualTaskUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Task_Person";
    }

    this.apiTasksTypeUrl = "http://localhost:57661/api/Task";
    if (!local) {
      this.apiTasksTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Task";
    }
    this.apiUpdateTaskUrl = "http://localhost:57661/api/Task/UpdateTask";
    if (!local) {
      this.apiUpdateTaskUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Task/UpdateTask";
    }

    this.apiDeleteTaskType = "http://localhost:57661/api/Task/DeleteTask";
    if (!local) {
      this.apiDeleteTaskType =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Task/DeleteTask";
    }

    this.apiEventsTypeUrl = "http://localhost:57661/api/Event_Type";
    if (!local) {
      this.apiEventsTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Event_Type";
    }

    this.apiEvent_Type_EquipmentTypeUrl = "http://localhost:57661/api/Event_Type_EquipmentType";
    if (!local) {
      this. apiEvent_Type_EquipmentTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Event_Type_EquipmentType";
    }
    this.apiEvent_Type_TaskUrl = "http://localhost:57661/api/Event_Type_Task";
    if (!local) {
      this.apiEvent_Type_TaskUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/Event_Type_Task";
    }
    this.apiPersonUrl = "http://localhost:57661/api/person";
    if (!local) {
      this.apiPersonUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/person";
    }

    this.apiUpdatePersonUrl = "http://localhost:57661/api/UpdatePerson";
    if (!local) {
      this.apiUpdatePersonUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/UpdatePerson";
    }

    this.apiDeletePerson = "http://localhost:57661/api/PersonDelete";
    if (!local) {
      this.apiDeletePerson =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/PersonDelete";
    }

    this.apiEquipmentTableUrl = "http://localhost:57661/api/EquipmentType";
    if (!local) {
      this.apiEquipmentTableUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/EquipmentType";
    }
    this.apiPostEquipmentTypeUrl = "http://localhost:57661/api/EquipmentType";
    if (!local) {
      this.apiPostEquipmentTypeUrl =
        "http://proj.ruppin.ac.il/bgroup3/prod/server/api/EquipmentType";
    }
  }

  componentDidMount() {
    this.GetTasks();
    this.GetEvents();
    this.GetPersonDetails();
    this.GetEquipmentTable();
  }

  MyPreviousLocation=(PrevLocation)=>{
    this.setState({PrevLocation: PrevLocation} )
  }
  GetPerson_plan_TasksInEvent=async()=>{
    await fetch(this.apiPerson_plan_TasksInEventUrl)
    .then(res => {
      return res.json();
    })
    .then(
      result => {
        // console.log(result);
        this.setState({ Person_plan_TasksInEvent: result });
        console.log(this.state.Person_plan_TasksInEvent);
      },
      error => {
        console.log("err post=", error);
      }
    );
  }

  PostPerson_plan_TasksInEvent=async(Person_plan_TasksInEvent)=>{
    await fetch(this.apiPerson_plan_TasksInEventUrl, {
      method: "POST",
      body: JSON.stringify(Person_plan_TasksInEvent),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  }
  PostEquipmentType_Actual_Event=async(EquipmentType_Actual_Event)=>{
    await fetch(this.apiEquipmentType_Actual_EventUrl, {
      method: "POST",
      body: JSON.stringify(EquipmentType_Actual_Event),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  }
 
  GetActualEvent=async()=>{
    await fetch(this.apiActual_EventUrl)
    .then(res => {
      return res.json();
    })
    .then(
      result => {
        // console.log(result);
        this.setState({ Actual_Event: result });
        console.log(this.state.Actual_Event);
      },
      error => {
        console.log("err post=", error);
      }
    );
  }

  PostActualEvent =async Actual_Event => {
    await fetch(this.apiActual_EventUrl, {
      method: "POST",
      body: JSON.stringify(Actual_Event),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  DeleteActualEvent= async Barcode=>{
    console.log(Barcode)
    await fetch(this.apiActual_EventUrl, {
      method: "DELETE",
      body: (Barcode),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }

  GetActualTask=async()=>{
    await fetch(this.apiActualTaskUrl)
    .then(res => {
      return res.json();
    })
    .then(
      result => {
        // console.log(result);
        this.setState({ ActualTaskVar: result });
        console.log(this.state.ActualTaskVar);
      },
      error => {
        console.log("err post=", error);
      }
    );
  }
  PostActualTask =async Task_Person => {
    await fetch(this.apiActualTaskUrl, {
      method: "POST",
      body: JSON.stringify(Task_Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  GetEquipmentTable =async () => {
    await fetch(this.apiEquipmentTableUrl)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          // console.log(result);
          this.setState({ EquipmentVar: result });
          console.log(this.state.EquipmentVar);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  DeleteEquipmentType = Name => {
    fetch(this.apiEquipmentTableUrl, {
      method: "PUT",
      body: JSON.stringify({
        Name: Name
      }),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  PostEquipmentType = EquipmentType => {
    fetch(this.apiPostEquipmentTypeUrl, {
      method: "POST",
      body: JSON.stringify(EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  UpdateEquipment=(EquipmentType)=>{
    console.log(EquipmentType)
    fetch(this.apiEquipmentTableUrl, {
      method: "DELETE",
      body: JSON.stringify(EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }

  GetTasks =async () => {
    await fetch(this.apiTasksTypeUrl)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          // console.log(result);
          this.setState({ TasksTypeVar: result });
          console.log(this.state.TasksTypeVar);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  PostTaskType = TaskType => {
    console.log(TaskType)
     fetch(this.apiTasksTypeUrl, {
      method: "POST",
      body: JSON.stringify(TaskType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  UpdateTask=(Task)=>{
    fetch(this.apiUpdateTaskUrl, {
      method: "DELETE",
      body: JSON.stringify(Task),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }
  DeleteTaskType = TaskName => {
    fetch(this.apiDeleteTaskType, {
      method: "PUT",
      body: JSON.stringify({
        TaskName: TaskName
      }),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  GetEvents =async () => {
     await fetch(this.apiEventsTypeUrl)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          // console.log(result);
          this.setState({ EventTypeVar: result });
          console.log(this.state.EventTypeVar);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  PostEventType=async Event_Type=>{
    console.log(Event_Type)
    await fetch(this.apiEventsTypeUrl, {
      method: "POST",
      body: JSON.stringify(Event_Type),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  }
  DeleteEventType=async Event_Type=>{
    console.log(Event_Type);
    await fetch(this.apiEventsTypeUrl, {
      method: "DELETE",
      body: JSON.stringify(Event_Type),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }
  UpdateEventType =async EventType => {
    await fetch(this.apiEventsTypeUrl, {
      method: "PUT",
      body: JSON.stringify(EventType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  GetEvent_Type_EquipmentType =async () => {
    await fetch(this.apiEvent_Type_EquipmentTypeUrl)
     .then(res => {
       return res.json();
     })
     .then(
       result => {
         // console.log(result);
         this.setState({ Event_Type_EquipmentTypeVar: result });
         console.log(this.state.Event_Type_EquipmentTypeVar);
       },
       error => {
         console.log("err post=", error);
       }
     );
 };
 
  PostEvent_Type_EquipmentType=async(Event_Type_EquipmentType)=>{
    console.log(Event_Type_EquipmentType)
    await fetch(this.apiEvent_Type_EquipmentTypeUrl, {
      method: "POST",
      body: JSON.stringify(Event_Type_EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );  
  }

  DeleteEvent_Type_EquipmentType=async(Event_Type_EquipmentType)=>{
    console.log(Event_Type_EquipmentType);
    await fetch(this.apiEvent_Type_EquipmentTypeUrl, {
      method: "DELETE",
      body: JSON.stringify(Event_Type_EquipmentType),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }
  GetEvent_Type_Task =async () => {
    await fetch(this.apiEvent_Type_TaskUrl)
     .then(res => {
       return res.json();
     })
     .then(
       result => {
         // console.log(result);
         this.setState({ Event_Type_TaskVar: result });
         console.log(this.state.Event_Type_TaskVar);
       },
       error => {
         console.log("err post=", error);
       }
     );
 };
 
DeleteEvent_Type_Task=async(Event_Type_Task)=>{
  console.log(Event_Type_Task);
  await fetch(this.apiEvent_Type_TaskUrl, {
    method: "DELETE",
    body: JSON.stringify(Event_Type_Task),
    headers: new Headers({
      "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
    })
  })
    .then(res => {
      console.log("res=", res);
      return res.json();
    })
    .then(
      result => {
        console.log("fetch DELETE= ", result);
        console.log(result);
      },
      error => {
        console.log("err delete=", error);
      }
    );  
}
  PostEvent_Type_Task=async (Event_Type_Task)=>{
    console.log(Event_Type_Task)
    await fetch(this.apiEvent_Type_TaskUrl, {
      method: "POST",
      body: JSON.stringify(Event_Type_Task),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );   
  }

  GetPersonDetails = async() => {
    await fetch(this.apiPersonUrl)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          // console.log(result);
          this.setState({ PersonVar: result });
          console.log(this.state.PersonVar);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
  PostPerson=(Person)=>{
    fetch(this.apiPersonUrl, {
      method: "POST",
      body: JSON.stringify(Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  }
  UpdatePerson=async(Person)=>{
    console.log(Person);
    await fetch(this.apiUpdatePersonUrl, {
      method: "DELETE",
      body: JSON.stringify(Person),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }
  DeletePerson = Email => {
    fetch(this.apiDeletePerson, {
      method: "PUT",
      body: JSON.stringify({
        Email: Email
      }),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  GetRole=async()=>{
    await fetch(this.apiRoleUrl)
    .then(res => {
      return res.json();
    })
    .then(
      result => {
        // console.log(result);
        this.setState({ RoleVar: result });
        console.log(this.state.RoleVar);
      },
      error => {
        console.log("err post=", error);
      }
    );
  }

  PUTRole=async (Role)=>{
    await fetch(this.apiRoleUrl, {
     method: "PUT",
     body: JSON.stringify(Role),
     headers: new Headers({
       "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
     })
   })
     .then(res => {
       console.log("res=", res);
       return res.json();
     })
     .then(
       result => {
         console.log("fetch PUT= ", result);
         console.log(result);
       },
       error => {
         console.log("err post=", error);
       }
     );
 }

 GetRole_Employee=async ()=>{
  await fetch(this.apiRoleEmployeeUrl)
  .then(res => {
    return res.json();
  })
  .then(
    result => {
      // console.log(result);
      this.setState({ Role_EmployeeVar: result });
      console.log(this.state.Role_EmployeeVar);
    },
    error => {
      console.log("err post=", error);
    }
  );
 }
  PostRole_Employee=async(Role_Employee)=>{
    await fetch(this.apiRoleEmployeeUrl, {
      method: "POST",
      body: JSON.stringify(Role_Employee),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
  }

  PUTRole_Employee=async(Role_Employee)=>{
    await fetch(this.apiRoleEmployeeUrl, {
      method: "PUT",
      body: JSON.stringify(Role_Employee),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch PUT= ", result);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  }
  DeleteRole_Employee=async(Role_Employee)=>{
    await fetch(this.apiRoleEmployeeUrl, {
      method: "DELETE",
      body: JSON.stringify(Role_Employee),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch DELETE= ", result);
          console.log(result);
        },
        error => {
          console.log("err delete=", error);
        }
      );  
  }
  GetEmpInfoRoles =async () => {
    await fetch(this.apiEmpInfoRolesUrl)
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          // console.log(result);
          this.setState({ EmpInfoRoles: result });
          console.log(this.state.EmpInfoRoles);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  SendToFavorite = id => {
    //pay attention case sensitive!!!! should be exactly as the prop in C#!
    console.log(id);

    fetch(this.apiUrl, {
      method: "POST",
      body: JSON.stringify(id),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8" //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
        },
        error => {
          console.log("err post=", error);
        }
      );
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your like has been saved in your likes list!",
      timer: 3000
    });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <CCHome
              MyPreviousLocation={this.MyPreviousLocation}
              PrevLocation={this.state.PrevLocation} />
          </Route>
          <Route path="/login">
            <CCLogIn PersonVar={this.state.PersonVar} />
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
              RoleVar= {this.state.RoleVar}
              GetRole= {this.GetRole}
              PostRole_Employee={this.PostRole_Employee}
              PUTRole={this.PUTRole}
              RoleVar={this.state.RoleVar}
              PUTRole_Employee={this.PUTRole_Employee}
              GetRole_Employee= {this.GetRole_Employee}
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
              Event_Type_EquipmentTypeVar={this.state.Event_Type_EquipmentTypeVar}
              Event_Type_TaskVar={this.state.Event_Type_TaskVar}
              DeleteEvent_Type_EquipmentType={this.DeleteEvent_Type_EquipmentType}
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
             PersonVar= {this.state.PersonVar}
             GetActualTask={this.GetActualTask}
             MyPreviousLocation={this.MyPreviousLocation}
             PostPerson_plan_TasksInEvent={this.PostPerson_plan_TasksInEvent}
             PostEquipmentType_Actual_Event={this.PostEquipmentType_Actual_Event}
             GetPerson_plan_TasksInEvent={this.GetPerson_plan_TasksInEvent}
             Person_plan_TasksInEvent={this.state.Person_plan_TasksInEvent}
             GetActualEvent={this.GetActualEvent}
             Actual_Event={this.state.Actual_Event}
             DeleteActualEvent={this.DeleteActualEvent}
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
              Event_Type_EquipmentTypeVar={this.state.Event_Type_EquipmentTypeVar}
              Event_Type_TaskVar={this.state.Event_Type_TaskVar}
              DeleteEvent_Type_EquipmentType={this.DeleteEvent_Type_EquipmentType}
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
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
