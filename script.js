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
        const imtopiclist = document.getElementById('iMtopiclist');

        data.forEach(imtopic => {
            const imtopicdiv = document.createElement('div');
            imtopicdiv.className = 'iMtopic';
            imtopicdiv.innerHTML = `
                <img src="path/to/avatar.png" alt="${imtopic.CharacterName || 'Unknown'}" width="50" height="50">
                <div>
                    <h2>${imtopic.CharacterName || 'Unknown'}</h2>
                    <!--p><strong>ID:</strong> ${imtopic.Id || 'N/A'}</p-->
                    <p><strong>Title:</strong> ${imtopic.Titles && item.Titles[0] || 'N/A'}</p>
                    <p><strong>Like Count:</strong> ${imtopic.LikeCount || 0}</p>
                    <p><strong>Replies:</strong> ${imtopic.Replies ? imtopic.Replies.length : 0}</p>
                </div>
            `;
            imtopiclist.appendChild(itemDiv);
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
