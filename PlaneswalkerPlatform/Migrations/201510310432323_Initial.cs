namespace PlaneswalkerPlatform.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Decks",
                c => new
                    {
                        DeckId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        DeckJson = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                        LastModified = c.DateTime(nullable: false),
                        DeckNavigator_DeckId = c.Int(),
                    })
                .PrimaryKey(t => t.DeckId)
                .ForeignKey("dbo.Decks", t => t.DeckNavigator_DeckId)
                .Index(t => t.DeckNavigator_DeckId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Decks", "DeckNavigator_DeckId", "dbo.Decks");
            DropIndex("dbo.Decks", new[] { "DeckNavigator_DeckId" });
            DropTable("dbo.Users");
            DropTable("dbo.Decks");
        }
    }
}
