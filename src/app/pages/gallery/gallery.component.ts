import { Component, OnInit } from '@angular/core';
import { ImgDataService } from 'src/app/services/img-data.service';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  constructor(
    private imgDataService: ImgDataService,
    private alertService: AlertDialogService,
  ) { }

  ngOnInit(): void {}

  searchData;
  perPage: any;
  photos = [];
  completePhotList = [];
  pageIndex = 0;

  search() {
    this.imgDataService.getdata(this.searchData, 100).subscribe((response: any) => {
      console.log(response);
      this.completePhotList = response.photos;
      if(!this.completePhotList.length){
        this.alertService.confirm('Images', `Oops!!! No images avaialable.`, 'OK', 'sm');
      }
      this.pageIndex = 0;
      this.pagination(null);
    }, (error) => {
      console.log(error);
    })
  }

  pagination(type) {
    if (type == 'add') {
      if (!(this.pageIndex * 6 > this.completePhotList.length - 6)) {
        this.pageIndex = this.pageIndex + 1;
      }
    } else if (type == 'delete') {
      if (this.pageIndex > 0) {
        this.pageIndex = this.pageIndex - 1;
      }
    }
    this.photos = JSON.parse(JSON.stringify(this.completePhotList)).slice((this.pageIndex * 6), ((this.pageIndex + 1) * 6));
  }


}
