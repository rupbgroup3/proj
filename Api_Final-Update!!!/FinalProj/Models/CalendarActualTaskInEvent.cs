using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models
{
    public class CalendarActualTaskInEvent
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string TaskName { get; set; }
        public string executionDate { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public int PersonEmpCode { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public int plan_TasksInEventActual_EventBarcode { get; set; }
        public int plan_TasksInEventTaskTaskNo { get; set; }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל כשלוחצים על תאריך ספציפי
        public List<CalendarActualTaskInEvent> GetCalendarActualTaskInEventOneDate(CalendarActualTaskInEvent t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetCalendarActualTaskInEventOneDate(t.FromDate);
        }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל מתוך טווח תאריכים
        public List<CalendarActualTaskInEvent> GetCalendarActualTaskInEventRangeDate(CalendarActualTaskInEvent t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetCalendarActualTaskInEventRangeDate(t.FromDate, t.ToDate);
        }
    }
}