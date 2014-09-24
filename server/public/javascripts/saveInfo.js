var all_data = {
	"k1" : "v1",
	"k2" : "v2"
};

function exportFromJSON () {
	var file = JSON.stringify(all_data);
	var filemane = 'data';
	console.log("Second log: " + file + "<-------------");
	var blob = new Blob([file], {type: "application/json"});
	saveAs(blob, "db" + filemane + ".json");

	// $.getJSON("./user_quizes/"+filemane, function(json) {
	//     console.log(json); 
	//     generateQuiz(filemane.split('.')[0], json);
	// });    
}

exportFromJSON();