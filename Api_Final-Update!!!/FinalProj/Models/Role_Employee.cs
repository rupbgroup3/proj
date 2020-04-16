using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Role_Employee
    {
        public int RoleCode { get; set; }
        public int EmployeeEmpCode { get; set; }


        //Method...
        public List<Role_Employee> getRole_Employee()
        {
            DBservices dbs = new DBservices();
            return dbs.getRole_Employees();

        }

        public int insertRole_Employee()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.insertRole_Employees(this);
            return numAffected;
        }
        public int UpdateRole_Employee(Role_Employee P)
        {
            DBservices dbs = new DBservices();
            return dbs.Role_EmployeeUpdate(P);

        }

        public int Delete_Role_Employee(Role_Employee P)
        {
            DBservices dbs = new DBservices();
            return dbs.Delete_Role_Employee(P);

        }
    }
}