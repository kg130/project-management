import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'expireNotify'})
export class ExpireNotifyPipe implements PipeTransform {
  transform(expirenotify?: number): number {
    return (expirenotify || 0) / (1000 * 3600 * 24);
  }
}