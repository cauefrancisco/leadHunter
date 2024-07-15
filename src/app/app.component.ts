import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/services/Auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService]
})
export class AppComponent {
  title = 'Ficus Lead Hunter';
  version = `1.0.0`;

  ngOnInit(){
    console.log('Version ', this.version);
  }
}
