import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MainComponent } from '../main/main.component';
@Component({
  selector: 'app-incio',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,MainComponent],
  templateUrl: './incio.component.html',
  styleUrl: './incio.component.scss'
})
export class IncioComponent {

}
