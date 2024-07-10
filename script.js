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

        // Clear existing content
        container.innerHTML = '';

        // Create rows and add imtopic elements
        for (let i = 0; i < data.length; i += 2) {
            const row = document.createElement('div');
            row.className = 'imtopic-row';

            for (let j = i; j < Math.min(i + 2, data.length); j++) {
                const imtopic = data[j];
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
                row.appendChild(imtopicdiv);
            }

            container.appendChild(row);
        }

        // Set up the Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const imtopics = entry.target.querySelectorAll('.imtopic');
                imtopics.forEach((imtopic, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            imtopic.classList.add('fade-in');
                        }, index * 45); // 0.1s delay for each imtopic in the row
                    } else {
                        imtopic.classList.remove('fade-in');
                    }
                });
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the row is visible

        // Observe all imtopic-row elements
        document.querySelectorAll('.imtopic-row').forEach(row => {
            observer.observe(row);
        });

        // Add smooth scrolling to nearest row on scroll end
        let scrollTimeout;
        const scrollContainer = document.getElementById('iMtopicprovider');
        scrollContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollTop = scrollContainer.scrollTop;
                const rowHeight = scrollContainer.querySelector('.imtopic-row').offsetHeight;
                const targetScrollTop = Math.round(scrollTop / rowHeight) * rowHeight;
                scrollContainer.scrollTo({
                    top: targetScrollTop,
                    behavior: 'smooth'
                });
            }, 150); // Adjust timeout as needed
        });

    } catch (error) {
        console.error('Error parsing data:', error);
        console.error('Raw data:', rawData);
        alert('无法解析内容。可能是页面正在维护，稍后再来试试看。');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromFile('im_topic_data.txt')
        .then(rawData => {
            parseAndDisplayData(rawData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('无法获取内容。可能是页面正在维护，稍后再来试试看。');
        });
});