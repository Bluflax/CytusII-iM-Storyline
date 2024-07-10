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

        // 设置 Intersection Observer，提前 20px 渲染
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(container.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${Math.floor(index / 2) * 45}ms`;
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // 停止观察已经渲染的元素
                }
            });
        }, { 
            rootMargin: '20px', // 提前 20px 触发
            threshold: 0
        });

        // 观察所有 imtopic 元素
        document.querySelectorAll('.imtopic').forEach(imtopic => {
            observer.observe(imtopic);
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