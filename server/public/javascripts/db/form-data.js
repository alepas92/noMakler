$("#add-site").on("click", function() {
	var siteURL = $("#site-url").val();
	var phoneTag = $("#phone-tag").val();
	var advertTag = $("#advert-tag").val();
	console.log(siteURL, phoneTag, advertTag);
	document.getElementById("sites-info").innerHTML += "<span class='s-siteURL'>" + siteURL + "</span> "
								+ "<span class='s-phoneTag'>" + phoneTag + "</span> " 
								+ "<span class='s-advertTag'>"+ advertTag + "</span><br>";
	$("#site-url").val('');
});

function getGlobalData() {
	var country = $("#country-selector option:selected").text();
	var city = $("#city").text();
	var cityDistricts = $("city-district").text();
		cityDistricts = cityDistricts.split(", ");
	var phoneClass = $("#phone-class").text();
	var allSiteUrls = $("div").find(".s-siteURL");
	var allSitePhoneTags = $("div").find(".s-phoneTag");
	var allSiteAdvertTags = $("div").find(".s-advertTag");
	var allSiteInfo = [];
	for (var i = 0; i < allSiteUrls.length; i++) {
		var url = $(allSiteUrls[i]).text();
		var phTag = $(allSitePhoneTags[i]).text();
		var advTag = $(allSiteAdvertTags[i]).text();
		allSiteInfo[i] = new InfAbSite(url, phTag, advTag);
		console.log(allSiteInfo[i]);
	}

}

function InfAbSite(siteUrl, phoneTag, advertTag) {
	this.siteUrl = siteUrl,
	this.phoneTag = phoneTag,
	this.advertTag = advertTag
};