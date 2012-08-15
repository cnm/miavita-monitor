
/*		Visual
*
*	    Duarte Barbosa
*	duarte.barbosa@ist.utl.pt
*/
	
var contentShown = "#info";

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
				removePanel('#sysmologyPanelNode' + counter);
				if ($(content).is(':checked')){
					addPanel(counter);
					drawSysmology(counter);
				}
			}
		}
		else if(contentShown == '#network'){
			networkPresentTooltips = $("#networkPresentTooltips").is(':checked');
			networkShowEffects = $("#networkShowEffects").is(':checked');
		
			for (counter = 1, content = '#networkNode1'; counter <= 13; counter++, content = '#networkNode' + counter){
				removePanel('#networkPanelNode' + counter);
				if ($(content).is(':checked')){
					addPanel(counter);
					drawNetwork(counter);
				}
			}
		}
	}
}

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

	hide('#config_network');
	hide('#config_sysmology');
	hide('#sysmology');
	hide('#network');
	show('#welcome');

}

// panel stuff

function collapsePanel(panel){
	$(panel).panel('collapse');
}

function removePanel(panel){
	$(contentShown + 'ViewPortal').portal('remove', $(panel));
	$(contentShown + 'ViewPortal').portal('resize');
}
		
function addPanel(node){

	//vir cá fora buscar o valor - doesn't matter which portal it is as they are equal!
	var width = $(networkViewPortal).width() - 20;
	var height = $(networkViewPortal).height();
	
	var p = $('<div/>').appendTo('body');
	if(contentShown == "#sysmology")
		p.panel({
			id: 'sysmologyPanelNode' + node,
			title: 'Node ' + node,
			content:'<div id="sysmologyGraphNode' + node + '" width="' + (width - 20) + '" height="' + (height*0.8) +'">[Something wrong regarding Highcharts lib]</div><br/>',
			height:(height*0.9),
			closable:false,
			collapsible:true,
			style: 'padding:10px'
		});
	else
		p.panel({
			id: 'networkPanelNode' + node,
			title: 'Node ' + node,
			content:'<canvas id="networkGraphNode' + node + '" width="' + (width - 20) + '" height="' + (height*0.8) +'">[No canvas support]</canvas><br/>',
			height:(height*0.9),
			closable:false,
			collapsible:true,
			style: 'padding:10px'
		});
			
	$(contentShown + 'ViewPortal').portal('add', {
		panel:p,
		columnIndex:0
	});

	$(contentShown + 'ViewPortal').portal('resize');
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

