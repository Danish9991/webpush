const publicVapidKey = 'BN317yojyhfvXYsl7ls1Z5b_aNa4koxxOAXb8usdUSUTSjnmLjJSkHXiZUix4HuZoZGn7xgCYii4SBu5Jw-gQ2c';
console.log('hiiii');
// check for serviceworker
function allowPermission(){
if("serviceWorker" in navigator){
    console.log('hiiii');
    send().catch(err => console.log(err));
}
}


//Register sw, Register push, send push
async function send(){
    //Register sw,
    console.log('registering sw');
    const register = await navigator.serviceWorker.register('./sw.js', {
        scope: '/'
    });
    console.log('service worker registered...')

    //Register push
    console.log('register push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicVapidKey),
    });
    console.log('push registered...');

    //send push notification
    console.log('sending push');
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

    console.log('push send...');

}

function urlB64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }