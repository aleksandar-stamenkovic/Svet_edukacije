using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatAPI.Migrations
{
    public partial class v16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Glasano",
                table: "Zahtevi",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Glasano",
                table: "Zahtevi");
        }
    }
}
