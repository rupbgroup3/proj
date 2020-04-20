using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models.DAL
{
    public class TotalTasksPer
    {

        public string TaskName { get; set; }
        public int TaskTaskNo { get; set; }
        public string exceutionDate { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public int PersonEmpCode { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }



        //  נועד לדוח השעות הכולל של כל המתנדבים/ פעילים באגודה ומביא לנו את כל המשימות שאינן משוייכות לאירוע

        public List<TotalTasksPer> GetTotalTasksPer()
        {
            DBservices dbs = new DBservices();
            return dbs.GetTotalTasksPer();

        }
    }
}