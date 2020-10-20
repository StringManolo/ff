self.addEventListener('fetch', (evento) => {
  self.clients.matchAll()
  .then(function(client) { 
    
    const destination = evento.request.destination; 

    client[0].postMessage({                             command: 'logMessage',                            error: null,                                      message: `Destination: ${evento.request}
Evento: ${evento}
Url: ${evento.url}`
    });

    switch (destination) {
      case 'style':
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
