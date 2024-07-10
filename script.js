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

        data.forEach((imtopic, index) => {
            const imtopicdiv = document.createElement('div');
            imtopicdiv.className = 'imtopic';
            imtopicdiv.innerHTML = `
                    <div class="imavatarprovider">
                        <img src="assets/default_01.png">
                        <p class="imavatarname">${imtopic.CharacterName || 'Unknown'}</p>
                    </div>
                    <div class="imtopicmain">
                        <p class="imtopictitle">${imtopic.Titles && imtopic.Titles[5] || 'N/A'}</p>
                        <p class="imtopicdetail">${imtopic.LikeCount || 0} likes</p>
                    </div>
            `;
            container.appendChild(imtopicdiv);
        });

        // Start animation after all resources are loaded
        window.addEventListener('load', () => {
            const imtopics = document.querySelectorAll('.imtopic');
            imtopics.forEach((imtopic, index) => {
                setTimeout(() => {
                    imtopic.classList.add('fade-in');
                }, Math.floor(index / 2) * 100); // 0.1s delay for each pair
            });
        });

    } catch (error) {
        console.error('Error parsing data:', error);
        console.error('Raw data:', rawData);
        alert('无法解析内容。可能是页面正在维护，稍后再来试试看。');
    }
}

// Use window load event instead of DOMContentLoaded
window.addEventListener('load', () => {
    fetchDataFromFile('im_topic_data.txt')
        .then(rawData => {
            parseAndDisplayData(rawData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('无法获取内容。可能是页面正在维护，稍后再来试试看。');
        });
});