using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class EquipmentModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int DepartmanId { get; set; }
        public string Description { get; set; }
        public string EDocWebAddress { get; set; }
        public string EDocLocalAddress { get; set; }
        public string CoverImage { get; set; }
        public byte? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LastUserId { get; set; }
    }
}
