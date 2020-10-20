self.addEventListener('fetch', (evento) => {
  self.clients.matchAll()
  .then(function(client) { 
    
    let url = evento.request.url;
    let path = new URL(url).pathname;
    let ext = path.substring(path.length-7);
    client[0].postMessage({                             command: 'logMessage',                            error: null,                                      message: `Url: ${url}
Ext: ${ext}`
    });

    switch (path) {
      case "/dev/blogEntries/xss/xss":
      case 'document': {
          
        client[0].postMessage({
          command: 'logMessage',
          error: null,
          message: "style/document fetched."
        });
          
        /* event.respondWith(
       
        ); */
        return;
      }
      
      case 'script': {
        client[0].postMessage({
          command: 'logMessage',
          error: null,
          message: "script fetched."
        });
          
        /* event.respondWith(
        ); */
        return;
      }
    
      default: {
        client[0].postMessage({
          command: 'logMessage',
          error: null,
          message: `${destination} fetched under default rule.`
        });
          
        /*event.respondWith(
      
        );*/
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
