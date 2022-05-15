import { Component, OnInit } from '@angular/core';
import { Sponsorship } from '../../graphql/types/sponsorship.type';
import { SponsorshipService } from '../../service/sponsorship.service';

@Component({
  selector: 'self-sponsorships',
  templateUrl: './self-sponsorships.component.html',
  styleUrls: ['./self-sponsorships.component.scss']
})
export class SelfSponsorshipsComponent implements OnInit {
  sponsorships: Sponsorship[] = [];
  placeholders: unknown = [];
  pageSize = 25;
  pageToLoadNext = 1;
  loading = false;

  constructor(private sponsorshipService: SponsorshipService) {}

  paySponsor(): void {
    console.log('paySponsor');
  }

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.sponsorshipService
      .fetch({ limit: this.pageSize })
      .subscribe(({ data }) => {
        this.placeholders = [];
        this.sponsorships = data.getSelfSponsorships.data;
        this.loading = false;
        this.pageToLoadNext++;
      });
  }

  ngOnInit(): void {
    this.loadNext();
  }
}
