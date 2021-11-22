using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class EquipmentModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string EDocWebAddress { get; set; }
        public string EDocLocalAddress { get; set; }
        public string CoverImage { get; set; }
    }
}
