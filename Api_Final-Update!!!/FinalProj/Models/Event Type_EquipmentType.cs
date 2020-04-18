using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Event_Type_EquipmentType
    {
        public int Event_TypeEventCode { get; set; }
        public int EquipmentTypeCode { get; set; }

        //Method...

        public int InsertEvent_TypeEquipmentType()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.EquipmentInsertEventType(this);
            return numAffected;
        }

        public List<Event_Type_EquipmentType> GetEvent_Type_EquipmentType()
        {
            DBservices dbs = new DBservices();
            return dbs.GetEvent_Type_EquipmentType();

        }
        public int DeleteEvent_Type_EquipmentType(Event_Type_EquipmentType ET)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteEvent_Type_EquipmentType(ET);

        }
    }
}