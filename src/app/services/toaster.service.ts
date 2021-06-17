import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private toastrService: ToastrService
  ) {}

  successToastr(message: string): void {
    this.toastrService.success(message);
  }
}