// 通用变更label的方法
function initLabels(index) {
	// 如果没有label就直接返回
	if (!labels[index]) return;

	for (var i = 0; i < labels[index].labels.length; i++) {
		const id = `${index}_${labels[index].labels[i].id}`
		// 如果没有这个元素才创建
		if (!document.getElementById(id)) {
			var myvar = `<span class="label_1" id="${id}" >${labels[index].labels[i].name}</span>`;
			var elemDiv = document.createElement('div');
			elemDiv.innerHTML = myvar;
			document.getElementById(`part_${index+1}`).appendChild(elemDiv);
		}

		$(`#${id}`).css({
			'position': 'absolute',
			// 现在的相机高度为200，fov角度为60，所以需要用400/sqrt(3)
			'left': (stacks[index].position.x / 400 * Math.sqrt(3) + 0.5) * window.innerWidth + (Math.random() - 0.7) * 300,
			'top': (0.5 - stacks[index].position.y / 200 * Math.sqrt(3)) * window.innerHeight + (Math.random() - 0.7) * 300,
			'opacity': `${Math.random() + 0.4}`,
			'font-size': `${2.5 * (Math.random() + 1)}em`
		});
	};

	setTimeout(() => {
		for (var i = 0; i < labels[index].products.length; i++) {
			const id = `${index}_${labels[index].products[i].id}`
			// 如果没有这个元素才创建
			if (!document.getElementById(id)) {
				var myvar = `<span class="label_2" id="${id}" >${labels[index].products[i].name}</span>`;
				var elemDiv = document.createElement('div');
				elemDiv.innerHTML = myvar;
				document.getElementById(`part_${index + 1}`).appendChild(elemDiv);
			}

			$(`#${id}`).css({
				'position': 'absolute',
				// 现在的相机高度为200，fov角度为60，所以需要用400/sqrt(3)
				'left': (stacks[index].position.x / 400 * Math.sqrt(3) + 0.5) * window.innerWidth + (Math.random() - 0.7) * 500,
				'top': (0.5 - stacks[index].position.y / 200 * Math.sqrt(3)) * window.innerHeight + (Math.random() - 0.7) * 500,
				'opacity': `${Math.random() + 0.4}`,
				'font-size': `${3 * (Math.random() + 1)}em`
			});
		};
	}, 2000)
}

jQuery(document).ready(function ($) {

	var strings = [{
			"name": "资产评级",
			"value": '100'
		},
		{
			"name": "风险偏好",
			"value": '92'
		},
		{
			"name": "活期余额",
			"value": '87'
		},
		{
			"name": "代发工资",
			"value": '86'
		},
		{
			"name": "理财90天日均",
			"value": '85'
		},
		{
			"name": "月支出余额",
			"value": '82'
		},
		{
			"name": "月流出余额",
			"value": '77'
		},
		{
			"name": "最高持卡级别",
			"value": '75'
		},
		{
			"name": "医保月入账金额",
			"value": '72'
		},
		{
			"name": "月流出笔数",
			"value": '66'
		},
		{
			"name": "网购频繁度-外部",
			"value": '63'
		},
		{
			"name": "乘机次数-外部",
			"value": '63'
		},
		{
			"name": "平均票价-外部",
			"value": '60'
		},
		{
			"name": "消费能力得分-外部",
			"value": '60'
		},
		{
			"name": "高中低消费人群标记-外部",
			"value": '57'
		},
		{
			"name": "职业分类",
			"value": '54'
		},
		{
			"name": "最高持卡级别",
			"value": '51'
		},
		{
			"name": "电商销售敏感度",
			"value": '48'
		},
		{
			"name": "信用卡当月账单金额",
			"value": '47'
		},
		// {
		// 	"name": "信用卡额度",
		// 	"value": '42'
		// },
		// {
		// 	"name": "贷款余额",
		// 	"value": '41'
		// },
		// {
		// 	"name": "贷款金额",
		// 	"value": '36'
		// },
		// {
		// 	"name": "不良贷款合计",
		// 	"value": '34'
		// },
		// {
		// 	"name": "购买历史",
		// 	"value": '31'
		// },
		// {
		// 	"name": "累计债务重合次数",
		// 	"value": '27'
		// },
		// {
		// 	"name": "总费用",
		// 	"value": '22'
		// },
		// {
		// 	"name": "购买次数",
		// 	"value": '14'
		// }
	];

	if (document.getElementById("sectionContainer") !== null) {
		for (var i = 0; i < strings.length; i++) {
			var myvar = '<div class="barWrapper">' +
				'				 <span class="progressText"><B>' + strings[i].name + '</B></span>' +
				'				<div class="progress">' +
				'				  <div class="progress-bar" role="progressbar" aria-valuenow=' + strings[i].value + ' ' + 'aria-valuemin="0" aria-valuemax="60" >' +
				'				  </div>' +
				'				</div>' +
				'				</div>';

			var elemDiv = document.createElement('div');
			elemDiv.innerHTML = myvar;
			document.getElementById("sectionContainer").appendChild(elemDiv);
		}
	}


	setTimeout(function () {
		$(".progress-bar").each(function (i) {
			each_bar_width = $(this).attr('aria-valuenow');
			$(this).delay(i * 500).width(each_bar_width + '%');
		});
	}, 2500);

	//取消显示文字
	setTimeout(function () {
		initLabels(0)
		setTimeout(function () {
			initLabels(1)
			setTimeout(function () {
				initLabels(2)
			}, 0);
		}, 0);
	}, 0);
});