//Move next section into another file

$("#add-site").on("click", function() {
	var siteURL = $("#site-url").val();
	var phoneTag = $("#phone-tag").val();
	var advertTag = $("#advert-tag").val();
	document.getElementById("sites-info").innerHTML += "<span class='s-siteURL'>" + siteURL + "</span> "
								+ "<span class='s-phoneTag'>" + phoneTag + "</span> " 
								+ "<span class='s-advertTag'>"+ advertTag + "</span><br>";
	$("#site-url").val('');
});

$("#saveData").on("click", createFile);

//This section form site objects

function InfAbSite(siteUrl, phoneTag, advertTag) {
	this.siteUrl = siteUrl,
	this.phoneTag = phoneTag,
	this.advertTag = advertTag
};

//This section form city object with all site info

function FormCityObject(city, cityDistricts, phoneClass, allSiteInfo) {
	this.cityName = city,
	this.cityDistricts = cityDistricts,
	this.phoneClass = phoneClass,
	this.allSiteInfo = allSiteInfo
}

//Next function help to form object for current country

function FormObject(country, city, cityDistricts, phoneClass, allSiteInfo) {
	this.country = country,
	this.city = new FormCityObject(city, cityDistricts, phoneClass, allSiteInfo)
}

//Next function is the main function of the forming globalData. Here
//we get all data from forms and form globalData object

function getGlobalData() {
	var country = $("#country-selector option:selected").text();
	var city = $("#city").val();
	var cityDistricts = $("#city-district").val();
		cityDistricts = cityDistricts.split(", ");
	var phoneClass = $("#phone-class").val();
	var allSiteUrls = $("div").find(".s-siteURL");
	var allSitePhoneTags = $("div").find(".s-phoneTag");
	var allSiteAdvertTags = $("div").find(".s-advertTag");
	var allSiteInfo = [];
	for (var i = 0; i < allSiteUrls.length; i++) {
		var url = $(allSiteUrls[i]).text();
		var phTag = $(allSitePhoneTags[i]).text();
		var advTag = $(allSiteAdvertTags[i]).text();
		allSiteInfo[i] = new InfAbSite(url, phTag, advTag);
	}
	var globalData = new FormObject(country, city, cityDistricts, phoneClass, allSiteInfo);
	return globalData;
}


function createFile() {
	var data = getGlobalData();
	var file = JSON.stringify(data);
	var filemane = 'db_' + data.country + '_' + data.city.cityName;
	var blob = new Blob([file], {type: "application/json"});
	saveAs(blob, filemane + ".json");   
}

