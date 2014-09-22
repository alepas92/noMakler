$("#owner-oper-type").on("change", function() {
	if (this.selectedIndex == "1") {
		$("#owner-house-type")[0][2].selected = true;
		$(".for-rent").css("display", "none");		
	} else {
		$("#owner-house-type")[0][0].selected = true;
		$(".for-rent").css("display", "block");
	}
})