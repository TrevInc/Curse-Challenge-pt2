var TREE_LENGTH = 4;
var NUM_TREES   = 2;

var pointsSpent = 0;
var maxPoints   = 6;
var buttonClasses = ["unavailable", "available", "full"];

// First array is tree element names
// Second array is active state of tree elements

var tree_names = [
	"#tree-1-1","#tree-1-2","#tree-1-3","#tree-1-4",
	"#tree-2-1","#tree-2-2","#tree-2-3","#tree-2-4"
];

// Only used to initialize
var tree_active = [
	"available","unavailable","unavailable","unavailable",
	"available","unavailable","unavailable","unavailable"
];

function drawTrees() {

    $("#points-spent").text(pointsSpent);
    $("#max-points").text(maxPoints);
	
	for (var i = 0; i < NUM_TREES; i++) {
		for (var j = 0; j < TREE_LENGTH; j++) {
			var bgPos = $(tree_names[(i*TREE_LENGTH)+j]).css('backgroundPosition').split(" ");
				if ($(tree_names[(i*TREE_LENGTH)+j]).hasClass("full")) {
				$(tree_names[(i*TREE_LENGTH)+j]).css("background-position",bgPos[0] + " 0px");
				$(tree_names[(i*TREE_LENGTH)+j]).css("border-color","#8899CC");
				$(tree_names[(i*TREE_LENGTH)+j]).css("box-shadow","0px 0px 5px #8899CC");
			} else if ($(tree_names[(i*TREE_LENGTH)+j]).hasClass("available")) {
				$(tree_names[(i*TREE_LENGTH)+j]).css("background-position",bgPos[0] + " -50px");
				$(tree_names[(i*TREE_LENGTH)+j]).css("border-color","#777777");
				$(tree_names[(i*TREE_LENGTH)+j]).css("box-shadow","0px 0px 0px #8899CC");
			} else {
				$(tree_names[(i*TREE_LENGTH)+j]).css("background-position",bgPos[0] + " -50px");
				$(tree_names[(i*TREE_LENGTH)+j]).css("border-color","#444444");
				$(tree_names[(i*TREE_LENGTH)+j]).css("box-shadow","0px 0px 0px #8899CC");
			}
		}
	}

};

$(function(){
	document.oncontextmenu = function() {return false;};
	for (var i = 0; i < NUM_TREES; i++) {
		for (var j = 0; j < TREE_LENGTH; j++) {
			$(tree_names[(i*TREE_LENGTH)+j]).removeClass();
			$(tree_names[(i*TREE_LENGTH)+j]).addClass("ts-calc-button");
			$(tree_names[(i*TREE_LENGTH)+j]).addClass(tree_active[(i*TREE_LENGTH)+j]);
		}
	}
	
	drawTrees();

	for (var i = 0; i < NUM_TREES; i++) {
		for (var j = 0; j < TREE_LENGTH; j++) {

		$(tree_names[(i*TREE_LENGTH)+j]).click(function(){
				//process left click
				if( ($(this).hasClass("available")) && (pointsSpent < maxPoints)){
					pointsSpent++;
					$(this).removeClass();
					$(this).addClass("ts-calc-button");
					$(this).addClass("full");
					
					var thisOne = tree_names.indexOf("#" + $(this).attr('id'));
					console.log("thisOne is " + thisOne);
					var nextOne = thisOne + 1;

					if ((nextOne % TREE_LENGTH) != 0){
						$(tree_names[nextOne]).removeClass();
						$(tree_names[nextOne]).addClass("ts-calc-button");
						$(tree_names[nextOne]).addClass("available");
					}
				}
				drawTrees();
		});

		$(tree_names[(i*TREE_LENGTH)+j]).mousedown(function(e){ 

			if( e.button == 2 ) { 
					if( ($(this).hasClass("full")) ) {

						var thisOne = tree_names.indexOf("#" + $(this).attr('id'));
						console.log("thisOne is " + thisOne);
						var nextOne = thisOne + 1;

						if  ( 
							( !( $(tree_names[nextOne]).hasClass("full") ) ) || 
							     ((nextOne % TREE_LENGTH) == 0) 
							){

							pointsSpent--;
							$(this).removeClass();
							$(this).addClass("ts-calc-button");
							$(this).addClass("available");

							if ((nextOne % TREE_LENGTH) != 0) { 
								$(tree_names[nextOne]).removeClass();
								$(tree_names[nextOne]).addClass("ts-calc-button");
								$(tree_names[nextOne]).addClass("unavailable");
							}
						}


					}
					drawTrees();	
				} 
		});

		}
	}
	
});