import { Component, ElementRef, InjectionToken, OnInit,Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';  

import { AuthService } from 'src/app/core/services/auth.service';
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
import * as Record from 'videojs-record/dist/videojs.record';
 @Component({
  selector: 'eg-record-video',
  templateUrl: './record-video.component.html',
  styleUrls: ['./record-video.component.css'],
   
})
export class RecordVideoComponent implements OnInit {
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
  images: string[] = [];
   // constructor initializes our declared vars
  constructor(elementRef: ElementRef,@Inject(DOCUMENT) private document: Document) {
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
        /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            backend: 'WebAudio',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            displayMilliseconds: true,
            hideScrollbar: true,
            plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                    bufferSize: 4096,
                    numberOfInputChannels: 1,
                    numberOfOutputChannels: 1,
                    constraints: {
                        video: false,
                        audio: true
                    }
                })
            ]
        },
        */
        // configure videojs-record plugin
        record: {
          audio: false,
          video: true,
          debug: true,
          hotKeys: true,
          maxLength: 60*60*24*10,

 
        }
      }
    };
  }


  takePicture() {
     var video = this.document.querySelector('video')!;
    let canvas = this.document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    let ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

   var dataURI = canvas.toDataURL('image/png'); // can also use 'image/png'
    this.images.push(dataURI);
   }

  ngOnInit() {
    this.showselected = false;
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

    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      this.player.record().saveAs({ 'video': 'my-video-file-name.webm' });

      console.log('finished recording: ', this.player.recordedData);
    });

    // error handling
    this.player.on('error', (error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
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
    console.log(this.path);
  }

  xx(){
 var fileURL = URL.createObjectURL( this.images[0]);
    window.location.href = fileURL;
}

}