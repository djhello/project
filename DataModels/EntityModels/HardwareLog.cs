using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class HardwareLog
    {
        public int Id { get; set; } 
        public string UserId { get; set; } 
        public int HardwareClassId { get; set; }
        public int HardwareId { get; set; }
        public int ReceiveQuantity { get; set; }
        public byte? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LastUserId { get; set; }

    }
}
