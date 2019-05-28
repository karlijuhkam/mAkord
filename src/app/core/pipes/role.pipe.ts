import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    let role = '';
    switch (value) {
      case 'admin':
        role = 'administraator';
        break;
      case 'moderator':
        role = 'moderaator';
        break;
      case 'user':
        role = 'tavakasutaja';
        break;
    }

    return role;
  }

}
