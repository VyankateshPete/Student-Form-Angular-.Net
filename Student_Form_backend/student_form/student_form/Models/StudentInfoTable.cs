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

    public string? StudentMobno { get; set; }

    public string StudentEmail { get; set; } = null!;
}
