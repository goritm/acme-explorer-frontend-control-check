import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements NbRoleProvider {
  constructor(private authService: AuthService) {}

  getRole(): Observable<string> {
    return this.authService.getCurrentUser.pipe(
      map((user) => {
        return user.role;
      })
    );
  }
}
