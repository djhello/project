using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.EntityModels
{
    public partial class ICregulator
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int LocationId { get; set; }
        public string Port { get; set; }
        public string TeiPartNumber { get; set; }
        public string Description { get; set; }
        public string Supplier { get; set; }
        public string SPN { get; set; }
        public int Quantity { get; set; }
        public string MFPN { get; set; }
        public int ProjectId { get; set; }

        public byte? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LastUserId { get; set; }

    }
}
