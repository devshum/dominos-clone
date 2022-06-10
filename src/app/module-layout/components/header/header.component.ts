import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public isAuthOpened = true;

  constructor() { }

  openAuth(): void {
    this.isAuthOpened = !this.isAuthOpened;
  }

}
