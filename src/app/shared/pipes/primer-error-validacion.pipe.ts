import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primerErrorValidacion'
})
export class PrimerErrorValidacionPipe implements PipeTransform {

  transform(value: any): string | null {
    const keys = Object.keys(value);

    if (keys && keys.length > 0)
      return keys[0];

    return null;
  }

}
