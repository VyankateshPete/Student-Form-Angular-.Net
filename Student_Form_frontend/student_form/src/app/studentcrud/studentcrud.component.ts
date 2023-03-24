import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css'],
})
export class StudentcrudComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentStudentID: number = 0;
  studentId: number = 1;
  studentFirstName: string = '';
  studentMiddleName: string = '';
  studentLastName: string = '';
  studentDob: string = '';
  studentMobno: string = '';
  studentEmail: string = '';

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  ngOnInit(): void {}

  getAllStudent() {
    this.http
      .get('https://localhost:7083/api/StudentInfoTables')
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.StudentArray = resultData;
      });
  }

  register() {
    let bodyData = {
      studentFirstName: this.studentFirstName,
      studentMiddleName: this.studentMiddleName,
      studentLastName: this.studentLastName,
      studentDob: this.studentDob,
      studentMobno: this.studentMobno,
      studentEmail: this.studentEmail,
    };
    console.log(this.studentDob);
    this.http
      .post('https://localhost:7083/api/StudentInfoTables', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        // alert('Student Registered Successfully');
        this.getAllStudent();
        this.clearForm();
      });
  }

  setUpdate(data: any) {
    this.currentStudentID = data.studentId;
    this.studentId = data.studentId;
    this.studentFirstName = data.studentFirstName;
    this.studentMiddleName = data.studentMiddleName;
    this.studentLastName = data.studentLastName;
    this.studentDob = data.studentDob;
    this.studentMobno = data.studentMobno;
    this.studentEmail = data.studentEmail;
    console.log(this.currentStudentID);
  }

  clearForm(){
    this.studentFirstName = '';
    this.studentMiddleName = '';
    this.studentLastName = '';
    this.studentMobno = '';
    this.studentEmail = '';
  }

  UpdateRecords() {
    let bodyData = {
      studentId: this.currentStudentID,
      studentFirstName: this.studentFirstName,
      studentMiddleName: this.studentMiddleName,
      studentLastName: this.studentLastName,
      studentDob: this.studentDob,
      studentMobno: this.studentMobno,
      studentEmail: this.studentEmail,
    };
    console.log(this.studentId);
    this.http
      .put(
        'https://localhost:7083/api/StudentInfoTables' + '/' + this.studentId,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        // alert('Student Info Updated');
        this.currentStudentID = 0;
        this.clearForm()
        this.getAllStudent();
      });
  }

  save() {
    if (this.studentId == this.currentStudentID) {
      console.log("Hi");
      this.UpdateRecords();
    } else {
      this.register();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(
        'https://localhost:7083/api/StudentInfoTables' + '/' + data.studentId
      )
      .subscribe((resultData: any) => {
        console.log(data.studentId);
        console.log(resultData);
        this.getAllStudent();
      });
  }

  deleteAllData() {
    for (var student in this.StudentArray){
      this.setDelete(this.StudentArray[student]);
    }
  }
}
