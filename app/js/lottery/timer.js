class Timer {
  countdown(endTime, update, handle) {

    const nowTime = new Date().getTime();

    if (nowTime > endTime) {
      return handle();
    }

    const msDay = 1000 * 60 * 60 * 24;
    const msHour = 1000 * 60 * 60;
    const msMinute = 1000 * 60;
    const msSecond = 1000;

    let lastTime = endTime - nowTime;
    let day = Math.floor(lastTime / msDay);
    let hour = Math.floor((lastTime - day * msDay) / msHour);
    let minute = Math.floor((lastTime - day * msDay - hour * msHour) / msMinute);
    let second = Math.floor((lastTime - day * msDay - hour * msHour - minute * msMinute) / msSecond);

    this.last_time = `
      <em>${day} </em>天
      <em>${hour} </em>时
      <em>${minute} </em>分
      <em>${second} </em>秒
    `;

    update(this.last_time);

    setTimeout(() => {
      this.countdown(endTime, update, handle);
    }, 1000);

  }
}

export default Timer;