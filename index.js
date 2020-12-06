document.addEventListener("DOMContentLoaded", function () {
    // Use button to start translation
    document
      .querySelector("#translate")
      .addEventListener("click", () => translate());
  });

async function translate() {
    // Read entries from user
    var inputText = document.querySelector("#inputText").value;
    var inputLanguage = document.querySelector('#inputLanguage').value
    var outputLanguage = document.querySelector('#outputLanguage').value

    // Call function postData to transmit Google Translator API call
    console.log("Input: ", inputText);
    var url = 'https://cors-anywhere.herokuapp.com/https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=%25s&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&';
    var data = {'sl': selectLanguage(inputLanguage), 'tl': selectLanguage(outputLanguage), 'q': inputText};
    var res = await postData(url, data);

    // Process translation data
    let output = '';
    for (var i = 0; i < res.sentences.length; i++) {
      output = output + res.sentences[i].trans;
    }

    // Write back result into HTML page
    document.querySelector('#outputText').innerHTML = output;
}

async function postData(url, data) {
  // define header for fetch
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("User-Agent", "AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1");
  myHeaders.append("Cookie", "NID=204=iROohK5PtoWKXXQT211lVNAkWZGLxTnQxG6PwhAdt2hKkWcikjEspnC2FDCG5-76uVYq4c3MCsJ9JvH1c5NZPY0eODFAoez3Y2xeAdnpwz1IqN84CLa7ejV3mJSTTMNFtI5uXPNkABU0PvmW3FuwgODQqukrVWduAfLX33KfJzU");
  
  // define body for fetch
  var urlencoded = new URLSearchParams();
  urlencoded.append("sl", data.sl);
  urlencoded.append("tl", data.tl);
  urlencoded.append("q", data.q);
  
  // define options for fetch
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  // perform fetch and process received data
  const response = await fetch(url, requestOptions);
  var result = await response.text();
  result = JSON.parse(result)
  console.log(result);
  return result
}

function selectLanguage(language){

  switch (language) {
    case 'German':
      return 'de';
    case 'English':
      return 'en';
    case 'Spanish':
      return 'es';
    case 'French':
      return 'fr';
    case 'Finnish':
      return 'fi';
    default:
      return 'en';
  }
}