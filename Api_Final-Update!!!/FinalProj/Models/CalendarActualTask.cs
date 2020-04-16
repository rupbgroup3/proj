using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models
{
    public class CalendarActualTask
    {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int TaskTaskNo { get; set; }
        public string exceutionDate { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public string TaskName { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }

        public int PersonEmpCode { get; set; }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל כשלוחצים על תאריך ספציפי
        public List<CalendarActualTask> GetCalendarActualTaskOneDate(CalendarActualTask t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetCalendarActualTaskOneDate(t.FromDate);
        }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל מתוך טווח תאריכים
        public List<CalendarActualTask> GetCalendarActualTaskRangeDate(CalendarActualTask t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetCalendarActualTaskRangeDate(t.FromDate, t.ToDate);
        }
    }
}