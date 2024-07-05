// 使用 Fetch API 从文件中获取数据
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
        const data = JSON.parse(rawData);
        const container = document.getElementById('data-container');

        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <h2>${item.CharacterName}</h2>
                <p><strong>ID:</strong> ${item.Id}</p>
                <p><strong>Title:</strong> ${item.Titles[0]}</p>
                <p><strong>Like Count:</strong> ${item.LikeCount}</p>
                <p><strong>Replies:</strong> ${item.Replies.length}</p>
            `;
            container.appendChild(itemDiv);
        });

    } catch (error) {
        console.error('Error parsing data:', error);
        alert('There was an error parsing the data. Please check the console for details.');
    }
}

// 当页面加载完成后执行
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