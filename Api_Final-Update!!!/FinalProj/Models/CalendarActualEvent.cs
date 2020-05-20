using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models
{
    public class CalendarActualEvent
    {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int Barcode { get; set; }
        public string date { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public string EventName { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public string Location { get; set; }

        public int EmployeeEmpCode { get; set; }

        public int Event_TypeEventCode { get; set; }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של אירועים בפועל כשלוחצים על תאריך ספציפי

        public List<CalendarActualEvent> GetCalendarActualEventOneDate(CalendarActualEvent t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetCalendarActualEventOneDate(t.FromDate);
        }


        // נועד ללוח השנה כאשר בוחרים להציג מידע של אירועים בפועל מתוך טווח תאריכים
        public List<CalendarActualEvent> GetCalendarActualEventRangeDate(CalendarActualEvent t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetCalendarActualEventRangeDate(t.FromDate, t.ToDate);
        }

    }
}