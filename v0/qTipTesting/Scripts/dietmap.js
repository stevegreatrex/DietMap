/*global ko:false, moment:false*/

var DietMap = (function ($, ko, moment, undefined) {
	"use strict";

	var TimeBase = function () {
		var self = this;
		this.displayTime = ko.computed(function () {
			return moment().hours(self.time()).format("HH:00");
		}, this);
	};

	var TimeSlot = function (day, time, data) {
		var self = this;
		this.day = ko.observable(day);
		this.time = ko.observable(time);
		this.wizardContent = ko.observable();
		this.records = ko.observableArray(data);

		this.loadWizard = function (url) {
			$.get(url).done(function (data) {
				self.wizardContent(data);
			});
		};

		TimeBase.apply(this);
		this.title = ko.computed(function () {
			return self.day() + " at " + self.displayTime();
		}, this);
		
	};

	var TimeSlotRow = function(time, data) {
		this.timeslots = ko.observableArray();
		this.time = ko.observable(time);

		TimeBase.apply(this);
		this.init(data);
	};

	TimeSlotRow.prototype.init = function (data) {
		var dataByDay = {};
		if (data) {
			for (var i = 0; i < data.length; i++) {
				var day = moment(data[i].Date).day();
				if (!dataByDay[day]) {
					dataByDay[day] = [];
				}
				dataByDay[day].push(data[i]);
			}
		}
		this.timeslots.push(new TimeSlot("Mon", this.time(), dataByDay[0]));
		this.timeslots.push(new TimeSlot("Tue", this.time(), dataByDay[1]));
		this.timeslots.push(new TimeSlot("Wed", this.time(), dataByDay[2]));
		this.timeslots.push(new TimeSlot("Thu", this.time(), dataByDay[3]));
		this.timeslots.push(new TimeSlot("Fri", this.time(), dataByDay[4]));
		this.timeslots.push(new TimeSlot("Sat", this.time(), dataByDay[5]));
		this.timeslots.push(new TimeSlot("Sun", this.time(), dataByDay[6]));
	};

	var DietMap = function (data) {
		var self = this;

		this.timeslotRows = ko.observableArray();
		this.selectedTimeslot = ko.observable();
		this.init = function () {
			var dataByTime = {};
			if (data) {
				for (var i = 0; i < data.length; i++) {
					var hour = moment(data[i].Date).hours();
					if (!dataByTime[hour]) {
						dataByTime[hour] = [];
					}
					dataByTime[hour].push(data[i]);
				}
			}
			for (var hour = 6; hour < 24; hour++) {
				self.timeslotRows.push(new TimeSlotRow(hour, dataByTime[hour]));
			}
		};
		this.select = function (timeslot) {
			self.selectedTimeslot(timeslot);
		};
		this.removeSelection = function (timeslot) {
			if (self.selectedTimeslot() === timeslot) {
				self.selectedTimeslot(null);
			}
		};

        this.init();
	};

    return DietMap;
}(jQuery, ko, moment));