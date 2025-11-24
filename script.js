// Game state
const state = {
  currentSlice: 0,
  maxSlices: 10,
  messageIndex: 0
};

// Background colors for each slice
const backgroundColors = [
  '#a8d5e2', // slice 0 - light blue
  '#90d4a5', // slice 1 - green
  '#ffc18a', // slice 2 - peach
  '#ffb5a7', // slice 3 - pink
  '#d4a5ff', // slice 4 - purple
  '#ffd4a5', // slice 5 - light orange
  '#a5e7ff', // slice 6 - sky blue
  '#c9e4b5', // slice 7 - light green
  '#ffcce0', // slice 8 - light pink
  '#e0d5ff'  // slice 9 - lavender
];

// All messages
const messages = [
  "Good crust comes to those who wait.",
  "You're rising better than this dough.",
  "Crumbs are just proof something good happened.",
  "Be soft inside, bold on the outside.",
  "Today's forecast: 100% chance of carbs.",
  "Rest. Even dough needs it.",
  "Long ferments, long friendships.",
  "Trust the bubbles, trust yourself.",
  "Toast your wins, even the tiny ones.",
  "You deserve the corner slice.",
  "Somewhere, a kettle is waiting for this slice.",
  "This loaf believes in slow mornings.",
  "Small kitchen, big feelings.",
  "Neighbours share bread, not passwords.",
  "If this slice could talk, it'd overshare.",
  "Add butter, call it self-care.",
  "Your to-do list can wait one bite.",
  "Best ideas start with 'coffee and bread?'",
  "This crust has more confidence than your ex.",
  "Carbs don't count if the branding is good.",
  "Swipe right on this loaf.",
  "Too hot to be sliced politely.",
  "This slice is your main character era.",
  "Eat bread. Start revolution.",
  "Sourdough can live for decades. Same starter, new stories.",
  "Long ferments = easier to digest. Your gut says thanks.",
  "Every bubble is wild yeast saying 'hi'.",
  "Real bread only needs 3 things: flour, water, salt. And patience.",
  "Name this slice like a band.",
  "What song would you toast this to?",
  "Who would you share this exact slice with?",
  "If this loaf was a city, which one?"
];

// Shuffle messages
function shuffleMessages() {
  const shuffled = [...messages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

let shuffledMessages = shuffleMessages();

// DOM elements
const slicesStack = document.getElementById('slicesStack');
const messageText = document.getElementById('messageText');
const sliceNumber = document.getElementById('sliceNumber');
const breadLoaf = document.getElementById('breadLoaf');

// Update background color
function updateBackground(sliceCount) {
  document.body.style.background = backgroundColors[sliceCount] || backgroundColors[0];
}

// Update slice number display
function updateSliceNumber(count) {
  const formattedNumber = String(count + 1).padStart(4, '0');
  sliceNumber.textContent = formattedNumber;
}

// Update main message
function updateMainMessage(message) {
  messageText.textContent = `( ${message} )`;
}

// Create slice element
function createSlice(message) {
  const sliceContainer = document.createElement('div');
  sliceContainer.className = 'slice-container';
  
  sliceContainer.innerHTML = `
    <svg class="slice-svg" viewBox="0 0 289.7 250.3" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000" d="M132.8,7.2l15.4-.4c25.1,1.7,51.8,2.4,75.6,11,27.1,9.8,57.5,33.6,39.6,65.2-8.4,14.9-10.4,11.3-9.8,31.2,1.4,48.8,20,114.2-45.8,126.1-28.6,5.2-71,2.5-100.8,1.7-22.3-.6-49.5,3.3-61.5-20.4-12.2-24-3.3-78.6-2.2-106.1.6-14-.8-10.2-9.2-18-6.7-6.2-10.6-10.3-12.3-19.7C11.4,22,93.3,8.9,132.8,7.2ZM127.2,22.8c-27.7.6-96.6,8.3-90.7,49.2,1.7,11.5,14.5,15.1,18.9,24.7,2.6,5.8,2,13.3,1.9,19.6-.6,28.5-6.6,58.5-.8,86.8s15.8,23.2,34,24.2c27.1,1.5,63.1.8,90.4-.6,13.4-.7,34.8-1.9,41.3-15.6,7.8-16.5.9-63.5.3-83.7-.2-8-.6-17.4,1.1-25.1,3.5-17,23.6-23.8,15.9-45-12.1-33.4-83.2-35.3-112.3-34.6h0Z"/>
      <path fill="#fff" d="M127.2,22.8c29.1-.7,100.2,1.3,112.3,34.6s-12.4,28-15.9,45c-1.6,7.7-1.3,17.2-1.1,25.1.6,20.2,7.5,67.1-.3,83.7-6.5,13.7-27.8,14.9-41.3,15.6-27.3,1.4-63.3,2.1-90.4.6s-30.1-4.9-34-24.2c-5.8-28.3.3-58.3.8-86.8,0-6.3.7-13.9-1.9-19.6-4.4-9.6-17.2-13.2-18.9-24.7-5.9-40.9,63-48.6,90.7-49.2h0Z"/>
    </svg>
    <div class="slice-message">${message}</div>
  `;
  
  return sliceContainer;
}

// Handle slice action
function sliceLoaf() {
  if (state.currentSlice >= state.maxSlices) {
    return;
  }

  // Get current message
  const message = shuffledMessages[state.messageIndex];
  
  // Create and add slice
  const slice = createSlice(message);
  slicesStack.appendChild(slice);
  
  // Update state
  state.currentSlice++;
  state.messageIndex++;
  
  // Update UI
  updateBackground(state.currentSlice);
  updateSliceNumber(state.currentSlice);
  updateMainMessage(message);
  
  // Shrink bread slightly
  const scale = 1 - (state.currentSlice * 0.05);
  breadLoaf.style.transform = `scale(${Math.max(scale, 0.6)})`;
}

// Reset game
function resetGame() {
  // Reset state
  state.currentSlice = 0;
  state.messageIndex = 0;
  
  // Reshuffle messages
  shuffledMessages = shuffleMessages();
  
  // Clear slices
  slicesStack.innerHTML = '';
  
  // Reset bread
  breadLoaf.style.transform = 'scale(1)';
  
  // Reset UI
  updateBackground(0);
  updateSliceNumber(0);
  updateMainMessage(shuffledMessages[0]);
}

// Add click event to body (anywhere click slices)
document.body.addEventListener('click', (e) => {
  // Prevent double-click text selection
  e.preventDefault();
  sliceLoaf();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    sliceLoaf();
  }
  
  // Reset with 'R' key
  if (e.key === 'r' || e.key === 'R') {
    resetGame();
  }
});

// Initialize with first message
updateMainMessage(shuffledMessages[0]);
