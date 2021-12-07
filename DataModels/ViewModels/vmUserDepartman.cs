using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.ViewModels
{
    public class vmUserDepartman
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? DepartmanId { get; set; }
        public string DepartmanName { get; set; }
        public int? UserType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
