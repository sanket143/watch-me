// Stopwatch variables
let startTime: number | null = null;
let elapsedTime = 0;
let animationFrameId: number | null = null;

function toggleStopwatch() {
  if (!startTime) {
    // Start the stopwatch
    startTime = performance.now() - elapsedTime;
    requestAnimationFrame(updateDisplay);
  } else {
    // Stop the stopwatch
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    elapsedTime = performance.now() - startTime;
    startTime = null;
  }
}

function resetStopwatch() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  startTime = null;
  elapsedTime = 0;
  updateDisplay();
}

function updateDisplay() {
  const display = document.querySelector('#stopwatch-display') as HTMLElement;
  const currentTime = startTime ? performance.now() - startTime : elapsedTime;
  
  const milliseconds = Math.floor((currentTime % 1000) / 10);
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
  const hours = Math.floor((currentTime / (1000 * 60 * 60)));
  
  // Show milliseconds if less than 1 hour, otherwise show hours
  if (hours < 1) {
    display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  } else {
    display.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  if (startTime !== null) {
    animationFrameId = requestAnimationFrame(updateDisplay);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Add keyboard event listener for Space (play/pause) and Enter (reset)
  window.addEventListener('keyup', (event) => {
    // Prevent default behavior for space (page scroll) and enter
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
    }

    if (event.code === 'Space') {
      // Space key - toggle play/pause
      toggleStopwatch();
    } else if (event.code === 'Enter') {
      // Enter key - reset
      resetStopwatch();
    }
  });

  // Initialize the display
  updateDisplay();
});
