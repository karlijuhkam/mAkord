import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    let role = '';
    switch (value) {
      case 'admin':
        role = 'Administraator';
        break;
      case 'moderator':
        role = 'Moderaator';
        break;
      case 'user':
        role = 'Tavakasutaja';
        break;
    }

    return role;
  }

}
