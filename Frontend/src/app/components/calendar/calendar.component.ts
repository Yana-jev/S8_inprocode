import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'calendar',
  standalone: true,
  imports: [FullCalendarModule, FormsModule], 
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    events: [],
    select: this.handleDateSelect.bind(this), 
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
  
  };

  isModalOpen: boolean = false; 
  newEventTitle: string = ''; 
  selectedStart: string = ''; 
  selectedEnd: string = ''; 
  eventToDelete: any = null;
  eventColor: string = '#3788d8';
  eventToEdit: any = null;
  
  private formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return formatDate(d, 'yyyy-MM-dd', 'en-US');
  }
  
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.loadEvents(); 
  }


  loadEvents() {
    this.calendarService.getEvents().subscribe((events) => {

      this.calendarOptions.events = events;
    });
  }
  


  handleDateSelect(selectInfo: any) {
    this.isModalOpen = true; 
    this.selectedStart = selectInfo.startStr;
    this.selectedEnd = selectInfo.endStr;
    this.newEventTitle = ''; 
    this.eventColor = '#3788d8';
    this.eventToEdit = null; 
  }
  
  submitEvent() {
    const eventData = {
      title: this.newEventTitle,
      start: this.selectedStart,
      end: this.selectedEnd,
      backgroundColor: this.eventColor,
      allDay: true
    };
  
    if (this.eventToEdit) {

      this.eventToEdit.setProp('title', eventData.title);
      this.eventToEdit.setProp('backgroundColor', eventData.backgroundColor);
      this.eventToEdit.setStart(this.selectedStart); 
      this.eventToEdit.setEnd(this.selectedEnd);      
  

      this.calendarService.updateEvent(this.eventToEdit.id, eventData).subscribe(() => {
        console.log('Event updated successfully on the server');
      }, (error) => {
        console.error('Error updating event on the server:', error);
      });
    } else {

      this.calendarService.addEvent(eventData).subscribe(() => {
        const newEvent = {
          title: eventData.title,
          start: eventData.start,
          end: eventData.end,
          backgroundColor: eventData.backgroundColor,
          allDay: eventData.allDay
        };
  

        this.calendarOptions.events = [
          ...(this.calendarOptions.events as any[]),
          newEvent
        ];
      });
    }
  
    this.closeModal(); 
  }
  
  
  closeModal() {
    this.isModalOpen = false;
    this.newEventTitle = '';
    this.eventColor 
    this.eventToEdit = null;
  }

  

  handleEventDrop(dropInfo: any) {
    const eventId = dropInfo.event.id; 
    const updatedEventData = {
        title: dropInfo.event.title, 
        start: dropInfo.event.startStr,
        end: dropInfo.event.endStr
    };

    this.calendarService.updateEvent(eventId, updatedEventData).subscribe((response) => {
        console.log('Event updated successfully:', response);
    }, (error) => {
        console.error('Error updating event:', error); 
    });
}

handleEventClick(clickInfo: any) {
  this.isModalOpen = true;
  this.newEventTitle = clickInfo.event.title;
  this.selectedStart = clickInfo.event.startStr;
  this.selectedEnd = clickInfo.event.endStr;
  this.eventColor = clickInfo.event.backgroundColor || '#3788d8';
  this.eventToEdit = clickInfo.event;
}


  deleteEvent() {
    if (this.eventToEdit) {
      const eventId = this.eventToEdit.id; 
  
      if (confirm(`Are you sure you want to delete: '${this.eventToEdit.title}'?`)) {
        this.calendarService.deleteEvent(eventId).subscribe(() => {
          this.eventToEdit.remove(); 
          console.log(`Event ${eventId} was deleted`); 
          this.closeModal(); 
        });
      }
    }
}
}
