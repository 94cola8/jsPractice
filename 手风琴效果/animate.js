function createAnimation(options) {
	const from = options.from;  // 起始值
	const to = options.to;  // 结束值
	const totalTime = options.totalTime || 1000  // 变化总时间
	const duration = options.duration || 15  // 动画间隔时间

	const times = Math.floor(totalTime / duration)  // 变化次数
	const dis = (to - from) / times  // 每一次变化改变的值
	let curTimes = 0  // 当前变化的次数
	let now = from

	let timeId = setInterval(function () {
		now += dis
		curTimes++
		if (curTimes >= times) {
			now = to
			options.onEnd && options.onEnd(from, to)
			options.onMove && options.onMove(now, to)
			clearInterval(timeId)
			return
		}
		options.onMove && options.onMove(now, to)
	}, duration)
}