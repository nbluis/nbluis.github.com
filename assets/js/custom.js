function createSlide(id, show) {
  var slideId = 'slideview-' + id;
  
  $('.slide').append(
    $('<li></li>').addClass( (show) ? 'selected' : '' ).on('click', function() {
      $('.slide li.selected').removeClass('selected');
      $(this).addClass('selected');
      $('.slideView:visible').slideUp();
      $('#' + slideId).slideDown();
    })
  );
  
  return $('<div></div>').attr('id', slideId).addClass('slideView').appendTo('.projects').toggle(show);
};

function githubCallback(projects) {
  var slideView = undefined;
  var slideNumber = 0;

  for(var index in projects.data) {
    var project = projects.data[index];

    if (index % 3 == 0)
      slideView = createSlide(++slideNumber, slideNumber == 1);
    
    $('<div class="span4 project"></div>')
      .append(
        $('<h4></h4>')
          .append($('<a></a>').attr('href',project['html_url']).text(project['name']))
          .append($('<span></span>').text(project['language'] || '')))
      .append(
        $('<p></p>').text(project['description'])
      ).appendTo(slideView);
  }
};

$(function() {
  $('body').append($('<script></script>').attr('src', 'https://api.github.com/users/nbluis/repos?callback=githubCallback'));
});
