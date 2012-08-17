
/*		Date
*
*	    Duarte Barbosa
*	duarte.barbosa@ist.utl.pt
*/

var maximumDate = 0;
var minimumDate = 0;
	
function retrieveDates(){
	var i = 1, maxtmp = 0, mintmp = 0;

	//falta verificar para undefined etc JAVASCRIPT SUCKS
/*
	for(; i <= 13; i++){
		maxtmp = retrieveData(i, Parameter.timestamp).max();
		if(maxtmp > maximumDate)
			maximumDate = maxtmp;
	}

	for(i = 1; i <= 13; i++){
		mintmp = retrieveData(i, Parameter.timestamp).min();
		if(mintmp < minimumDate)
			minimumDate = mintmp;
	}
*/
//	minimumDate = new Date(1342928632);
//	maximumDate = new Date(); //*1000 esta em milis

	$('#sysfrom').datetimepicker();/*{
	    minDate: minimumDate,
	    maxDate: maximumDate,
	    timeFormat: 'h:m',
	    separator: ' @ ',
	    dateFormat: "dd-mm-yy",
	    onClose: function(dateText, inst) {
			var endDateTextBox = $('#systo');
			if (endDateTextBox.val() != '') {
			    var testStartDate = new Date(dateText);
			    var testEndDate = new Date(endDateTextBox.val());
			    if (testStartDate > testEndDate)
				endDateTextBox.val(dateText);
			}
			else {
			    endDateTextBox.val(dateText);
			}
		    },
	    onSelect: function (selectedDateTime){
			var start = $(this).datetimepicker('getDate');
			$('#systo').datetimepicker('option', 'minDate', new Date(start.getTime()));
		    }
	});
*/
	$('#systo').datetimepicker(); /*{
	    minDate: minimumDate,
	    maxDate: maximumDate,
	    timeFormat: 'h:m',
	    separator: ' @ ',
	    dateFormat: "dd-mm-yy",
	    onClose: function(dateText, inst) {
		var startDateTextBox = $('#sysfrom');
		if (startDateTextBox.val() != '') {
		    var testStartDate = new Date(startDateTextBox.val());
		    var testEndDate = new Date(dateText);
		    if (testStartDate > testEndDate)
		        startDateTextBox.val(dateText);
		}
		else {
		    startDateTextBox.val(dateText);
		}
	    },
	    onSelect: function (selectedDateTime){
		var end = $(this).datetimepicker('getDate');
		$('#sysfrom').datetimepicker('option', 'maxDate', new Date(end.getTime()) );
	    }
	});*/

//	$( "#netfrom" ).datepicker( "option", "minDate", minimumDate );
//	$( "#netto" ).datepicker( "option", "maxDate", maximumDate );
}

$(function() {
	var dates = $( "#netfrom, #netto" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1,
		dateFormat: "dd-mm-yy",
		onSelect: 
			function( selectedDate ) {
				var option = this.id == "netfrom" ? "minDate" : "maxDate",
					instance = $( this ).data( "datepicker" ),
					date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings );

				dates.not( this ).datepicker( "option", option, date );
			}
	});
});

