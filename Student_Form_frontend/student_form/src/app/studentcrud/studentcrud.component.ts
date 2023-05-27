import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Country, State, City } from 'country-state-city';

export class StudentForm{
  studentFirstName: string = '';
  studentMiddleName: string = '';
  studentLastName: string = '';
  studentDob: string = '';
  studentGender: string = '';
  studentReligion: string = 'Select Religion';
  studentDisability: boolean = false;
  studentMobno: string = '';
  studentEmail: string = '';
  studentCountry: string = 'Select Country';
  studentState: string = 'Select State';
  studentCity: string = 'Select City';
  studentPincode: string = '';
  studentAddress: string = '';
  studentCollegeName: string = '';
  studentDegree: string = '';
  studentSpecialization: string = '';
  studentMarks!: number;
  studentActiveBacklogs!: number;
}

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css'],
})
export class StudentcrudComponent {

  modelForm = new StudentForm;

  Countries = Country.getAllCountries();

  changeRoute(route: string) {
    this.modelForm.studentReligion = route;
  }

  changeBacklog(num: number) {
    this.modelForm.studentActiveBacklogs = num;
  }

  selectedCountryID = '';
  states: any = [];
  changeCountry(country: string, id: string) {
    this.modelForm.studentCountry = country;
    this.selectedCountryID = id;
    this.states = State.getStatesOfCountry(this.selectedCountryID);
  }
  
  selectedStateID = '';
  cities: any = [];
  changeState(state: string, id: string) {
    this.modelForm.studentState = state;
    this.selectedStateID = id;
    this.cities = City.getCitiesOfState(this.selectedCountryID, this.selectedStateID)
  }

  changeCity(city: string) {
    this.modelForm.studentCity = city;
  }

  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentStudentID: number = 0;
  studentId: number = 1;
  
  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  ngOnInit(): void {}

  getAllStudent() {
    this.http
      .get('https://localhost:7083/api/StudentInfoTables')
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        // console.log(resultData);
        this.StudentArray = resultData;
      });
  }

  register() {
    let bodyData = {
      studentFirstName: this.modelForm.studentFirstName,
      studentMiddleName: this.modelForm.studentMiddleName,
      studentLastName: this.modelForm.studentLastName,
      studentDob: this.modelForm.studentDob,
      studentGender: this.modelForm.studentGender,
      studentReligion: this.modelForm.studentReligion == "Select Religion" ? "" : this.modelForm.studentReligion,
      studentDisability: this.modelForm.studentDisability,
      studentMobno: this.modelForm.studentMobno,
      studentEmail: this.modelForm.studentEmail,
      studentCountry: this.modelForm.studentCountry == "Select Country" ? "" : this.modelForm.studentCountry,
      studentState: this.modelForm.studentState == "Select State" ? "" : this.modelForm.studentState,
      studentCity: this.modelForm.studentCity == "Select City" ? "" : this.modelForm.studentCity,
      studentPincode: this.modelForm.studentPincode,
      studentAddress: this.modelForm.studentAddress,
      studentCollegeName: this.modelForm.studentCollegeName,
      studentDegree: this.modelForm.studentDegree,
      studentSpecialization: this.modelForm.studentSpecialization,
      studentMarks: this.modelForm.studentMarks,
      studentActiveBacklogs: this.modelForm.studentActiveBacklogs,
    };
    
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
    this.modelForm.studentFirstName = data.studentFirstName;
    this.modelForm.studentMiddleName = data.studentMiddleName;
    this.modelForm.studentLastName = data.studentLastName;
    this.modelForm.studentDob = data.studentDob;
    this.modelForm.studentGender = data.studentGender;
    this.modelForm.studentReligion = data.studentReligion == "" ? "Select Religion": data.studentReligion;
    this.modelForm.studentDisability = data.studentDisability;
    this.modelForm.studentMobno = data.studentMobno;
    this.modelForm.studentEmail = data.studentEmail;
    this.modelForm.studentCountry = data.studentCountry == "" ? "Select Country": data.studentCountry;
    this.modelForm.studentState = data.studentState == "" ? "Select State": data.studentState;
    this.modelForm.studentCity = data.studentCity == "" ? "Select City": data.studentCity;
    this.modelForm.studentPincode = data.studentPincode;
    this.modelForm.studentAddress = data.studentAddress;
    this.modelForm.studentCollegeName = data.studentCollegeName;
    this.modelForm.studentDegree = data.studentDegree;
    this.modelForm.studentSpecialization = data.studentSpecialization;
    this.modelForm.studentMarks = data.studentMarks;
    this.modelForm.studentActiveBacklogs = data.studentActiveBacklogs;
    console.log(data);
  }

  clearForm() {
    this.modelForm.studentFirstName = '';
    this.modelForm.studentMiddleName = '';
    this.modelForm.studentLastName = '';
    this.modelForm.studentDob = '';
    this.modelForm.studentGender = '';
    this.modelForm.studentCountry = 'Select Religion';
    this.modelForm.studentDisability = false;
    this.modelForm.studentMobno = '';
    this.modelForm.studentEmail = '';
    this.modelForm.studentCountry = 'Select Country';
    this.modelForm.studentState = 'Select State';
    this.modelForm.studentCity = 'Select City';
    this.modelForm.studentPincode = '';
    this.modelForm.studentAddress = '';
    this.modelForm.studentCollegeName = '';
    this.modelForm.studentDegree = '';
    this.modelForm.studentSpecialization = '';
    this.modelForm.studentMarks = 0;
    this.modelForm.studentActiveBacklogs = 0;
  }

  UpdateRecords() {
    let bodyData = {
      studentId: this.currentStudentID,
      studentFirstName: this.modelForm.studentFirstName,
      studentMiddleName: this.modelForm.studentMiddleName,
      studentLastName: this.modelForm.studentLastName,
      studentDob: this.modelForm.studentDob,
      studentGender: this.modelForm.studentGender,
      studentReligion: this.modelForm.studentReligion == "Select Religion" ? "" : this.modelForm.studentReligion,
      studentDisability: this.modelForm.studentDisability,
      studentMobno: this.modelForm.studentMobno,
      studentEmail: this.modelForm.studentEmail,
      studentCountry: this.modelForm.studentCountry == "Select Country" ? "" : this.modelForm.studentCountry,
      studentState: this.modelForm.studentState == "Select State" ? "" : this.modelForm.studentState,
      studentCity: this.modelForm.studentCity == "Select City" ? "" : this.modelForm.studentCity,
      studentPinCode: this.modelForm.studentPincode,
      studentAddress: this.modelForm.studentAddress,
      studentCollegeName: this.modelForm.studentCollegeName,
      studentDegree: this.modelForm.studentDegree,
      studentSpecialization: this.modelForm.studentSpecialization,
      studentMarks: this.modelForm.studentMarks,
      studentActiveBacklogs: this.modelForm.studentActiveBacklogs,
    };
    console.log(this.studentId);
    this.http
      .put(
        'https://localhost:7083/api/StudentInfoTables' + '/' + this.studentId,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Info Updated');
        this.currentStudentID = 0;
        this.clearForm();
        this.ngOnInit();
        this.getAllStudent();
      });
  }

  save() {
    if (this.studentId == this.currentStudentID) {
      console.log('Hi');
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
    for (var student in this.StudentArray) {
      this.setDelete(this.StudentArray[student]);
    }
  }
}
