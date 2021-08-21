YAHOO.namespace("example.container");

var persProbCnt=0;
var famProbCnt=0;

function init()
{
	EmulateInsertAdjacentHTML();
	
	YAHOO.example.container.manager = new YAHOO.widget.OverlayManager();

	// Need yui-skin-sam class on the body element for modal overlay to work.
	YAHOO.util.Dom.addClass(document.body, "yui-skin-sam"); 

	//var myLogReader = new YAHOO.widget.LogReader();
	//myLogReader.show();

	initPersonalProblemPopup();
	initFamilyHistoryPopup();
	initCalendarPopup();

	init_showhide();
}

function EmulateInsertAdjacentHTML()
{
// insertAdjacentHTML(), insertAdjacentText() and insertAdjacentElement() are microsoft specific commands
// They are not supported by Firefox.  This snippet has been taken from http://www.faqts.com/knowledge_base/view.phtml/aid/5756

// insertAdjacentHTML(), insertAdjacentText() and insertAdjacentElement()
// for Netscape 6/Mozilla by Thor Larholm me@jscript.dk
// Usage: include this code segment at the beginning of your document
// before any other Javascript contents.

	if(typeof HTMLElement!="undefined" && ! HTMLElement.prototype.insertAdjacentElement)
	{
		HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode)
		{
			switch (where){
			case 'beforeBegin':
				this.parentNode.insertBefore(parsedNode,this)
				break;
			case 'afterBegin':
				this.insertBefore(parsedNode,this.firstChild);
				break;
			case 'beforeEnd':
				this.appendChild(parsedNode);
				break;
			case 'afterEnd':
				if (this.nextSibling) 
					this.parentNode.insertBefore(parsedNode,this.nextSibling);
				else this.parentNode.appendChild(parsedNode);
				break;
			}
		}

		HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr)
		{
			var r = this.ownerDocument.createRange();
			r.setStartBefore(this);
			var parsedHTML = r.createContextualFragment(htmlStr);
			this.insertAdjacentElement(where,parsedHTML)
		}


		HTMLElement.prototype.insertAdjacentText = function(where,txtStr)
		{
			var parsedText = document.createTextNode(txtStr)
			this.insertAdjacentElement(where,parsedText)
		}
	}
}

function RefreshPersonalProblemBubbles()
{
	var elts    =  YAHOO.util.Selector.query('#pr_list img'); 
	var resElts =  YAHOO.util.Selector.query('#pr_results div'); 
	var chkIDs  = "";


	// Concatenate all the selected problemchecklistIDs into a string for fast search below.
	for( i in resElts) 
	{
		var id = resElts[i].id + "_chkid";         // e.g. "pr_#5_chkid"
		var prElt = document.getElementById(id);
		if (prElt)
		{
			chkIDs += "+"+prElt.value;
		}

		// retrieve the personal problem count by processing the div's id.
		var cnt = 1+parseInt(resElts[i].id.replace("pr_#",""));
		persProbCnt = (persProbCnt<cnt) ? cnt : persProbCnt;
	}
	chkIDs += "+";
	//alert ("persProbCnt: "+persProbCnt+"    "+chkIDs);

	// Iterate thru all the entries in the bubble form.
	for( i in elts)
	{
		// Determine if the entrie is already selected by looking for the title(problemchecklistID) in our concatenated list.
		var prob_id  = elts[i].parentNode.title;
		var selected =  (chkIDs.indexOf("+"+prob_id+"+")>=0);

		if (selected)
		{
			elts[i].src = "Resources/images/bubble-filled.gif";
			elts[i].className = "selected";
			elts[i].alt = "Bubble Filled";
		}
		else
		{
			elts[i].src = "Resources/images/bubble.gif";
			elts[i].className = "";
			elts[i].alt = "Bubble";
		}
	}

}

function RefreshFamilyHistoryBubbles()
{
	var elts =  YAHOO.util.Selector.query('#fh_list img'); 
	var resElts =  YAHOO.util.Selector.query('#fh_results div'); 
	var chkIDs  = "";

	// Concatenate all the selected problemchecklistIDs into a string for fast search below.
	for( i in resElts) 
	{
		var id = resElts[i].id + "_chkid";         // e.g. "fh_#5_chkid"
		var prElt = document.getElementById(id);
		if (prElt)
		{
			chkIDs += "+"+prElt.value;
		}

		// retrieve the family problem count by processing the div's id.
		var cnt = 1+parseInt(resElts[i].id.replace("fh_#",""));
		famProbCnt = (famProbCnt<cnt) ? cnt : famProbCnt;
	}
	chkIDs += "+";
	//alert ("famProbCnt: "+famProbCnt+"    "+chkIDs);

	// Iterate thru all the entries in the bubble form.
	for( i in elts)
	{
		// Determine if the entrie is already selected by looking for the title(problemchecklistID) in our concatenated list.
		var prob_id  = elts[i].parentNode.title;
		var selected =  (chkIDs.indexOf("+"+prob_id+"+")>=0);

		if (selected)
		{
			elts[i].src = "Resources/images/bubble-filled.gif";
			elts[i].className = "selected";
			elts[i].alt = "Bubble Filled";
		}
		else
		{
			elts[i].src = "Resources/images/bubble.gif";
			elts[i].className = "";
			elts[i].alt = "Bubble";
		}
	}

}

function handleProblemEdit(dvID) {
	var dv=document.getElementById(dvID);
	var p=YAHOO.example.container.dlgPersonalProblem;

	document.getElementById("prd_id").value=dv.id;
	
	var n = dv.childNodes.length;
	for (var k=0;k<n;k++)
	{
		var e = dv.childNodes[k];

		// Use regular expressions to match our hidden input names with specific dialog fields
		if (/pr_.*_chkid/.test(e.name))
			document.getElementById("prd_chkid").value=e.value;
		else if (/pr_.*_prob/.test(e.name))
		{
			document.getElementById("prd_problem").value=e.value;
			document.getElementById("prd_label").innerHTML=e.value;
		}
		else if (/pr_.*_date/.test(e.name))
			document.getElementById("prd_onset_date").value=e.value;
		else if (/pr_.*_age/.test(e.name))
			document.getElementById("prd_onset_age").value=e.value;
		else if (/pr_.*_comment/.test(e.name))
			document.getElementById("prd_comment").value=e.value;
	}

	p.show();

	//Cancel the navigation, otherwise the window will scroll to top.
	return false;
};

function handleProblemDelete (dvID) {
    var dv=document.getElementById(dvID);
    dv.parentNode.removeChild(dv);

	RefreshPersonalProblemBubbles();

    //Cancel the navigation, otherwise the window will scroll to top.
	return false;
};

function quoteAttr(s)
{
	return s.replace("'","&#39;");
};

function initPersonalProblemPopup() {    


	// Define various event handlers for Dialog
	var addPersonalProblem = function() {
		var data = this.getData();
		
		// if ((data.prd_onset_date == "") && (data.prd_onset_age == "")) {
		//	alert("Please enter either an approximate onset date or an approximate onset age.");
		//	return false;
		// }
		
		var id = "pr_#"+persProbCnt;
		var response = "<div id='"+id+"'>";
		response += "<span style='float:right'><a href='#' onclick=\"return handleProblemEdit('"+id+"');\">edit</a>&#160; ";
		response += "<a href='#' onclick=\"return handleProblemDelete('"+id+"');\">delete</a></span>";
		response += "<input type='text' style='display:none' name='"+id+"_chkid' id='"+id+"_chkid' value='"+quoteAttr(data.prd_chkid)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_prob' value='"+quoteAttr(data.prd_problem)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_date' value='"+quoteAttr(data.prd_onset_date)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_age' value='"+quoteAttr(data.prd_onset_age)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_comment' value='"+quoteAttr(data.prd_comment)+"' />";

		response += "<b>" + data.prd_problem + ":</b>";
		if (data.prd_onset_age != "")
		   response += " @" + data.prd_onset_age;
		if (data.prd_onset_date != "")
		   response += " " +data.prd_onset_date; 
		if (data.prd_comment != "")
		   response += ", " + data.prd_comment;
		response += "</div>";

		var oldElt;
		if (!(data.prd_id==""))
			oldElt = document.getElementById(data.prd_id);

		if (!oldElt)
		{
			// insert new problem
			document.getElementById("pr_results").insertAdjacentHTML( "beforeEnd", response );
		}
		else
		{
			// replace old problem
			oldElt.insertAdjacentHTML( "afterEnd", response );
			oldElt.parentNode.removeChild(oldElt);
		}
		
		persProbCnt++;

		RefreshPersonalProblemBubbles();

		this.cancel();
	};
		
	var handleCancel = function() {
		this.cancel();
	};
	
	var clickHandler = function(evt) {
		//get the resolved (non-text node) target:
		var elTarget = YAHOO.util.Event.getTarget(evt);	
		//walk up the DOM tree looking for an <li> in the target's ancestry; desist when you reach the container div
		while (elTarget.id != "pr_list") {
			if(elTarget.nodeName.toUpperCase() == "A") {
				// Change the bubble img to filled-in.
				//elTarget.firstChild.src = "Resources/images/bubble-filled.gif";
				//elTarget.className = "selected";

				// Use innerHTML since innerText is not supported by Firefox. lastChild is a SPAN
				var lbl = elTarget.lastChild.innerHTML;
				document.getElementById("prd_id").value = "";
				document.getElementById("prd_chkid").value = elTarget.title;  // This is the ProblemChecklistID
				document.getElementById("prd_problem").value = lbl;
				document.getElementById("prd_label").innerHTML = lbl;
				document.getElementById("prd_onset_date").value = "";
				document.getElementById("prd_onset_age").value  = "";
				document.getElementById("prd_comment").value = "";

				YAHOO.example.container.dlgPersonalProblem.show();
				break;
			} else {
				//wasn't the container, but wasn't an li; so let's step up the DOM and keep looking:
				elTarget = elTarget.parentNode;
			}
		}

		//Cancel the navigation, otherwise the window will scroll to top.
		YAHOO.util.Event.preventDefault(evt);    // return false works in IE, but in other browsers need this
		return false;
	}

    // Instantiate the Dialog
    YAHOO.example.container.dlgPersonalProblem = new YAHOO.widget.Dialog("dlgPersonalProblem", 
    { width : "30em", modal : true, fixedcenter : true, draggable:false, visible : false, close : false, constraintoviewport : true,
      buttons : [ { text:"Add", handler:addPersonalProblem, isDefault:true }, { text:"Cancel", handler:handleCancel } ]
    });
 
    YAHOO.example.container.dlgPersonalProblem.setHeader("Please enter problem details");
    YAHOO.example.container.dlgPersonalProblem.setBody(
    '<form id="frmPersonalProblem" method="POST" action="assets/post.php" aria-hidden="true">'+
    '	<p id="prd_label" style="font-weight:bold;color:#0033cc">xyz</p>'+
    '	<input type="hidden" id="prd_id" name="prd_id" style="display:none" />'+
    '	<input type="hidden" id="prd_chkid" name="prd_chkid" style="display:none" />'+
    '	<input type="hidden" id="prd_problem" name="prd_problem" style="display:none" />'+
    '	<label for="prd_onset_date">Approx Onset Date</label>'+
    '	<span class="datefield">'+
    '	      <input type="text" id="prd_onset_date" name="prd_onset_date" class="date-picker" value="" maxLength="10" />'+
    '	      <button type="button" id="prd_onset_date_calbtn" title="Show Calendar" aria-hidden="true">'+
    '		<img src="/Resources/images/calbtn.gif" width="18" height="18" alt="Calendar" />'+
    '	      </button>'+
    '	</span>'+
    '	<div class="clear"></div>'+
    '	<label for="prd_onset_age">Approx Age at Onset</label>'+
    '	<input type="text" id="prd_onset_age" name="prd_onset_age" maxLength="30" />'+
    '	<div class="clear"></div>'+
    '	<label for="prd_comment">Comment</label>'+
    '	<input type="text" id="prd_comment" name="prd_comment" maxLength="200" />'+
    '	<div class="clear"></div>'+
    '</form>'
    );

    YAHOO.example.container.dlgPersonalProblem.subscribe("beforeShow", function () {
        document.getElementById("frmPersonalProblem").setAttribute("aria-hidden", "false");
    });
    YAHOO.example.container.dlgPersonalProblem.subscribe("beforeHide", function () {
        document.getElementById("frmPersonalProblem").setAttribute("aria-hidden", "true");
    });
	
    // Render the Dialog.  Because of IE zIndex bug, dialogs must be direct child of body.
    var con=YAHOO.util.Selector.query('body')[0];
    YAHOO.example.container.dlgPersonalProblem.render(con);

    // Register with container manager so that z-order is managed when we show the popup
    YAHOO.example.container.manager.register(YAHOO.example.container.dlgPersonalProblem);

	// Attach clickHandler as a listener for any click on the container div:
	YAHOO.util.Event.on("pr_list", "click", clickHandler);
}

function handleFamilyHistoryEdit(dvID) {
	var dv=document.getElementById(dvID);
	var p=YAHOO.example.container.dlgFamilyHistory;

	document.getElementById("fhd_id").value=dv.id;
	
	var n = dv.childNodes.length;
	for (var k=0;k<n;k++)
	{
		var e = dv.childNodes[k];

		// Use regular expressions to match our hidden input names with specific dialog fields
		if (/fh_.*_chkid/.test(e.name))
			document.getElementById("fhd_chkid").value=e.value;
		else if (/fh_.*_prob/.test(e.name))
		{
			document.getElementById("fhd_problem").value=e.value;
			document.getElementById("fhd_label").innerHTML=e.value;
		}
		else if (/fh_.*_rel/.test(e.name))
			document.getElementById("fhd_relative").value=e.value;
		else if (/fh_.*_age/.test(e.name))
			document.getElementById("fhd_onset_age").value=e.value;
		else if (/fh_.*_outcome/.test(e.name))
			document.getElementById("fhd_outcome").value=e.value;
	}

	p.show();

	//Cancel the navigation, otherwise the window will scroll to top.
	return false;
};
	
function handleFamilyHistoryDelete(dvID) {
	   var dv=document.getElementById(dvID);
	   dv.parentNode.removeChild(dv);

	RefreshFamilyHistoryBubbles();

		//Cancel the navigation, otherwise the window will scroll to top.
		return false;
};
	
function initFamilyHistoryPopup() {    
	
	// Define various event handlers for Dialog
	var addFamilyHistory = function() {
		var data = this.getData();
		
		// if (data.fhd_relative == "-Select-") {
		//	alert("Please select a relative.");
		//	return false;
		// }
		// if (data.fhd_onset_age == "") {
		//	alert("Please enter either an approximate onset date or an approximate onset ageXXXX.");
		//	return false;
		// }
		
		var id = "fh_#"+famProbCnt;
		var response = "<div id='"+id+"'>";
		response += "<span style='float:right'><a href='#' onclick=\"return handleFamilyHistoryEdit('"+id+"');\">edit</a>&#160; ";
		response += "<a href='#' onclick=\"return handleFamilyHistoryDelete('"+id+"');\">delete</a></span>";
		response += "<input type='text' style='display:none' name='"+id+"_chkid' id='"+id+"_chkid' value='"+quoteAttr(data.fhd_chkid)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_prob' value='"+quoteAttr(data.fhd_problem)+"' />";
		// Need to convert fhd_relative object to a string... hence the (""+...)
		response += "<input type='text' style='display:none' name='"+id+"_rel' value='"+quoteAttr(""+data.fhd_relative)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_age' value='"+quoteAttr(data.fhd_onset_age)+"' />";
		response += "<input type='text' style='display:none' name='"+id+"_outcome' value='"+quoteAttr(data.fhd_outcome)+"' />";

		var partsOfStr = (""+data.fhd_relative).split('|');
		if (partsOfStr.length==2)
			response += "<b>" + data.fhd_problem + ":</b> " + partsOfStr[0];
		else if(partsOfStr = "-Select-")
		        response += "<b>" + data.fhd_problem + ":</b> [No Relative Specified]"
		else
			response += "<b>" + data.fhd_problem + ":</b> " + data.fhd_relative;

		if (data.fhd_onset_age != "")
		   response += " @" + data.fhd_onset_age;
		if (data.fhd_outcome != "")
		   response += ", " + data.fhd_outcome;
		response += "</div>";

		var oldElt;
		if (!(data.fhd_id==""))
			oldElt = document.getElementById(data.fhd_id);

		if (!oldElt)
			// insert new problem
			document.getElementById("fh_results").insertAdjacentHTML( "beforeEnd", response );
		else
		{
			// replace old problem
			oldElt.insertAdjacentHTML( "afterEnd", response );
			oldElt.parentNode.removeChild(oldElt);
		}

		famProbCnt++;

		RefreshFamilyHistoryBubbles();

		this.cancel();
	};
	
	var handleCancel = function() {
		this.cancel();
	};
	
	var clickHandler = function(evt) {
		//get the resolved (non-text node) target:
		var elTarget = YAHOO.util.Event.getTarget(evt);	
		//walk up the DOM tree looking for an <li> in the target's ancestry; desist when you reach the container div
		while (elTarget.id != "fh_list") {
			if(elTarget.nodeName.toUpperCase() == "A") {
				// Change the bubble img to filled-in.
				//elTarget.firstChild.src = "Resources/images/bubble-filled.gif";
				//elTarget.className = "selected";

				// Use innerHTML since innerText is not supported by Firefox. lastChild is a SPAN
				var lbl = elTarget.lastChild.innerHTML;
				document.getElementById("fhd_id").value = "";
				document.getElementById("fhd_chkid").value = elTarget.title;  // This is the ProblemChecklistID
				document.getElementById("fhd_problem").value = lbl;
				document.getElementById("fhd_label").innerHTML = lbl;
				document.getElementById("fhd_relative").value = "-Select-";
				document.getElementById("fhd_onset_age").value  = "";
				document.getElementById("fhd_outcome").value = "";

				YAHOO.example.container.dlgFamilyHistory.show();
				break;
			} else {
				//wasn't the container, but wasn't an li; so let's step up the DOM and keep looking:
				elTarget = elTarget.parentNode;
			}
		}

		//Cancel the navigation, otherwise the window will scroll to top.
		YAHOO.util.Event.preventDefault(evt);    // return false works in IE, but in other browsers need this
		return false;
	}

    // Instantiate the Dialog
    YAHOO.example.container.dlgFamilyHistory = new YAHOO.widget.Dialog("dlgFamilyHistory", 
    { width : "30em", modal : true, fixedcenter : true, draggable:false, visible : false, close : false, constraintoviewport : true,
      buttons : [ { text:"Add", handler:addFamilyHistory, isDefault:true }, { text:"Cancel", handler:handleCancel } ]
    });
	
    YAHOO.example.container.dlgFamilyHistory.setHeader("Please enter problem details");
    YAHOO.example.container.dlgFamilyHistory.setBody(
    '<form id="frmFamilyHistory" method="POST" action="assets/post.php" aria-hidden="true">'+
    '	<p id="fhd_label" style="font-weight:bold;color:#0033cc"></p>'+
    '	<input type="hidden" id="fhd_id" name="fhd_id" style="display:none" />'+
    '	<input type="hidden" id="fhd_chkid" name="fhd_chkid" style="display:none" />'+
    '	<input type="hidden" id="fhd_problem" name="fhd_problem" style="display:none" />'+
    '	<label for="fhd_relative">Relative:</label>'+
    '	<select id="fhd_relative" name="fhd_relative">'+
    '		<option value="-Select-">-Select-</option>'+
    '		<option value="Father|FTH">Father</option>'+
    '		<option value="Mother|MTH">Mother</option>'+
    '		<option value="Brother|BRO">Brother</option>'+
    '		<option value="Sister|SIS">Sister</option>'+
    '		<option value="Son|SONC">Son</option>'+    
    '		<option value="Daughter|DAUC">Daughter</option>'+
    '		<option value="Paternal Grandfather|PGRFTH">Paternal Grandfather</option>'+
    '		<option value="Paternal Grandmother|PGRMTH">Paternal Grandmother</option>'+
    '		<option value="Maternal Grandfather|MGRFTH">Maternal Grandfather</option>'+
    '		<option value="Maternal Grandmother|MGRMTH">Maternal Grandmother</option>'+
    '		<option value="Paternal Uncle|PUNCLE">Paternal Uncle</option>'+    
    '		<option value="Maternal Uncle|MUNCLE">Maternal Uncle</option>'+
    '		<option value="Paternal Aunt|PAUNT">Paternal Aunt</option>'+    
    '		<option value="Maternal Aunt|MAUNT">Maternal Aunt</option>'+
    '		<option value="Paternal Cousin|PCOUSN">Paternal Cousin</option>'+    
    '		<option value="Maternal Cousin|MCOUSN">Maternal Cousin</option>'+
    '	</select>'+
    '	<div class="clear"></div>'+
    '	<label for="fhd_onset_age">Approx Age at Onset</label>'+
    '	<input type="text" id="fhd_onset_age"  name="fhd_onset_age" maxLength="30" />'+
    '	<div class="clear"></div>'+
    '	<label for="fhd_outcome">Outcome</label>'+
    '	<input type="text" id="fhd_outcome" name="fhd_outcome" maxLength="200" />'+
    '	<div class="clear"></div>'+
    '</form>'
    );

    YAHOO.example.container.dlgFamilyHistory.subscribe("beforeShow", function () {
        document.getElementById("frmFamilyHistory").setAttribute("aria-hidden", "false");
    });
    YAHOO.example.container.dlgFamilyHistory.subscribe("beforeHide", function () {
        document.getElementById("frmFamilyHistory").setAttribute("aria-hidden", "true");
    });

    // Render the Dialog.  Because of IE zIndex bug, dialogs must be direct child of body.
    var con=YAHOO.util.Selector.query('body')[0];
    YAHOO.example.container.dlgFamilyHistory.render(con);

    // Register with container manager so that z-order is managed when we show the popup
    YAHOO.example.container.manager.register(YAHOO.example.container.dlgFamilyHistory);

	// Attach clickHandler as a listener for any click on the container div:
	YAHOO.util.Event.on("fh_list", "click", clickHandler);
}

function initCalendarPopup() 
{
	var Event = YAHOO.util.Event,
		Dom = YAHOO.util.Dom,
		dialog,
		calendar,
		actvCal;

	var showBtn = Dom.get("fhd_showCal");
	
	var handlePopup = function() {
		
		// Lazy Dialog Creation - Wait to create the Dialog, and setup document click listeners, until the first time the button is clicked.
		if (!dialog) {
			
			// Hide Calendar if we click anywhere in the document other than the calendar
/*
			Event.on(document, "click", function(e) {
				var el = Event.getTarget(e);
				var dialogEl = dialog.element;
				if (el != dialogEl && !Dom.isAncestor(dialogEl, el) && el != showBtn && !Dom.isAncestor(showBtn, el)) {
					dialog.hide();
				}
			});
*/
			
			function resetHandler() {
				// Reset the current calendar page to the select date, or 
				// to today if nothing is selected.
				var selDates = calendar.getSelectedDates();
				var resetDate;
				
				if (selDates.length > 0) {
					resetDate = selDates[0];
				} else {
					resetDate = calendar.today;
				}
				
				calendar.cfg.setProperty("pagedate", resetDate);
				calendar.render();
			}
			
			function closeHandler() {
				dialog.hide();
			}
			
			dialog = new YAHOO.widget.Dialog("cal_container", {
				visible:false, draggable:false, close:true, modal:true,
				width : "18em", 
				context:[this.id, "tl", "bl",["beforeShow","windowResize"]],
				buttons:[ 
                                        /*  {text:"Reset", handler: resetHandler, isDefault:true}, */
                                          {text:"Close", handler: closeHandler}]
			});
			dialog.setHeader('Pick A Date');
			dialog.setBody('<div id="cal" aria-hidden="true"></div>');

			// Render the Dialog.  Because of IE zIndex bug, dialogs must be direct child of body.
			var con=YAHOO.util.Selector.query('body')[0];
			dialog.render(con);
				   
			dialog.showEvent.subscribe(function() {
				if (YAHOO.env.ua.ie) {
					// Since we're hiding the table using yui-overlay-hidden, we 
					// want to let the dialog know that the content size has changed, when
					// shown
					dialog.fireEvent("changeContent");
				}
	            document.getElementById("cal").setAttribute("aria-hidden", "false");
	        });

	        dialog.hideEvent.subscribe(function () {
	            document.getElementById("cal").setAttribute("aria-hidden", "true");
	        });

			// register with container manager so that z-order is managed when we show the popup
			YAHOO.example.container.manager.register(dialog);
		}
		
		// Lazy Calendar Creation - Wait to create the Calendar until the first time the button is clicked.
		if (!calendar) {
			
			calendar = new YAHOO.widget.Calendar("cal", {
				iframe:false,          // Turn iframe off, since container has iframe support.
				navigator:true       // Turn on month/year navigator
			});
			calendar.render();
			
			calendar.selectEvent.subscribe(function() {
				if (actvCal)                
				{
					if (calendar.getSelectedDates().length > 0) {
						
						var selDate = calendar.getSelectedDates()[0];
						
						var dStr = selDate.getDate();
						var mStr = selDate.getMonth()+1;
						var yStr = selDate.getFullYear();
						
						actvCal.value = mStr + "/" + dStr + "/" + yStr; // TODO Localization
					} else {
						actvCal.value = "";
					}
				}
				$(actvCal).valid();
				dialog.hide();
				actvCal=null;
			});
			
			calendar.renderEvent.subscribe(function() {
				// Tell Dialog it's contents have changed, which allows 
				// container to redraw the underlay (for IE6/Safari2)
				dialog.fireEvent("changeContent");
			});
		}
		
		actvCal=this;

		var date = actvCal.value;
		if (Date.parse(date)) // If valid date
		{
			calendar.cfg.setProperty('selected', date);
			calendar.cfg.setProperty('pagedate', new Date(date), true);
			calendar.render();
		}

		dialog.cfg.setProperty("context",[actvCal, "tl", "bl",["beforeShow","windowResize"]]);
		dialog.show();
		// We need to bring to top so that nested dialogs work correctly.
		YAHOO.example.container.manager.bringToTop(dialog);
	};

	var pickers =  YAHOO.util.Selector.query('.date-picker'); 
	for( i in pickers){
		//YAHOO.util.Event.addListener(pickers[i], 'focus', handlePopup);
		//YAHOO.util.Event.addListener(pickers[i], 'blur', hideCal);

		Event.on(pickers[i].id+"_calbtn", "click", handlePopup, pickers[i], true);
	}
};

/* **************************************************************************************************************************************** */


YAHOO.util.Event.onDOMReady(init);


/* **************************************************************************************************************************************** */


function showhide(elt,linkid) {
	var linkelt = document.getElementById('m_'+linkid);
	if (!linkelt)
		linkelt = document.getElementById(linkid);

	if (linkelt)
	{
		if (elt.checked)
		{
			//linkelt.style.background = "";
			linkelt.style.display = "";
		}
		else
		{
			//linkelt.style.background = "url('$IMAGEDIR/deleted_bg.gif')";
			linkelt.style.display = "none";
		}
	}
}

function init_showhide() {
	var x = document.getElementsByTagName('INPUT');
	for (var i=0;i<x.length;i++) {
		if (x[i].getAttribute('type')=='checkbox') {
			x[i].onclick();
		}
	}
}

/* Obsolete
function setProblemOnClick() {
	var x = document.getElementsByTagName('INPUT');
	for (var i=0;i<x.length;i++) {
		if ( 	(x[i].getAttribute('type')=='checkbox') &&	
			(x[i].id.substring(0,7)=='probID_')) {
			x[i].onclick = problemOnClick;
		}
	}
}

function problemOnClick()
{
	if (this.checked)
		this.parentNode.nextSibling.style.display = "";
	else
		this.parentNode.nextSibling.style.display = "none";
}
*/

/* textarea maxlength code based on http://www.quirksmode.org/dom/maxlength.html
   modified by kamyar ghandi.
   call setMaxlength from the document onload event. */

function setMaxLength() {
	var x = document.getElementsByTagName('textarea');
	var counter = document.createElement('div');
	counter.className = 'counter';
	counter.style.display='none';
	for (var i=0;i<x.length;i++) {
		if (x[i].getAttribute('maxlength')) {
			var counterClone = counter.cloneNode(true);
			var maxLength = x[i].getAttribute('maxlength');
			counterClone.relatedElement = x[i];
			counterClone.innerHTML = 'Maximum of '+maxLength+' characters (<span>0</span>/'+maxLength+')';
			x[i].parentNode.insertBefore(counterClone,x[i].nextSibling);
			x[i].relatedElement = counterClone.getElementsByTagName('span')[0];

			x[i].onkeypress = limitMaxLength;
			x[i].onkeyup = x[i].onchange = checkMaxLength;
			x[i].onfocusout = focusoutMaxLength;
/* This slows down page load significantly if there are a lot of text inputs present.  Need more efficient approach.
			x[i].onkeyup();
*/
		}
	}
}

function limitMaxLength()
{
	var maxLength = this.getAttribute('maxlength');
	var currentLength = this.value.length;
	if (currentLength >= maxLength)
	{
			event.returnValue=false;
	}
}
 
function checkMaxLength() {
	var maxLength = this.getAttribute('maxlength');
	var currentLength = this.value.length;
	var e=this.relatedElement.parentNode;

	if (currentLength > maxLength)
		this.value = this.value.substring(0,maxLength);

	this.relatedElement.firstChild.nodeValue = currentLength;	// not innerHTML

	if (currentLength > maxLength-10)
	{
		e.style.display = "";

		/* Only set className if it is being changed... otherwise it slows things down */
		if (currentLength >= maxLength)
		{
			if (e.className != 'toomuch')
				e.className = 'toomuch';
		}
		else
		{
			if (e.className != '')
				e.className = '';
		}
	}
	else
		e.style.display = "none";

	if (typeof this.currentStyle === 'undefined') return;

	if ((this.currentStyle.overflowY=='hidden') && (this.scrollHeight>10))
		this.style.height = (this.scrollHeight-4) +'px';
}

function focusoutMaxLength()
{
	this.relatedElement.parentNode.style.display = "none";
}

function oddEven(tbody)
{
	var n=tbody.childNodes.length;
	var dv = tbody.parentNode.parentNode;

	// Row 0 is the headings
	for (var j=1; j<n; j++)
	{
		var row =tbody.childNodes[j];
		row.firstChild.innerHTML = "" +j;

		// Column 0 is row index.  Last Column is for delete button.
		for (var k=1; k<row.childNodes.length-1; k++)
		{
			var inp=row.childNodes[k].childNodes[1];
			inp.name="xml"+dv.id+"_#"+j+"_"+k;
		}

		if (j%2)
			row.className = "even";
		else
			row.className = "odd";

		var btn=row.lastChild.firstChild;
		if (n>2)
			btn.disabled = false;
		else
			btn.disabled = true;
	}
}

function addMore(divID)
{
	var dv=document.getElementById(divID);
	var tbody = dv.firstChild.firstChild;
	var tr, td, el, id;

	tr=document.createElement("tr");
	tbody.appendChild(tr);

	td = tr.insertCell(-1); // For row #

	if (dv.className=="medications") {
	    td = tr.insertCell(-1);
	    id = guid();
		td.innerHTML = "<label for='" + id + "' class='hidden'>Name of Medication</label><input type='text' size='40' maxLength='60' id='" + id + "'/>";
		td = tr.insertCell(-1);
		id = guid();
		td.innerHTML = "<label for='" + id + "' class='hidden'>Dosage of Medication</label><input type='text' size='40' maxLength='60' id='" + id + "'/>";
	}
	else if(dv.className=="allergies") {
	    td = tr.insertCell(-1);
	    id = guid();
	    td.innerHTML = "<label for='" + id + "' class='hidden'>Name of Substance</label><input type='text' size='32' maxLength='60' id='" + id + "'/>";
		td = tr.insertCell(-1);
		id = guid();
		td.innerHTML = "<label for='" + id + "' class='hidden'>Type of Reaction</label><input type='text' size='32' maxLength='60' id='" + id + "'/>";
		td = tr.insertCell(-1);
		id = guid();
	    td.innerHTML = "<label for='" + id + "' class='hidden'>Approx Date of Onset</label><input type='text' size='15' maxLength='15' id='" + id + "'/>";
	}
	else if(dv.className=="surgeries") {
	    id = guid();
	    td = tr.insertCell(-1);
	    td.innerHTML = "<label for='" + id + "' class='hidden'>Description</label><input type='text' size='64' maxLength='120' id='" + id + "'/>";
		td = tr.insertCell(-1);
		id = guid();
		td.innerHTML = "<label for='" + id + "' class='hidden'>Approx Date</label><input type='text' size='15' maxLength='15' id='" + id + "'/>";
	}

	td=tr.insertCell(-1);
	td.innerHTML = "<input type='button' value='delete' onClick='deleteRow(this);'/>";

/* Getting innerHTML of tbody works in IE but not Firefox (In firefox the input values are not updated).  So we use the method above instead. */
/*
	var html;

	html = "<table style='width:auto'>";
	html += dv.firstChild.firstChild.innerHTML;
	if (dv.className=="medications")
	{
		html +="<tr><td></td><td><input type='text'/></td><td><input type='text'/></td>";
		html +="<td><input type='button' value='delete' onClick='deleteRow(this);'/></td></tr>";
	}
	else if(dv.className=="allergies")
	{
		html +="<tr><td></td><td><input type='text'/></td><td><input type='text'/></td><td><input type='text' class='date-picker'/></td>";
		html +="<td><input type='button' value='delete' onClick='deleteRow(this);'/></td></tr>";
	}
	else if(dv.className=="surgeries")
	{
		html +="<tr><td></td><td><input type='text'/></td><td><input type='text' class='date-picker'/></td>";
		html +="<td><input type='button' value='delete' onClick='deleteRow(this);'/></td></tr>";
	}
	html +="</table>";
	dv.innerHTML = html;
*/

	oddEven(tbody);
}

function addFirst(id)
{
	var dv=document.getElementById(id);
	var tbody=dv.firstChild.firstChild;
	var n=tbody.childNodes.length;

	if (n<2)  // first row is column headers
		addMore(id);
	else
		oddEven(tbody);
}

function deleteRow(e)
{
	var row = e.parentNode.parentNode;
	var tbody= row.parentNode;
	tbody.removeChild(row);
	oddEven(tbody);
}

function guid() {
    return Math.random().toString(36).slice(2, 10);
}

if (window.attachEvent)
	window.attachEvent("onload", setMaxLength); 
else
	window.onload = setMaxLength; 
