using FinalProj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class CalendarActualTaskController : ApiController
    {

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל כשלוחצים על תאריך ספציפי
        //שימוש בפונקציית פוסט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט   

        [HttpPost]
        [Route("api/CalendarActualTaskOneDate")]
        public IEnumerable<CalendarActualTask> Post([FromBody]CalendarActualTask c)
        {
            return c.GetCalendarActualTaskOneDate(c);
        }

        // נועד ללוח השנה כאשר בוחרים להציג מידע של משימות בפועל מתוך טווח תאריכים
        //שימוש בפונקציית פוט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט  
        [HttpPut]
        [Route("api/CalendarActualTaskRangeDate")]
        public IEnumerable<CalendarActualTask> PUT([FromBody]CalendarActualTask c)
        {
            return c.GetCalendarActualTaskRangeDate(c);
        }



        public void Delete(int id)
        {
        }
    }
}