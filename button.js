<dialog id="flashDialog">
  <p>Are you sure you want to send a flash?</p>
  <button id="flashConfirm">Send Flash</button>
  <button id="flashCancel">Cancel</button>
</dialog>
window.addEventListener('block-loaded-list-details1', () => {
	const buttonGroup = `
          <button type="button" id="buttonFlash" class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>
            </svg>
            <span class="visually-hidden">Button</span>
          </button>
        `;

	const actionsWrapper = document.querySelector('.actions-button-wrapper');
	const buttonEdit = actionsWrapper.querySelector('button:not(#flash)');
	const buttonEditNew = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>`;
	const buttonFlash = document.getElementById('buttonFlash');
	const flashDialog = document.getElementById('flashDialog');
	const flashConfirmBtn = document.getElementById('flashConfirm');
	const flashCancelBtn = document.getElementById('flashCancel');

	buttonEdit.setAttribute('class', 'btn btn-outline-secondary');
	buttonEdit.innerHTML = buttonEditNew;
	actionsWrapper.insertAdjacentHTML('afterbegin', buttonGroup);
	actionsWrapper.classList.add('btn-group');

	const url = new URL(window.location.href);
	//const recordID = url.searchParams.get('recordId');
	const userID = window.logged_in_user.Username.trim();

    function extractLastSegment(url) {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
        const lastSegment = path.split('/').pop();
        return lastSegment.split('?')[0];
    }

    const recordID = extractLastSegment(url);
    console.log(recordID); // Output: "resource"

	// Webhooks
    const flashHook = `https://gleaming-tulumba-f6170d.netlify.app/.netlify/functions/triggerAirtableWebhook?recordID=${recordID}`;
	//const savedLocal = localStorage[recordID];

	function buttonSwitch(e) {
		e.classList.toggle('btn-outline-secondary');
		e.classList.toggle('btn-secondary');
	}
	
   /*function storageAvailable(type) {
      let storage;
      try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return (
          e instanceof DOMException &&
          // everything except Firefox
          (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage &&
          storage.length !== 0
        );
      }
    }

	if (storageAvailable("localStorage")) {
		// Code for localStorage
		if (localStorage.hasOwnProperty(recordID) || localStorage.hasOwnProperty(`SundaySync.${recordID}`)) {
			if (savedLocal === userID && buttonFlash.classList.contains('btn-outline-secondary')) {
				buttonSwitch(buttonFlash);
				console.log(`${savedLocal}'s bookmark has already been saved to localStorage, button class has been changed to reflect it.`);       
			}
			if (localStorage.hasOwnProperty(`SundaySync.${recordID}`) && buttonSsync.classList.contains('btn-outline-secondary')) {
			    buttonSwitch(buttonSsync);
		    console.log(`Post's SundaySync status has already been saved to localStorage, button class has been changed to reflect it.`);
			}
		} else {
			console.log("This post doesn't appear to be saved in Storage.");
		}
	} else {
		console.log('No web storage Support.');
	} 

	setTimeout(() => {
		const obj = window.records[Object.keys(window.records)].record.fields['Users (from Bookmarks)'];
		let result = [];
		if (typeof obj !== 'undefined' && obj !== null) {
			result = obj.split(', ').filter(
				(user) => user === userID,
			);
			//console.log(result);
			if (result.length !== 0 && !savedLocal) {
				if (buttonFlash.classList.contains('btn-outline-secondary')) {
					buttonSwitch(this);
					console.log('Switched the button - [Users (from Bookmarks)].');
				}
				localStorage.setItem(recordID, result);
				console.log('Added to localStorage.');
			}
		} else {
			console.log("Can't find window.records, or can't find [Users (from Bookmarks)]. Maybe not be bookmarked?");
		}
	}, 3000);*/

	async function flashCall(hook) {
		try {
			const response = await fetch(hook);
			const text = await response.text();
			// enter your logic when the fetch is successful
			toastr.success(text);
			console.log(text);
			/*if (text === "Flash Report sent.") {
			    localStorage.setItem(recordID, userID);
                console.log("Flash Report has been logged to localStorage");
            } else if (text === "Flash Report removed.") {
                localStorage.removeItem(recordID);
                console.log("Flash Report has been removed from localStorage");
            }*/
		} catch (error) {
			// enter your logic for when there is an error (ex. error toast)
			toastr.error(error);
			console.log(error);
		}
	}
	
    function flashClick() {
		const classes = this.classList;
		if (classes.contains('btn-outline-secondary')) {
		  const confirmation = window.confirm('Are you sure you want to send a flash?');
		  if (confirmation) {
			buttonSwitch(this);
			flashCall(flashHook);
			//console.log("");
		  } else {
			// The user clicked "Cancel," do nothing
		  }
		} else if (classes.contains('btn-secondary')) {
		  const confirmation = window.confirm('Are you sure you want to send a flash?');
		  if (confirmation) {
			buttonSwitch(this);
			flashCall(flashHook);
			//console.log("");
		  } else {
			// The user clicked "Cancel," do nothing
		  }
		}
	  }
    
    buttonFlash.addEventListener('click', flashClick);
	
	/*window.addEventListener('storage', storageEventHandler, false);

    function storageEventHandler(e) {
        console.log("Storage event fired!");
    }*/
});
</script>
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>

<script>
window.addEventListener('load', function() {

setTimeout(() => {
    b=document.getElementsByClassName("btn");
    
	[].forEach.call(b, function (e) { 
    	e=document.getElementsByClassName("btn");   
        tippy(e[0], {content: 'Send Flash Report', placement: 'bottom', });
        tippy(e[1], {content: 'Edit this alert/incident', placement: 'bottom', });
   	});

}, 1000);

});
</script>