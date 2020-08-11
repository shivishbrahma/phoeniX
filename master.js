$(() => {
  console.log('DOCUMENT READY');
  console.log($('h1').css('width'));
  console.log($('h1').html());
  console.log($('li').height(47));
  $('h1').css('color', 'red');
  $('img').hide();
  $('p').text(['Hello Kolkata', 'Hi Boys']);
});
