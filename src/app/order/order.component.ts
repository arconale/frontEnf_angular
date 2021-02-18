import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewInit {

	constructor(private apiService: ApiService, private formBuilder: FormBuilder,) { }

  orders = [];
  displayedColumns: string[] = ['id', 'date', 'customer', 'address1','city','postcode','country','amount','status','deleted','last_modified','Actions'];
  dataSource = new MatTableDataSource(this.orders);
  dataForm = this.formBuilder.group({
    fullName: '',
    status: ''
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  cancel(id): void{
    this.apiService.post("cancel",{"id" : id}).subscribe((data)=>{  
			if(data.operation == true){
        for(var i=0;i<this.dataSource.data.length;i++){
          if(this.dataSource.data[i].id==id){
             console.log(this.dataSource.data[i]);
             this.dataSource.data[i].status="cancelled";
              break;
          }
        }
      }else{
        console.log("Error canceling the order");
      }
		})  
  }

  onClear(): void {
    this.dataForm.reset();
  }
	ngOnInit() {
		this.apiService.get().subscribe((data: any[])=>{  
			this.orders = data;  
      this.dataSource.data = this.orders;
		})  
	}

  onSubmit(): void {
    // Process checkout data here
    console.warn('submitted', this.dataForm.value);
    this.apiService.get(this.dataForm.value).subscribe((data: any[])=>{  
			this.orders = data;  
      this.dataSource.data = this.orders;
		})  
  }

}


