import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attrSpan',
  standalone: true
})
export class AttrSpanPipe implements PipeTransform {
  transform(min: string, max: string, type: string): string {
    if (min === max)
      return `${min} ${type}`;
    return `${min} - ${max} ${type}`;
  }
}
