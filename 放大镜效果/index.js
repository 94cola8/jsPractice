function $(selector) {
	return document.querySelector(selector)
}

function $$(selector) {
	return document.querySelectorAll(selector)
}

const images = {
	small: ['imgA_1.jpg', 'imgB_1.jpg', 'imgC_1.jpg'],
	middle: ['imgA_2.jpg', 'imgB_2.jpg', 'imgC_2.jpg'],
	large: ['imgA_3.jpg', 'imgB_3.jpg', 'imgC_3.jpg']
}


const doms = {
	container: $('.container'),
	smallImg: $('.img-list'),
	middleImg: $('.left'),
	largeImg: $('.right'),
	mask: $('.mask')
}


// 初始化首图和缩略图列表
function init() {
	doms.middleImg.style.backgroundImage = `url(./images/${images.middle[0]})`
	doms.largeImg.style.backgroundImage = `url(./images/${images.large[0]})`
	let str = ''
	for (let i = 0; i < images.small.length; ++i) {
		str += `<li class="${i === 0 ? 'active' : ''}" style="background-image: url(./images/${images.small[i]})"></li>`
	}
	doms.smallImg.innerHTML = str
}

// 绑定事件
function bindEvent() {
	// 点击缩略图切换
	doms.smallImg.addEventListener('click', (e) => {
		if (e.target.tagName !== 'LI') return
		const lis = $$('li')
		for (let i = 0; i < lis.length; ++i) {
			lis[i].className = ''
		}
		e.target.className = 'active'
		const index = [].indexOf.call(lis, e.target)
		doms.middleImg.style.backgroundImage = `url(./images/${images.middle[index]})`
		doms.largeImg.style.backgroundImage = `url(./images/${images.large[index]})`
	})

	// 鼠标移入展示图
	doms.middleImg.addEventListener('mousemove', (e) => {
		doms.mask.style.opacity = '1'
		// 计算蒙层x偏移
		let left = e.clientX - doms.middleImg.offsetLeft - doms.mask.offsetWidth / 2
		let top = e.clientY - doms.middleImg.offsetTop - doms.mask.offsetHeight / 2

		if (left < 0) left = 0
		if (top < 0) top = 0

		left = left >= doms.middleImg.offsetWidth - doms.mask.offsetWidth ? doms.middleImg.offsetWidth - doms.mask.offsetWidth : left
		top = top >= doms.middleImg.offsetHeight - doms.mask.offsetHeight ? doms.middleImg.offsetHeight - doms.mask.offsetHeight : top

		doms.mask.style.left = `${left}px`
		doms.mask.style.top = `${top}px`

		// 调整大图的位置
		doms.largeImg.style.opacity = '1'
		doms.largeImg.style.backgroundPositionX = -left + 'px'
		doms.largeImg.style.backgroundPositionY = -top + 'px'
	})


	// 鼠标移出展示图
	doms.middleImg.addEventListener('mouseleave', () => {
		doms.mask.style.opacity = '0'
		doms.largeImg.style.opacity = '0'
	})
}

function main() {
	init()
	bindEvent()
}

main()