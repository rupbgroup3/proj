using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Person
    {
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public int CellPhone { get; set; }
        public string Email { get; set; }
        public int DepartmnetDepartmentCode { get; set; }
        public int EmpCode { get; set; }
        public bool IsActive { get; set; }
        public int ActiveTillYear { get; set; }
        public int StudyingStartyear { get; set; }
        public bool IsEmployee { get; set; }
        //Method....

        public List<Person> getPerson()
        {
            DBservices dbs = new DBservices();

            return dbs.getPersons();
            
        }

        public int insert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.insertPerson(this);
            return numAffected;
        }

        public int DeletePerson(Person P)
        {
            DBservices dbs = new DBservices();
            return dbs.PersonDelete(P);

        }
        public int UpdatePerson(Person P)
        {
            DBservices dbs = new DBservices();
            return dbs.PersonUpdate(P);

        }

    }
}