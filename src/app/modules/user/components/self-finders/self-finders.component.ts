import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { GraphqlSortOperationEnum } from 'src/utils/enums/graphql-sort-operation.enum';
import { Finder } from '../../graphql/types/finder/finder.type';
import { FinderService } from '../../services/finder.service';

@Component({
  selector: 'self-finders',
  templateUrl: './self-finders.component.html',
  styleUrls: ['./self-finders.component.scss']
})
export class SelfFinderComponent implements OnInit {
  finders: Finder[] = [];
  count = 0;
  pageSize = 10;
  loading = false;

  constructor(
    private finderService: FinderService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  delete(finder: Finder) {
    this.loading = true;

    this.finderService.delete(finder.id).subscribe({
      error: (err) => {
        this.toastrService.show(err.message, 'Error', {
          duration: 3000,
          status: 'danger'
        });
        this.loading = false;
      },
      complete: () => {
        this.toastrService.success('Finder deleted');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        this.loading = false;
      }
    });
  }

  update(finder: Finder) {
    this.router.navigate(['/finders/update', { finder }]);
  }

  loadNext() {
    this.loading = true;

    this.finderService
      .list({
        limit: this.pageSize,
        sort: { createdAt: GraphqlSortOperationEnum.desc }
      })
      .subscribe({
        next: ({ data }) => {
          this.finders = data.getSelfFinders.data;
          this.count = data.getSelfFinders.count;
          this.loading = false;
        }
      });
  }

  ngOnInit(): void {
    this.loadNext();
  }
}
