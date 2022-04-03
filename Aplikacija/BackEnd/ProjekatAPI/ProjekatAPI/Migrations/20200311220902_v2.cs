using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatAPI.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Predavaci_Predmeti_PredmetId",
                table: "Predavaci");

            migrationBuilder.DropForeignKey(
                name: "FK_Predmeti_Ucenici_UcenikId",
                table: "Predmeti");

            migrationBuilder.DropTable(
                name: "Admini");

            migrationBuilder.DropTable(
                name: "Ucenici");

            migrationBuilder.DropIndex(
                name: "IX_Predmeti_UcenikId",
                table: "Predmeti");

            migrationBuilder.DropIndex(
                name: "IX_Predavaci_PredmetId",
                table: "Predavaci");

            migrationBuilder.DropColumn(
                name: "UcenikId",
                table: "Predmeti");

            migrationBuilder.DropColumn(
                name: "PredmetId",
                table: "Predavaci");

            migrationBuilder.CreateTable(
                name: "PredavacPredmeti",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PredavacId = table.Column<int>(nullable: false),
                    PredmetId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PredavacPredmeti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PredavacPredmeti_Predavaci_PredavacId",
                        column: x => x.PredavacId,
                        principalTable: "Predavaci",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PredavacPredmeti_Predmeti_PredmetId",
                        column: x => x.PredmetId,
                        principalTable: "Predmeti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PredavacPredmeti_PredavacId",
                table: "PredavacPredmeti",
                column: "PredavacId");

            migrationBuilder.CreateIndex(
                name: "IX_PredavacPredmeti_PredmetId",
                table: "PredavacPredmeti",
                column: "PredmetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PredavacPredmeti");

            migrationBuilder.AddColumn<int>(
                name: "UcenikId",
                table: "Predmeti",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PredmetId",
                table: "Predavaci",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Admini",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admini", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ucenici",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brtel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ucenici", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Predmeti_UcenikId",
                table: "Predmeti",
                column: "UcenikId");

            migrationBuilder.CreateIndex(
                name: "IX_Predavaci_PredmetId",
                table: "Predavaci",
                column: "PredmetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Predavaci_Predmeti_PredmetId",
                table: "Predavaci",
                column: "PredmetId",
                principalTable: "Predmeti",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Predmeti_Ucenici_UcenikId",
                table: "Predmeti",
                column: "UcenikId",
                principalTable: "Ucenici",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
