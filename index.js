document.addEventListener("DOMContentLoaded", function () {
    // Use button to start translateion
    document
      .querySelector("#translate")
      .addEventListener("click", () => translate());
  });

async function translate() {
    var inputText = document.querySelector("#inputText").value;
    var inputLanguage = document.querySelector('#inputLanguage').value
    var outputLanguage = document.querySelector('#outputLanguage').value

    console.log("Input: ", inputText);
    //var url = 'http://localhost:8010/proxy/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=%25s&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&';
    var url = 'https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=%25s&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&';
    var data = {'sl': selectLanguage(inputLanguage), 'tl': selectLanguage(outputLanguage), 'q': inputText};
    var res = await postData(url, data);
    let output = '';
    for (var i = 0; i < res.sentences.length; i++) {
      output = output + res.sentences[i].trans;
    }

    document.querySelector('#outputText').innerHTML = output;
}

async function postData(url, data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("User-Agent", "AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1");
  myHeaders.append("Cookie", "NID=204=iROohK5PtoWKXXQT211lVNAkWZGLxTnQxG6PwhAdt2hKkWcikjEspnC2FDCG5-76uVYq4c3MCsJ9JvH1c5NZPY0eODFAoez3Y2xeAdnpwz1IqN84CLa7ejV3mJSTTMNFtI5uXPNkABU0PvmW3FuwgODQqukrVWduAfLX33KfJzU");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("sl", data.sl);
  urlencoded.append("tl", data.tl);
  urlencoded.append("q", data.q);
  
  var requestOptions = {
    method: 'POST',
    //mode: 'no-cors',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
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
      break;
    case 'English':
      return 'en';
      break;
    case 'Spanish':
      return 'es';
      break;
    case 'French':
      return 'fr';
      break;
    case 'Finnish':
      return 'fi';
      break;
    default:
      return 'en';
  }
}