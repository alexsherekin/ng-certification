import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeatherConditions} from '../../structures/weather-conditions';

@Component({
  selector: 'app-weather-conditions',
  templateUrl: './weather-conditions.component.html',
  styleUrls: ['./weather-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherConditionsComponent implements OnInit {
  @Input() condition: undefined | WeatherConditions;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  getImage(condition: WeatherConditions): string {
    return '';
  }

  onCloseButtonClicked(): void {
    this.close.emit();
  }
}
