import { Pipe, PipeTransform } from '@angular/core';
import { ProjectTypeArr } from '../_models';


@Pipe({name: 'projectType'})
export class ProjectTypePipe implements PipeTransform {
  transform(status: number): string {
    return ProjectTypeArr.find(i => i.value === status)?.label || '';
  }
}