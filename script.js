let costcoItems = [];

function addItem() {
    const item = document.getElementById('item').value;
    const cost = parseFloat(document.getElementById('cost').value);
    const splitting = document.getElementById('splitting').value;

    costcoItems.push({ item, cost, splitting });

    // Optionally, you can clear the form fields here
    document.getElementById('item').value = '';
    document.getElementById('cost').value = '';
    document.getElementById('splitting').value = '';

    console.log('Item added:', costcoItems);
}

function finish() {
    // Process costcoItems and calculate the breakdown
    let roommates = {
        "david": 0,
        "peter": 0,
        "mason": 0,
        "caleb": 0,
        "matthew": 0,
        "lucas": 0
    };

    let roommatesItems = {
        "david": [],
        "peter": [],
        "mason": [],
        "caleb": [],
        "matthew": [],
        "lucas": []
    };

    for (const itemData of costcoItems) {
        const item = itemData.item;
        const cost = itemData.cost;
        const splittingInput = itemData.splitting;

        if (splittingInput.toLowerCase() === 'all') {
            // If input is "all", evenly split the cost among all roommates
            const costPerPerson = cost / 6;
            for (const name in roommates) {
                roommates[name] += costPerPerson;
                roommatesItems[name].push(item);
            }
        } else {
            // Otherwise, split the cost among specified roommates
            const splitting = splittingInput.toLowerCase().split(' ');

            // Filter out invalid roommates
            const validSplitting = splitting.filter(name => name in roommates);

            if (validSplitting.length > 0) {
                const costPerPerson = cost / validSplitting.length;
                for (const name of validSplitting) {
                    roommatesItems[name].push(item);
                    roommates[name] += costPerPerson;
                }
            }
            // You may add an else condition here to handle invalid input if needed
        }
    }

    // Display the breakdown on the result.html page
    let resultHTML = '<h2>Final Breakdown</h2>';
    for (const [roommate, owed] of Object.entries(roommates)) {
        resultHTML += `<p>${roommate} owes $${owed.toFixed(2)}. ${roommate} is splitting: ${roommatesItems[roommate]}</p>`;
    }

    // Store the resultHTML in localStorage to pass it to the result.html page
    localStorage.setItem('resultHTML', resultHTML);

    // Redirect to the result.html page
    window.location.href = 'result.html';

    // Optionally, you can reset costcoItems array here
    costcoItems = [];
}


