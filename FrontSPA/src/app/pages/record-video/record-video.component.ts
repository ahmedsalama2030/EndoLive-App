import { AlertService } from 'src/app/core/services/alert.service';
import { Patient } from './../../core/models/Entities/Patient';
import { PatientService } from './../../core/services/patient.service';
 import { Component, ElementRef, InjectionToken, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
import * as Record from 'videojs-record/dist/videojs.record';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'eg-record-video',
  templateUrl: './record-video.component.html',
  styleUrls: ['./record-video.component.css'],

})
export class RecordVideoComponent implements OnInit,OnDestroy {
  idx = 'clip1';
  private config: any;
  private player: any;
  private plugin: any;
  path: string = '';
  devices: any;
  videos?: HTMLVideoElement;
  devicesVideo: InputDeviceInfo[] = [];
  showselected: boolean = true;
  pathes?: string;
  images: any[] = [];
  startRecord: boolean = false;
  readyRecord: boolean = false;
  finishRecord: boolean = false;
  checkStatus:boolean=false;
  patient?:Patient;
  lang:string='en';
  patientAge?:string;
  showUpload:boolean=false;
  uploadWidth:number=0;
  // constructor initializes our declared vars
  constructor(
    elementRef: ElementRef,
     @Inject(DOCUMENT) private document: Document,
     private alertService: AlertService  ,
     private sanitizer: DomSanitizer,
     private patientService:PatientService,
     private translate:TranslateService
     ) {
    this.player = false;

    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 320,
      height: 240,
      bigPlayButton: true,
      controlBar: {
        volumePanel: true,
        fullscreenToggle: true,

      },
      plugins: {
         record: {
          audio: false,
          video: true,
          debug: true,
          hotKeys: true,
          maxLength: 60 * 60 * 24 * 10,


        }
      }
    };
  }

// take picture from video
  takePicture() {
 
    if(this.startRecord){
    var video = this.document.querySelector('video')!;
    let canvas = this.document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    let ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURI = canvas.toDataURL('image/png'); // can also use 'image/png'
    let url=this.sanitizer.bypassSecurityTrustUrl( dataURI);
    this.images.push({id: this.images.length+1,url:url});
      
    }
    else{
this.alertService.error("start record first")
    }
  }

  ngOnInit() {
    this.showselected = false;
this.translate.onTranslationChange.subscribe(
  (event: TranslationChangeEvent)=>{this.lang=event.lang}
);
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
 
    event.preventDefault();
    event.returnValue = true;

 }


  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's video element
    let el = 'video_' + this.idx;
    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), this.config, () => {
   });

    // device is ready
    this.player.on('deviceReady', () => {
      this.readyRecord=true;
      this.player.record().enumerateDevices();
    });
    this.player.on('enumerateReady', () => {
      this.devices = this.player.record().devices;
      for (let index = 0; index < this.devices.length; index++) {
        if (this.devices[index].kind === 'videoinput') {
          var x = this.devices[index];
          this.devicesVideo.push(this.devices[index]);
        }
        this.showselected = true;

      }
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
       this.startRecord = true;
       this.finishRecord=false;
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
 this.finishRecord=true;
 this.startRecord = false;

      // console.log('finished recording: ', this.player.recordedData);
    });

    // error handling
    this.player.on('error', (error: any) => {
       error.stopImmediatePropagation();
         console.log('error!', error.code, error.type , error.message);
      console.warn(error); 
      this.alertService.error("error in recording");

    });
// device Error  
    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
      this.alertService.error("device error")

    });
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
   }
  handleFileUpload(e: any) {

    this.path = e.target.value;
   }

   // download images
  dowload() {
     this.player.record().saveAs({ 'video': 'my-video-file-name.webm' });

  }
  // remove images
  removeImage(id:any){
 let index=this.images.findIndex(a=>a.id===id);
 this.images.splice(index,1);
 
  }

  // check labcode patient
  searchLabCode(value:any){
    this.checkStatus = true;
     this.patientService.getByCode(value).pipe(delay(500)).subscribe(
      res => { 
        if (res !==null){
         this.patinetAge(res.ageNow!)
          this.patient=res;
        
      }   
    },
      () => {  this.alertService.error("labcode not found")
      ; this.checkStatus = false; },
      () => {this.checkStatus = false; }
    ); 
  }
    //  Calculte Age fn

  patinetAge(age:string){
let patientAge=parseInt(age);
let year=Math.trunc(patientAge);
let month=patientAge-year;
if(month==0) 
this.patientAge=`${year} Y `

else
this.patientAge=`${year} Y ${month} M}`
  }


  //  upload media to server
  uploadServer(labcode:string){
 
if(labcode==''||labcode==null) {
   this.alertService.error('labcode not found');
   return;
}
if(!this.finishRecord){
 this.alertService.error('video no finished');
 return;
}
this.alertService.info('in next version');
return;
this.images.forEach((image)=>{
  const formData = new FormData();
 formData.append('file', image.url);
 console.log(image.url.changingThisBreaksApplicationSecurity)

   this.patientService.uploadMedia(labcode,formData).subscribe(
    event => {
      this.showUpload = true;
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadWidth = Math.round(100 * event.loaded / event.total!);
      }
      else if (event.type === HttpEventType.Response) {
          this.uploadWidth = 0;
        this.showUpload = false;
        this.alertService.success("upload success");
       } 
    },
    (err)=>{console.log(err)}
  
  ); 
});

return; 

  }
}