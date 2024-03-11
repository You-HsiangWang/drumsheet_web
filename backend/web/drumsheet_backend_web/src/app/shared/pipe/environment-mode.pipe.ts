import { Pipe, PipeTransform } from '@angular/core';
import { EnvironmentMode } from '../domain/enum/environment-mode.enum';

@Pipe({
  name: 'environmentMode',
  standalone: true,
})
export class EnvironmentModePipe implements PipeTransform {
  transform(value: EnvironmentMode): string {
    switch (value) {
      case EnvironmentMode.Prod:
        return 'Prod';
      case EnvironmentMode.Sit:
        return 'Sit';
      case EnvironmentMode.Lab:
        return 'Lab';
      case EnvironmentMode.Local:
      default:
        return 'Local';
    }
  }
}
