// Test script to add carousel data with working links
async function testCarousel() {
  try {
    // Start dev server first
    const serverProcess = require('child_process').spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      detached: true
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Test adding a carousel with an internal link
    const response1 = await fetch('http://localhost:3000/api/carousels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        imageUrl: 'https://res.cloudinary.com/dwr8tmpss/image/upload/v1712956024/aas/ieti05meimwrdn2kdwfc.webp',
        carouselLink: '/products/pp-r-boru' 
      }),
    });

    console.log('Added internal link carousel:', await response1.json());

    // Test adding a carousel with external link
    const response2 = await fetch('http://localhost:3000/api/carousels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        imageUrl: 'https://res.cloudinary.com/dwr8tmpss/image/upload/v1735030655/aas/sttcoj9n6tx2tlbajhzu.jpg',
        carouselLink: 'https://example.com' 
      }),
    });

    console.log('Added external link carousel:', await response2.json());

    // Fetch all carousels to verify
    const fetchResponse = await fetch('http://localhost:3000/api/carousels');
    const carousels = await fetchResponse.json();
    console.log('All carousels:', carousels);

  } catch (error) {
    console.error('Error:', error);
  }
}

testCarousel();
