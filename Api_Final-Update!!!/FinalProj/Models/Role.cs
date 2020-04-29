using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Role
    {
        public int RoleCode { get; set; }
        public string RoleName { get; set; }
        public string description { get; set; }
        //Method...

        public List<Role> getRole()
        {
            DBservices dbs = new DBservices();
            return dbs.getRoles();

        }


        public int RoleInsert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.InsertRole(this);
            return numAffected;
        }

        public int RoleUpdate(Role r)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateRole(r);

        }

    }
}