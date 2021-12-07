using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.EntityModels
{
    public partial class Location
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime CreateDate { get; set; }
        public string LastUserId { get; set; }
    }
}
