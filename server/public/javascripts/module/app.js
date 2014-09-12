var app = angular.module('noMakler', []);

app.controller("PanelController", function() {
	this.tab = 1;

	this.selectTab = function(setTab) {
		console.log('setTab=', setTab);
		this.tab = setTab;
	};
	this.isSelected = function(checkTab) {
		console.log('checkTab=', checkTab, this.tab);
		return this.tab === checkTab;	
	};
});