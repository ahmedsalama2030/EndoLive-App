using System.Reflection;
using System.Drawing;
using System;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
 using Microsoft.EntityFrameworkCore;
using Core.Entities.ReportUGI;
using Core.Entities.ReportErcp;
using Core.Entities.ReportColonoscopy;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Infrastructure.Data
{

    public class AppDbContext : IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Degree> Degrees { get; set; }
        public DbSet<Department> Department { get; set; }
         public DbSet<WatingList> WatingList { get; set; }

        public DbSet<UGITemplate> UGITemplate { get; set; }
        public DbSet<UGISetting> UGISetting { get; set; }
        public DbSet<UGIReport> UGIReport { get; set; }
        public DbSet<UGIMedia> UGIMedia { get; set; }

        public DbSet<ERCPMedia> ERCPMedia { get; set; }
        public DbSet<ERCPReport> ERCPReport { get; set; }
        public DbSet<ERCPSetting> ERCPSetting { get; set; }
        public DbSet<ERCPTemplate> ERCPTemplate { get; set; }

        public DbSet<ColonoscopyMedia> ColonoscopyMedia { get; set; }
        public DbSet<ColonoscopyReport> ColonoscopyReport { get; set; }
        public DbSet<ColonoscopySetting> ColonoscopySetting { get; set; }
        public DbSet<ColonoscopyTemplate> ColonoscopyTemplate { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>(
               userRole =>
               {
                   userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
                   userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRole).HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
                   userRole.HasOne(ur => ur.User)
                   .WithMany(r => r.UserRole)
                   .HasForeignKey(ur => ur.UserId)
                   .IsRequired();

               }
          );
            modelBuilder.Entity<UserRole>().ToTable("UserRoles");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Role>().ToTable("Roles");

        }

    }
}