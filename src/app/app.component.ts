import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "./api.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  flight : any
  flightPage:any
  pageSize = 20
   lastClick = 0;
   delay = 2000;

  @ViewChild('myDiv') myDiv: ElementRef | undefined;

  constructor(private  apiService: ApiService,private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.apiService.fetchSpaces().subscribe(
      data => {
        this.flight = data
        this.flightPage = this.flight?.slice(0,20)
      }
    )
  }
  onScroll() {

      if (this.lastClick > (Date.now() - this.delay)) {
        return;
      } else {
        this.lastClick = Date.now();
        if ( this.myDiv?.nativeElement.scrollTop === this.myDiv?.nativeElement.scrollHeight) {
          this.spinner.show();
          let novi = this.flight.slice(this.pageSize,this.pageSize+20)
          setTimeout(() => {
            this.spinner.hide();
            this.flightPage = this.flightPage.concat(novi)
          }, 2000);
          this.pageSize = this.pageSize + 20    }

      }




  }


}
