class Interface {
  /**
   * @desc [getOmit 获取遗漏数据]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getOmit(issue) {
    let self = this;
    return fetch(`/omit?issue=${issue}`)
      .then((res) => res.json())
      .then(body => self.setOmit(body.data))
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * @desc [getOpenCode 获取开奖号码]
   * @param  {string} issue [期号]
   * @return {[type]}       [description]
   */
  getOpenCode(issue) {
    let self = this;
    return fetch(`/opencode?issue=${issue}`)
      .then((res) => res.json())
      .then(body => self.setOpenCode(body.data, body.issue, body.size, body.oddEven, body.todaySoldIssue))
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * @desc [getState 获取当前状态]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getState(issue) {
    return fetch(`/state?issue=${issue}`)
      .then((res) => res.json())
      .then(body => {
        return body;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * @desc [getInitData 获取初始数据]
   * @return {[type]}       [description]
   */
  getInitData(type) {
    return fetch(`/init-data?type=${type}`)
      .then((res) => res.json())
      .then(body => {
        return body;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

export default Interface
