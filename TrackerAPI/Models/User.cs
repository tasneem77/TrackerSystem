﻿using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
