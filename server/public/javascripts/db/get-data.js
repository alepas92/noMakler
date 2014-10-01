$("#get-links-from-file").on("click", function() { //Event for button
	var fileName = formFileName();
	getLinksDB(fileName);

});

function formFileName() { //This function wait for onclick event and form File name
	var country = $("#choose-country").val();
	var city = $("choose-city").val();
	var fileName = "/javascripts/db/" + "db_" + country + "_" + city + ".json";
	return fileName;
}

function getLinksDB(fileName) {
	var	xhr = $.get(fileName, function(data) {
	})
	.done(function(data) {
        var allData = data;
        var allSitesInfoLength = allData.city.allSitesInfo.length;
        var allAdvertsInfo = [];
        var 
        for (var i = 0; i < allSitesInfoLength; ++i) {
        	var url = allData.city.allSitesInfo[i].siteURL;
        	$.getJSON('http://whateverorigin.org/get?url=' + 
    			encodeURIComponent(url) + '&callback=?', function(data) {
    				$("#hidden-work").text() = data.contents;
    				var phoneTag = detectSiteTag(allData.city.allSitesInfo[i].phoneTag);
    				var advertTag = detectSiteTag(allData.city.allSitesInfo[i].advertTag);
    				var formedInfoFromSite = FormedInfoFromSite(phoneTag, advertTag);
			});
        }
	})
}

function detectSiteTag(siteTag) {         //Here I detect site tag from allSiteInfo property of City JSON
	var splitedTag = siteTag.split(" ");
	if (splitedTag[1] == "(tag)") {
		return "<" + splitedTag[0] + ">";
	} else if (splitedTag[1] == "(class)") {
		return "." + splitedTag[0];
	} else if ()splitedTag[1] == "(id)") {
		return "#" + splitedTag[0];
	} else {
		console.log("Error with splited tag");
	}
}

function formInfoFromSite(phoneTag, advertTag) { //At this function I form object with all phones, prices and adverts
	var infoFromLink = {
			phonePriceTagsInfo = [],
			advertTagsInfo = []
		},
		phonePriceLength = $(phoneTag).length,
		advertLength = $(advertTag).length;


	for (var i = 0; i < phonePriceLength; ++i) {
		infoFromLink.phonePriceTagsInfo.push($(phoneTag)[i].text());
	}
	for (var i = 0; i < advertLength; ++i) {
		infoFromLink.advertTagsInfo.push($(advertTag)[i].text());
	}
	return infoFromLink;
}

//Next function must work only for VashMagizine site. Use Pattern
//Also must be added an idintification of the resource to the file name
//For each resource must do special adapter
//Also there are must be a function for detection of the resource