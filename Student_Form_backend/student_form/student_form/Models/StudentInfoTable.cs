using System;
using System.Collections.Generic;

namespace StudentInfo.Models;

public partial class StudentInfoTable
{
    public int StudentId { get; set; }

    public string? StudentFirstName { get; set; }

    public string? StudentMiddleName { get; set; }

    public string? StudentLastName { get; set; }

    public DateOnly? StudentDob { get; set; }

    public string? StudentGender { get; set; }

    public string? StudentReligion { get; set; }

    public bool? StudentDisability { get; set; }

    public string StudentMobno { get; set; } = null!;

    public string? StudentEmail { get; set; }

    public string? StudentCountry { get; set; }

    public string? StudentState { get; set; }

    public string? StudentCity { get; set; }

    public string? StudentPincode { get; set; }

    public string? StudentAddress { get; set; }

    public string? StudentCollegeName { get; set; }

    public string? StudentDegree { get; set; }

    public string? StudentSpecialization { get; set; }

    public int StudentMarks { get; set; }

    public short StudentActiveBacklogs { get; set; }
}
