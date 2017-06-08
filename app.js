var quote = '';
var author = '';

function getRandomQuote() {
  fetch('https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/random.json').then(function(response) {  
    if (response.status !== 200) {  
      console.log('There was a problemm with response. Status Code: ' + response.status);  
      return;  
    }
    response.json().then(function(data) {  
      quote = data.quote;
      author = data.author;
      var quoteToHTML = document.getElementById('quote');
      quoteToHTML.innerHTML = '"' + quote + '"';
      var authorToHTML = document.getElementById('author');
      authorToHTML.innerHTML = ' -' + author;
    });  
  }).catch(function(err) {  
      console.log('We got an error! :(', err);  
    });
}

getRandomQuote();

document.getElementById("tweetQuote").addEventListener("click",function(){
    var fullQuote = '"'+ quote + '"' + ' - ' + author;
    if (fullQuote.length < 141) {
      this.setAttribute("onclick", window.open('https://twitter.com/intent/tweet?text=' + fullQuote,'popup','width=450,height=250,left=500,top=250'));
      // this.setAttribute("onclick", window.moveTo(500, 100));
      
    } else {
      this.setAttribute("onclick", window.open('https://twitter.com/intent/tweet?text=' + "Quote too long to tweet! Try another one!",'popup','width=450,height=250,left=500,top=250'));
      // this.setAttribute("href", 'https://twitter.com/intent/tweet?text=' + "Quote too long to tweet! Try another one!" );
    }
  });

