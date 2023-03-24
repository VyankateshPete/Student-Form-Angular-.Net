using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using StudentInfo.Models;

namespace StudentInfo.Data;

public partial class StudentInfoContext : DbContext
{
    public StudentInfoContext(DbContextOptions<StudentInfoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<StudentInfoTable> StudentInfoTables { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<StudentInfoTable>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PRIMARY");

            entity.ToTable("student_info_table");

            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.StudentDob).HasColumnName("student_dob");
            entity.Property(e => e.StudentEmail)
                .HasMaxLength(75)
                .HasColumnName("student_email");
            entity.Property(e => e.StudentFirstName)
                .HasMaxLength(50)
                .HasColumnName("student_first_name");
            entity.Property(e => e.StudentLastName)
                .HasMaxLength(50)
                .HasColumnName("student_last_name");
            entity.Property(e => e.StudentMiddleName)
                .HasMaxLength(50)
                .HasColumnName("student_middle_name");
            entity.Property(e => e.StudentMobno)
                .HasMaxLength(15)
                .HasColumnName("student_mobno");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
