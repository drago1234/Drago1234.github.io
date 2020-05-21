// do things when document is ready
$(function() {
  copyCode();
  $(window).load(PR.prettyPrint());
});

// create a copy code button
function copyCode() {
  $('pre').hover(
    // display copy code button when hover in
    function() {
      // remember this <pre> only
      var $pre = $(this);
      // append container and button
      $(this).prepend(
        '<div class="copy-code-container"><div class="copy-code-button">Copy Code</div></div>'
      );
      // contrast text color
      $('.copy-code-button').css('color', $('.pln').css('color'));
      // on-click = copy the entire code snippet
      $('.copy-code-button').click(function() {
        // store each line of code without html tags
        var lines = '';
        // iterate through all lists of .linenums inside of this
        $pre.find('.linenums li').each(function() {
          // add each line's text and an end-of-line character to the string
          lines += $(this).text() + '\n';
        });
        // create a temporary div for storing lines
        $pre.children('.linenums').append(
          '<div id="temp-raw-code">' + lines + '</div>'
        );
        // execute copy command
        copyToClipboard('#temp-raw-code');
        // remove temporary tag created above
        $('#temp-raw-code').remove();
        // show that the code has been copied
        $(this).html('Code Copied!');
      });
    },
    // remove copy code button when hover out
    function() {
      $('.copy-code-container').remove();
    }
  );
}

// copy text to clipboard
function copyToClipboard(element) {
  var $temp = $('<textarea>');
  $('body').append($temp);
  $temp.val($(element).text()).select();
  document.execCommand('copy');
  $temp.remove();
}
