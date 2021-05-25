// For the following implementation, please refers to, https://codepen.io/matthewcain/pen/ZepbeR
// var btn = $('#button');

// $(window).scroll(function() {
//   if ($(window).scrollTop() > 300) {
//     btn.addClass('show');
//   } else {
//     btn.removeClass('show');
//   }
// });

// btn.on('click', function(e) {
//   e.preventDefault();
//   $('html, body').animate({scrollTop:0}, '300');
// });



// The follow implementation refers to, http://yulijia.net/freshman21/js/totop.js
(function($) { 
	// When to show the scroll link
	// higher number = scroll link appears further down the page   
	var upperLimit = 1000;
	
	// Our scroll link element on id #totop
	var scrollElem = $('#totop');
   
	// Scroll to top speed
	var scrollSpeed = 1000;
   
	// Show and hide the scroll to top link based on scroll position   
	scrollElem.hide();
	$(window).scroll(function () {            
		var scrollTop = $(document).scrollTop();       
		if ( scrollTop > upperLimit ) {
			$(scrollElem).stop().fadeTo(300, 1); // fade back in           
		}else{       
			$(scrollElem).stop().fadeTo(300, 0); // fade out
		}
	});
	// Scroll to top animation on click
	$(scrollElem).click(function(){
		$('html, body').animate({scrollTop:0}, scrollSpeed); return false;
	});
})(jQuery);