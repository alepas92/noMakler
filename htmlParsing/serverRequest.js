function voteSync(outputElem) {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', 'http://vashmagazin.ua/nerukhomist/kvartyry/halytskyy-rayon/', true);
  outputElem.innerHTML = '...';
  xhr.send(null);  

  body.innerHTML += xhr.responseText;  

}
