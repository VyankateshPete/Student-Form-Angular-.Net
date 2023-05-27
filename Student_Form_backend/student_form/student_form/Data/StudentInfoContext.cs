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
            entity.Property(e => e.StudentActiveBacklogs).HasColumnName("student_active_backlogs");
            entity.Property(e => e.StudentAddress)
                .HasMaxLength(75)
                .HasColumnName("student_address");
            entity.Property(e => e.StudentCity)
                .HasMaxLength(75)
                .HasColumnName("student_city");
            entity.Property(e => e.StudentCollegeName)
                .HasMaxLength(100)
                .HasColumnName("student_college_name");
            entity.Property(e => e.StudentCountry)
                .HasMaxLength(75)
                .HasColumnName("student_country");
            entity.Property(e => e.StudentDegree)
                .HasMaxLength(30)
                .HasColumnName("student_degree");
            entity.Property(e => e.StudentDisability).HasColumnName("student_disability");
            entity.Property(e => e.StudentDob)
                .HasDefaultValueSql("str_to_date(_utf8mb4\\'1/1/2002\\',_utf8mb4\\'%m/%d/%Y\\')")
                .HasColumnName("student_dob");
            entity.Property(e => e.StudentEmail)
                .HasMaxLength(50)
                .HasColumnName("student_email");
            entity.Property(e => e.StudentFirstName)
                .HasMaxLength(50)
                .HasColumnName("student_first_name");
            entity.Property(e => e.StudentGender)
                .HasMaxLength(10)
                .HasColumnName("student_gender");
            entity.Property(e => e.StudentLastName)
                .HasMaxLength(50)
                .HasColumnName("student_last_name");
            entity.Property(e => e.StudentMarks).HasColumnName("student_marks");
            entity.Property(e => e.StudentMiddleName)
                .HasMaxLength(50)
                .HasColumnName("student_middle_name");
            entity.Property(e => e.StudentMobno)
                .HasMaxLength(15)
                .HasColumnName("student_mobno");
            entity.Property(e => e.StudentPincode)
                .HasMaxLength(8)
                .HasColumnName("student_pincode");
            entity.Property(e => e.StudentReligion)
                .HasMaxLength(10)
                .HasColumnName("student_religion");
            entity.Property(e => e.StudentSpecialization)
                .HasMaxLength(25)
                .HasColumnName("student_specialization");
            entity.Property(e => e.StudentState)
                .HasMaxLength(75)
                .HasColumnName("student_state");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
