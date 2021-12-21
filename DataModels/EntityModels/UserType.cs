using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class UserType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public byte? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LastUserId { get; set; }
    }
}
