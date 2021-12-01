using System;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataModels.EntityModels
{
    public partial class EquipmentDBContext : DbContext
    {
        public EquipmentDBContext()
        {
        }

        public EquipmentDBContext(DbContextOptions<EquipmentDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Calibration> Calibration { get; set; }
        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<vmEquipment> vEquipment { get; set; }
        public virtual DbSet<vmAvailableEquipment> vAvailableEquipment { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Departman> Departman { get; set; }
        public virtual DbSet<EquipmentModel> EquipmentModel { get; set; }
        public virtual DbSet<vmEquipmentIssuereturn> vEquipmentIssueReturn { get; set; }
        public virtual DbSet<EquipmentIssueReturn> EquipmentIssueReturn { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserAuthentication> UserAuthentication { get; set; }
        public virtual DbSet<UserType> UserType { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(StaticInfos.conString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Calibration>(entity =>
            {
                entity.ToTable("calibration");

                entity.Property(e => e.Id)
                    .HasColumnName("id");

                entity.Property(e => e.CalibrationName)
                    .HasColumnName("calibrationName")
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.ToTable("equipment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EquipmentId).HasColumnName("equipmentId");

                entity.Property(e => e.EquipmentModelId).HasColumnName("equipmentModelId");

                entity.Property(e => e.CalibrationId).HasColumnName("calibrationId");

                entity.Property(e => e.EquipmentName).HasColumnName("equipmentName");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.SerialPortUSB).HasColumnName("serialPortUSB");

                entity.Property(e => e.CurrentLocationId).HasColumnName("currentLocationId");

                entity.Property(e => e.CurrentUserId).HasColumnName("currentUserId");

                entity.Property(e => e.PermanentLocationId).HasColumnName("permanentLocationId");
            });

            modelBuilder.Entity<vmEquipment>(entity =>
            {
                entity.ToTable("v_equipmentList");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EquipmentId).HasColumnName("equipmentId");

                entity.Property(e => e.CalibrationId).HasColumnName("calibrationId");

                entity.Property(e => e.CalibrationName).HasColumnName("calibrationName");

                entity.Property(e => e.EquipmentName).HasColumnName("equipmentName");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.SerialPortUSB).HasColumnName("serialPortUSB");

                entity.Property(e => e.PermanentLocationId).HasColumnName("permanentLocationId");

                entity.Property(e => e.PermanentLocation).HasColumnName("permanentLocation");

                entity.Property(e => e.CurrentLocationId).HasColumnName("currentLocationId");

                entity.Property(e => e.CurrentLocation).HasColumnName("currentLocation");

                entity.Property(e => e.CurrentUserId).HasColumnName("currentUserId");

                entity.Property(e => e.FirstName).HasColumnName("firstName");

                entity.Property(e => e.LastName).HasColumnName("lastName");

                entity.Property(e => e.EquipmentModelId).HasColumnName("equipmentModelId");

                entity.Property(e => e.EquipmentModel).HasColumnName("equipmentModel");

                entity.Property(e => e.EquipmentModelDescription).HasColumnName("equipmentModelDescription");

                entity.Property(e => e.EDocWebAddress).HasColumnName("eDocWebAddress");

                entity.Property(e => e.EDocLocalAddress).HasColumnName("eDocLocalAddress");

                entity.Property(e => e.CoverImage).HasColumnName("coverImage");

            });
            modelBuilder.Entity<vmAvailableEquipment>(entity =>
            {
                entity.ToTable("v_available_equipment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EquipmentId).HasColumnName("equipmentId");

                entity.Property(e => e.CalibrationId).HasColumnName("calibrationId");

                entity.Property(e => e.CalibrationName).HasColumnName("calibrationName");

                entity.Property(e => e.EquipmentName).HasColumnName("equipmentName");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.SerialPortUSB).HasColumnName("serialPortUSB");

                entity.Property(e => e.PermanentLocationId).HasColumnName("permanentLocationId");

                entity.Property(e => e.PermanentLocation).HasColumnName("permanentLocation");

                entity.Property(e => e.CurrentLocationId).HasColumnName("currentLocationId");

                entity.Property(e => e.CurrentLocation).HasColumnName("currentLocation");

                entity.Property(e => e.CurrentUserId).HasColumnName("currentUserId");

                entity.Property(e => e.FirstName).HasColumnName("firstName");

                entity.Property(e => e.LastName).HasColumnName("lastName");

                entity.Property(e => e.EquipmentModelId).HasColumnName("equipmentModelId");

                entity.Property(e => e.EquipmentModel).HasColumnName("equipmentModel");

                entity.Property(e => e.EquipmentModelDescription).HasColumnName("equipmentModelDescription");

                entity.Property(e => e.EDocWebAddress).HasColumnName("eDocWebAddress");

                entity.Property(e => e.EDocLocalAddress).HasColumnName("eDocLocalAddress");

                entity.Property(e => e.CoverImage).HasColumnName("coverImage");

            });

            modelBuilder.Entity<vmEquipmentIssuereturn>(entity =>
            {
                entity.ToTable("v_equipment_issuereturn");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EquipmentIssuereturnId).HasColumnName("equipment_issuereturn_id");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.OduncAlanAdi).HasColumnName("oduncAlanAdi");

                entity.Property(e => e.OduncAlanSoyadi).HasColumnName("oduncAlanSoyadi");

                entity.Property(e => e.IssueDate).HasColumnName("issueDate");

                entity.Property(e => e.DueDate).HasColumnName("dueDate");

                entity.Property(e => e.ReturnDate).HasColumnName("returnDate");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.EquipmentId).HasColumnName("equipmentId");

                entity.Property(e => e.CalibrationId).HasColumnName("calibrationId");

                entity.Property(e => e.CalibrationName).HasColumnName("calibrationName");

                entity.Property(e => e.EquipmentName).HasColumnName("equipmentName");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.SerialPortUSB).HasColumnName("serialPortUSB");

                entity.Property(e => e.PermanentLocationId).HasColumnName("permanentLocationId");

                entity.Property(e => e.PermanentLocation).HasColumnName("permanentLocation");

                entity.Property(e => e.CurrentLocationId).HasColumnName("currentLocationId");

                entity.Property(e => e.CurrentLocation).HasColumnName("currentLocation");

                entity.Property(e => e.CurrentUserId).HasColumnName("currentUserId");

                entity.Property(e => e.FirstName).HasColumnName("firstName");

                entity.Property(e => e.LastName).HasColumnName("lastName");

                entity.Property(e => e.EquipmentModelId).HasColumnName("equipmentModelId");

                entity.Property(e => e.EquipmentModel).HasColumnName("equipmentModel");

                entity.Property(e => e.EquipmentModelDescription).HasColumnName("equipmentModelDescription");

                entity.Property(e => e.EDocWebAddress).HasColumnName("eDocWebAddress");

                entity.Property(e => e.EDocLocalAddress).HasColumnName("eDocLocalAddress");

                entity.Property(e => e.CoverImage).HasColumnName("coverImage");

            });

            modelBuilder.Entity<EquipmentIssueReturn>(entity =>
            {
                entity.ToTable("equipment_issuereturn");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DueDate)
                    .HasColumnName("dueDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.IssueDate)
                    .HasColumnName("issueDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.ReturnDate)
                    .HasColumnName("returnDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((0))");
            });
            modelBuilder.Entity<EquipmentModel>(entity =>
            {
                entity.ToTable("equipment_model");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(255);

                entity.Property(e => e.EDocWebAddress).HasColumnName("eDocWebAddress");

                entity.Property(e => e.EDocLocalAddress).HasColumnName("eDocLocalAddress");

                entity.Property(e => e.CoverImage)
                    .HasColumnName("coverImage")
                    .HasMaxLength(250);
            });
            
            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("location");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });
            modelBuilder.Entity<Departman>(entity =>
            {
                entity.ToTable("departman");

                entity.Property(e => e.DepartmanId).HasColumnName("id");

                entity.Property(e => e.DepartmanName)
                    .HasColumnName("departmanName")
                    .HasMaxLength(255);
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .HasColumnName("firstName")
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .HasColumnName("lastName")
                    .HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.DepartmanId).HasColumnName("departmanId");

                entity.Property(e => e.Usertype).HasColumnName("userType");

            });

            modelBuilder.Entity<UserAuthentication>(entity =>
            {
                entity.ToTable("user_authentication");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Joindate)
                    .HasColumnName("joindate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(50);

                entity.Property(e => e.Userpass)
                    .HasColumnName("userpass")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("user_type");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Type)
                    .HasColumnName("type")
                    .HasMaxLength(50);
            });
        }
    }
}
