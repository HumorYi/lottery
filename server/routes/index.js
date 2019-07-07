var express = require('express');
var mockjs = require('mockjs');
var initData = require('../init-data');
var router = express.Router();

var makeIssue = function (type) {

	var date = new Date();
	var dateTime = date.getTime();

	var first_issue_date = new Date();
	first_issue_date.setHours(9);
	first_issue_date.setMinutes(10);
	first_issue_date.setSeconds(0);

	var end_issue_date = new Date(first_issue_date.getTime() + 1000 * 60 * 10 * 77);

	var cur_issue, end_time, state, todaySoldIssue;

		// 正常销售
	if (dateTime > first_issue_date.getTime() && dateTime < end_issue_date.getTime()) {
		var cur_issue_date = new Date();
		cur_issue_date.setHours(9);
		cur_issue_date.setMinutes(0);
		cur_issue_date.setSeconds(0);

		var minus_time = dateTime - cur_issue_date.getTime();
		todaySoldIssue = Math.ceil(minus_time / 1000 / 60 / 10);
		var end_date = new Date(cur_issue_date.getTime() + 1000 * 60 * 10 * todaySoldIssue);

		end_time = end_date.getTime();

		cur_issue = [
			end_date.getFullYear(),
			('0' + (end_date.getMonth() + 1)).slice(-2),
			('0' + end_date.getDate()).slice(-2),
			('0' + todaySoldIssue).slice(-2)
		].join('')
	}
	else {
		// 今天销售已截止

		var today_end = new Date();
		today_end.setHours(23);
		today_end.setMinutes(59);
		today_end.setSeconds(59);

		// 第二天
		if (today_end.getTime() - dateTime < 2 * 60 * 60 * 1000) {
			first_issue_date.setDate(date.getDate() + 1);
			todaySoldIssue = 1;
		}

		end_time = first_issue_date.getTime();

		cur_issue = [
			first_issue_date.getFullYear(),
			('0' + (first_issue_date.getMonth() + 1)).slice(-2),
			('0' + first_issue_date.getDate()).slice(-2),
			'0' + todaySoldIssue
		].join('')
	}

	state = end_time - new Date().getTime() > 1000 * 60 * 2
		? '正在销售'
		: '开奖中';

	return {
		issue: cur_issue,
		state: state,
		end_time: end_time,
		todaySoldIssue: todaySoldIssue - 1
	}
}

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/omit', function (req, res, next) {
	res.json(mockjs.mock({
		'data|11': [/[1-9]{1,3}|0/],
		'issue': /[1-9]{8}/
	}))
});

router.get('/opencode', function (req, res, next) {

	var issueObj = makeIssue();

	var data = mockjs.mock({
		'data': [/[1-3]/, /[4-5]/, /[6-7]/, /[8-9]/, /1[0-1]/]
	}).data;

	res.json({
		data: data,
		size: '3:2',
		oddEven: '4:1',
		issue: issueObj.issue,
		todaySoldIssue: issueObj.todaySoldIssue
	});
});

router.get('/state', function (req, res, next) {
	var state = makeIssue();

	res.json(state);
});

router.get('/init-data', function (req, res, next) {
	var type = req.query.type;
	var data = {};

	for (let i = initData.length - 1; i >= 0; i--) {
		if (initData[i].type === type) {
			data = initData[i];
			break;
		}
	}

	res.json(data);
});

module.exports = router;
