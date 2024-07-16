import {Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Ficus Lead Hunter';
  version = `1.0.0`;

  constructor(private _authService: AuthService){
    // add this
if (globalThis.window === undefined) {
  globalThis.window =
    ({
      addEventListener: () => {},
      // add more methods as you wish
    } as never);
}
  }

  ngOnInit(){
    // this._authService.requestSystemLogin();
    console.log('Version ', this.version);
  }

}
