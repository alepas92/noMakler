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
	var allData, allAdvertsFullFromCity = [], def, i = 0, counter = 0;
	var	xhr = $.ajax({
		url: fileName,
		//async: false
	});
	var infoFromLink = {
			phonePriceTagsInfo : [],
			advertTagsInfo : []
		}
	$.when(xhr).done(function(data) {
		allData = data;
		var allSitesInfoLength = allData.city.allSiteInfo.length;
		var allAdvertsInfoFromOnePage = [];
		$("#progress").html("Починається обробка сайтів");
		for (i; i < allSitesInfoLength; i++) {
			var url = allData.city.allSiteInfo[i].siteUrl;  //Here in for we get all links
			var phoneTag = detectSiteTag(allData.city.allSiteInfo[0].phoneTag);   //Form tag into right form
			var advertTag = detectSiteTag(allData.city.allSiteInfo[0].advertTag);
			var encodedURItoRightForm = uriToForm(url);
			//console.log(encodedURItoRightForm);
			//console.log(decodeURIComponent(encodedURItoRightForm));
			// console.log(encodeURIComponent(url));
			// console.log(decodeURIComponent(encodeURIComponent(url)));


			def = $.ajax({url: "http://www.corsproxy.com/" + encodedURItoRightForm, async: true})
			//.done(function(data) {

				
				$.when(def).done(function(data) {
					console.log("Number of iteration = "+ i + " of " + allSitesInfoLength);
					var obj = {
						contents : data
					}
					for (var j = 0; j < $(obj.contents).find(phoneTag).length; ++j) {
						infoFromLink.phonePriceTagsInfo.push($(obj.contents).find(phoneTag)[j].innerText);			
					}
					for (var j = 0; j < $(obj.contents).find(advertTag).length; ++j) {
						infoFromLink.advertTagsInfo.push($(obj.contents).find(advertTag)[j].innerText);
						
					}	
					$("#progress").html("Обробка сторінки закінчена");
					allAdvertsInfoFromOnePage = vashMagazine(infoFromLink);
					for (var j = 0; j < allAdvertsInfoFromOnePage.length; ++j) {
						allAdvertsInfoFromOnePage[j].url = encodedURItoRightForm;
						allAdvertsInfoFromOnePage[j].urlOperType = allData.city.allSiteInfo[i].urlOperType;
						allAdvertsInfoFromOnePage[j].urlHouseType = allData.city.allSiteInfo[i].urlHouseType;
						allAdvertsInfoFromOnePage[j].urlDistrict = allData.city.allSiteInfo[i].urlDistrict;
					}
					allAdvertsFullFromCity.push(allAdvertsInfoFromOnePage);
				})

			//})
			$.when(xhr, def).done(function(fdata, sdata) {
				//console.log(fdata, sdata);
				var file = JSON.stringify(allAdvertsFullFromCity);
				var nameOfFile = 'db_' + allData.country + '_' + allData.city.cityName + '_' + 'adverts';
				var blob = new Blob([file], {type: "application/json"});
				saveAs(blob, nameOfFile + ".json"); 
			})
		}	
	})
}

function uriToForm(url) {
	return url.replace("http://","");
}

function detectSiteTag(siteTag) {         //Here I detect site tag from allSiteInfo property of City JSON
	var splitedTag = siteTag.split(" ");
	if (splitedTag[1] == "(tag)") {
		return splitedTag[0];
	} else if (splitedTag[1] == "(class)") {
		return "." + splitedTag[0];
	} else if (splitedTag[1] == "(id)") {
		return "#" + splitedTag[0];
	} else {
		console.log("Error with splited tag");
	}
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
		price,
		phone,
		advertCounter = 0,
		phonePriceCounter = 0;
		while (advertCounter < advertsLength) {
			if (infoFromLink.phonePriceTagsInfo[phonePriceCounter] != undefined) {
				// console.log("In cycle advertsLength");
				price = [];
				phone = [];
				for (var priceCounter = 0; priceCounter < 4; ++priceCounter) {
					if (infoFromLink.phonePriceTagsInfo[phonePriceCounter] != undefined) {
						price.push(infoFromLink.phonePriceTagsInfo[phonePriceCounter]);
						phonePriceCounter += 1;
					}
				}
				for (var phoneCounter = 0; phoneCounter < 2; ++phoneCounter) {
					if (infoFromLink.phonePriceTagsInfo[phonePriceCounter] != undefined) {
						if (infoFromLink.phonePriceTagsInfo[phonePriceCounter].match(phoneRegExp)) {
							phone.push(infoFromLink.phonePriceTagsInfo[phonePriceCounter]);
							phonePriceCounter += 1;
						}		
					}
				}
				allAdverts[advertCounter] = new FullAdvertObj();
				allAdverts[advertCounter].price = price;
				allAdverts[advertCounter].phone = phone;
				allAdverts[advertCounter].advert = infoFromLink.advertTagsInfo[advertCounter];
			}
			advertCounter += 1;
		}
	return allAdverts;
}


