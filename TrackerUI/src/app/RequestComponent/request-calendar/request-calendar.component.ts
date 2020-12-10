import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CalendarOptions, EventClickArg } from "@fullcalendar/angular"; // useful for typechecking
import {  RequestCalendarVM } from "Models/RequestVM";
import { ToastrService } from "ngx-toastr";
import { RequestService } from "Services/request.service";

@Component({
  selector: "app-request-calendar",
  templateUrl: "./request-calendar.component.html",
  styleUrls: ["./request-calendar.component.css"],
})
export class RequestCalendarComponent implements OnInit {
  [x: string]: any;
  lstRequests: RequestCalendarVM[];
  lstItems: RequestCalendarVM[];
  output: string;
  strResult: any;
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    slotDuration: "00:10:00",
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    firstDay: 1,
    events: [],
  };

   constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.lstItems = [];
    this.output = "[";
    this.requestService.GetRequestCalendar().subscribe((data) => {
      this.lstRequests = data;
      for (var i = 0; i < this.lstRequests.length; i++) {
        var item: RequestCalendarVM = {
          id: this.lstRequests[i]["id"],
          title: this.lstRequests[i]["title"],
          start: this.lstRequests[i]["start"],
          end: this.lstRequests[i]["end"],
          allDay: false,
          color: this.lstRequests[i]["color"],
          textColor: this.lstRequests[i]["textColor"]
        };
        this.lstItems.push(item);
      }
      this.lstItems.forEach((element) => {
        this.output += '{ "title": "' + element.title +'" , "start" : "' +element.start +'"  , "end": "' + element.end +'"  , "all-day" : "' +element.allDay +'" },';
      });
      this.output = this.output.substring(0, this.output.lastIndexOf(","));
      this.output += "]";
          let result = JSON.parse(this.output);
      this.calendarOptions.events = result;
      this.calendarOptions.eventBackgroundColor = this.lstRequests[0].color;
      this.calendarOptions.eventColor = this.lstRequests[0].textColor;
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.popupText = clickInfo.event.title + '\n';
    // this.popupText +="<br/>";
    this.popupText += "Palnned date start on: " + this.datepipe.transform(clickInfo.event.start, 'yyyy-MM-dd HH:mm:ss');
    this.popupText += "Palnned date finish on: " + this.datepipe.transform(clickInfo.event.end, 'yyyy-MM-dd HH:mm:ss');
    this.toastr.show(this.popupText);
  }
}
