const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
var socket = io();

$('form').submit(function(e){
  e.preventDefault();
  var accent= $('#accent').val();
  var selector= $('input[name=v-type]').val();
  if(selector==="webkit"){
    stt(accent,socket);
  }
  else if(selector==='cognitive'){
    cognitive(accent);
  }
  else{
       console.log('error in selectors');
  }
  return false;
});  



function stt(accent,socket)
{
  recognition.continuous = true;
  recognition.lang = accent;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.addEventListener('speechstart', () => {
    console.log('Speech has been detected.');
  });

  recognition.addEventListener('result', (e) => {
    console.log('Result has been detected.');

    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;
    $('#textbox').append(text+'.');

    console.log('Confidence: ' + e.results[0][0].confidence);
    socket.emit('chat message', text);

  });
}