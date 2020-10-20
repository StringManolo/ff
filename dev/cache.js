self.addEventListener('fetch', (event) => {
  self.clients.matchAll().then(function(client) { 
    client[0].postMessage({
      command: 'logMessage',
      error: null,
      message: 'The cache service worker write this text from 'fetch' event listener'
    });
  });
  
  const destination = event.request.destination;
  switch (destination) {
    case 'style':
    case 'document': {
      event.respondWith(
       /* debug.value = `style, or document: ${event.request}` */
      );
      return;
    }
    case 'script': {
      event.respondWith(
       /* debug.value = `script: ${event.request}`
 */     );
      return;
    }
    
    default: {
      event.respondWith(
      /*  debug.value = `other resource: ${event.request}`*/
      );
      return;
    }
  }
});
