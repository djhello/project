using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class EquipmentIssueReturn
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int EquipmentId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool? IsReturn { get; set; }
        public List<Equipment> Equipments { get; set; }
        public bool? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime CreateDate { get; set; }
        public string LastUserId { get; set; }
    }
}
