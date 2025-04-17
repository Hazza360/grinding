// Load the Lottie animation
const container = document.getElementById('chatbot-container');
const animation = lottie.loadAnimation({
  container: container,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'hamster-lottie.json' // Ensure this path is correct
});

// Add chatbot functionality here