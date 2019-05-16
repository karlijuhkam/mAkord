import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    let status = '';
    switch (value) {
      case 'active':
        status = 'Aktiivne';
        break;
      case 'temporarily_inactive':
        status = 'Ajutiselt peatatud';
        break;
      case 'inactive':
        status = 'Mitteaktiivne';
        break;
    }

    return status;
  }

}
