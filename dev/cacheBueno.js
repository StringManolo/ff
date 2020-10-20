self.addEventListener('fetch', (evento) => {
  self.clients.matchAll()
  .then(function(client) { 
    
    let url = evento.request.url;
    let path = new URL(url).pathname;
    let ext = path.substring(path.length-6);

    switch (ext) {
      case ".ff.js": {
          
        client[0].postMessage({
          command: 'logMessage',
          error: null,
          message: "fastframework resource detected by service worker."
        });
          
        /* event.respondWith(
       
        ); */
        return;
      }
      
    }       
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
