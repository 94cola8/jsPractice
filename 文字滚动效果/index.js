(function (){
	// 将列表的第一个元素克隆到列表最后一个
	const list = document.querySelector('.list')
	function cloneFirst(){
		const firstLi = list.children[0]
		const lastLi = firstLi.cloneNode(true)
		list.appendChild(lastLi)
	}
	cloneFirst()

	// 每隔一段时间将列表滚动到下一个位置
	const duration = 2000
	let curIndex = 0
	const liHeight = document.querySelector('.list li').clientHeight
	setInterval(moveNext, duration)
	function moveNext() {
		curIndex++
		list.scrollTop = curIndex * liHeight
		if (curIndex === list.children.length) {
			list.style.scrollBehavior = 'auto'
			list.scrollTop = 0
			curIndex = 0
			list.style.scrollBehavior = 'smooth'
		}
	}
})()