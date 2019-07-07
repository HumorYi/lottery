import $ from 'jquery';
class Base {
  /**
   * [initPlayList 初始化奖金和玩法及说明]
   * @return {[type]} [description]
   */
  initPlayList() {
    this.play_list
      .set('r2', {
        bonus: 6,
        tip: '从01～11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元',
        name: '任二'
      })
      .set('r3', {
        bonus: 19,
        tip: '从01～11中任选3个或多个号码，选号与奖号任意三个号相同，即中奖<em class="red">19</em>元',
        name: '任三'
      })
      .set('r4', {
        bonus: 78,
        tip: '从01～11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元',
        name: '任四'
      })
      .set('r5', {
        bonus: 540,
        tip: '从01～11中任选5个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元',
        name: '任五'
      })
      .set('r6', {
        bonus: 90,
        tip: '从01～11中任选6个或多个号码，所选号码与开奖号码五个号码相同，即中奖<em class="red">90</em>元',
        name: '任六'
      })
      .set('r7', {
        bonus: 26,
        tip: '从01～11中任选7个或多个号码，选号与奖号五个号相同，即中奖<em class="red">26</em>元',
        name: '任七'
      })
      .set('r8', {
        bonus: 9,
        tip: '从01～11中任选8个或多个号码，选号与奖号五个号相同，即中奖<em class="red">9</em>元',
        name: '任八'
      })
  }
  /**
   * [initNumber 初始化号码]
   * @return {[type]} [description]
   */
  initNumber() {
    for (let i = 1; i < 12; i++) {
      this.number.add(('' + i).padStart(2, '0'))
    }
  }

  /**
   * [setOmit 设置遗漏数据]
   * @param {[type]} omit [遗漏数据]
   */
  setOmit(omit) {

    let self = this;

    self.omit.clear();

    for (let [index, item] of omit.entries()) {
      self.omit.set(index, item);
      self.$omit_el.eq(index).text(item[0]);
    }
  }

  /**
   * [setOpenCode 设置开奖]
   * @param {[type]} code [开奖码]
   * @param {[type]} issue [码期]
   * @param {[type]} size [大小比]
   * @param {[type]} oddEven [奇偶比]
   * @param {[type]} todaySoldIssue [今天已售期数]
   */
  setOpenCode(code, issue, size, oddEven, todaySoldIssue) {

    let self = this;

    self.open_code.clear();

    for (let [index, item] of code.entries()) {
      self.open_code.add(item);
      self.$open_code_list_el.eq(index).text(item.padStart(2, '0'));
      self.$open_code_td_el.eq(index).text(item.padStart(2, '0'));
    }

    self.$open_issue_el.text(issue);
    self.$size_el.text(size);
    self.$odd_even_el.text(oddEven);
    self.$sold_issue_el.text(todaySoldIssue);
    self.$residue_issue_el.text(self.todayTotalIssue - todaySoldIssue);
  }

  /**
   * [toggleCodeActive 号码选中取消]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  toggleCodeActive(e) {
    let self = this;
    $(e.currentTarget).toggleClass('btn-boll-active');
    self.getCount();
  }

  /**
   * [changePlayNav 切换玩法]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  changePlayNav(e) {
    let self = this;
    let $cur = $(e.currentTarget);
    $cur.addClass('active').siblings().removeClass('active');

    self.cur_play = $cur.attr('desc').toLocaleLowerCase();

    self.$tip.html(self.play_list.get(self.cur_play).tip);

    self.$btn_boll_el.removeClass('btn-boll-active');

    self.getCount();
  }

  /**
   * [assistHandle 操作区]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  assistHandle(e) {
    e.preventDefault();
    let self = this;
    let index = $(e.currentTarget).index();
    let activeClass = 'btn-boll-active';

    self.$btn_boll_el.removeClass(activeClass);

    // 全
    if (index === 0) {
      self.$btn_boll_el.addClass(activeClass);
    }
    // 大
    else if (index === 1) {
      self.$btn_boll_el.each(function (i, t) {
        if (t.textContent > 5) {
          $(t).addClass(activeClass)
        }
      })
    }
    // 小
    else if (index === 2) {
      self.$btn_boll_el.each(function (i, t) {
        if (t.textContent < 6) {
          $(t).addClass(activeClass)
        }
      })
    }
    // 奇
    else if (index === 3) {
      self.$btn_boll_el.each(function (i, t) {
        if (t.textContent % 2 == 1) {
          $(t).addClass(activeClass)
        }
      })
    }
    // 偶
    else if (index === 4) {
      self.$btn_boll_el.each(function (i, t) {
        if (t.textContent % 2 == 0) {
          $(t).addClass(activeClass)
        }
      })
    }

    self.getCount();
  }

  /**
   * [getName 获取当前彩票名称]
   * @return {[type]} [description]
   */
  getName() {
    return this.name
  }

  /**
   * [addCode 添加号码]
   */
  addCode() {
    let self = this;
    let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
    let active = $active ? $active.length : 0;
    let count = self.computeCount(active, self.cur_play);
    if (count) {
      self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count);
    }
  }

  /**
   * [addCodeItem 添加单次号码]
   * @param {[type]} code     [description]
   * @param {[type]} type     [description]
   * @param {[type]} typeName [description]
   * @param {[type]} count    [description]
   */
  addCodeItem(code, type, typeName, count) {
    let self = this;
    const tpl = `
      <li codes="${type}|${code}" bonus="${count * 2}" count="${count}">
      <div class="code">
        <b>${typeName}${count > 1 ? '复式' : '单式'}</b>
        <b class="em">${code}</b>
        [${count}注,<em class="code-list-money">${count * 2}</em>元]
      </div>
    </li>
    `;
    self.$cart_el.append(tpl);
    self.getTotal();
  }

  /**
   * [getTotal 获取注数]
   * @return {[type]} [description]
   */
  getCount() {
    let self = this;
    let active = $('.boll-list .btn-boll-active').length;
    let count = self.computeCount(active, self.cur_play);
    let range = self.computeBonus(active, self.cur_play);
    let money = count * 2;
    let win1 = range[0] - money;
    let win2 = range[1] - money;
    let tpl;
    let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
    let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;

    if (count === 0) {
      tpl = `您选了 <b class="red">${count}</b> 注，共 <b class="red">${money}</b> 元`
    }
    else if (range[0] === range[1]) {
      tpl = `您选了 <b>${count}</b> 注，共 <b>${money}</b> 元  <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 元，
			您将${win1 >= 0 ? '盈利' : '亏损'}
			<strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)} </strong> 元</em>`
    }
    else {
      tpl = `您选了 <b>${count}</b> 注，共 <b>${money}</b> 元  <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 至 <strong class="red">${range[1]}</strong> 元，
			您将${(win1 < 0 && win2 < 0) ? '亏损' : '盈利'}
			<strong class="${win1 >= 0 ? 'red' : 'green'}">${c1} </strong>
			至 <strong class="${win2 >= 0 ? 'red' : 'green'}"> ${c2} </strong>
			元</em>`
    }
    self.$sel_info_el.html(tpl);

  }

  /**
   * [getTotal 计算所有金额]
   * @return {[type]} [description]
   */
  getTotal() {
    let self = this;
    let count = 0;
    $('.codelist li').each(function (index, item) {
      count += $(item).attr('count') * 1;
    });
    self.$count_el.text(count);
    self.$money_el.text(count * 2);
  }

  /**
   * [getRandom 生成随机数]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  getRandom(num) {
    let arr = [], index;
    let number = Array.from(this.number);
    while (num--) {
      index = Number.parseInt(Math.random() * number.length);
      arr.push(number[index]);
      number.splice(index, 1);
    }
    return arr.join(' ')
  }

  /**
   * [getRandomCode 添加随机号码]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  getRandomCode(e) {
    e.preventDefault();

    let self = this;
    let num = $(e.currentTarget).attr('count');
    let play = this.cur_play.match(/\d+/g)[0];

    if (num === '0') {
      self.$cart_el.html('');
      self.$count_el.text(0);
      self.$money_el.text(0);
    } else {
      for (let i = 0; i < num; i++) {
        self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
      }
    }
  }

}

export default Base
