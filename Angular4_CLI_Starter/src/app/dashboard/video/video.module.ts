import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoComponent} from "./video.component";

@NgModule({
  imports: [
    CommonModule,
    VideoComponent
  ],
  declarations: [VideoComponent]
})
export class VideoModule { }
