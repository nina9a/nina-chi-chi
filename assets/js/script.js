/*
	Engagement Letter Form
*/
$(document).ready( function() {

	"use strict";

//BEGIN API Handling Object
  var dataAPI = {

  	  //init()
  	  //Call this method first to populate the properties with the API information
  	  init:
  	  function() {
  	  	//... 1. Get Data
  	  	//......(store all REST API urls in an array of key/pairs
  	  	//...... key = name of table, value = REST API url )
  	  	//... 2. Parse Data
  	  	//...... (clean up data object to only contain relevant information - may be unneccessary)
  	  	//... 3. Store Data in object properties for retrieval from outside this API object
  	  	//...... (store retrieved data object as property of this object dataAPI)
  	  },

  	  //getDataObject(url)
  	  //ajax GET request to the server at var url to retrieve a table
  	  //passes the json as a javascript object to method dataAPI.parseData
	  getDataTable:
	  function(url) {
	    $.ajax({
	        type: "GET",
	        url: url,
	        dataType: "json",
	        cache: false,
	        success: dataAPI.parseData(data),
	        error: function (XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
	    });
	  },

	  parseData:
	  function(data) {
	  	//...
	  }

  }
//END API Handling Object
	
//BEGIN FUNCTION DECLARATIONS

	function styleContractYears(){
        $('.contract_datepicker').datepicker({
			changeMonth: true,			
			changeYear: true			
		});
		$('.contract_select_year').selectmenu();
	}

	function addContractYear(){
		var checked_id = $('#contract_type input:checked').attr('id');
		var fees = checked_id.indexOf('fee') > 0; //If "fee" never occurs, returns -1			  

		var contract_year = '<div class="contract_year">'; //Store HTML string in a var
		if (!fees){
			contract_year += 'Due Date: <input type="text" class="contract_datepicker" /> Fees: <input type="text" />';
		}
		else {
			contract_year += 'Year: <select class="contract_select_year" style="width:100px;"><option>2013 </option><option>2014 </option><option>2015 </option></select><br/>';
			contract_year += 'Q1 - Due Date: <input type="text" class="contract_datepicker" /> Fees: <input type="text" /><br/>';
			contract_year += 'Q2 - Due Date: <input type="text" class="contract_datepicker" /> Fees: <input type="text" /><br/>';
			contract_year += 'Q3 - Due Date: <input type="text" class="contract_datepicker" /> Fees: <input type="text" /><br/>';
			contract_year += 'Q4 - Due Date: <input type="text" class="contract_datepicker" /> Fees: <input type="text" />';
		}
		contract_year += '</div>'; 

		//Insert the html string built above to the beginning of the element #contract_add_year
		$('#contract_add_year').before(contract_year);
		//Call the function styleContractYears()
		styleContractYears();
	}

	//Inject dropdown and button for Add Appraiser button
	function addAppraiser() {
		var $breakTag = $('<br/>'),
			$appraiserBlock = $('<div>').addClass('appraiser_block'),
			$formLabel = $('<label>'),
			$selectEl = $('<select>').addClass('engagement_appraiser')
									.attr('name', 'engagement_appraiser'),
			$feeSplit = $('<button>').addClass('feesplit_info')
									 .text('View/Edit Fee Split');

		/* -- ADD DROPDOWN OPTIONS -- */
		//Construct appraiser block
		$formLabel.append(' Appraiser').prepend($selectEl);
		$appraiserBlock.append($formLabel).append($breakTag).append($feeSplit).append($breakTag);
		//Add to the DOM
		$('#add_appraiser').before($breakTag).before($appraiserBlock);
		//Style new elements
		$('.engagement_appraiser').selectmenu();
		$('.feesplit_info').button({ icons: { primary: "ui-icon-info", }});
	}

	//Inject a dropdown for Add Reviewer button
	function addReviewer() {
		var $selectEl = $('<select>').addClass('engagement_reviewer').attr('name', 'engagement_reviewer'),
			$labelEl = $('<label>').text(' Reviewer'),
			breakTag = "<br/>";

		/* -- ADD DROPDOWN OPTIONS -- */
		//Add to the DOM
		$('#add_reviewer').before(breakTag).before($selectEl).before($labelEl).before(breakTag);
		//Style new elements
		$(".engagement_reviewer").selectmenu();
	}

	//Dynamic content for View/Edit Split Fee button
	//$button: The button that triggered this function call
	function viewSplitFee($button) {
		var $container = $('<div>').addClass('view_edit_feesplit'),
			$feeInput = $('<input>').addClass('feesplit_input')
									.attr({'type' 		: 'text',
											'disabled' 	: 'true',
											'name'		: 'feeOverride' }),
			$feeLabel = $('<label>').text('Fee Split: '),
			$overrideCheckbox = $('<input>').addClass('feesplit_input_toggle')
											.attr({ 'type'	: 'checkbox',
													'name'	: 'feeOverrideToggle' }),
			$overrideLabel = $('<label>').text(' Override');

		/* -- GET FEE SPLIT VALUE -- */
		var feeValue; //var feeValue = getFeeValue();
		feeValue = feeValue || "Default Value";
		$feeInput.val(feeValue);
		//Construct View/Edit Split Fee block
		$container.append('<br/>').append($feeLabel).append($feeInput).append($overrideCheckbox).append($overrideLabel);
		//Add to the DOM
		$button.before($container).remove();
	}

	//Dynamic content for Display Client Info button
	function displayClientInfo() {
		var $container = $('<div>').attr('id', 'client_info_block');

		/* --- POPULATE WITH CLIENT INFO --- */
		$container.append('<p>Client Details:</p>');
		//Add to the DOM
		$('#client_details').before($container).remove();
	}

	//Dynamic content for Change Delivery Date button
	function changeDeliveryDate() {
		var $container = $('<div>').attr('id', 'change_delivery_block'),
			$dateLabel = $('<label>').attr('for', 'new_delivery_date').text("Updated delivery date: "),
			$dateInput = $('<input>').attr({ 'type' : 'text', 'id' : 'new_delivery_date' }),
			$noteLabel = $('<label>').attr('for', 'new_delivery_notes').text("Due Date Change notes:"),
			$noteInput = $('<textarea>').attr('id', 'new_delivery_notes');

		//Construct change delivery block
		$container.append($dateLabel).append($dateInput).append('<br/><br/>')
				  .append($noteLabel).append('<br/>').append($noteInput);
		//Add to the DOM
		$('#edit_final_date').before($container).remove();
		//Style new elements
		$('#new_delivery_date').datepicker();
	}

	//Initialize Style on all buttons
	function initStyleButtons() {
		//TOP MENU BUTTONS
		$('#letter_new').button({ icons: { primary: "ui-icon-plus", }});
		$('.letter_save').button({ icons: { primary: "ui-icon-document", }});
		$('#letter_search').button({ icons: { primary: "ui-icon-search", }});
		$('#letter_cancel').button({ icons: { primary: "ui-icon-cancel", }});

		$('#contract_type').buttonset();
		$('#contract_add_year').button({ icons: { primary: "ui-icon-circle-plus", }});

		$('#client_details').button({ icons: { primary: "ui-icon-info", }});
		$('#add_appraiser').button({ icons: { primary: "ui-icon-circle-plus", }});
		$('#add_reviewer').button({ icons: { primary: "ui-icon-circle-plus", }});
		$('#edit_final_date').button({ icons: { primary: "ui-icon-alert", }});
		$('.feesplit_info').button({ icons: { primary: "ui-icon-info", }});

		$('select').selectmenu(); //Initialize jQuery UI selectmenu on all select elements
	}

	//Initial event handlers for the buttons on the page
	function armBindings() {

		//Change Handler for Contract Type Radio Inputs
		function changeContractType(){
			if($(this).attr('id').indexOf("contract_single") >= 0)
				{ $('#contract_add_year').hide(); }
			else
				{ $('#contract_add_year').show(); }
			$('.contract_year').remove();
			addContractYear();
		}

		$('#contract_add_year').click(function(){ addContractYear(); return false;});
		$('#add_appraiser').click(function(e) { e.preventDefault(); addAppraiser(); });
		$('#add_reviewer').click(function(e) { e.preventDefault(); addReviewer(); });
		$('#client_details').click(function(e) { e.preventDefault(); displayClientInfo(); });
		$('#contract_type input').change(changeContractType);
		$('#edit_final_date').click(function(e){ e.preventDefault(); changeDeliveryDate(); });

		//Fee Split button functionality
		$('#engagement_info').on('click', '.feesplit_info', function(e) { e.preventDefault(); viewSplitFee($(this)); });
		$('#engagement_info').on('change', '.feesplit_input_toggle', function() {
			if($(this).attr('checked')) {
				$(this).prev('.feesplit_input').removeAttr('disabled');
			}
			else {
				$(this).prev('.feesplit_input').attr('disabled', 'true');
			}
		} );
	}
//FUNCTION DECLARATIONS END;
	
//BEGIN EXECUTION
	$('html').removeClass('no-js');

	//Trigger addContractYear() once on load
	addContractYear();

	initStyleButtons(); //Initialize the style of buttons
	armBindings(); //Click handlers for buttons on the page
//EXECUTION END;

//NOTES::
// @Vito: If you want to modify (add/remove/edit) the options within the custom select,
//you’ll need to modify both the custom select and the hidden select element, because the
//custom select menu needs to maintain a direct mapping to the hidden select element. It
//shouldn’t be difficult to do this though. I’d suggest destroying the custom select, doing
//whatever you need to do to the select element, and then building the custom select again.

// $(myselect) 
// .selectmenu(’destroy’) //destroy the custom select menu 
// .replaceWith(’<select>......</select>’) //rebuild the select element 
// .selectmenu(); //regenerate the custom select menu
//END NOTES::
	
});