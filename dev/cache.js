self.addEventListener('fetch', (event) => {
  self.clients.matchAll().then(function(client) { 
    client[0].postMessage({
      command: 'logMessage',
      error: null,
      message: 'The cache service worker write this text from 'fetch' event listener'
    });
  });
});
/*  
  const destination = event.request.destination;
  switch (destination) {
    case 'style':
    case 'document': {
      event.respondWith(
       
      );
      return;
    }
    case 'script': {
      event.respondWith(
  );
      return;
    }
    
    default: {
      event.respondWith(
      
      );
      return;
    }
  } 
});*/
