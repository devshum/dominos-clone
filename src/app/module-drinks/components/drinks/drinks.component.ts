import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
