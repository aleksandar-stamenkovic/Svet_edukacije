using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatAPI.Migrations
{
    public partial class v17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Predmet",
                table: "Zahtevi",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Predmet",
                table: "Zahtevi");
        }
    }
}
