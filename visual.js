
/*

#########################################
#					#
#		Visual			#
#					#
#########################################

*/

var sysmologyPresentTooltips = false;
var networkPresentTooltips = false;

var sysmologyShowEffects = false;
var networkShowEffects = false;

var sysmologyNodeSelected = false;
var networkNodeSelected = false;

function unSelectAll(obj){
	var selected;
	
	if(obj == 'sysmologyNode')
		selected = sysmologyNodeSelected = !sysmologyNodeSelected;
	else
		selected = networkNodeSelected = !networkNodeSelected;
	
	for (i=1, content = '#' + obj + '1'; i<=13; i++, content = '#' + obj + i)
		$(content).prop("checked", selected);
}
	
var contentShown = "#info";


function visualTweaker() {

	$('#configSysmologyPortal').portal({
		border:false,
		fit:true
	});
	$('#configNetworkPortal').portal({
		border:false,
		fit:true
	});
	$('#sysmologyViewPortal').portal({
		border:false,
		fit:true
	});
	$('#networkViewPortal').portal({
		border:false,
		fit:true
	});
	$('#viewInfoPortal').portal({
		border:false,
		fit:true
	});

	setupPortal("#network");
	setupPortal("#sysmology");

	hide('#config_network');
	hide('#config_sysmology');
	hide('#sysmology');
	hide('#network');
	show('#welcome');

}

function setupPortal(portal) {

	//vir cá fora buscar o valor - doesn't matter which portal it is as they are equal!
	var width = $(networkViewPortal).width() - 20;
	var height = $(networkViewPortal).height();

	var counter;
	var tmp;

	var aux = portal + "PanelNode";

	for (counter = 1; counter <= 13; counter++){
		tmp = aux + counter;
		$(tmp).width(width);
		$(tmp).height(height*0.9);

	}

	aux = portal + "GraphNode";

	for (counter = 1; counter <= 13; counter++){
		tmp = aux + counter;
		$(tmp).width(width);
		$(tmp).height(height*0.8);

	}
	
	$(portal + "ViewPortal").portal('resize');

}


function hide(obj){
	$(obj).hide();
}

function show(obj){
	if(contentShown != obj){
		hide(contentShown);
		$(obj).show("slide");

		contentShown = obj;

		if(contentShown == '#sysmology'){
			
			sysmologyPresentTooltips = $("#sysmologyPresentTooltips").is(':checked');
			sysmologyShowEffects = $("#sysmologyShowEffects").is(':checked');
		
			for (counter = 1, content = '#sysmologyNode1'; counter <= 13; counter++, content = '#sysmologyNode' + counter){
				if ($(content).is(':checked')){
					$('#sysmologyPanelNode' + counter).removeAttr("display");
					drawSysmology(counter);
				}
				else
					$('#sysmologyPanelNode' + counter).css("display", "none");
			}
		}
		else if(contentShown == '#network'){

			networkPresentTooltips = $("#networkPresentTooltips").is(':checked');
			networkShowEffects = $("#networkShowEffects").is(':checked');
		
			for (counter = 1, content = '#networkNode1'; counter <= 13; counter++, content = '#networkNode' + counter){
				if ($(content).is(':checked')){
					$('#networkPanelNode' + counter).css("display", "block");
					drawNetwork(counter);
				}
				else
					$('#networkPanelNode' + counter).css("display", "none");
			}
		}
	}
}



//spinner stuff

var spinner;

var spinnerOptions = {
	lines: 13, // The number of lines to draw
	length: 8, // The length of each line
	width: 4, // The line thickness
	radius: 20, // The radius of the inner circle
	rotate: 0, // The rotation offset
	color: '#000', // #rgb or #rrggbb
	speed: 1, // Rounds per second
	trail: 60, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: false, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 'auto', // The z-index (defaults to 2000000000)
	top: 'auto', // Top position relative to parent in px
	left: 'auto' // Left position relative to parent in px
};

function startSpinner(){
	spinner = new Spinner(spinnerOptions).spin(document.getElementById('content'));
}

function stopSpinner(){
	spinner.stop(document.getElementById('content'));
}

