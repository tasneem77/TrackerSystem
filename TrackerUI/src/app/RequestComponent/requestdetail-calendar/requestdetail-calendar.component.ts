import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { RequestDetailCalendarVM } from 'Models/RequestVM';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'Services/request.service';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-requestdetail-calendar',
  templateUrl: './requestdetail-calendar.component.html',
  styleUrls: ['./requestdetail-calendar.component.css']
})
export class RequestdetailCalendarComponent implements OnInit {

  //RequestDetailCalendarVM

  lstRequestDetails: RequestDetailCalendarVM[];
  lstItems: RequestDetailCalendarVM[];
  output: string;
  strResult: any;
  ActualPannedDateTime: {};
  selectedItem: number;// { id: 1, name: "Planned" };
  popupText: string;
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    slotDuration: "00:10:00",
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    firstDay: 1,
    events: [],
  };
  constructor(
    private requestService: RequestService,
    private datepipe: DatePipe,
    private toastr: ToastrService) {

    this.ActualPannedDateTime = [
      // { id: 1, name: 'Planned' },
      // { id: 2, name: 'Actual' }

      {"name": "Planned", id: "1", "checked": true},
      {"name": "Actual", id: "2", "checked": false}
    ]


 
  
  }

  ngOnInit(): void {
    
    this.selectedItem = this.ActualPannedDateTime[0].id;
    this.lstItems = [];
    this.output = "[";
    if(localStorage.getItem("roleName") === "SuperAdmin")
    {
      this.requestService.GetRequestDetailPlannedCalendar(Number(localStorage.getItem("requestId"))).subscribe((data) => {
        this.lstRequestDetails = data;
        for (var i = 0; i < this.lstRequestDetails.length; i++) {
          var item: RequestDetailCalendarVM = {
            id: this.lstRequestDetails[i]["id"],
            title: this.lstRequestDetails[i]["title"],
            start: this.lstRequestDetails[i]["start"],
            end: this.lstRequestDetails[i]["end"],
            allDay: false,
            color: this.lstRequestDetails[i]["color"],
            textColor: this.lstRequestDetails[i]["textColor"],
          };
          this.lstItems.push(item);
        }
        this.lstItems.forEach((element) => {
          this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
        });
        this.output = this.output.substring(0, this.output.lastIndexOf(","));
        this.output += "]";
        let result = JSON.parse(this.output);
        this.calendarOptions.events = result;
        this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
        this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
        this.calendarOptions.eventClick = this.handleEventClick.bind(this);
      });
   
    }
    if(localStorage.getItem("roleName") !== "SuperAdmin")
    {
    this.requestService.GetRequestDetailPlannedCalendarByUserId(Number(localStorage.getItem("requestId")), Number(localStorage.getItem("userId"))).subscribe((data) => {
      this.lstRequestDetails = data;
      for (var i = 0; i < this.lstRequestDetails.length; i++) {
        var item: RequestDetailCalendarVM = {
          id: this.lstRequestDetails[i]["id"],
          title: this.lstRequestDetails[i]["title"],
          start: this.lstRequestDetails[i]["start"],
          end: this.lstRequestDetails[i]["end"],
          allDay: false,
          color: this.lstRequestDetails[i]["color"],
          textColor: this.lstRequestDetails[i]["textColor"],
        };
        this.lstItems.push(item);
      }
      this.lstItems.forEach((element) => {
        this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
      });
      this.output = this.output.substring(0, this.output.lastIndexOf(","));
      this.output += "]";
      let result = JSON.parse(this.output);
      this.calendarOptions.events = result;
      this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
      this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    });
  }
}

radioChange(event: MatRadioChange) {

//  console.log(event.value);


  if (event.value == 1) {
    this.lstItems = [];
    this.output = "[";

    if(localStorage.getItem("roleName") == "SuperAdmin"){
      this.requestService.GetRequestDetailPlannedCalendar(Number(localStorage.getItem("requestId"))).subscribe((data) => {
        this.lstRequestDetails = data;
        console.log( this.lstRequestDetails);
        for (var i = 0; i < this.lstRequestDetails.length; i++) {
          var item: RequestDetailCalendarVM = {
            id: this.lstRequestDetails[i]["id"],
            title: this.lstRequestDetails[i]["title"],
            start: this.lstRequestDetails[i]["start"],
            end: this.lstRequestDetails[i]["end"],
            allDay: false,
            color: this.lstRequestDetails[i]["color"],
            textColor: this.lstRequestDetails[i]["textColor"]
          };
          this.lstItems.push(item);
        }
        this.lstItems.forEach((element) => {
          this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
        });
        this.output = this.output.substring(0, this.output.lastIndexOf(","));
        this.output += "]";
        let result = JSON.parse(this.output);
        this.calendarOptions.events = result;
        this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
        this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
        this.calendarOptions.eventClick = this.handleEventClick.bind(this);
      });
    }
 else{
    this.requestService.GetRequestDetailPlannedCalendarByUserId(Number(localStorage.getItem("requestId")),Number(localStorage.getItem("userId"))).subscribe((data) => {
      this.lstRequestDetails = data;
      for (var i = 0; i < this.lstRequestDetails.length; i++) {
        var item: RequestDetailCalendarVM = {
          id: this.lstRequestDetails[i]["id"],
          title: this.lstRequestDetails[i]["title"],
          start: this.lstRequestDetails[i]["start"],
          end: this.lstRequestDetails[i]["end"],
          allDay: false,
          color: this.lstRequestDetails[i]["color"],
          textColor: this.lstRequestDetails[i]["textColor"]
        };
        this.lstItems.push(item);
      }
      this.lstItems.forEach((element) => {
        this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
      });
      this.output = this.output.substring(0, this.output.lastIndexOf(","));
      this.output += "]";
      let result = JSON.parse(this.output);
      this.calendarOptions.events = result;
      this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
      this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    });
  }
}
  if (event.value == 2) {
    this.lstItems = [];
    this.output = "[";
    if(localStorage.getItem("roleName") == "SuperAdmin"){
   
    this.requestService.GetRequestDetailActualCalendar(Number(localStorage.getItem("requestId"))).subscribe((data) => {
      this.lstRequestDetails = data;
      for (var i = 0; i < this.lstRequestDetails.length; i++) {
        var item: RequestDetailCalendarVM = {
          id: this.lstRequestDetails[i]["id"],
          title: this.lstRequestDetails[i]["title"],
          start: this.lstRequestDetails[i]["start"],
          end: this.lstRequestDetails[i]["end"],
          allDay: false,
          color: this.lstRequestDetails[i]["color"],
          textColor: this.lstRequestDetails[i]["textColor"]
        };
        this.lstItems.push(item);
      }
      this.lstItems.forEach((element) => {
        this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
      });
      this.output = this.output.substring(0, this.output.lastIndexOf(","));
      this.output += "]";
      let result = JSON.parse(this.output);
      this.calendarOptions.events = result;
      this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
      this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    });
  }
  else
  {
    this.requestService.GetRequestDetailActualCalendarByUserId(Number(localStorage.getItem("requestId")),Number(localStorage.getItem("userId"))) .subscribe((data) => {
      this.lstRequestDetails = data;
      for (var i = 0; i < this.lstRequestDetails.length; i++) {
        var item: RequestDetailCalendarVM = {
          id: this.lstRequestDetails[i]["id"],
          title: this.lstRequestDetails[i]["title"],
          start: this.lstRequestDetails[i]["start"],
          end: this.lstRequestDetails[i]["end"],
          allDay: false,
          color: this.lstRequestDetails[i]["color"],
          textColor: this.lstRequestDetails[i]["textColor"]
        };
        this.lstItems.push(item);
      }
      this.lstItems.forEach((element) => {
        this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
      });
      this.output = this.output.substring(0, this.output.lastIndexOf(","));
      this.output += "]";
      let result = JSON.parse(this.output);
      this.calendarOptions.events = result;
      this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
      this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    });
 
  }
  }
}
  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    // }
    this.popupText = clickInfo.event.title + '\n';
    // this.popupText +="<br/>";
    this.popupText += "Palnned date start on: " + this.datepipe.transform(clickInfo.event.start, 'yyyy-MM-dd HH:mm:ss');
    this.popupText += "Palnned date finish on: " + this.datepipe.transform(clickInfo.event.end, 'yyyy-MM-dd HH:mm:ss');
    this.toastr.show(this.popupText);
  }



  // getActualPlannedDateTime(selectedItem) {

  //   if (selectedItem == 1) {
  //     this.lstItems = [];
  //     this.output = "[";

  //     if(localStorage.getItem("roleName") == "SuperAdmin" || localStorage.getItem("roleName") == "PMO" ||  localStorage.getItem("roleName") == "CEO" ){
  //       this.requestService.GetRequestDetailPlannedCalendar(Number(localStorage.getItem("requestId"))).subscribe((data) => {
  //         this.lstRequestDetails = data;
  //         for (var i = 0; i < this.lstRequestDetails.length; i++) {
  //           var item: RequestDetailCalendarVM = {
  //             id: this.lstRequestDetails[i]["id"],
  //             title: this.lstRequestDetails[i]["title"],
  //             start: this.lstRequestDetails[i]["start"],
  //             end: this.lstRequestDetails[i]["end"],
  //             allDay: false,
  //             color: this.lstRequestDetails[i]["color"],
  //             textColor: this.lstRequestDetails[i]["textColor"]
  //           };
  //           this.lstItems.push(item);
  //         }
  //         this.lstItems.forEach((element) => {
  //           this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
  //         });
  //         this.output = this.output.substring(0, this.output.lastIndexOf(","));
  //         this.output += "]";
  //         let result = JSON.parse(this.output);
  //         this.calendarOptions.events = result;
  //         this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
  //         this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
  //         this.calendarOptions.eventClick = this.handleEventClick.bind(this);
  //       });
     
     
     
     
     
     
  //     }
  //  else{


  //     this.requestService.GetRequestDetailPlannedCalendarByUserId(Number(localStorage.getItem("requestId")),Number(localStorage.getItem("userId"))).subscribe((data) => {
  //       this.lstRequestDetails = data;
  //       for (var i = 0; i < this.lstRequestDetails.length; i++) {
  //         var item: RequestDetailCalendarVM = {
  //           id: this.lstRequestDetails[i]["id"],
  //           title: this.lstRequestDetails[i]["title"],
  //           start: this.lstRequestDetails[i]["start"],
  //           end: this.lstRequestDetails[i]["end"],
  //           allDay: false,
  //           color: this.lstRequestDetails[i]["color"],
  //           textColor: this.lstRequestDetails[i]["textColor"]
  //         };
  //         this.lstItems.push(item);
  //       }
  //       this.lstItems.forEach((element) => {
  //         this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
  //       });
  //       this.output = this.output.substring(0, this.output.lastIndexOf(","));
  //       this.output += "]";
  //       let result = JSON.parse(this.output);
  //       this.calendarOptions.events = result;
  //       this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
  //       this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
  //       this.calendarOptions.eventClick = this.handleEventClick.bind(this);
  //     });
  //   }
  // }
  //   if (selectedItem == 2) {
  //     this.lstItems = [];
  //     this.output = "[";
  //     if(localStorage.getItem("roleName") == "SuperAdmin" || localStorage.getItem("roleName") == "PMO" ||  localStorage.getItem("roleName") == "CEO" ){
     
  //     this.requestService.GetRequestDetailActualCalendarByUserId(Number(localStorage.getItem("requestId")),Number(localStorage.getItem("userId"))).subscribe((data) => {
  //       this.lstRequestDetails = data;
  //       for (var i = 0; i < this.lstRequestDetails.length; i++) {
  //         var item: RequestDetailCalendarVM = {
  //           id: this.lstRequestDetails[i]["id"],
  //           title: this.lstRequestDetails[i]["title"],
  //           start: this.lstRequestDetails[i]["start"],
  //           end: this.lstRequestDetails[i]["end"],
  //           allDay: false,
  //           color: this.lstRequestDetails[i]["color"],
  //           textColor: this.lstRequestDetails[i]["textColor"]
  //         };
  //         this.lstItems.push(item);
  //       }
  //       this.lstItems.forEach((element) => {
  //         this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
  //       });
  //       this.output = this.output.substring(0, this.output.lastIndexOf(","));
  //       this.output += "]";
  //       let result = JSON.parse(this.output);
  //       this.calendarOptions.events = result;
  //       this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
  //       this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
  //       this.calendarOptions.eventClick = this.handleEventClick.bind(this);
  //     });
  //   }
  //   else
  //   {
  //     this.requestService.GetRequestDetailActualCalendar(Number(localStorage.getItem("requestId"))) .subscribe((data) => {
  //       this.lstRequestDetails = data;
  //       for (var i = 0; i < this.lstRequestDetails.length; i++) {
  //         var item: RequestDetailCalendarVM = {
  //           id: this.lstRequestDetails[i]["id"],
  //           title: this.lstRequestDetails[i]["title"],
  //           start: this.lstRequestDetails[i]["start"],
  //           end: this.lstRequestDetails[i]["end"],
  //           allDay: false,
  //           color: this.lstRequestDetails[i]["color"],
  //           textColor: this.lstRequestDetails[i]["textColor"]
  //         };
  //         this.lstItems.push(item);
  //       }
  //       this.lstItems.forEach((element) => {
  //         this.output += '{ "title": "' + element.title + '" , "start" : "' + element.start + '"  , "end": "' + element.end + '"  , "all-day" : "' + element.allDay + '" },';
  //       });
  //       this.output = this.output.substring(0, this.output.lastIndexOf(","));
  //       this.output += "]";
  //       let result = JSON.parse(this.output);
  //       this.calendarOptions.events = result;
  //       this.calendarOptions.eventBackgroundColor = this.lstRequestDetails[0].color;
  //       this.calendarOptions.eventColor = this.lstRequestDetails[0].textColor;
  //       this.calendarOptions.eventClick = this.handleEventClick.bind(this);
  //     });
   
  //   }
  //   }

  // }
}
