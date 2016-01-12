using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlaneswalkerPlatform.Models
{
    public class Deck
    {
        [Required]
        public int DeckId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string DeckJson { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime LastModified { get; set; }

        public Deck DeckNavigator { get; set; }
    }
}