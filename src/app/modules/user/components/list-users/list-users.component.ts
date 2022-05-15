import { Component } from '@angular/core';
import { UserAdmin } from '../../graphql/types/user-admin.type';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: UserAdmin[] = [];
  pageSize = 10;
  placeholders: unknown = [];
  pageToLoadNext = 1;
  loading = false;

  constructor(private userService: UserService) {}

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.userService.listUsers({ limit: this.pageSize }).subscribe({
      next: ({ data }) => {
        this.placeholders = [];
        this.users = data.listUsers.data;
        this.loading = false;
        this.pageToLoadNext++;
      }
    });
  }

  ngOnInit(): void {
    this.loadNext();
  }
}
