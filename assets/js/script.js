/*
	Engagement Letter Form
*/
$(document).ready( function() {

	"use strict";

//BEGIN API Handling Object
  var dataAPI = {

  	  //getDataObject(url)
  	  //ajax GET request to the server at var url to retrieve a table
  	  //passes the json as a javascript object to method dataAPI.parseData
	  getDataTable:
	  function(url) {
	    // $.ajax({
	    //     type: "GET",
	    //     url: url,
	    //     dataType: "json",
	    //     cache: false,
	    //     success: function(data) { return data; },
	    //     error: function (XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
	    // });

		//Dev switch to return api objects
		switch (url) {
			case "officelocations" :
				return {"count": 4, "next": null, "previous": null, "results": [{"url": "http://127.0.0.1:8000/NPVClarity/officelocations/9/", "office_location": "Atlanta"}, {"url": "http://127.0.0.1:8000/NPVClarity/officelocations/10/", "office_location": "Chicago"}, {"url": "http://127.0.0.1:8000/NPVClarity/officelocations/11/", "office_location": "Los Angeles"}, {"url": "http://127.0.0.1:8000/NPVClarity/officelocations/12/", "office_location": "Newport Beach"}]};
				break;
			case "projectmanagers" :
				return {"count": 4, "next": null, "previous": null, "results": [{"url": "http://127.0.0.1:8000/NPVClarity/projectmanagers/9/", "last_name": "Walden", "first_name": "David"}, {"url": "http://127.0.0.1:8000/NPVClarity/projectmanagers/10/", "last_name": "Strohl", "first_name": "Keith"}, {"url": "http://127.0.0.1:8000/NPVClarity/projectmanagers/11/", "last_name": "Carr", "first_name": "Becky"}, {"url": "http://127.0.0.1:8000/NPVClarity/projectmanagers/12/", "last_name": "Wrzesinski", "first_name": "John"}]};
				break;
			case "appraisers" :
				return {"count": 2, "next": null, "previous": null, "results": [{"url": "http://127.0.0.1:8000/NPVClarity/appraisers/7/", "last_name": "Thatcher", "first_name": "Heidi", "title": "Principal", "standard_fee_split": 0.475, "subject_to_director_overirde": false, "overide": 0.0, "annual_salary": "134000.0000", "address_1": null, "address_2": null, "city": null, "state": null, "zip_code": null, "phone_1": null, "phone_2": null, "mobile_phone": null, "email_address": null, "expense_password": "1q2w3e4r"}, {"url": "http://127.0.0.1:8000/NPVClarity/appraisers/8/", "last_name": "Gathman", "first_name": "Mike", "title": "Director", "standard_fee_split": 0.5, "subject_to_director_overirde": false, "overide": 0.0, "annual_salary": "100000.0000", "address_1": null, "address_2": null, "city": null, "state": null, "zip_code": null, "phone_1": null, "phone_2": null, "mobile_phone": null, "email_address": null, "expense_password": "iggy2004"}]};
				break;
		}
	  },

	  //parseData(data, resultField)
	  //url = REST API url
	  //dataName = name of object
	  //results = array of fields needed from the results array
	  parseData:
	  function(url, dataName, results) {

	  	var dataObj = this.getDataTable(url); //Get the API return object
	  	var data = { count : dataObj.count }; //Initialize return data object
	  	this[dataName + "_Orig"] = dataObj;   //Store local instance of original API return object

	  	//initialize data result fields
	  	for (var i = 0; i < results.length; i++) {
	  		data[results[i]] = [];
	  		//populate data result fields
	  		for (var j = 0; j < dataObj.count; j++) {
	  			data[results[i]].push(dataObj.results[j][results[i]]);
	  		}
	  	}

	  	return data;
	  },

	  //return data object with results of office_location REST call
	  getOfficeLocations:
	  function() {
	  	var officelocations_result = this.parseData("officelocations", "officelocations", ['office_location']);
	  	return officelocations_result;
	  },

	  getProjectManagers:
	  function() {
	  	var projectmanagers_result = this.parseData('projectmanagers', 'projectmanagers', ['first_name', 'last_name']);
	  	return projectmanagers_result;
	  },

	  getAppraisers:
	  function() {
	  	var appraisers_result = this.parseData('appraisers', 'appraisers', ['first_name', 'last_name']);
	  	return appraisers_result;
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
		//populateSelectMenus.appraisers(); //??????

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

	//populateSelectMenus();
	//Set the contents of the select menus
	function populateSelectMenus() {

		//getFunc = function that returns the appropriate data (ie: dataAPI.getOfficeLocations...)
		//elSelector = select menu selector (as string)
		//stringsInOrder = array of strings indicating the property names to concatenate into the select menu
		function appendToSelect(getFunc, elSelector, stringsInOrder) {
			var data = getFunc.call(dataAPI),
				numProperties = stringsInOrder.length,
				$selectMenu = $(elSelector);
			$selectMenu = $($selectMenu.get($selectMenu.length-1)); //Get last instance of the select menu

			//Append options to select menu
			for (var i = 0; i < data.count; i++) {
				if (numProperties == 1) {  //Single property append
					$selectMenu.append("<option>" + data[stringsInOrder[0]][i] + "</option>");
				}
				else if (numProperties == 2) {  //Double property append (ie: first_name + last_name)
					$selectMenu.append("<option>" + data[stringsInOrder[0]][i] + " " + data[stringsInOrder[1]][i] + '</option>');
				}
			}
		}

		function appraisers() {
			var data = dataAPI.getAppraisers(),
				$selectMenu = $('.engagement_appraiser');
				$selectMenu = $($selectMenu.get($selectMenu.length-1));
			for (var i = 0; i < data.count; i++) {
				$selectMenu.append("<option>" + data['first_name'][i] + " " + data['last_name'][i] + '</option>');
			}
		}

		function reviewers() {
			var data = dataAPI.getAppraisers(),
				$selectMenu = $('.engagement_reviewer');
				$selectMenu = $($selectMenu.get($selectMenu.length-1));
			for (var i = 0; i < data.count; i++) {
				$selectMenu.append("<option>" + data['first_name'][i] + " " + data['last_name'][i] + '</option>');
			}
		}

		//begin populateSelectMenus execution
		appendToSelect(dataAPI.getOfficeLocations, '#engagement_office', ['office_location']); //append options to #engagement_office
		appendToSelect(dataAPI.getProjectManagers, '#engagement_manager', ['first_name', 'last_name']); //append options to #engagement_manager
		appraisers();
		reviewers();
	}
//FUNCTION DECLARATIONS END;
	
//BEGIN EXECUTION
	$('html').removeClass('no-js');

	//Trigger addContractYear() once on load
	addContractYear();

	populateSelectMenus();

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