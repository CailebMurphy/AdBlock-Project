blockImagePayload = {redirectUrl: chrome.extension.getURL("empty.gif")};
blockPagePayload = {redirectUrl: "about:blank"};
cancelPayload = {cancel: true};

function blockImage(details) {
	return blockImagePayload;
}

function blockPage(details) {
	return blockPagePayload;
}

function blockObject(details) {
	return cancelPayload;
}

listenerCallbacks = [
	[["image", "media"], blockImage],
	[["sub_frame"], blockPage],
	[["main_frame", "object", "script", "xmlhttprequest", "stylesheet", "other", "ping", "csp_report", "websocket", "font"], blockObject]
]

blockingEnabled = false;

function enable() {
	if (blockingEnabled) {
		return;
	}

	for (var foo in listenerCallbacks) {
		var types = listenerCallbacks[foo][0];
		var callback = listenerCallbacks[foo][1];
		chrome.webNavigation.onDOMContentLoaded.addListener(
			callback,
			{urls: filters, types: types},
			["blocking", "requestBody"]
		);
	}
}

enable();	//enable blocking
