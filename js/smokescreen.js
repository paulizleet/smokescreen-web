
function askForRestart(){
  console.log("restarting");
  browser.runtime.sendMessage("restart");
}
function serveMaster(request, sender, response){

  var restarting = setTimeout(askForRestart, 10000);
  
  var s = new XMLSerializer();
  var doc = s.serializeToString(document);

  var link = getLinks(document);
  if(link == undefined){
    askForRestart();
  }else{  window.location=link}
}


function validUrl(url){
  //here
  var regskip = [/calendar/i,/advanced/i,/click /i,/terms/i,/Groups/i,/Images/,/Maps/,/search/i,/cache/i,/similar/i,/&#169;/,/sign in/i,/help[^Ss]/i,/download/i,/print/i,/Books/i,/rss/i,/google/i,/bing/i,/yahoo/i,/aol/i,/html/i,/ask/i,/xRank/,/permalink/i,/aggregator/i,/trackback/,/comment/i,/More/,/business solutions/i,/result/i,/ view /i,/Legal/,/See all/,/links/i,/submit/i,/Sites/i,/ click/i,/Blogs/,/See your mess/,/feedback/i,/sponsored/i,/preferences/i,/privacy/i,/News/,/Finance/,/Reader/,/Documents/,/windows live/i,/tell us/i,/shopping/i,/Photos/,/Video/,/Scholar/,/AOL/,/advertis/i,/Webmasters/,/MapQuest/,/Movies/,/Music/,/Yellow Pages/,/jobs/i,/answers/i,/options/i,/customize/i,/settings/i,/Developers/,/cashback/,/Health/,/Products/,/QnABeta/,/<more>/,/Travel/,/Personals/,/Local/,/Trademarks/,/cache/i,/similar/i,/login/i,/signin/i,/mail/i,/feed/i,/pay/i,/accounts/i,/.tar/i,/.exe/i,/.zip/i,/.pdf/i,/.wav/i,/.txt/i];
  debugger
  for(var i = 0; i < regskip.length; i++){

    if(regskip[i].test(url)){
      return false;
    }
  }
  return true;
}


function getLinks(doc) {
  var linkObjects = doc.getElementsByTagName("a");
  var urls=[]
  for (i = 0; i < linkObjects.length; i++) {
    urls.push(linkObjects[i].href)
  }
  var url;

  console.log("We have " + urls.length +" links");
  if(urls.length == 0){
    console.log("asking for restart");
    askForRestart();
  }else{
    url = urls[Math.floor(Math.random()*urls.length)];

    if(validUrl(url)){
      console.log("Found valid url.")
    }

    return url;

  }
}

console.log("going");



browser.runtime.sendMessage("kickoff");
browser.runtime.onMessage.addListener(serveMaster);
