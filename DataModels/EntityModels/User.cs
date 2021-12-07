using DataUtilities;
using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class User
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? DepartmanId { get; set; }
        public int? UserType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte? Status { get; set; }
        public bool? LockStatus { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LastUserId { get; set; }


    }
}
