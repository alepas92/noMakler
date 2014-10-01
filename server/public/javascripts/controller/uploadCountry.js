//This part is using in two pages. Here we upload information about all locations in DB

$(document).ready(function setCountryData() {
var	xhr = $.get("javascripts/db/db_tags.json", function(data) {
	})
	.done(function(data) {
        var allCountryObjects = data,
        	flag;
        for (var i = 0; i < allCountryObjects.length; i++) {
        	$("#choose-country").append("<option>" + allCountryObjects[i].nameC + "</option>");
		}
	})
}); 

$(document).ready(function setCitiesData() {
	var	xhr = $.get("javascripts/db/db_tags.json", function(data) {
	})
	.done(function(data) {
        var allCountryObjects = data;
        for (var i = 0; i < allCountryObjects.length; i++) {
        	if ($("#choose-country").val() == allCountryObjects[i].nameC) {
        		for (var j = 0; j < allCountryObjects[i].cities.length; j++) {
        			$("#choose-city").append("<option>" + allCountryObjects[i].cities[j] + "</option>");
        		}
        	}
		}
	})
})

$("#enter-system").on("click", function() {
	$(".pop-up").css("display", "none");
});




