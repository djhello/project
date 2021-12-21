using DataUtilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.ViewModels
{
    public class vmLoggeduser
    {
        public int? UserId { get; set; }
        public int? UserType { get; set; }
        public string UserName { get; set; }
        public int? DepartmanId { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
    }
}
