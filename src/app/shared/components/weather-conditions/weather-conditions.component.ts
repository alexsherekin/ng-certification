import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeatherConditions} from '../../structures/weather-conditions';
import weatherConditionConverter from '../../utils/weather-condition-to-image';

@Component({
  selector: 'app-weather-conditions',
  templateUrl: './weather-conditions.component.html',
  styleUrls: ['./weather-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherConditionsComponent implements OnInit {
  @Input() condition: undefined | WeatherConditions;
  @Output() remove = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  getImage(condition: WeatherConditions): string {
    return weatherConditionConverter[condition.current];
  }

  onCloseButtonClicked($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.remove.emit();
  }
}
