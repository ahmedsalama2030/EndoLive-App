using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class intialtemplatename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<string>(
                name: "NameTemplate",
                table: "UGITemplate",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameTemplate",
                table: "ERCPTemplate",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameTemplate",
                table: "ColonoscopyTemplate",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameTemplate",
                table: "UGITemplate");

            migrationBuilder.DropColumn(
                name: "NameTemplate",
                table: "ERCPTemplate");

            migrationBuilder.DropColumn(
                name: "NameTemplate",
                table: "ColonoscopyTemplate");

            
        }
    }
}
