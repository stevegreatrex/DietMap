/*global ko:false, moment:false*/

var DietMap = (function ($, ko, moment, undefined) {
	"use strict";

	var TimeBase = function () {
		var self = this;
		this.displayTime = ko.computed(function () {
			return moment().hours(self.time()).format("HH:00");
		}, this);
	};

	var TimeSlot = function (moment, day, time, data) {
		var self = this;
		this.day = ko.observable(day);
		this.time = ko.observable(time);
		this.wizardContent = ko.observable();
		this.records = ko.observableArray(data || []);
        this.availableRecipes = ko.observableArray();

		this.loadWizard = function (url) {
			$.get(url).done(function (data) {
			    //self.wizardContent(data);
                self.availableRecipes.removeAll();
			    for (var i = 0; i < data.length; i++) {
                    self.availableRecipes.push(data[i]);
			    }
			});
		};

		this.addRecipe = function (recipe) {
		    //tell the server, wait for confirmation, then...
		    $.post("/home/addrecipe", {
		        name: recipe.Name,
                date: moment.format("YYYY-MM-DD")
		    }).done(function (data) {
                self.records.push(data);
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

        var today = moment();

		this.timeslots.push(new TimeSlot(today, "Mon", this.time(), dataByDay[0]));
		this.timeslots.push(new TimeSlot(today, "Tue", this.time(), dataByDay[1]));
		this.timeslots.push(new TimeSlot(today, "Wed", this.time(), dataByDay[2]));
		this.timeslots.push(new TimeSlot(today, "Thu", this.time(), dataByDay[3]));
		this.timeslots.push(new TimeSlot(today, "Fri", this.time(), dataByDay[4]));
		this.timeslots.push(new TimeSlot(today, "Sat", this.time(), dataByDay[5]));
		this.timeslots.push(new TimeSlot(today, "Sun", this.time(), dataByDay[6]));
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