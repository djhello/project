﻿using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class EquipmentIssueSave
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int EquipmentId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool? Status { get; set; }
        
    }
}
