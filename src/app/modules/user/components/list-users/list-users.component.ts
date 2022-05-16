import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { IUser } from 'src/utils/interfaces/user.interface';
import { UserAdmin } from '../../graphql/types/user/user-admin.type';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: UserAdmin[] = [];
  count = 0;
  currentUser!: IUser;
  pageSize = 30;
  pageToLoadNext = 1;
  loading = false;

  constructor(
    private userService: UserService,
    private toastrService: NbToastrService
  ) {}

  lockUser(user: UserAdmin) {
    this.userService.lockUser(user.id).subscribe({
      error: (err) => {
        this.toastrService.show(err.message, 'Error', {
          duration: 3000,
          status: 'danger'
        });
      },
      complete: () => {
        this.toastrService.success('User locked');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  }

  unlockUser(user: UserAdmin) {
    this.userService.unlockUser(user.id).subscribe({
      error: (err) => {
        this.toastrService.show(err.message, 'Error', {
          duration: 3000,
          status: 'danger'
        });
      },
      complete: () => {
        this.toastrService.success('User unlocked');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  }

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.userService.listUsers({ limit: this.pageSize }).subscribe({
      next: ({ data }) => {
        this.users = data.listUsers.data;
        this.count = data.listUsers.count;
        this.loading = false;
        this.pageToLoadNext++;
      }
    });
  }

  ngOnInit(): void {
    this.loadNext();
    this.userService.getCurrentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }
}
