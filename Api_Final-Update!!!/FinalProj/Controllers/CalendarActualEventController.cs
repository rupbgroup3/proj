using FinalProj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class CalendarActualEventController : ApiController
    {


        // נועד ללוח השנה כאשר בוחרים להציג מידע של אירועים בפועל כשלוחצים על תאריך ספציפי
        //שימוש בפונקציית פוסט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט   
        // POST api/<controller>
        [HttpPost]
        [Route("api/CalendarActualEventOneDate")]
        public IEnumerable<CalendarActualEvent> Post([FromBody]CalendarActualEvent c)
        {
            return c.GetCalendarActualEventOneDate(c);
        }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של אירועים בפועל מתוך טווח תאריכים
        //שימוש בפונקציית פוט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט   
        [HttpPut]
        [Route("api/CalendarActualEventRangeDate")]
        // POST api/<controller>
        public IEnumerable<CalendarActualEvent> PUT([FromBody]CalendarActualEvent c)
        {
            return c.GetCalendarActualEventRangeDate(c);
        }


        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}