using DataModels.EntityModels;
using System;
using System.Collections.Generic;

namespace DataModels.ViewModels
{
    public class vmEquipmentIssuereturn
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
        public int EquipmentIssueReturnId { get; set; }
        public int? UserId { get; set; }
        public string OduncAlanAdi { get; set; }
        public string OduncAlanSoyadi { get; set; }
        public int EquipmentIssueReturnEquipmentId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool? IsReturn { get; set; }
        

    }
}
