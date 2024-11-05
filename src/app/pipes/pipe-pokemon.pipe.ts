import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipePokemon',
  standalone: true
})
export class PipePokemonPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/[ao]/gi, 'x');
  }

}
