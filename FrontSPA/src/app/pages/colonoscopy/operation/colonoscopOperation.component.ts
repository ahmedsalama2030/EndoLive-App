import { AlertService } from 'src/app/core/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { Patient } from 'src/app/core/models/Entities/Patient';
import { Doctor } from 'src/app/core/models/Entities/Doctor';
import {  PatientImageGet } from 'src/app/core/models/Entities/PatientImage';
import { ActivatedRoute } from '@angular/router';
import { ColonoscopyReportService } from 'src/app/core/services/colonoscopy-report.service';
import { PatientImagesSelect } from 'src/app/core/models/Dtos/patientImagesSelect';

@Component({
  selector: 'operation',
  templateUrl: './operation.component.html',
  styleUrls: ['operation.component.css'],

})
export class colonoscopOperation implements OnInit, OnDestroy {
  editor!: Editor;
  editor2!: Editor;
  editor3!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['text_color', 'background_color'],

    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  formReport!: FormGroup;
  patient!: Patient;      // patinet object
  doctors!: Doctor[];
  patientImageGet!: PatientImageGet[];
  scope!: string;
  anaesth!: string;
  outPatient: boolean = true;
  inPatient!: string;
  endoscopist: Doctor[] = [];
  consolutant: Doctor[] = [];
  selectedconsolutant?: Doctor;
  selectedendoscopist!: Doctor;
  imagesSelected?: PatientImagesSelect[];
  constructor(
    private fb: FormBuilder,
    private colonoscopyService: ColonoscopyReportService,
    private alert: AlertService,
    private activatedRoute: ActivatedRoute) { }
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {

    event.preventDefault();
    event.returnValue = true;

  }

  ngOnInit(): void {
    this.createForm();
    this.receiptRoute();

    this.editor = new Editor();
    this.editor2 = new Editor();
    this.editor3 = new Editor();
    this.getpatienyImage();
  }
  // config route
  receiptRoute() {
    this.activatedRoute.data.subscribe(
      (data) => {
         this.patient = data['data'].patient;
        this.patientId?.setValue(this.patient.id);
        let doctors = <Doctor[]>data['data'].doctors;
        doctors.forEach(
          (doctor) => {
            if (doctor.isConsultant)
              this.consolutant.push(doctor);
            else
              this.endoscopist.push(doctor);
          }
        )
      }
    );
  }
// temp images
  getpatienyImage() {
    this.patientImageGet = [
      { date: new Date('2021-7-5'), patientImage: [{ id: '11', path: 'assets/img/status2.png', patientId: '12' }, { id: '10', path: 'assets/img/status.png', patientId: '12' }, { id: '8', path: 'assets/img/status2.png', patientId: '12' }, { id: '7', path: 'assets/img/status.png', patientId: '12' }, { id: '1', path: 'assets/img/status2.png', patientId: '12' }, { id: '4', path: 'assets/img/status.png', patientId: '12' }] },
      { date: new Date('2021-6-5'), patientImage: [{ id: '2', path: 'assets/img/status2.png', patientId: '12' }, { id: '5', path: 'assets/img/status.png', patientId: '12' }] },
      { date: new Date('2021-5-2'), patientImage: [{ id: '3', path: 'assets/img/status2.png', patientId: '12' }, { id: '6', path: 'assets/img/status.png', patientId: '12' }] }

    ]

  }
  // create form report
  createForm() {
    this.formReport = this.fb.group({
      indication: [''],
      colonoscopy: [''],
      conclusion: [''],
      scope: [''],
      anaesth: [''],
      outPatient: [''],
      InPatient: [''],
      ConsultantId: ['', Validators.required],
      endoscopistId: ['', Validators.required],
      patientId: ['', Validators.required],

    })
  }
// config doctors type

  setuptDoctor() {
    this.consolutant = this.doctors.filter(a => a.isConsultant == true);
    this.endoscopist = this.doctors.filter(a => a.isConsultant == false);
  }
  // submit form to api
  onSubmit(event: boolean) {
    if (true) {
      if (!this.formReport.valid)
        this.alert.error('error may failds required')
      else {
        console.log(this.formReport.value);
        this.colonoscopyService.register(this.formReport.value).subscribe(
          () => this.alert.success(),
          (err) => this.alert.error()
        );
      }
    }
  }
  ImageSelect(images: PatientImagesSelect[]) {
    this.imagesSelected = images;
  }
  onconsolutant(doctor: Doctor) {
    this.consolutantId?.setValue(doctor.id);
    this.selectedconsolutant = doctor;
  }
  onendoscopist(doctor: Doctor) {
    this.endoscopistId?.setValue(doctor.id);
    this.selectedendoscopist = doctor;

  }
  get indication() {
    return this.formReport.get('indication');
  }
  get colonoscopy() {
    return this.formReport.get('colonoscopy');
  }
  get conclusion() {
    return this.formReport.get('conclusion');
  }
  get consolutantId() {
    return this.formReport.get('ConsultantId');
  }
  get patientId() {
    return this.formReport.get('patientId');
  }
  get endoscopistId() {
    return this.formReport.get('endoscopistId');
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
    this.editor3.destroy();
  }
}
