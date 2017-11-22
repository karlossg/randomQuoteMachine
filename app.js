const prefix = "https://cors-anywhere.herokuapp.com/";
const tweetLink = "https://twitter.com/intent/tweet?text=";
const quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
  $.getJSON(prefix + quoteUrl, createTweet);
  $.ajaxSetup({ cache: false });
}

function createTweet(input) {
  let data = input[0];

  const quoteText = $(data.content).text().trim();
  const quoteAuthor = data.title;

  if (!quoteAuthor.length) {
      quoteAuthor = "Unknown author";
  }

  let tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  if (tweetText.length > 140) {
    getQuote();
  } else {
      const tweet = tweetLink + encodeURIComponent(tweetText);
      $('.quote').text(quoteText);
      $('.author').text("Author: " + quoteAuthor);
      $('.tweet').attr('href', tweet);
  }
}

$(document).ready(function() {
  getQuote();
  $('.newQuote').click(function() {
      getQuote();
  })
});

// var quote = '';
// var author = '';

// function getRandomQuote() {
//   fetch ('https://random-quote-generator.herokuapp.com/api/quotes/random').then(function (response) {
//     if (response.status !== 200) {
//       console.log('There was a problemm with response. Status Code: ' + response.status);
//       return;
//     }
//     response.json().then(function (data) {
//       quote = data.quote;
//       author = data.author;
//       var quoteToHTML = document.getElementById('quote');
//       quoteToHTML.innerHTML = '"' + quote + '"';
//       var authorToHTML = document.getElementById('author');
//       authorToHTML.innerHTML = ' -' + author;
//     });
//   }).catch(function (err) {
//     console.log('We got an error! :(', err);
//   });
// }

// getRandomQuote();

// document.getElementById("tweetQuote").addEventListener("click", function () {
//   var fullQuote = '"' + quote.replace(';',',') + '"' + ' - ' + author;
//   if (fullQuote.length < 141) {
//     this.setAttribute("onclick", window.open('https://twitter.com/intent/tweet?text=' + fullQuote, 'popup', 'width=450,height=250,left=500,top=250'));
//   } else {
//     this.setAttribute("onclick", window.open('https://twitter.com/intent/tweet?text=' + "Quote too long to tweet! Try another one!", 'popup', 'width=450,height=250,left=500,top=250'));
//   }
// });
