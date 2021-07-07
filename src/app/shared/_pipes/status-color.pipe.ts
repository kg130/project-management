import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../_models';


@Pipe({name: 'statusColor'})
export class StatusColorPipe implements PipeTransform {
  transform(status: number): string {
    switch(status) {
      case Status.COMPLETED:
        return '#3bd43b';
      case Status.DRAFT:
        return '#27334d';
      case Status.EXPIRED:
        return '#df282e';
      case Status.NA:
        return '#6c757d';
      case Status.NOTRECEIVED:
        return '#df282e';
      case Status.PENDING:
        return '#007bff';
      case Status.RECEIVED:
        return '#007bff';
      case Status.SIGNED:
        return '#007bff';
      case Status.VERIFICATION:
        return '#007bff';
      default:
        return '#6c757d';
    }
  }
}