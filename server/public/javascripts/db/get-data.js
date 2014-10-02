$("#get-links-from-file").on("click", function() { //Event for button
	var fileName = formFileName();
	getLinksDB(fileName);

});

function formFileName() { //This function wait for onclick event and form File name
	var country = $("#choose-country").val();
	var city = $("#choose-city").val();
	var fileName = "/javascripts/db/" + "db_" + country + "_" + city + ".json";
	return fileName;
}

function getLinksDB(fileName) {
	var	xhr = $.get(fileName, function(data) {})
	.done(function(data) {
        var allData = data;
        var allSitesInfoLength = allData.city.allSiteInfo.length;
        var allAdvertsInfoFromOnePage = [];
        var allAdvertsFullFromCity = [];
        for (var i = 0; i < allSitesInfoLength; ++i) {
        	var url = allData.city.allSiteInfo[i].siteUrl;  //Here in for we get all links
        	var phoneTag = detectSiteTag(allData.city.allSiteInfo[0].phoneTag);   //Form tag into right form
    		var advertTag = detectSiteTag(allData.city.allSiteInfo[0].advertTag);
   //      	$.ajaxSetup({
   //  			scriptCharset: "utf-8", 
   //  			contentType: "application/json; charset=utf-8"
			// });                                      
        	$.when($.getJSON("http://whateverorigin.org/get?url=" + encodeURIComponent(url) + "&callback=?")).then(function(data) {
        				$("#hidden-work").innerHTML = data.contents;
    					console.log(allData.city.allSiteInfo[i]);
    					var formedInfoFromSite = formInfoFromSite(phoneTag, advertTag);
    					//Here must be function which will detect type and name of internet resource
    					allAdvertsInfoFromOnePage = vashMagazine(formedInfoFromSite);			//allAdvertsInfpFromOneFile will have all objects with info from one page
    					for (var j = 0; j < allAdvertsInfoFromOnePage.length; ++j) {
    						allAdvertsInfoFromOnePage[j].urlOperType = allData.city.allSiteInfo[i].urlOperType;
    						allAdvertsInfoFromOnePage[j].urlHouseType = allData.city.allSiteInfo[i].urlHouseType;
    						allAdvertsInfoFromOnePage[j].urlDistrict = allData.city.allSiteInfo[i].urlDistrict;
    					}
    					allAdvertsFullFromCity.push(allAdvertsInfoFromOnePage);
        	        })          //Encoding of links

					// $.fail(function() {alert("error")});
		}
		var file = JSON.stringify(allAdvertsFullFromCity);
		var nameOfFile = 'db_' + allData.country + '_' + allData.city.cityName + '_' + 'adverts';
		var blob = new Blob([file], {type: "application/json"});
		saveAs(blob, nameOfFile + ".json");  
	})
}


function detectSiteTag(siteTag) {         //Here I detect site tag from allSiteInfo property of City JSON
	var splitedTag = siteTag.split(" ");
	if (splitedTag[1] == "(tag)") {
		return "<" + splitedTag[0] + ">";
	} else if (splitedTag[1] == "(class)") {
		return "." + splitedTag[0];
	} else if (splitedTag[1] == "(id)") {
		return "#" + splitedTag[0];
	} else {
		console.log("Error with splited tag");
	}
}

function formInfoFromSite(phoneTag, advertTag) { //At this function I form object with all phones, prices and adverts
	var infoFromLink = {
			phonePriceTagsInfo : [],
			advertTagsInfo : []
		},
		phonePriceLength = $(phoneTag).length,
		advertLength = $(advertTag).length;


	for (var i = 0; i < phonePriceLength; ++i) {
		infoFromLink.phonePriceTagsInfo.push($(phoneTag)[i].innerText);
	}
	for (var i = 0; i < advertLength; ++i) {
		infoFromLink.advertTagsInfo.push($(advertTag)[i].text());
	}
	return infoFromLink;
}

//Next function must work only for VashMagazine site. Use Pattern
//Also must be added an idintification of the resource to the file name
//For each resource must do special adapter
//Also there are must be a function for detection of the resource

function FullAdvertObj() {
	this.price = [],
	this.phone = [],
	this.advert = ""
}

function vashMagazine(infoFromLink) {
	var phoneRegExp = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g,
		phonePriceLength = infoFromLink.phonePriceTagsInfo.length,
		advertsLength = infoFromLink.advertTagsInfo.length,
		allAdverts = [],
		counter = 0;
	for (var j = 0; j < advertsLength; ++j) {
		for (var i = 0; i < phonePriceLength; ++i) {
			if (infoFromLink.phonePriceTagsInfo[i] != phoneRegExp) {  // if data not match RegExp - it's price, else - phone
				allAdverts[j] = new FullAdvertObj();
				allAdverts[j].price.push(infoFromLink.phonePriceTagsInfo[i])
			} else  if ((infoFromLink.phonePriceTagsInfo[i] == phoneRegExp) && (counter == 2)) {
				counter += 1;                                                        //Can't be more then two numbers on one advert
				allAdverts[j].phone.push(infoFromLink.phonePriceTagsInfo[i]);
			} else {
				allAdverts[j].advert = infoFromLink.advertTagsInfo[j];
			}
		}
	}
	return allAdverts;	
}

