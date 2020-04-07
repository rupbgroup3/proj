import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom';


// $(document).ready(function () {

//     mode = "";

//     $("#cancelSaveBTN").on("click", function () {
//         car = null;
//         $("#editDiv").hide();
//         if (mode == "new") $("#pForm").show();
//         mode = "";
//     });

//     $("#newBTN").on("click", function () {
//         car = null;
//         mode = "new";
//         $("#pForm").hide();
//         $("#editDiv").show();
//         clearFields();
//         $("#editDiv :input").prop("disabled", false); // new mode: enable all controls in the form
//     });

//     // once the document is ready we fetch a list of cars from the server
//     ajaxCall("GET", "../api/cars", "", getSuccess, error);

//     $("#carForm").submit(onSubmitFunc); // wire the submit event to a function called f1

//     $("#editDiv").hide();
// });

// // wire all the buttons to their functions
// function buttonEvents() {

//     $(document).on("click", ".editBtn", function () {
//         mode = "edit";
//         markSelected(this);
//         $("#editDiv").show();
//         $("#editDiv :input").prop("disabled", false); // edit mode: enable all controls in the form
//         populateFields(this.getAttribute('data-carId')); // fill the form fields according to the selected row
//     });

//     $(document).on("click", ".viewBtn", function () {
//         mode = "view";
//         markSelected(this);
//         $("#editDiv").show();
//         row.className = 'selected';
//         $("#editDiv :input").attr("disabled", "disabled"); // view mode: disable all controls in the form
//         populateFields(this.getAttribute('data-carId'));
//     });

//     $(document).on("click", ".deleteBtn", function () {
//         mode = "delete";
//         markSelected(this);
//         var carId = this.getAttribute('data-carId');
//         swal({ // this will open a dialouge
//             title: "Are you sure ??",
//             text: "",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true
//         })
//         .then(function (willDelete) {
//             if (willDelete) DeleteCar(carId);
//             else swal("Not Deleted!");
//         });
//     });
// }

// // mark the selected row
// function markSelected(btn) {
//     $("#carsTable tr").removeClass("selected"); // remove seleced class from rows that were selected before
//     row = (btn.parentNode).parentNode; // button is in TD which is in Row
//     row.className = 'selected'; // mark as selected
// }

// // Delete a car from the server
// function DeleteCar(id) {
//     ajaxCall("DELETE", "../api/cars/" + id, "", deleteSuccess, error);
// }

// function onSubmitFunc() {

//     var Id = -1;
//     var Image = "car.jpg";
//     if (mode == "edit") {
//         Id = car.Id;
//         Image = car.Image;
//     }

//     let cartoSave = {
//         Id: Id,
//         Image: Image, // for now we do not change the image
//         Manufacturer: $("#manufacturer").val(),
//         Model: $("#model").val(),
//         Year: $("#year").val(),
//         Price: $("#price").val(),
//         Color: $("#color").val(),
//         Hand: $("#hand").val(),
//         Description: $("#description").val(),
//         Automatic: $("#automatic").is(":checked")
//     }

//     // add a new Car record to the server
//     if(mode == "edit")
//         ajaxCall("PUT", "../api/cars", JSON.stringify(cartoSave), updateSuccess, error);
//     else if (mode == "new")
//         ajaxCall("POST", "../api/cars", JSON.stringify(cartoSave), insertSuccess, error);
//     return false;
// }

// // fill the form fields
// function populateFields(carId) {
//     car = getCar(carId);
//     $("#manufacturer").val(car.Manufacturer);
//     $("#model").val(car.Model);
//     $("#year").val(car.Year);
//     $("#price").val(car.Price);
//     $("#color").val(car.Color);
//     $("#hand").val(car.Hand);
//     $("#description").val(car.Description);
//     $("#automatic").prop('checked', car.Automatic);
//     $("#image").attr("src", "images/" + car.Image);
// }

// // fill the form fields
// function clearFields() {
//     $("#manufacturer").val("");
//     $("#model").val("");
//     $("#year").val("");
//     $("#price").val("");
//     $("#color").val("");
//     $("#hand").val("");
//     $("#description").val("");
//     $("#automatic").prop('checked', true);
//     $("#image").attr("src", "images/car.jpg");
// }

// // get a car according to its Id
// function getCar(id) {
//     for (i in cars) {
//         if (cars[i].Id == id)
//             return cars[i];
//     }
//     return null;
// }

// // success callback function after update
// function updateSuccess(carsdata) {
//     tbl.clear();
//     redrawTable(tbl, carsdata);
//     buttonEvents();
//     $("#editDiv").hide();
//     swal("Updated Successfuly!", "Great Job", "success");
//     mode = "";
// }

// // success callback function after update
// function insertSuccess(carsdata) {
//     $("#pForm").show();
//     tbl.clear();
//     redrawTable(tbl, carsdata);
//     buttonEvents();
//     $("#editDiv").hide();
//     swal("Inserted Successfuly!", "Great Job", "success");
//     mode = "";
// }

// // success callback function after delete
// function deleteSuccess(carsdata) {
//     tbl.clear();
//     redrawTable(tbl, carsdata);
//     buttonEvents(); // after redrawing the table, we must wire the new buttons
//     $("#editDiv").hide();
//     swal("Deleted Successfuly!", "Great Job", "success");
//     mode = "";
// }

// // redraw a datatable with new data
// function redrawTable(tbl, data) {
//     tbl.clear();
//     for (var i = 0; i < data.length; i++) {
//         tbl.row.add(data[i]);
//     }
//     tbl.draw();
// }

// // this function is activated in case of a success
// function getSuccess(carsdata) {
//     cars = carsdata; // keep the cars array in a global variable;
//     try{
//         tbl = $('#carsTable').DataTable({
//             data: carsdata,
//             pageLength: 5,
//             columns: [
//                 {
//                     render: function (data, type, row, meta) {
//                         let dataCar = "data-carId='" + row.Id + "'";

//                         editBtn = "<button type='button' class = 'editBtn btn btn-success' " + dataCar + "> Edit </button>";
//                         viewBtn = "<button type='button' class = 'viewBtn btn btn-info' " + dataCar + "> View </button>";
//                         deleteBtn = "<button type='button' class = 'deleteBtn btn btn-danger' " + dataCar + "> Delete </button>";
//                         return editBtn + viewBtn + deleteBtn;
//                     }
//                 },
//                 { data: "Id" },
//                 { data: "Manufacturer" },
//                 { data: "Model" },
//                 { data: "Year" },
//                 { data: "Price" },
//                 {
//                     data: "Color",
//                     render: function (data, type, row, meta) {
//                         return "<div class = 'colorDiv' style='background-color:" + data + "'> </div>"
//                     }
//                 },
//                 { data: "Hand" },
//                 {
//                   data: "Automatic",
//                   render: function (data, type, row, meta) {
//                     if (data == true)
//                         return '<input type="checkbox" checked disabled="disabled" />';
//                     else
//                         return '<input type="checkbox" disabled="disabled"/>';
//                     }
//                 },
//                 {
//                     data: "Description",
//                     visible: false
//                 },
//                 {
//                     data: "Image",
//                     visible: false
//                 }
//             ],
//         });
//         buttonEvents();
//     }

//     catch (err) {
//         alert(err);
//     }
// }

// // this function is activated in case of a failure
// function error(err) {
//     swal("Error: " + err );
// }

class PrivacyInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      redirectd: false
    }
  }

  submitted=(evt)=>{
   
    this.setState({redirectd: true})
     evt.preventDefault();

  }

  componentDidMount(){
  }
  
  render() {
    if (this.state.redirectd) {
      return <Redirect to="/HumanResources" />
    }
    return (
      <div className="Root">
        <br />
        <br />
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1>כוח אדם</h1>
            </div>
          </div>
        </nav>
        <br /> <br />
        <div className="container">
          <div id="header-Privacy">
            <h3 className="privacyList">פרטים אישיים</h3>
            <br /> <br />
            <input
              type="button"
              value="חדש"
              className="btn btn-primary btn-lg"
              id="newBTN"
            />
          </div>

          <form id="pForm" onSubmit={this.submitted}>
            {/* <table id="carsTable" className="display-nowrap" >
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Hand</th>
                    <th>Gear</th>
                </tr>
            </thead>
        </table> */}
          </form>

          <div id="editDiv">
            <form id="carForm">
              <div className="form-group row">
                <div className="form-group_col-sm-3">
                  <label for="price">
                    <span className="red-star">★ </span>שם מלא
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="FullName"
                    required
                  />
                </div>

                <div className="form-group_col-sm-3">
                  <label for="model">
                    <span className="red-star">★ </span>ת"ז
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="IdPerson"
                    required
                  ></input>
                </div>

                <div className="form-group_col-sm-3">
                  <label for="manufacturer">
                    <span className="red-star">★ </span>סוג
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Type"
                    required
                  ></input>
                </div>

                <div className="form-group_col-sm-3">
                  <label for="year">
                    <span className="red-star">★ </span>נייד
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="PhoneNum"
                    required
                  />

                  {/* <select id="year" className="form-control" required>
            <option value="">Choose Year</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
        </select> */}
                </div>
              </div>

              <div className="form-group row">
                <div className="form-group_col-sm-3">
                  <label for="color">
                    <span className="red-star">★ </span>מייל
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Mail"
                    required
                  />

                  {/* <select className="form-control" id="color" required>
          <option value="">Choose Color</option>
          <option value="White"> White </option>
          <option value="Blue"> Blue </option>
          <option value="Black"> Black </option>
          <option value="Red"> Red </option>
          <option value="Grey"> Grey </option>
        </select> */}
                </div>

                <div className="form-group_col-sm-3">
                  <label for="hand">
                    <span className="red-star">★ </span>פעיל עד תאריך
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ActiveUntil"
                    required
                  />

                  {/* <select className="form-control" id="hand" required >
          <option value="">Choose Hand</option>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
        </select> */}
                </div>

                <div className="form-group_col-sm-3">
                  <label>
                    <span className="red-star">★ </span>שנת תחילת הלימודים
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="StartStudyingYear"
                    checked
                  />
                </div>

                <div className="form-group_col-sm-3">
                  <label>
                    <span className="red-star">★ </span>סטטוס
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="StatusPerson"
                    checked
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="form-group_col-sm-3">
                  <label>
                    <span className="red-star">★ </span>מחלקה
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Department"
                    checked
                  />
                </div>
                <div
                  style={{ textAlign: "right" }}
                  className="form-group col-sm-8"
                >
                  <label for="description">תיאור</label>
                  <textarea
                    rows="6"
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  style={{ margin: 20 }}
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
                  onClick={this.submitted}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter (PrivacyInfo);
