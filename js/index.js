(async function() {
    // 通过网络拿到真实的数据
    const resp = await fetch('./js/data.json').then((resp) => resp.json());

    function createDataItem(data) {
        const div = document.createElement('div');
        div.className = 'content-item';
        div.innerHTML = `<!-- 封面 -->
    <a href="https://www.douyin.com/video/${data.videoId}" target="_blank" class="content-cover">
      <img src="${data.cover}" class="content-cover-img" alt="" />
      <div class="content-favor">
        <i class="iconfont icon-zan"></i>
        <span>${data.favor}</span>
      </div>

      <div class="content-time">${data.time}</div>

      <div class="content-progress">
        <div class="content-progress-inner"></div>
      </div>
    </a>
    <!-- 标题 -->
    <a href="">
      <h2 class="content-title">
        ${data.title}
      </h2>
    </a>

    <!-- 作者 -->
    <div class="content-author">
      <a href="" class="content-info">
        <img src="${data.author.avatar}" alt="" />
        <span>${data.author.name}</span>
      </a>
      <div class="content-date">${data.date}</div>
    </div>`;
        return div;
    }

    // 根据这些数据创建元素，加入到页面中
    const contentContainer = document.querySelector('.content');
    for (const data of resp) {
        const div = createDataItem(data);
        contentContainer.appendChild(div);
        const vdo = new VideoController(data.video, () => {
            const inner = div.querySelector('.content-progress-inner');
            inner.style.width = vdo.progess + '%';
        });

        const cover = div.querySelector('.content-cover');

        cover.onmouseenter = async function() {
            const video = await vdo.play();
            const innerVideo = div.querySelector('video');
            if (!innerVideo) {
                cover.appendChild(video);
            }
            console.log(video);
        };

        cover.onmouseleave = function() {
            vdo.pause();
        };
    }
})();