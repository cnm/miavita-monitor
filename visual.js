
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


$(function(){
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
});

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

function collapsePanel(panel){
	$(panel).panel('collapse'); //'#coco'
}

function remove(){
	$('#sysmologyViewPortal').portal('remove',$('#coco'));
	$('#sysmologyViewPortal').portal('resize');
}
		
function add(portal, node){

//vir cá fora buscar o valor - doesn't matter which portal it is as they are equal!
	var width = $(networkViewPortal).width() - 20;
	var height = $(networkViewPortal).height();

	var p = $('<div/>').appendTo('body');
	if(contentShown == "#network")
		p.panel({
			title: 'Node ' + node,
			content:'<div id=networkPanelNode' + node + ' style="padding:10px;"><canvas id="networkGraphNode' + node + '" width="' + width + '" height="' + (height*0.8) +'">[No canvas support]</canvas><br/></div>',
			height:(height*0.9),
			closable:false,
			collapsible:true
		});
	else
		p.panel({
			title: 'Node ' + node,
			content:'<div id=sysmologyPanelNode' + node + ' style="padding:10px;"><div id="sysmologyGraphNode' + node + '" width="' + width + '" height="' + (height*0.8) +'">[No canvas support]</div><br/></div>',
			height:(height*0.9),
			closable:false,
			collapsible:true
		});
			
	$(portal).portal('add', {
		panel:p,
		columnIndex:0
	});

	$(portal).portal('resize');
}
		
function helper(){

	//for (j = 1, content = contentShown + 'GraphNode1'; j <= 13; j++, content = contentShown + 'GraphNode' + j){
	//	remove(contentShown + 'ViewPortal', content);
	//}
	
	for (i = 1, content = contentShown + 'Node1'; i <= 13; i++, content = contentShown + 'Node' + i){
		if ($(content).is(':checked')) {
			add(contentShown + "ViewPortal", i);
		}
	}

	sysmologyPresentTooltips = $("#sysmologyPresentTooltips").is(':checked');
	networkPresentTooltips = $("#networkPresentTooltips").is(':checked');

	sysmologyShowEffects = $("#sysmologyShowEffects").is(':checked');
	networkShowEffects = $("#networkShowEffects").is(':checked');

	for (counter = 1, content = contentShown + 'Node1'; counter <= 13; counter++, content = contentShown + 'Node' + counter){
		if ($(content).is(':checked')) {
			if(contentShown == "#network")
				draw(counter);
			else
				drawSysmology(counter);
		}
	}
}




function hide(obj){
	$(obj).hide();
}

function show(obj){
	if(contentShown != obj){
		hide(contentShown);
		$(obj).show("slide");

		contentShown = obj;

		if(contentShown == "#network" || contentShown == "#sysmology")
			helper();
	}
}



//spinner stuff

var spinner;

var opts = {
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
	spinner = new Spinner(opts).spin(document.getElementById('content'));
}

function stopSpinner(){
	$('#welcome').removeAttr('style');
	spinner.stop(document.getElementById('content'));
}

