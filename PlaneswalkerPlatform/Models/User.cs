using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlaneswalkerPlatform.Models
{
    public class User
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public DateTime Created { get; set; }
    }
}