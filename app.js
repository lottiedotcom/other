// --- CORE VARIABLES ---
let isActive = false;
let currentSeed = 0; // Defaults to 0, updates when you type
let isCooldown = false;

// --- DIRECT OUTPUT ---
function printToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> ${text}`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight; 
}

// --- USER INPUT (OPTIONAL ANCHORING) ---
// You don't HAVE to type for it to work, but typing changes the mathematical seed
function handleUserSend() {
    const text = userInput.value.trim();
    if (text !== "") {
        printToFeed("USER", text, "user");
        userInput.value = "";
        
        // Update the seed based on your words
        currentSeed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
}

sendBtn.addEventListener('click', handleUserSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserSend(); });

// --- PASSIVE SCRYING POOL (CONTINUOUS SCAN) ---
let lastScanTime = 0;

function runScryingPool(timestamp) {
    if (!isActive) return requestAnimationFrame(runScryingPool);

    // Generate strict black and white static
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() < 0.5 ? 0 : 255;
        data[i] = val;     
        data[i+1] = val;   
        data[i+2] = val;   
        data[i+3] = 255;   
    }
    ctx.putImageData(imageData, 0, 0);

    // Run the anomaly scan strictly once every second (1000ms), bypassing if on cooldown
    if (timestamp - lastScanTime >= 1000 && !isCooldown) {
        lastScanTime = timestamp;

        // Check a central 16x16 block of pixels for density
        let darkPixelCount = 0;
        const checkArea = ctx.getImageData(24, 24, 16, 16).data;
        
        for (let i = 0; i < checkArea.length; i += 4) {
            if (checkArea[i] === 0) darkPixelCount++;
        }

        // THRESHOLD: 88% of the central block must be purely black. 
        // This is statistically rare in pure 50/50 static, preventing constant spam.
        if (darkPixelCount > (256 * 0.88)) {
            isCooldown = true; // Lock it temporarily
            
            let index = (currentSeed + darkPixelCount + Math.floor(Math.random() * 500)) % words.length;
            printToFeed("ENTITY", words[index].toUpperCase(), "entity");
            
            // 10-second silent cooldown before it resumes scanning
            setTimeout(() => { isCooldown = false; }, 10000);
        }
    }

    // Refresh the canvas visuals rapidly (approx 20fps)
    setTimeout(() => { requestAnimationFrame(runScryingPool); }, 50); 
}

// --- INITIALIZATION ---
startBtn.addEventListener('click', () => {
    startupScreen.classList.add('hidden');
    terminalContainer.classList.remove('hidden');
    isActive = true;
    requestAnimationFrame(runScryingPool);
});
