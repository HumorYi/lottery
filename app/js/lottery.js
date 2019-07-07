import 'babel-polyfill';
import $ from 'jquery';

import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from './lottery/calculate.js';
import Interface from './lottery/interface.js';

const copyProperties = (target, source) => {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

const mix = (...mixins) => {
  class Mix { }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix
}

class Lottery extends mix(Base, Calculate, Interface, Timer) {
  constructor(name = 'syy', type = '11选5', issue = '**', state = '**') {
    super();

    this.name = name;
    this.type = type;
    this.issue = issue;
    this.state = state;

    this.todaySoldTime;
    this.todayTotalIssue;
    this.openMinutes;
    this.moneyReturnRate;

    this.omit = new Map();
    this.play_list = new Map();
    this.number = new Set();
    this.open_code = new Set();
    this.open_code_list = new Set();

    this.cur_play = 'r5';

    this.$el = $('');
    this.$countdown_el = $('#countdown');
    this.$state_el = $('.state_el');
    this.$cart_el = $('.codelist');
    this.$omit_el = $('.boll-list ul li span');
    this.$issue_el = $('#curr_issue');
    this.$open_issue_el = $('.open_issue');
    this.$open_code_list_el = $('#open_code_list li');
    this.$open_code_td_el = $('.open_code_td em');
    this.$sold_issue_el = $('.sold_issue');
    this.$residue_issue_el = $('.residue_issue');
    this.$size_el = $('.size');
    this.$odd_even_el = $('.odd-even');
    this.$btn_boll_el = $('.boll-list .btn-boll');
    this.$count_el = $('#count');
    this.$money_el = $('#money');
    this.$sel_info_el = $('.sel_info');
    this.$tip = $('#zx_sm span');

    $('.type').text(this.type);

    this.initEvent();
    this.initNumber();
    this.initPlayList();
    this.initData(this.type);
  }

  /**
   * [initEvent 初始化事件]
   * @return {[type]} [description]
   */
  initEvent() {
    let self = this;
    $('#plays').on('click', 'li', self.changePlayNav.bind(self));
    $('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
    $('#confirm_sel_code').on('click', self.addCode.bind(self));
    $('.dxjo').on('click', 'li', self.assistHandle.bind(self));
    $('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
  }

  /**
   * [initEvent 初始化数据]
   * @return {[type]} [description]
   */
  initData(type) {

    var self = this;

    self.getInitData(type)
      .then(data => {
        self.todaySoldTime = data.todaySoldTime;
        self.todayTotalIssue = data.todayTotalIssue;
        self.openMinutes = data.openMinutes;
        self.moneyReturnRate = data.moneyReturnRate;

        $('.today-sold-time').text(self.todaySoldTime);
        $('.today-total-issue').text(self.todayTotalIssue);
        $('.open-minutes').text(self.openMinutes);
        $('.money-return-rate').text(self.moneyReturnRate);

        self.updateState();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * [updateState 状态更新]
   * @return {[type]} [description]
   */
  updateState() {
    let self = this;

    this.getState()
      .then((data) => {
        self.issue = data.issue;
        self.end_time = data.end_time;
        self.state = data.state;

        self.$issue_el.text(self.issue);
        self.$state_el.text(self.state);

        return self.getOmit(self.issue);
      })
      .then(() => {
        return self.getOpenCode(self.issue);
      })
      .then(() => {
        self.countdown(
          self.end_time,
          (time) => self.$countdown_el.html(time),
          () => setTimeout(self.updateState.bind(self), 500)
        );
      })
      .catch((err) => {
        throw new Error(err);
      });;
  }
}

export default Lottery;
