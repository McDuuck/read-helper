function applyBoldFormatting() {
  var textElements = document.querySelectorAll("p, li, td, span");

  for (var i = 0; i < textElements.length; i++) {
    var words = textElements[i].childNodes;

    var formattedWords = [];

    for (var j = 0; j < words.length; j++) {
      var word = words[j];

      if (word.nodeName === "#text") {
        var text = word.textContent;
        var formattedText = formatText(text);
        var span = document.createElement("span");
        span.innerHTML = formattedText;
        textElements[i].replaceChild(span, word);
        formattedWords.push(span);
      } else if (word.nodeName === "SPAN") {
        var text = word.textContent;
        var formattedText = formatText(text);
        var span = document.createElement("span");
        span.innerHTML = formattedText;
        formattedWords.push(span);
      } else {
        formattedWords.push(word);
      }
    }

    textElements[i].innerHTML = "";
    formattedWords.forEach(function (word) {
      textElements[i].appendChild(word);
    });
  }
}

function formatText(text) {
  var words = text.split(" ");
  var formattedWords = words.map(function (word) {
    if (word.includes("class") && word.includes("=")) {
      var classText = extractClassText(word);
      return word.replace(classText, formatClassText(classText));
    }

    if (word.includes("<a") && word.includes("href")) {
      var linkText = extractLinkText(word);
      return word.replace(linkText, formatLinkText(linkText));
    }

    if (word.length < 2) {
      return word;
    }

    var firstTwoLetters = "<b>" + word.substr(0, 2) + "</b>";
    var remainingLetters = word.substr(2);
    return firstTwoLetters + remainingLetters;
  });

  return formattedWords.join(" ");
}

function extractClassText(word) {
  var startIndex = word.indexOf("=") + 1;
  var endIndex = word.length - 1;
  var classText = word.substring(startIndex, endIndex);
  return classText;
}

function formatClassText(classText) {
  var formattedText = classText.replace(/(\w{2})/g, "<b>$1</b>");
  return formattedText;
}

function extractLinkText(word) {
  var startIndex = word.indexOf(">") + 1;
  var endIndex = word.lastIndexOf("</a>");
  var linkText = word.substring(startIndex, endIndex);
  return linkText;
}

function formatLinkText(linkText) {
  var words = linkText.split(" ");
  var formattedWords = words.map(function (word) {
    if (word.length < 2) {
      return word;
    }
    var firstTwoLetters = "<b>" + word.substr(0, 2) + "</b>";
    var remainingLetters = word.substr(2);
    return firstTwoLetters + remainingLetters;
  });

  return formattedWords.join(" ");
}


applyBoldFormatting();
