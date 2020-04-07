using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models
{
    public class EmpInfoRoles
    {
        public int EmpCode { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public int cellPhone { get; set; }
        public string Email { get; set; }
        public int DepartmnetDepartmentCode { get; set; }
        public string RoleName { get; set; }

        /////////Method
       
        public List<EmpInfoRoles> GetEmpInfoRoles()
        {
            DBservices dbs = new DBservices();
            return dbs.GetEmpInfoRoles();


        }
    }
}