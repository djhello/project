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
        public string DepartmanName { get; set; }
        public int? Usertype { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        

    }
}
