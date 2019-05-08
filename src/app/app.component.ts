import { Component } from '@angular/core';
import {NgSelectConfig} from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'makordid-client';

  constructor(private selectConfig: NgSelectConfig) {
    this.selectConfig.notFoundText = 'Valikud puuduvad';
  }
}
