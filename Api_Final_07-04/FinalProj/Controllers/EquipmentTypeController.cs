using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class EquipmentTypeController : ApiController
    {
        // GET api/<controller>

        public IEnumerable<EquipmentType> Get()
        {
            EquipmentType ET = new EquipmentType();
            return ET.GetEquipmentType();
        }

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<controller>
        public void Post([FromBody]EquipmentType EqType)
        {
            EqType.InsertEqType();
        }

        // PUT api/<controller>/5
        
        public int Put(EquipmentType Eq)
        {
            return Eq.DeleteEquipmentType(Eq);
        }

        // DELETE api/<controller>/5
        public int Delete(EquipmentType e)
        {
            return e.UpdateEquipment(e);
        }
    }
}