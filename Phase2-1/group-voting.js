/***
 * Admittedly, this is really just a slightly redesigned version of the
 * inventory page. If you look at the html and js, its virtually identical.
 * I love reusing code! Any references from inventory.js apply here too.
 */
entries = JSON.parse(localStorage.getItem('entries'));

if (entries == null) {
    entries = {
        votingList: [
            { name: "Steak Frites", votes: 2 },
            { name: "Tacos", votes: 1 },
            { name: "Salad", votes: 3 }
        ],
        vote: null
    }
};

localStorage.setItem('entries', JSON.stringify(entries));

// Render entries
renderEntries = () => {
    entryList = document.getElementById('entryList');
    entryList.innerHTML = '';

    entries.votingList.forEach((entry, index) => {
        li = document.createElement('li');
        nameSpan = document.createElement('span');
        nameSpan.classList.add('item-name');
        nameSpan.textContent = entry.name;

        votesSpan = document.createElement('span');
        votesSpan.classList.add('item-votes');
        votesSpan.textContent = `Votes: ${entry.votes}`;

        button = document.createElement('button');
        if (index == entries.vote) {
            button.className = 'voted-button';
            button.textContent = 'Voted';
        } else {
            button.className = 'plus-button';
            button.textContent = 'Vote';
        }
        button.dataset.index = index;

        // Figured out you can use appendChild even on li, very helpful! Wish I did this for inventory,
        // instead of the abomination of a html string it is
        li.appendChild(nameSpan);
        li.appendChild(votesSpan);
        li.appendChild(button);
        entryList.appendChild(li);
    });
};

// Initial render with all entries
renderEntries();

// Add entry
document.getElementById('addEntryButton').addEventListener('click', () => {
    document.getElementById('itemForm').reset();
    document.getElementById('popup').style.display = 'flex';
});

// Close popup
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// Form submission for new entry
document.getElementById('itemForm').addEventListener('submit', (e) => {
    e.preventDefault();

    itemName = document.getElementById('itemName').value;
    if (itemName) {
        entries.votingList.push({ name: itemName, votes: 0 });

        localStorage.setItem('entries', JSON.stringify(entries));
        renderEntries();
        document.getElementById('popup').style.display = 'none';
    }
});

// Vote for an entry
document.getElementById('entryList').addEventListener('click', (e) => {
    if (e.target.classList.contains('plus-button')) {
        index = e.target.dataset.index;

        if (entries.vote !== null) {
            previouslyVotedIndex = entries.vote;
            entries.votingList[previouslyVotedIndex].votes -= 1;
        }

        entries.votingList[index].votes += 1;
        entries.vote = index;

        localStorage.setItem('entries', JSON.stringify(entries));
        renderEntries();
    }
});