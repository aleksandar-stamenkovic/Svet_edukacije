using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatAPI.Migrations
{
    public partial class v14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UcenikId",
                table: "Zahtevi",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PredavacId",
                table: "Zahtevi",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Zahtevi_PredavacId",
                table: "Zahtevi",
                column: "PredavacId");

            migrationBuilder.CreateIndex(
                name: "IX_Zahtevi_UcenikId",
                table: "Zahtevi",
                column: "UcenikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Zahtevi_Predavaci_PredavacId",
                table: "Zahtevi",
                column: "PredavacId",
                principalTable: "Predavaci",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Zahtevi_Ucenik_UcenikId",
                table: "Zahtevi",
                column: "UcenikId",
                principalTable: "Ucenik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zahtevi_Predavaci_PredavacId",
                table: "Zahtevi");

            migrationBuilder.DropForeignKey(
                name: "FK_Zahtevi_Ucenik_UcenikId",
                table: "Zahtevi");

            migrationBuilder.DropIndex(
                name: "IX_Zahtevi_PredavacId",
                table: "Zahtevi");

            migrationBuilder.DropIndex(
                name: "IX_Zahtevi_UcenikId",
                table: "Zahtevi");

            migrationBuilder.AlterColumn<int>(
                name: "UcenikId",
                table: "Zahtevi",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PredavacId",
                table: "Zahtevi",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
