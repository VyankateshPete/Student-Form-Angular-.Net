using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentInfo.Data;
using StudentInfo.Models;

namespace student_form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentInfoTablesController : ControllerBase
    {
        private readonly StudentInfoContext _context;

        public StudentInfoTablesController(StudentInfoContext context)
        {
            _context = context;
        }

        // GET: api/StudentInfoTables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentInfoTable>>> GetStudentInfoTables()
        {
          if (_context.StudentInfoTables == null)
          {
              return NotFound();
          }
            return await _context.StudentInfoTables.ToListAsync();
        }

        // GET: api/StudentInfoTables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentInfoTable>> GetStudentInfoTable(int id)
        {
          if (_context.StudentInfoTables == null)
          {
              return NotFound();
          }
            var studentInfoTable = await _context.StudentInfoTables.FindAsync(id);

            if (studentInfoTable == null)
            {
                return NotFound();
            }

            return studentInfoTable;
        }

        // PUT: api/StudentInfoTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentInfoTable(int id, StudentInfoTable studentInfoTable)
        {
            if (id != studentInfoTable.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(studentInfoTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentInfoTableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentInfoTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentInfoTable>> PostStudentInfoTable(StudentInfoTable studentInfoTable)
        {
          if (_context.StudentInfoTables == null)
          {
              return Problem("Entity set 'StudentInfoContext.StudentInfoTables'  is null.");
          }
            _context.StudentInfoTables.Add(studentInfoTable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentInfoTable", new { id = studentInfoTable.StudentId }, studentInfoTable);
        }

        // DELETE: api/StudentInfoTables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentInfoTable(int id)
        {
            if (_context.StudentInfoTables == null)
            {
                return NotFound();
            }
            var studentInfoTable = await _context.StudentInfoTables.FindAsync(id);
            if (studentInfoTable == null)
            {
                return NotFound();
            }

            _context.StudentInfoTables.Remove(studentInfoTable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentInfoTableExists(int id)
        {
            return (_context.StudentInfoTables?.Any(e => e.StudentId == id)).GetValueOrDefault();
        }
    }
}
