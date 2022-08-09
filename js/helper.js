class VideoController {
  constructor(url, onUpdate) {
    this.url = url; // 保存视频链接
    this.playingPromise = null; // 调用多媒体的play方法所范围的异步任务对象
    this.video = null; // video元素
    this.onUpdate = onUpdate; // 保存进度变化的回调
  }

  /**
   * 获取播放的进度百分比 [0, 100]
   */
  get progess() {
    if (!this.video) {
      return 0;
    }
    return (this.video.currentTime / this.video.duration) * 100;
  }

  async wait() {
    try {
      await this.playingPromise;
    } catch {}
  }

  /**
   * 播放
   */
  async play() {
    await this.wait(); // 等待之前的任务完成
    if (!this.video) {
      // 如果没有video元素
      this.video = document.createElement('video'); // 创建video元素
      this.video.muted = true; // 设置静音模式，否则很多浏览器会阻止播放
      this.video.loop = true; // 循环播放
      this.video.ontimeupdate = () => {
        this.onUpdate && this.onUpdate();
      };
      this.video.src = this.url;
    }

    this.video.currentTime = 0;
    this.playingPromise = this.video.play();
    return this.video;
  }

  /**
   * 停止播放
   */
  async pause() {
    await this.wait(); // 等待之前的任务完成
    this.video.pause();
  }
}
