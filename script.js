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
        const container = document.getElementById('iMtopiclist');

        data.forEach(imtopic => {
            const imtopicdiv = document.createElement('div');
            imtopicdiv.className = 'imtopic';
            imtopicdiv.innerHTML = `
                <div class="imavatarprovider">
                    <img src="path/to/avatar.png" alt="${imtopic.CharacterName || 'Unknown'}" width="50" height="50">
                    <p class="imavatarname">${imtopic.CharacterName || 'Unknown'}</p>
                </div>
                <div>
                    <!--p><strong>ID:</strong> ${imtopic.Id || 'N/A'}</p-->
                    <p class="imtopictitle">${imtopic.Titles && imtopic.Titles[0] || 'N/A'}</p>
                    <p class="imtopicdetail">${imtopic.LikeCount || 0} likes</p>
                    <p class="imtopicdetail">${imtopic.Replies ? imtopic.Replies.length : 0} comments</p>
                </div>
            `;
            container.appendChild(imtopicdiv);
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
