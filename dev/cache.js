self.addEventListener('fetch', (event) => {
  const destination = event.request.destination;
  switch (destination) {
    case 'style':
    case 'document': {
      event.respondWith(
        alert(`style, or document: ${event.request}`)
      );
      return;
    }
    case 'script': {
      event.respondWith(
        alert(`script: ${event.request}`)
      );
      return;
    }
    
    default: {
      event.respondWith(
        alert(`other resource: ${event.request}`)
      );
      return;
    }
  }
});
