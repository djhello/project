using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.ViewModels
{
    public partial class vmEquipment
    {
        public int Id { get; set; }
        public string EquipmentId { get; set; }
        public int CalibrationId { get; set; }
        public string CalibrationName { get; set; }
        public string EquipmentName { get; set; }
        public string Description { get; set; }
        public string SerialPortUSB { get; set; }
        public int PermanentLocationId { get; set; }
        public string PermanentLocation { get; set; }
        public int CurrentLocationId { get; set; }
        public string CurrentLocation { get; set; }
        public int CurrentUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int EquipmentModelId { get; set; }
        public string EquipmentModel { get; set; }
        public string EquipmentModelDescription { get; set; }
        public string EDocWebAddress { get; set; }
        public string EDocLocalAddress { get; set; }
        public string CoverImage { get; set; }
    }
}
