import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
})
export class ShortTextPipe implements PipeTransform {
  transform(value: string, length = 8): string {
    return value && value.length > length ? value.slice(0, length) : value;
  }
}
