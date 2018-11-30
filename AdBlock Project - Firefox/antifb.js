//Script from https://github.com/radiospiel/Facebook-Blocker/blob/master/chrome/source/facebookBlocker/fbblock.js

const pageURL = document.domain;

document.addEventListener('beforeload', handleBeforeLoadEvent, true);
document.addEventListener('load', handleBeforeLoadEvent, true);

function handleBeforeLoadEvent(event) {
	const element = event.target;

	if(pageURL != 'www.facebook.com'){
		if(element.nodeName == 'IFRAME'){
			if(element.src.toLowerCase().indexOf('facebook.com/extern/') > 0){
				element.parentNode.removeChild(element);
			}else if(element.src.toLowerCase().indexOf('facebook.com/plugins/') > 0){
				element.parentNode.removeChild(element);
			}else if(element.src.toLowerCase().indexOf('fbshare.me') > 0){
				element.parentNode.removeChild(element);
			}else if(element.src.toLowerCase().indexOf('pixel.facebook.com') > 0){
				element.parentNode.removeChild(element);
			}
		}else if(element.nodeName == 'SCRIPT'){
			if(element.src.toLowerCase().indexOf('static.ak.fbcdn.net') > 0){
				event.preventDefault();
				return false;
			}else if(element.src.toLowerCase().indexOf('static.ak.connect.facebook.com') > 0){
				return false;
			}else if(element.src.toLowerCase().indexOf('fbshare.me') > 0){
				return false;
			}else if(element.src.toLowerCase().indexOf('api.facebook.com') > 0){
				return false;
			}else{
				return true;
				event.preventDefault();
			}
		}else{
			return true;
			event.preventDefault();
		}
	}else{
		return true;
		event.preventDefault();
	}
}