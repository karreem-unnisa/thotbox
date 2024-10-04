// Function to show a specific tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Hide all tabs
    });
    document.getElementById(tabId).style.display = 'flex'; // Show the selected tab
}

// Function to show the landing page
function showLanding() {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Hide all tabs
    });
    document.getElementById('landing').style.display = 'flex'; // Show landing page
}

// Function to load thoughts from local storage
function loadThoughts() {
    const thoughtsContainer = document.getElementById('thoughts-container');
    const thoughts = JSON.parse(localStorage.getItem('thoughts')) || [];
    thoughts.forEach(thought => {
        appendThought(thought.text, thought.dateTime);
    });
}

// Function to load diary entries from local storage
function loadDiary() {
    const diaryContainer = document.getElementById('diary-container');
    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    diaries.forEach(diary => {
        appendDiaryEntry(diary.text, diary.dateTime);
    });
}

// Function to append a new thought to the container
function appendThought(text, dateTime) {
    const thoughtsContainer = document.getElementById('thoughts-container');
    const newThought = document.createElement('div');
    newThought.className = 'entry';

    const thoughtText = document.createElement('div');
    thoughtText.className = 'entry-text';
    thoughtText.textContent = text;
    newThought.appendChild(thoughtText);

    // Create a container for date/time and delete icon
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container';
    detailsContainer.style.display = 'none'; // Initially hide details

    const dateTimeElement = document.createElement('p');
    dateTimeElement.className = 'date-time';
    dateTimeElement.textContent = `Shared on: ${dateTime}`;
    detailsContainer.appendChild(dateTimeElement);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash delete-icon';
    deleteIcon.onclick = function() {
        thoughtsContainer.removeChild(newThought);
        removeThoughtFromStorage(text, dateTime);
    };
    detailsContainer.appendChild(deleteIcon);

    // Append the details container
    newThought.appendChild(detailsContainer);
    thoughtsContainer.appendChild(newThought);

    // Show the details after a short timeout to allow for UI smoothness
    setTimeout(() => {
        detailsContainer.style.display = 'flex'; // Show details
    }, 100); // Adjust timeout as necessary
}


function appendDiaryEntry(text, dateTime) {
    const diaryContainer = document.getElementById('diary-container');
    const newDiaryEntry = document.createElement('div');
    newDiaryEntry.className = 'entry';

    const diaryText = document.createElement('div');
    diaryText.className = 'entry-text';
    diaryText.textContent = text;
    newDiaryEntry.appendChild(diaryText);

    // Create a container for date/time and delete icon
    const dateTimeContainer = document.createElement('div');
    dateTimeContainer.className = 'date-time-container';

    const dateTimeElement = document.createElement('p');
    dateTimeElement.className = 'date-time';
    dateTimeElement.textContent = `Saved on: ${dateTime}`;
    dateTimeContainer.appendChild(dateTimeElement);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash delete-icon';
    deleteIcon.onclick = function() {
        diaryContainer.removeChild(newDiaryEntry);
        removeDiaryFromStorage(text, dateTime);
    };
    dateTimeContainer.appendChild(deleteIcon);

    newDiaryEntry.appendChild(dateTimeContainer);
    diaryContainer.appendChild(newDiaryEntry);
}


// Function to remove a thought from local storage
function removeThoughtFromStorage(text, dateTime) {
    let thoughts = JSON.parse(localStorage.getItem('thoughts')) || [];
    thoughts = thoughts.filter(thought => !(thought.text === text && thought.dateTime === dateTime));
    localStorage.setItem('thoughts', JSON.stringify(thoughts));
}

// Function to remove a diary entry from local storage
function removeDiaryFromStorage(text, dateTime) {
    let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    diaries = diaries.filter(diary => !(diary.text === text && diary.dateTime === dateTime));
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

// Event listeners for forms
document.getElementById('thought-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const thoughtInput = document.getElementById('thought');
    const dateTime = new Date().toLocaleString();
    appendThought(thoughtInput.value, dateTime);

    // Save to local storage
    let thoughts = JSON.parse(localStorage.getItem('thoughts')) || [];
    thoughts.push({ text: thoughtInput.value, dateTime });
    localStorage.setItem('thoughts', JSON.stringify(thoughts));

    thoughtInput.value = ''; // Clear thought input
});

// Event listener for diary form
document.getElementById('diary-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const diaryInput = document.getElementById('diary-entry');
    const dateTime = new Date().toLocaleString();
    appendDiaryEntry(diaryInput.value, dateTime);

    // Save to local storage
    let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    diaries.push({ text: diaryInput.value, dateTime });
    localStorage.setItem('diaries', JSON.stringify(diaries));

    diaryInput.value = ''; // Clear diary input
});

// Initialize the landing page to show on load
document.addEventListener('DOMContentLoaded', function() {
    showLanding();
    loadThoughts(); // Load existing thoughts
    loadDiary(); // Load existing diary entries
});
