$(window).resize(function(){
  if ($(window).width() < 1024) {
  	$("div#gl-container").addClass("container-fluid");
  	$("div#gl-container").removeClass("container");
  } else {
  	$("div#gl-container").addClass("container");
  	$("div#gl-container").removeClass("container-fluid");
  }

  if($(window).width() < 500) {
  	$("#rslides").css("display", "none");
  } else {
  	$("#rslides").css("display", "block");
  }
});

