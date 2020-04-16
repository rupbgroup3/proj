using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class EquipmentType
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int Code { get; set; }

        //Method...

        public List<EquipmentType> GetEquipmentType()
        {
            DBservices dbs = new DBservices();
            return dbs.GetEquipmentType();

        }

        public int InsertEqType()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.InsertEqType(this);
            return numAffected;
        }
        public int DeleteEquipmentType(EquipmentType Eq)
        {
            DBservices dbs = new DBservices();
            return dbs.EquipmentTypeDelete(Eq);

        }
        public int UpdateEquipment(EquipmentType e)
        {
            DBservices db = new DBservices();
            return db.UpdateEquipment(e);
        }
    }
}