import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-incio',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,TableComponent],
  templateUrl: './incio.component.html',
  styleUrl: './incio.component.scss'
})
export class IncioComponent {

}
