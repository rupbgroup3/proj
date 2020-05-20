using FinalProj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class CalendarActualTaskInEventController : ApiController
    {

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל כשלוחצים על תאריך ספציפי
        //שימוש בפונקציית פוסט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט   

        [HttpPost]
        [Route("api/CalendarActualTaskInEventOneDate")]
        public IEnumerable<CalendarActualTaskInEvent> Post([FromBody]CalendarActualTaskInEvent c)
        {
            return c.GetCalendarActualTaskInEventOneDate(c);
        }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל מתוך טווח תאריכים
        //שימוש בפונקציית פוט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט  
        [HttpPut]
        [Route("api/CalendarActualTaskInEventRangeDate")]
        public IEnumerable<CalendarActualTaskInEvent> PUT([FromBody]CalendarActualTaskInEvent c)
        {
            return c.GetCalendarActualTaskInEventRangeDate(c);
        }



        public void Delete(int id)
        {
        }
    }
}