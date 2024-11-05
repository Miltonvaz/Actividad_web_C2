import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';
import { Users } from './models/users'; 
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'actividad_2';
  dataSource: Users[] = []; 
  
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.api.getUser().subscribe(
      (data: Users[]) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
