function fetchDataFromFile(filename) {
    return fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        });
}

function parseAndDisplayData(rawData) {
    try {
        let fixedData = rawData.trim();
        if (!fixedData.startsWith('[')) fixedData = '[' + fixedData;
        if (!fixedData.endsWith(']')) fixedData = fixedData + ']';

        const data = JSON.parse(fixedData);
        const container = document.getElementById('data-container');

        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <img src="path/to/avatar.png" alt="${item.CharacterName || 'Unknown'}" width="50" height="50">
                <div>
                    <h2>${item.CharacterName || 'Unknown'}</h2>
                    <p><strong>ID:</strong> ${item.Id || 'N/A'}</p>
                    <p><strong>Title:</strong> ${item.Titles && item.Titles[0] || 'N/A'}</p>
                    <p><strong>Like Count:</strong> ${item.LikeCount || 0}</p>
                    <p><strong>Replies:</strong> ${item.Replies ? item.Replies.length : 0}</p>
                </div>
            `;
            container.appendChild(itemDiv);
        });

    } catch (error) {
        console.error('Error parsing data:', error);
        console.error('Raw data:', rawData);
        alert('There was an error parsing the data. Please check the console for details.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromFile('im_topic_data.txt')
        .then(rawData => {
            parseAndDisplayData(rawData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('There was an error fetching the data. Please check the console for details.');
        });
});
