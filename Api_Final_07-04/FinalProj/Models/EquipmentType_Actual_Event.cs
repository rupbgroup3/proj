using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class EquipmentType_Actual_Event
    {

        public int EquipmentTypeCode { get; set; }
        public int Actual_EventBarcode { get; set; }
        //Method..
        public List<EquipmentType_Actual_Event> getEquipmentType_Actual_Event()
        {
            DBservices dbs = new DBservices();
            return dbs.getEquipmentType_Actual_Events();

        }

        public int insertEquipmentType_Actual_Event()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.insertEquipmentType_Actual_Events(this);
            return numAffected;
        }
        public int DeleteEquipmentType_Actual_Event(EquipmentType_Actual_Event P)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteEquipmentType_Actual_Events(P);

        }

        //public int DeleteEquipmentType_Actual_Event(EquipmentType_Actual_Event P)
        //{
        //    DBservices dbs = new DBservices();
        //    return dbs.DeleteEquipmentType_Actual_Events(P);

        //}




    }
}