import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Country, State, City } from 'country-state-city';

// export class StudentForm{
//   formSubmission: boolean = false;
//   isInValid: boolean = false;
//   studentFirstName: string = '';
//   studentMiddleName: string = '';
//   studentLastName: string = '';
//   studentDob: string = '';
//   studentGender: string = '';
//   studentReligion: string = '';
//   studentDisability: boolean = false;
//   studentMobno: string = '';
//   studentEmail: string = '';
//   studentCountry: string = '';
//   studentState: string = '';
//   studentCity: string = '';
//   studentPinCode: string = '';
//   studentAddress: string = '';
//   studentCollegeName: string = '';
//   studentDegree: string = '';
//   studentSpecialization: string = '';
//   studentMarks: number = 0;
//   studentActiveBacklogs: number = 0;
// }

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css'],
})
export class StudentcrudComponent {
  // model = new StudentForm;

  Countries = Country.getAllCountries();

  selectedReligion = 'Select Religion';
  changeRoute(route: string) {
    this.selectedReligion = route;
  }

  selectedBacklog = 0;
  changeBacklog(num: number) {
    this.selectedBacklog = num;
  }

  selectedCountry = 'Select Country';
  selectedCountryID = '';
  states: any = [];
  changeCountry(country: string, id: string) {
    this.selectedCountry = country;
    this.selectedCountryID = id;
    this.states = State.getStatesOfCountry(this.selectedCountryID);
  }
  
  selectedState = 'Select State';
  selectedStateID = '';
  cities: any = [];
  changeState(state: string, id: string) {
    this.selectedState = state;
    this.selectedStateID = id;
    this.cities = City.getCitiesOfState(this.selectedCountryID, this.selectedStateID)
  }

  selectedCity = 'Select City';
  changeCity(city: string) {
    this.selectedCity = city;
  }

  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentStudentID: number = 0;
  studentId: number = 1;
  studentFirstName: string = '';
  studentMiddleName: string = '';
  studentLastName: string = '';
  studentDob: string = '';
  studentGender: string = '';
  studentReligion: string = '';
  studentDisability: boolean = false;
  studentMobno: string = '';
  studentEmail: string = '';
  studentCountry: string = '';
  studentState: string = '';
  studentCity: string = '';
  studentPinCode: string = '';
  studentAddress: string = '';
  studentCollegeName: string = '';
  studentDegree: string = '';
  studentSpecialization: string = '';
  studentMarks: number = 0;
  studentActiveBacklogs: number = 0;

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  count = 0;
  numberCounter(){
    for (this.count = 0; this.count<=this.StudentArray.length;){
      this.count++;
      console.log(this.count);
    }
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
      studentFirstName: this.studentFirstName,
      studentMiddleName: this.studentMiddleName,
      studentLastName: this.studentLastName,
      studentDob: this.studentDob,
      studentGender: this.studentGender,
      studentReligion: this.selectedReligion == "Select Religion" ? "" : this.selectedReligion,
      studentDisability: this.studentDisability,
      studentMobno: this.studentMobno,
      studentEmail: this.studentEmail,
      studentCountry: this.selectedCountry == "Select Country" ? "" : this.selectedCountry,
      studentState: this.selectedState == "Select State" ? "" : this.selectedState,
      studentCity: this.selectedCity == "Select City" ? "" : this.selectedCity,
      studentPinCode: this.studentPinCode,
      studentAddress: this.studentAddress,
      studentCollegeName: this.studentCollegeName,
      studentDegree: this.studentDegree,
      studentSpecialization: this.studentSpecialization,
      studentMarks: this.studentMarks,
      studentActiveBacklogs: this.studentActiveBacklogs,
    };
    console.log(this.studentReligion);
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
    this.studentGender = data.studentGender;
    this.studentReligion = data.studentReligion;
    this.studentDisability = data.studentDisability;
    this.studentMobno = data.studentMobno;
    this.studentEmail = data.studentEmail;
    this.studentCountry = data.studentCountry;
    this.studentState = data.studentState;
    this.studentCity = data.studentCity;
    this.studentPinCode = data.studentPinCode;
    this.studentAddress = data.studentAddress;
    this.studentCollegeName = data.studentCollegeName;
    this.studentDegree = data.studentDegree;
    this.studentSpecialization = data.studentSpecialization;
    this.studentMarks = data.studentMarks;
    this.studentActiveBacklogs = data.studentActiveBacklogs;
    console.log(this.studentCountry);
  }

  clearForm() {
    this.studentFirstName = '';
    this.studentMiddleName = '';
    this.studentLastName = '';
    this.studentDob = '';
    this.studentGender = '';
    this.selectedReligion = 'Select Religion';
    this.studentDisability = false;
    this.studentMobno = '';
    this.studentEmail = '';
    this.selectedCountry = 'Select Country';
    this.selectedState = 'Select State';
    this.selectedCity = 'Select City';
    this.studentPinCode = '';
    this.studentAddress = '';
    this.studentCollegeName = '';
    this.studentDegree = '';
    this.studentSpecialization = '';
    this.studentMarks = 0;
    this.studentActiveBacklogs = 0;
  }

  UpdateRecords() {
    let bodyData = {
      studentId: this.currentStudentID,
      studentFirstName: this.studentFirstName,
      studentMiddleName: this.studentMiddleName,
      studentLastName: this.studentLastName,
      studentDob: this.studentDob,
      studentGender: this.studentGender,
      studentReligion: this.selectedReligion == "Select Religion" ? "" : this.selectedReligion,
      studentDisability: this.studentDisability,
      studentMobno: this.studentMobno,
      studentEmail: this.studentEmail,
      studentCountry: this.selectedCountry == "Select Country"? "" : this.selectedCountry,
      studentState: this.selectedState == "Select State" ? "" : this.selectedState,
      studentCity: this.selectedCity == "Select City" ? "" : this.selectedCity,
      studentPinCode: this.studentPinCode,
      studentAddress: this.studentAddress,
      studentCollegeName: this.studentCollegeName,
      studentDegree: this.studentDegree,
      studentSpecialization: this.studentSpecialization,
      studentMarks: this.studentMarks,
      studentActiveBacklogs: this.studentActiveBacklogs,
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

  // changeFormSubmission(state: any){
  //   if (state == false){
  //     state = true;
  //     this.model.formSubmission = true;
  //   }
  //   else{
  //     state = false;
  //     this.model.formSubmission = true;
  //   }
  // }
}
