import { Component } from '@angular/core';
import { FullpageDirective } from '@fullpage/angular-fullpage/lib/fullpage.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  config = {
    anchors: ['welcome', 'soundsOfDecade', 'deepCuts', 'edten'],
    menu: '#menu',
    afterResize: () => {
      console.log('After resize');
    },
    afterLoad: (origin, dest, dir) => {
      console.log(origin.index);
    }
  };
  title = 'decadeWrapped';
  fullpage_api: any;

  constructor() { }

  getRef(fullPageRef: FullpageDirective) {
    this.fullpage_api = fullPageRef;
  }

}
