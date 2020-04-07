using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class skills
    {
        public int SkillCode { get; set; }
        public string SkillName { get; set; }

        //Method...

        public int insert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.insertSkill(this);
            return numAffected;
        }

        public List<skills> getskill()
        {
            DBservices dbs = new DBservices();
            return dbs.getskills();

        }


    }
}