﻿using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class Equipment
    {
        public int Id { get; set; }
        public string EquipmentId { get; set; }
        public int EquipmentModelId { get; set; }
        public int CalibrationId { get; set; }
        public string EquipmentName { get; set; }
        public string Description { get; set; }
        public string SerialPortUSB { get; set; }
        public int CurrentLocationId { get; set; }
        public int CurrentUserId { get; set; }
        public int PermanentLocationId { get; set; }
        
    }
}
