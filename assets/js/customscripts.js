// Some Testing script 
$("#testJS").on("click", function(){
  alert("Testing JS written here, /assets/js/customscripts.js. More details refers to, https://www.w3schools.com/jquery/event_on.asp");
});


// The password script
  function passWord() {
	    var testV = 1;
	    var pass1 = prompt('Please Enter the Password', '');
	    while (testV < 3) {
	        if (!pass1)
	            history.go(-1);
	        if (pass1.toLowerCase() == "drago") {
	            alert('You Got it!');
	            // window.location.assign("");
              window.open("https://drago1234.github.io/Knowledge_Bank/");
	            // window.location.replace("2019 Summer Key.html");
	        }
	        // else if (pass1.toLowerCase() == "key2019"){
	        // 	alert('You Got it!');
	        // 	window.open('2019 Spring Key.html', "_blank");
	        // }
	        testV += 1;
	        var pass1 =
	            prompt('Access Denied - Password Incorrect, Please Try Again.', 'Password');
	    }
	    if (pass1.toLowerCase() != "password" & testV == 3)
	        history.go(-1);
	    return "";
	}


// For table of content (TOC)
    $(document).ready(function() {
        // Handler for .ready() called.
        $('#toc').toc({
            minimumHeaders: 0,
            listType: 'ul',
            showSpeed: 0,
            headers: 'h1, h2, h3, h4, h5, h6'
        });
        /* this offset helps account for the space taken up by the floating toolbar. */
        $('#toc').on('click', function() {
            var target = $(this.getAttribute('href')),
                scroll_target = target.offset().top

            $(window).scrollTop(scroll_target - 10);
            return false
        })
    });


      // TOC 2: https://github.com/ghiculescu/jekyll-table-of-contents
(function($){
  $.fn.toc = function(options) {
    var defaults = {
      noBackToTopLinks: false,
      title: '',
      minimumHeaders: 3,
      headers: 'h1, h2, h3, h4',
      listType: 'ol', // values: [ol|ul]
      showEffect: 'show', // values: [show|slideDown|fadeIn|none]
      showSpeed: 'slow' // set to 0 to deactivate effect
    },
    settings = $.extend(defaults, options);

    var headers = $(settings.headers).filter(function() {
      // get all headers with an ID
      var previousSiblingName = $(this).prev().attr( "name" );
      if (!this.id && previousSiblingName) {
        this.id = $(this).attr( "id", previousSiblingName.replace(/\./g, "-") );
      }
      return this.id;
    }), output = $(this);
    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      return;
    }

    if (0 === settings.showSpeed) {
      settings.showEffect = 'none';
    }

    var render = {
      show: function() { output.hide().html(html).show(settings.showSpeed); },
      slideDown: function() { output.hide().html(html).slideDown(settings.showSpeed); },
      fadeIn: function() { output.hide().html(html).fadeIn(settings.showSpeed); },
      none: function() { output.html(html); }
    };

    var get_level = function(ele) { return parseInt(ele.nodeName.replace("H", ""), 10); }
    var highest_level = headers.map(function(_, ele) { return get_level(ele); }).get().sort()[0];
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

    var level = get_level(headers[0]),
      this_level,
      html = settings.title + " <"+settings.listType+">";
    headers.on('click', function() {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id;
      }
    })
    .addClass('clickable-header')
    .each(function(_, header) {
      this_level = get_level(header);
      if (!settings.noBackToTopLinks && this_level === highest_level) {
        $(header).addClass('top-level-header').after(return_to_top);
      }
      if (this_level === level) // same level as before; same indenting
        html += "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
      else if (this_level <= level){ // higher level than before; end parent ol
        for(i = this_level; i < level; i++) {
          html += "</li></"+settings.listType+">"
        }
        html += "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
      }
      else if (this_level > level) { // lower level than before; expand the previous to contain a ol
        for(i = this_level; i > level; i--) {
          html += "<"+settings.listType+"><li>"
        }
        html += "<a href='#" + header.id + "'>" + header.innerHTML + "</a>";
      }
      level = this_level; // update for the next one
    });
    html += "</"+settings.listType+">";
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function() {
        $(window).scrollTop(0);
        window.location.hash = '';
      });
    }

    render[settings.showEffect]();
  };
})(jQuery);


	$('#mysidebar').height($(".nav").height());


	$(document).ready(function() {

	    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
	    // position as your scroll. if you have a lot of nav items, this height may not work for you.
	    var h = $(window).height();
	    //console.log (h);
	    if (h > 800) {
	        $("#mysidebar").attr("class", "nav affix");
	    }
	    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
	    $('[data-toggle="tooltip"]').tooltip({
	        placement: 'top'
	    });

	    /**
	     * AnchorJS
	     */
	    anchors.add('h2,h3,h4,h5');

	});



  
	// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
	// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
	$(function() {
	    var json, tabsState;
	    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
	        var href, json, parentId, tabsState;

	        tabsState = localStorage.getItem("tabs-state");
	        json = JSON.parse(tabsState || "{}");
	        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
	        href = $(e.target).attr('href');
	        json[parentId] = href;

	        return localStorage.setItem("tabs-state", JSON.stringify(json));
	    });

	    tabsState = localStorage.getItem("tabs-state");
	    json = JSON.parse(tabsState || "{}");

	    $.each(json, function(containerId, href) {
	        return $("#" + containerId + " a[href=" + href + "]").tab('show');
	    });

	    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
	        var $this = $(this);
	        if (!json[$this.attr("id")]) {
	            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
	        }
	    });
	});