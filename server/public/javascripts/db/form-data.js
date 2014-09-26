//Move next section into another file

$("#add-site").on("click", function() {
	var siteURL = $("#site-url").val();
	var phoneTag = $("#phone-tag").val();
	var advertTag = $("#advert-tag").val();
	var urlOperType = $("#url-oper-type option:selected").text();
	var urlHouseType = $("#url-house-type option:selected").text();
	var urlDistrict = $("#url-district option:selected").text();
	document.getElementById("sites-info").innerHTML += "<div class='si-elem'><span class='s-siteURL'>" + siteURL + "</span> "
								+ "<span class='s-phoneTag'>" + phoneTag + "</span> " 
								+ "<span class='s-advertTag'>"+ advertTag + "</span> "
								+ "<span class='s-urlOperType'>"+ urlOperType + "</span> "
								+ "<span class='s-urlHouseType'>"+ urlHouseType + "</span> "
								+ "<span class='s-urlDistrict'>"+ urlDistrict + "</span></div>";
	$("#site-url").val('');
});

$("#saveData").on("click", createFile);

//Load entered city districts

$("#city-district").on("change", function() {
	var cityDistricts = $("#city-district").val();
	cityDistricts = cityDistricts.split(", ");
	for (var i=0; i < cityDistricts.length; i++) {
		$("#url-district").append("<option>" + cityDistricts[i] + "</option>");
	}
});

//This section form site objects

function InfAbSite(siteUrl, phoneTag, advertTag, urlOperType, urlHouseType, urlDistrict) {
	this.siteUrl = siteUrl,
	this.phoneTag = phoneTag,
	this.advertTag = advertTag,
	this.urlOperType = urlOperType,
	this.urlHouseType = urlHouseType,
	this.urlDistrict = urlDistrict
};

//This section form city object with all site info

function FormCityObject(city, cityDistricts, cityPhCode, phoneClass, allSiteInfo) {
	this.cityName = city,
	this.cityDistricts = cityDistricts,
	this.cityPhCode = cityPhCode,
	this.phoneClass = phoneClass,
	this.allSiteInfo = allSiteInfo,
	this.blackNumbers = [],
	this.whiteNumbers = []
}

//Next function help to form object for current country

function FormObject(country, countryPhCode, countryMobCodes, city, cityDistricts, cityPhCode, phoneClass, allSiteInfo) {
	this.country = country,
	this.countryPhCode = countryPhCode,
	this.countryMobCodes = countryMobCodes,
	this.city = new FormCityObject(city, cityDistricts, cityPhCode, phoneClass, allSiteInfo)
}

//Detecting phone class
function detectPhoneClass(phoneClass) {
	var newPhone = "",
		phClassOneRExp = /^[0-9]{5}/,
		phClassTwoRExp = /^[0-9]{6}/,
		phClassThreeRExp = /^[0-9]{7}/;
	if (phoneClass.match("-")) {
		phoneClass = phoneClass.split("-");
		for (var i=0; i < phoneClass.length; i++) {
			newPhone += phoneClass[i];
		}
	} else if (phoneClass.match(" ")) {
		phoneClass = phoneClass.split(" ");
		for (var i=0; i < phoneClass.length; i++) {
			newPhone += phoneClass[i];
		}
	} else {
		if (phoneClass.match(phClassThreeRExp)) return 3;
		if (phoneClass.match(phClassTwoRExp)) return 2;
		if (phoneClass.match(phClassOneRExp)) return 1;
	}
	if ((newPhone!="") && (newPhone.match(phClassThreeRExp))) return 3;
	if ((newPhone!="") && (newPhone.match(phClassTwoRExp))) return 2; 
	if ((newPhone!="") && (newPhone.match(phClassOneRExp))) return 1;

  

}

//Next function is the main function of the forming globalData. Here
//we get all data from forms and form globalData object

function getGlobalData() {
	var country = $("#country-selector option:selected").text();
	var city = $("#city").val();
	var cityDistricts = $("#city-district").val();
		cityDistricts = cityDistricts.split(", ");
	var countryPhCode = $("#country-ph-code").val();
	var countryMobCodes = $("#country-mob-codes").val();
		countryMobCodes = countryMobCodes.split(", ");
	var cityPhCode = $("#phone-code-class").val();
	var phoneClass = $("#phone-class").val();
		phoneClass = detectPhoneClass(phoneClass);
	var allSiteUrls = $("div").find(".s-siteURL");
	var allSitePhoneTags = $("div").find(".s-phoneTag");
	var allSiteAdvertTags = $("div").find(".s-advertTag");
	var allUrlOperTypes = $("div").find(".s-urlOperType");
	var allUrlHouseTypes = $("div").find(".s-urlHouseType");
	var allUrlDistrict = $("div").find(".s-urlDistrict");
	var allSiteInfo = [];
	for (var i = 0; i < allSiteUrls.length; i++) {
		var url = $(allSiteUrls[i]).text();
		var phTag = $(allSitePhoneTags[i]).text();
		var advTag = $(allSiteAdvertTags[i]).text();
		var urlOpType = $(allUrlOperTypes[i]).text();
		var urlHouType = $(allUrlHouseTypes[i]).text();
		var urlDistr = $(allUrlDistrict[i]).text();
		allSiteInfo[i] = new InfAbSite(url, phTag, advTag, urlOpType, urlHouType, urlDistr);
	}
	var globalData = new FormObject(country, countryPhCode, countryMobCodes, city, cityDistricts, cityPhCode, phoneClass, allSiteInfo);
	return globalData;
}


function createFile() {
	var data = getGlobalData();
	var file = JSON.stringify(data);
	var filemane = 'db_' + data.country + '_' + data.city.cityName;
	var blob = new Blob([file], {type: "application/json"});
	saveAs(blob, filemane + ".json");
	location.reload();   
}


// Part 2
// Parsing JSON files

function getFile() {
	var file = $("#data").val();
 
  $.getJSON(file, function(json) {
    $("#result").html('');
    });
};

