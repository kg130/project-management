import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';
import { DocumentInterface } from 'src/app/shared/_models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  documents: DocumentInterface[] = [];

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit(): void {
    this.queryService.querySummary().subscribe((docs: DocumentInterface[]) => this.documents = docs);
  }

}
