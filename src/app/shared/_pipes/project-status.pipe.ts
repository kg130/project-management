import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatusArr } from '../_models';


@Pipe({name: 'projectStatus'})
export class ProjectStatusPipe implements PipeTransform {
  transform(status: number): string {
    return ProjectStatusArr.find(i => i.value === status)?.label || '';
  }
}