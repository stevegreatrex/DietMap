/*global ko:false, moment:false*/

var DietMap = (function ($, ko, moment, undefined) {
	"use strict";

	var TimeBase = function () {
		var self = this;
		this.displayTime = ko.computed(function () {
			return moment().hours(self.time()).format("HH:00");
		}, this);
	};

	var TimeSlot = function (day, time) {
		var self = this;
		this.day = ko.observable(day);
		this.time = ko.observable(time);
		this.wizardContent = ko.observable();

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

	var TimeSlotRow = function(time) {
		this.timeslots = ko.observableArray();
		this.time = ko.observable(time);

		TimeBase.apply(this);
		this.init();
	};

	TimeSlotRow.prototype.init = function() {
		this.timeslots.push(new TimeSlot("Mon", this.time()));
		this.timeslots.push(new TimeSlot("Tue", this.time()));
		this.timeslots.push(new TimeSlot("Wed", this.time()));
		this.timeslots.push(new TimeSlot("Thu", this.time()));
		this.timeslots.push(new TimeSlot("Fri", this.time()));
		this.timeslots.push(new TimeSlot("Sat", this.time()));
		this.timeslots.push(new TimeSlot("Sun", this.time()));
	};

	var DietMap = function () {
		var self = this;

		this.timeslotRows = ko.observableArray();
		this.selectedTimeslot = ko.observable();
		this.init = function () {
			for (var hour = 6; hour < 24; hour++) {
				self.timeslotRows.push(new TimeSlotRow(hour));
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