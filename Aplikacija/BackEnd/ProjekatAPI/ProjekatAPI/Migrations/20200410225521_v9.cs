using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatAPI.Migrations
{
    public partial class v9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PredavacPredmeti");

            migrationBuilder.AddColumn<int>(
                name: "PredavacId",
                table: "Predmeti",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Predmeti_PredavacId",
                table: "Predmeti",
                column: "PredavacId");

            migrationBuilder.AddForeignKey(
                name: "FK_Predmeti_Predavaci_PredavacId",
                table: "Predmeti",
                column: "PredavacId",
                principalTable: "Predavaci",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Predmeti_Predavaci_PredavacId",
                table: "Predmeti");

            migrationBuilder.DropIndex(
                name: "IX_Predmeti_PredavacId",
                table: "Predmeti");

            migrationBuilder.DropColumn(
                name: "PredavacId",
                table: "Predmeti");

            migrationBuilder.CreateTable(
                name: "PredavacPredmeti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PredavacId = table.Column<int>(type: "int", nullable: false),
                    PredmetId = table.Column<int>(type: "int", nullable: false)
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
    }
}
