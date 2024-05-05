const urls = ['./images/1.png', './images/2.jpg', './images/3.jpg', './images/4.png'];

let curIndex = 1
let isPlaying = false;

const carousel = document.querySelector(".carousel")
const footer = document.querySelector('.footer')

function init() {
	let images = `<div class="item">
            	     		<a href="#"><img src="${urls[urls.length - 1]}" alt="st"/></a>
        		   		</div>`
	let dots = ''
	for (let i = 0; i < urls.length; i++) {
		images += `<div class="item">
            	     <a href="#"><img src="${urls[i]}" alt="st"/></a>
        		   </div>`
		dots += `<div class="dot ${i === 0 ? 'active' : ''}"></div>`
	}
	images += `<div class="item">
            	     <a href="#"><img src="${urls[0]}" alt="st"/></a>
        		   </div>`
	carousel.innerHTML = images
	footer.innerHTML = dots
}
init()

const dots = document.querySelectorAll('.dot')

// 切换展示图片
function moveTo(index) {
	if (isPlaying) return
	isPlaying = true
	carousel.style.transform = `translateX(-${index}00%)`
	curIndex = index
	setIndicatorStatus()
}

// 设置指示器激活状态
function setIndicatorStatus() {
	document.querySelector('.active').classList.remove('active')
	dots[(curIndex + dots.length - 1) % dots.length].classList.add('active')
}

// 自动切换定时器id
let timer

function autoPlay() {
	if (timer) return
	timer = setInterval(() => {
		moveTo(curIndex + 1)
	}, 2000)
}

function stopPlay(timer) {
	clearInterval(timer)
	timer = null
}

function registerEvent() {
	// 鼠标点击指示器跳转
	for (let i = 0; i < dots.length; i++) {
		dots[i].addEventListener('click', () => {
			moveTo(i + 1)
		})
	}
	// 当切换到边界添加的额外图片时特殊处理
	carousel.addEventListener('transitionend', () => {
		isPlaying = false
		if (curIndex === dots.length + 1) {
			carousel.style.transition = 'none'
			carousel.style.transform = `translateX(-100%)`
			curIndex = 1
			setTimeout(() => {
				carousel.style.transition = '0.3s'
			}, 0)
		}
		if (curIndex === 0) {
			carousel.style.transition = 'none'
			carousel.style.transform = `translateX(-${dots.length}00%)`
			curIndex = dots.length
			setTimeout(() => {
				carousel.style.transition = '0.3s'
			}, 0)
		}
	})
	// 鼠标点击左右指示器切换上下图
	const left = document.querySelector('.left')
	const right = document.querySelector('.right')
	left.addEventListener('click', () => {
		moveTo(curIndex - 1)
	})
	right.addEventListener('click', () => {
		moveTo(curIndex + 1)
	})
	// 开始轮播
	autoPlay()
	// 鼠标移入停止切换
	carousel.addEventListener('mouseenter', () => {
		stopPlay(timer)
	})
	// 鼠标移出继续切换
	carousel.addEventListener('mouseleave', () => {
		autoPlay()
	})
}

registerEvent()

