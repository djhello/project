using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class UserAuthentication
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public string UserPass { get; set; }
        public DateTime? JoinDate { get; set; }

    }
}
