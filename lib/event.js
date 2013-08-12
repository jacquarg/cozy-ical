// Generated by CoffeeScript 1.4.0
(function() {
  var VCalendar, VEvent, moment, time, _ref;

  time = require('time');

  moment = require('moment');

  _ref = require('./index'), VCalendar = _ref.VCalendar, VEvent = _ref.VEvent;

  module.exports = function(Event) {
    Event.prototype.toIcal = function(timezone) {
      var endDate, startDate;
      if (timezone == null) {
        timezone = "UTC";
      }
      startDate = new time.Date(this.start, timezone);
      endDate = new time.Date(this.end, timezone);
      return new VEvent(startDate, endDate, this.description, this.place, this.id);
    };
    Event.fromIcal = function(vevent, timezone) {
      var endDate, event, startDate, _ref1;
      if (timezone == null) {
        timezone = "UTC";
      }
      event = new Event();
      event.description = vevent.fields["DESCRIPTION"];
      if ((_ref1 = event.description) == null) {
        event.description = vevent.fields["SUMMARY"];
      }
      event.place = vevent.fields["LOCATION"];
      startDate = vevent.fields["DTSTART"];
      startDate = moment(startDate, "YYYYMMDDTHHmm00");
      startDate = new time.Date(new Date(startDate), timezone);
      endDate = vevent.fields["DTEND"];
      endDate = moment(endDate, "YYYYMMDDTHHmm00");
      endDate = new time.Date(new Date(endDate), timezone);
      event.timezone = timezone;
      event.start = startDate.toString().slice(0, 24);
      event.end = endDate.toString().slice(0, 24);
      return event;
    };
    return Event.extractEvents = function(component, timezone) {
      var events;
      events = [];
      component.walk(function(component) {
        if (component.name === 'VTIMEZONE') {
          timezone = component.fields["TZID"];
        }
        if (component.name === 'VEVENT') {
          return events.push(Event.fromIcal(component, timezone));
        }
      });
      return events;
    };
  };

}).call(this);