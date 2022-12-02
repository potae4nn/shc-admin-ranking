import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityService, IImageById, IImagePreview, ResultImagePreview } from 'src/app/service/activity.service';
import { url } from '../../../../app.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  public url: string = url;
  public dataPreview!: ResultImagePreview;
  public imageURL!: string;
  public fileImage: any;

  constructor(
    private _activityService: ActivityService,
    @Inject(MAT_DIALOG_DATA) public result: IImageById,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this._activityService.getImageById(this.result).subscribe(data => this.dataPreview = data.result[0]);
  }

  showPreview(imgFile: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    this.fileImage = imgFile.target.files[0];
    reader.readAsDataURL(imgFile.target.files[0])
  }

  uploadImage() {
    let formData = new FormData();
    formData.append('file', this.fileImage);
    formData.append('id_img', this.result.id_img.toString());
    this._activityService.uploadImage(formData).subscribe(data => {
      console.log(data);
    })
  }

}
