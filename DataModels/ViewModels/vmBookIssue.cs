using DataModels.EntityModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.ViewModels
{
    public class vmEquipmentIssue
    {
        public int Id { get; set; }
        public string Membername { get; set; }
        public string Email { get; set; }
        public string Duedate { get; set; }

        public List<Equipment> Equipments { get; set; }
    }
}
