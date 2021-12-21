using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class Calibration
    {
        public int Id { get; set; }
        public string CalibrationName { get; set; }
        public byte? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LastUserId { get; set; }


    }
}
