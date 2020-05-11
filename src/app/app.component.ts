import { Component } from '@angular/core';
import {CrudService} from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular9-firebaseapp';

employee: any;
employeeName:string;
employeeAge:number;
employeeAddress:string;
message:string;


  constructor(public crudservice:CrudService){}

ngOnInit() {
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          address: e.payload.doc.data()['address'],
        };
      })
      console.log(this.employee);

    });
  }

  CreateRecord()
  {
    let Record = {};
    Record['name'] = this.employeeName;
    Record['age'] = this.employeeAge;
    Record['address'] = this.employeeAddress;

    this.crudservice.create_Newemployee(Record).then(res => {

        this.employeeName = "";
        this.employeeAge = undefined;
        this.employeeAddress ="";
        console.log(res);
        this.message = "Employee data save Done";
    }).catch(error => {
      console.log(error);
    });
    
  }

  EditRecord(Record)
  {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editage = Record.age;
    Record.editaddress = Record.address;

  }

  Updatarecord(recorddata)
  {
    let record = {};
    record['name'] = recorddata.editname;
    record['age'] = recorddata.editage;
    record['address'] = recorddata.editaddress;
    this.crudservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id)
  {
    this.crudservice.delete_employee(record_id);
  }


}
