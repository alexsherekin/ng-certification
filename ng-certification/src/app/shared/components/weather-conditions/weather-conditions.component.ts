import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {WeatherConditions} from '../../structures/weather-conditions';

@Component({
  selector: 'app-weather-conditions',
  templateUrl: './weather-conditions.component.html',
  styleUrls: ['./weather-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherConditionsComponent implements OnInit {
  @Input() conditions: undefined | WeatherConditions;

  constructor() { }

  ngOnInit(): void {
  }

}
