using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatAPI.Migrations
{
    public partial class v12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Zahtevi");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Zahtevi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PredavacId = table.Column<int>(type: "int", nullable: false),
                    Prihvacen = table.Column<bool>(type: "bit", nullable: true),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UcenikId = table.Column<int>(type: "int", nullable: false),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zahtevi", x => x.Id);
                });
        }
    }
}
