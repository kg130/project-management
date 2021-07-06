import { Pipe, PipeTransform } from '@angular/core';
import { DocumentStatusArr, ProjectStatusArr } from '../_models';


@Pipe({name: 'projectStatus'})
export class ProjectStatusPipe implements PipeTransform {
  transform(status: number, type?: string): string {
    if (type === 'document') {
      return DocumentStatusArr.find(i => i.value === status)?.label || '';
    }
    return ProjectStatusArr.find(i => i.value === status)?.label || '';
  }
}