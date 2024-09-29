document.addEventListener("DOMContentLoaded", () => {
    const WORDS = [
        { word: "ZIGBEE", description: "A specification for a suite of high-level communication protocols using low-power digital radios." },
        { word: "CLOUDCOMPUTING", description: "The delivery of computing services over the Internet." },
        { word: "DATAGOVERNANCE", description: "The overall management of data availability, usability, integrity, and security." },
        { word: "DIGITALTWIN", description: "A digital replica of a physical entity." },
        { word: "INFORMATIONSECURITY", description: "The practice of protecting information from unauthorized access." },
        { word: "ITERATIVE", description: "A process that repeats steps in cycles to achieve a desired outcome." },
        { word: "KNOWLEDGEBASE", description: "A repository for knowledge management." },
        { word: "REMOTEWORK", description: "A work arrangement where employees work outside of a traditional office." },
        { word: "SENSORS", description: "Devices that detect and respond to physical stimuli." },
        { word: "USABILITY", description: "The ease with which a user can interact with a product." },
        { word: "INFORMATION", description: "Data that is processed and organized in a meaningful way." },
        { word: "IPV6", description: "The most recent version of the Internet Protocol, designed to replace IPv4." },
        { word: "MACHINEVISION", description: "The ability of a computer to interpret and understand visual images." },
        { word: "MONITORING", description: "The act of observing the performance of a system." },
        { word: "PERFORMANCE", description: "A measure of how well a system or application operates." },
        { word: "PROGRAMMINGLANGUAGE", description: "A formal language comprising a set of instructions that can be used to produce various kinds of output." },
        { word: "QUANTUMCOMPUTING", description: "A type of computing that takes advantage of quantum phenomena." },
        { word: "REST", description: "Representational State Transfer, an architectural style for designing networked applications." },
        { word: "ROBOTICS", description: "The branch of technology that deals with the design and operation of robots." },
        { word: "SCALABILITY", description: "The capability of a system to handle a growing amount of work." },
        { word: "SECURITYAUDIT", description: "An assessment of how well an organization's information security policies are being followed." },
        { word: "SERVERLESS", description: "A cloud computing model where the cloud provider manages the infrastructure." },
        { word: "SOFTWAREENGINEERING", description: "The systematic application of engineering approaches to software development." },
        { word: "SOURCECODE", description: "The human-readable instructions that make up a computer program." },
        { word: "STORAGE", description: "The act of saving data in a digital format." },
        { word: "STREAMING", description: "A method of transmitting or receiving data over a network." },
        { word: "THROUGHPUT", description: "The rate of production or the rate at which something is processed." },
        { word: "VERSIONCONTROL", description: "A system that records changes to files or sets of files over time." },
        { word: "VISUALIZATION", description: "The representation of data in a pictorial or graphical format." },
        { word: "ARTIFICIALINTELLIGENCE", description: "The simulation of human intelligence in machines." },
        { word: "BLOCKCHAINTECHNOLOGY", description: "The underlying technology that powers cryptocurrencies and decentralized systems." },
        { word: "CHATBOT", description: "A program that simulates human conversation." },
        { word: "CLOUDNATIVE", description: "Applications designed specifically to operate in cloud environments." },
        { word: "DATABREACH", description: "An incident where unauthorized access to confidential data occurs." },
        { word: "DEEPLEARNING", description: "A subset of machine learning that uses neural networks to analyze data." },
        { word: "DISTRIBUTEDSYSTEM", description: "A model in which components located on networked computers communicate and coordinate their actions." },
        { word: "EDGECOMPUTING", description: "Computing that is performed at or near the source of the data." },
        { word: "ENTERPRISE", description: "A large organization or company." },
        { word: "ETHICALHACKING", description: "The practice of deliberately probing systems for security weaknesses." },
        { word: "FEEDBACKLOOP", description: "A situation where the output of a system is circled back and used as input." },
        { word: "IOTDEVICES", description: "Physical devices that connect to the Internet and exchange data." },
        { word: "LOADBALANCING", description: "Distributing workloads across multiple resources to optimize resource use." },
        { word: "MICROCONTROLLER", description: "A compact integrated circuit designed to govern a specific operation." },
        { word: "MULTITHREADING", description: "A technique that allows concurrent execution of processes." },
        { word: "NATURALLANGUAGEPROCESSING", description: "A field of AI that focuses on the interaction between computers and humans through natural language." },
        { word: "OPENAPI", description: "A specification for building APIs that are accessible over the web." },
        { word: "PLATFORMDEVELOPMENT", description: "The process of creating and maintaining software platforms." },
        { word: "QUANTUMCOMPUTING", description: "A field of computing focused on using quantum bits." },
        { word: "REALTIMEPROCESSING", description: "Processing data immediately as it is received." },
        { word: "SCALABLEARCHITECTURE", description: "A system architecture that can accommodate growth." },
        { word: "SOFTWAREDEVELOPMENTLIFECYCLE", description: "The process of developing software from inception to deployment." },
        { word: "STATICANALYSIS", description: "The analysis of code without executing it." },
        { word: "UNITTESTING", description: "A software testing method by which individual units of source code are tested." },
        { word: "USEREXPERIENCE", description: "The overall experience of a user with a product." },
        { word: "VIRTUALMACHINE", description: "An emulation of a computer system." },
        { word: "WEBAPPLICATIONS", description: "Applications that run on a web server and can be accessed through a web browser." },
        { word: "WIREFRAME", description: "A visual guide that represents the skeletal framework of a website." },
        { word: "ZIGBEE", description: "A specification for a suite of high-level communication protocols using low-power digital radios." },
        { word: "CLOUDCOMPUTING", description: "The delivery of computing services over the Internet." },
        { word: "DATAGOVERNANCE", description: "The overall management of data availability, usability, integrity, and security." },
        { word: "DIGITALTWIN", description: "A digital replica of a physical entity." },
        { word: "INFORMATIONSECURITY", description: "The practice of protecting information from unauthorized access." },
        { word: "ITERATIVE", description: "A process that repeats steps in cycles to achieve a desired outcome." },
        { word: "KNOWLEDGEBASE", description: "A repository for knowledge management." },
        { word: "MICROSERVICES", description: "An architectural style that structures an application as a collection of small, loosely coupled services." },
        { word: "REMOTEWORK", description: "A work arrangement where employees work outside of a traditional office." },
        { word: "WORKFLOW", description: "A sequence of processes through which a piece of work passes." },
    ];
    
    const TOTAL_TIME = 90; // Total game time in seconds
    const TOTAL_ROUNDS =16; // Total number of rounds

    let currentRound = 0; // Counter for the rounds
    let wordObj = {};
    let previousWord = {};
    let revealedIndices = new Set();
    let score = 0;
    let secondsLeft = TOTAL_TIME;
    let countdownInterval;
    let guessStartTime;

    const letterBoxes = document.getElementById('word-container');
    const progressBar = document.getElementById('progress-bar');
    const userInput = document.getElementById('user-input');
    const submitButton = document.getElementById('submit-answer');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const hintButton = document.getElementById('hint-button');

    function getRandomWord() {
        let newWord;
        do {
            newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        } while (newWord.word === previousWord.word && WORDS.length > 1);
        previousWord = newWord;
        return newWord;
    }

    function createLetterBoxes() {
        letterBoxes.innerHTML = '';
        for (let i = 0; i < wordObj.word.length; i++) {
            const box = document.createElement('div');
            box.className = 'letter-box';
            box.textContent = '_';
            letterBoxes.appendChild(box);
        }
    }

    function getRandomIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * wordObj.word.length);
        } while (revealedIndices.has(randomIndex));
        return randomIndex;
    }

    function revealLetter() {
        if (revealedIndices.size < wordObj.word.length) {
            const randomIndex = getRandomIndex();
            revealedIndices.add(randomIndex);
            const letterBox = letterBoxes.children[randomIndex];
            letterBox.textContent = wordObj.word[randomIndex];
            letterBox.style.color = "#1d1a39";
            letterBox.classList.add('reveal-animation');

            const progressPercentage = (revealedIndices.size / wordObj.word.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function resetGame() {
        if (currentRound < TOTAL_ROUNDS) { // Check if rounds are remaining
            wordObj = getRandomWord();
            revealedIndices.clear();
            createLetterBoxes();
            secondsLeft = TOTAL_TIME;
            progressBar.style.width = '0%';
            timerDisplay.textContent = "Time: 01:30";
            userInput.value = '';
            submitButton.disabled = false;
            hintButton.style.display = 'none'; // Hide the hint button initially

            clearInterval(countdownInterval);
            countdownInterval = setInterval(updateTimer, 1000);

            // Reveal the first letter immediately
            revealLetter();

            guessStartTime = Date.now(); // Start the timer for guessing
            currentRound++; // Increment the round counter
        } else {
            document.getElementById('game-screen').style.display = 'none'; // Hide the game screen
             document.getElementById('end-screen').style.display = 'block';
        }
    }

    function updateTimer() {
        secondsLeft--;
        timerDisplay.textContent = `Time: ${formatTime(secondsLeft)}`;

        // Calculate the percentage of time left
        const progressPercentage = (secondsLeft / TOTAL_TIME) * 100;

        // Create a smooth gradient from green (start) to orange (middle) to red (end)
        const gradientColor = `linear-gradient(to bottom, #2ecc71 ${progressPercentage}%, #f39c12 ${(progressPercentage * 2) / 3}%, #e74c3c ${(100 - progressPercentage)}%)`;
        timerDisplay.style.background = gradientColor;

        // Reveal a letter every 30 seconds starting from 60 seconds
        if (secondsLeft % 30 === 0 && secondsLeft < TOTAL_TIME && secondsLeft > 0) {
            revealLetter();  // Reveal a letter every 30 seconds
        }

        // Show hint button after 45 seconds
        if (secondsLeft === 45) {
            hintButton.style.display = 'block';
        }

        // When time reaches 0, prompt the user and wait for them to click "OK" before resetting the game
        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                alert("Time's up! Time for the next question.");
                resetGame();
            }, 100);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    submitButton.addEventListener('click', () => {
        const userGuess = userInput.value.trim().toUpperCase(); // Convert user input to uppercase for comparison

        if (userGuess.length === wordObj.word.length) {
            const timeTaken = Math.round((Date.now() - guessStartTime) / 1000); // Calculate time taken
            console.log(`User's Valid Guess: ${userGuess}`);
            console.log(`Time taken to guess the word: ${timeTaken} seconds`);

            if (userGuess === wordObj.word) { // Compare directly
                score++;
                console.log(`Correct! Current Score: ${score}`);
            } else {
                console.log(`Incorrect! The correct word was "${wordObj.word}". Current Score: ${score}`);
            }
            submitButton.disabled = true;
            resetGame();
        } else {
            alert("⚠️ Please enter a guess that matches the word length.");
        }
    });

    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        resetGame();
    });

    hintButton.addEventListener('click', () => {
        alert(`Hint: ${wordObj.description}`); // Provide a description of the word
    });

});

