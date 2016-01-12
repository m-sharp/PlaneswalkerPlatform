namespace PlaneswalkerPlatform.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using PlaneswalkerPlatform.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<PlaneswalkerPlatform.Models.PlaneswalkerPlatformContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(PlaneswalkerPlatform.Models.PlaneswalkerPlatformContext context) {
            context.Users.AddOrUpdate(x => x.UserId,
                new User() { UserId = 1, Username = "freebird185", Created = DateTime.Now }
                );

            context.Decks.AddOrUpdate(x => x.DeckId,
                new Deck() { DeckId = 1, UserId = 1, DeckJson = "Code First Initialization", Created = DateTime.Now, LastModified = DateTime.Now }
                );
        }
    }
}
