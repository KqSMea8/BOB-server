Chart.pluginService.register({
	beforeDraw: function (chart) {
		if (chart.config.options.elements.center) {

			const ctx = chart.chart.ctx;
			const centerConfig = chart.config.options.elements.center;
			const fontStyle = centerConfig.fontStyle || 'Arial';
			const txt = centerConfig.text;
			const color = centerConfig.color || '#000';
			const sidePadding = centerConfig.sidePadding || 20;
			const sidePaddingCalculated = (sidePadding / 20) * (chart.innerRadius * 20)
			ctx.font = "30px " + fontStyle;
			const stringWidth = ctx.measureText(txt).width;
			const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
			const widthRatio = elementWidth / stringWidth;
			const newFontSize = Math.floor(20 * widthRatio);
			const elementHeight = (chart.innerRadius * 2);
			const fontSizeToUse = Math.min(newFontSize, elementHeight);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
			const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2 + 50);
			ctx.font = fontSizeToUse + "px " + fontStyle;
			ctx.fillStyle = color;
			ctx.fillText(txt, centerX, centerY);
		}
	}
});