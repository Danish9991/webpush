console.log('serverworker loaded');

self.addEventListener('push', e =>{
    const data = e.data.json();
    console.log('push received...');
    self.registration.showNotification(data.title,{
        body: data.body,
        icon: data.icon
    })
})