
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

		if(contentShown == '#sys'){
			sysPresentTooltips = $('#sysPresentTooltips').is(':checked');
			sysShowEffects = $('#sysShowEffects').is(':checked');
		
			for (counter = 1, content = '#sysNode1'; counter <= 13; counter++, content = '#sysNode' + counter){
				removePanel('#sysPanelNode' + counter);
				if ($(content).is(':checked')){
					addPanel(counter);
					drawsys(counter);
				}
			}
		}
		else if(contentShown == '#net'){
			netPresentTooltips = $('#netPresentTooltips').is(':checked');
			netShowEffects = $('#netShowEffects').is(':checked');
		
			for (counter = 1, content = '#netNode1'; counter <= 13; counter++, content = '#netNode' + counter){
				removePanel('#netPanelNode' + counter);
				if ($(content).is(':checked')){
					addPanel(counter);
					drawNetwork(counter);
				}
			}
		}
	}
}

function visualTweaker() {

	$('#configsysPortal').portal({
		border:false,
		fit:true
	});
	$('#configNetworkPortal').portal({
		border:false,
		fit:true
	});
	$('#sysViewPortal').portal({
		border:false,
		fit:true
	});
	$('#netViewPortal').portal({
		border:false,
		fit:true
	});
	$('#viewInfoPortal').portal({
		border:false,
		fit:true
	});

	hide('#config_net');
	hide('#config_sys');
	hide('#sys');
	hide('#net');
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
	var width = $(netViewPortal).width() - 20;
	var height = $(netViewPortal).height();
	
	var p = $('<div/>').appendTo('body');
	if(contentShown == "#sys")
		p.panel({
			id: 'sysPanelNode' + node,
			title: 'Node ' + node,
			content:'<div id="sysGraphNode' + node + '" width="' + (width - 20) + '" height="' + (height*0.8) +'">[Something wrong regarding Highcharts lib]</div><br/>',
			height:(height*0.9),
			closable:false,
			collapsible:true
		});
	else
		p.panel({
			id: 'netPanelNode' + node,
			title: 'Node ' + node,
			content:'<canvas id="netGraphNode' + node + '" width="' + (width - 20) + '" height="' + (height*0.8) +'">[No canvas support]</canvas><br/>',
			height:(height*0.9),
			closable:false,
			collapsible:true
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

//realtime checkbox
function disableTime(time){
	if ($(time + 'RT').is(':checked')){
		$(time + 'from').attr('disabled', true);
		$(time + 'to').attr('disabled', true);
	}
	else {
		$(time + 'from').removeAttr('disabled');
		$(time + 'to').removeAttr('disabled');
	}
}

