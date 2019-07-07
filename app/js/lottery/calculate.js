class Calculate {
  /**
   * @desc [computeCount 计算注数]
   * @param  {number} active_num    [当前选中的号码]
   * @param  {string} play_name [当前的玩法标识]
   * @return {number}           [注数]
   */
  computeCount(active_num, play_name) {
    return this.play_list.has(play_name) && play_name[0] === 'r'
      ? Calculate.combine(new Array(active_num).fill(0), play_name[1]).length
      : 0;
  }

  /**
   * @desc [computeBonus 奖金范围预测]
   * @param  {number} active_num    [当前选中的号码]
   * @param  {string} play_name [当前的玩法标识]
   * @return {array}           [奖金范围]
   */
  computeBonus(active_num, play_name) {
    let self = this;
    let arr = new Array(play_name[1] * 1).fill(0);
    let min, max;
    if (play_name[0] === 'r') {

      let min_active_num = 5 - (11 - active_num);

      if (min_active_num > 0) {

        if (min_active_num >= play_name[1]) {
          arr = new Array(min_active_num).fill(0);
          min = Calculate.combine(arr, play_name[1]).length;
        }
        else {

          if (play_name[1] > 5 && active_num >= play_name[1]) {
            arr = new Array(active_num - 5).fill(0);
            min = Calculate.combine(arr, play_name[1] - 5).length;
          }
          else {
            min = active_num - play_name[1] > -1 ? 1 : 0
          }

        }

      }
      else {
        min = active_num - play_name[1] > -1 ? 1 : 0;
      }

      let max_active_num = Math.min(active_num, 5);

      if (play_name[1] > 5) {

        if (active_num >= play_name[1]) {
          arr = new Array(active_num - 5).fill(0);
          max = Calculate.combine(arr, play_name[1] - 5).length;
        }
        else {
          max = 0;
        }
        
      }
      else if (play_name[1] < 5) {
        arr = new Array(Math.min(active_num, 5)).fill(0);
        max = Calculate.combine(arr, play_name[1]).length;
      }
      else {
        max = 1;
      }
    }
    return [min, max].map(item => item * self.play_list.get(play_name).bonus)
  }

  /**
   * @desc [combine 组合运算]
   * @param  {array} arr  [参与组合运算的数组]
   * @param  {number} size [组合运算的基数]
   * @return {number}      [计算注数]
   */
  static combine(arr, size) {

    let allResult = [];
    let minSize = 1;

    (function f(arr, size, result = []) {

      let arrLen = arr.length;

      if (size > arrLen) {
        return;
      }
      else if (size === arrLen) {
        allResult.push([...result, ...arr]);
      }
      else {

        let cloneResult = [...result];

        for (let i = 0; i < arrLen; i++) {

          let newResult = cloneResult.concat(arr[i]);

          size === minSize
            ? allResult.push(newResult)
            : f(arr.slice(i + 1), size - 1, newResult);
        }
      }

    })(arr, size);

    return allResult
  }

}

export default Calculate
