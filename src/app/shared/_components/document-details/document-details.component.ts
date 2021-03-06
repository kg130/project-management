import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DocumentInterface } from '../../_models';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  @Input() doc!: DocumentInterface;
  @Input() child = false;
  @Input() actionAllowed = true;
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();
  @Output() onEdit: EventEmitter<DocumentInterface> = new EventEmitter();
  @Output() onDelete: EventEmitter<DocumentInterface> = new EventEmitter();

  
  constructor() { }

  ngOnInit(): void {
  }

  clickDocument(): void {
    this.onClick.emit(true);
  }

  editDocument(doc: DocumentInterface): void {
    this.onEdit.emit(doc);
  }

  deleteDocument(doc: DocumentInterface): void {
    this.onDelete.emit(doc);
  }

}
