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
	[["sub_frame", "script", "object", "stylesheet", "image"], blockImage],
	[["sub_frame", "script", "stylesheet", "object"], blockPage],
	[["main_frame", "object", "script", "xmlhttprequest", "stylesheet", "other"], blockObject]
]

blockingEnabled = false;

function enable() {
	if (blockingEnabled) {
		return;
	}

	for (var foo in listenerCallbacks) {
		var types = listenerCallbacks[foo][0];
		var callback = listenerCallbacks[foo][1];
		chrome.webRequest.onBeforeRequest.addListener(
			callback,
			{urls: filters, types: types},
			["blocking"]
		);
	}
}

function disable() {
	for (var foo in listenerCallbacks) {
		var callback = listenerCallbacks[foo][1];
		chrome.webRequest.onBeforeRequest.removeListener(callback);
	}
}


function toggleEnabled() {
	if (blockingEnabled) {
		disable();
	} else {
		enable();
	}
}

chrome.browserAction.onClicked.addListener(toggleEnabled);

enable();
