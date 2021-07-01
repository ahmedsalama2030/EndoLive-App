import { ToastrService } from 'ngx-toastr';
import { PatientImageGet } from './../../../core/models/Entities/PatientImage';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientImagesSelect } from 'src/app/core/models/Dtos/patientImagesSelect';

@Component({
  selector: 'photo-report',
  templateUrl: './photo-report.component.html',
  styleUrls: ['./photo-report.component.css']
})
export class PhotoReportComponent implements OnInit {
  @Input() patientimage!: PatientImageGet[];

  @Output() ImageSelect = new EventEmitter<PatientImagesSelect[]>();

  images: PatientImagesSelect[] = [];
  constructor(private toastrService: ToastrService) { }
  index: number = 1;
  ngOnInit(): void {
  }

  checkChange(event: any, Iurl: string, Iid: string) {

    if (event.target.checked) {
      if (this.images.length < 4) {
        let imag = { id: Iid, url: Iurl }
        this.images.push(imag);
        this.sendImage();
      }
      else
      this.toastrService.error('images must be 4')

    }

    else {
      let index = this.images.findIndex((e) => e.id == Iid);
    if(index!==-1) 
      this.images.splice(index, 1);
      this.sendImage();

    }
  }

  sendImage() {
    this.ImageSelect.emit(this.images)

  }
}


