$(() => {
  console.log('DOCUMENT READY');
  console.log($('h1').css('width'));
  console.log($('h1').html());
  console.log($('li').height());
  $('h1').css('color', 'red');
  $('#insta').addClass('red', 'blue');
  // $('img').hide();
  // $('p').text(['Hello Kolkata', 'Hi Boys']);
});
