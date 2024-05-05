const urls = ['./images/0.jpg', './images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg', './images/6.jpg', './images/7.jpg', './images/8.jpg', './images/9.jpg', './images/10.jpg', './images/11.jpg', './images/12.jpg', './images/13.jpg', './images/14.jpg', './images/15.jpg', './images/16.jpg', './images/17.jpg', './images/18.jpg', './images/19.jpg', './images/20.jpg', './images/21.jpg', './images/22.jpg', './images/23.jpg', './images/24.jpg', './images/25.jpg', './images/26.jpg', './images/27.jpg', './images/28.jpg', './images/29.jpg', './images/30.jpg', './images/31.jpg', './images/32.jpg', './images/33.jpg', './images/34.jpg', './images/35.jpg', './images/36.jpg', './images/37.jpg', './images/38.jpg', './images/39.jpg', './images/40.jpg']


const container = document.querySelector('.container')
let imageWidth = 220

function cal() {
	const containerWidth = container.clientWidth
	const columns = Math.floor(containerWidth / imageWidth)
	const gap = (containerWidth - columns * imageWidth) / (columns + 1)
	return {gap, columns}
}

function setPositions() {
	const info = cal()
	const arr = new Array(info.columns).fill(info.gap)

	container.style.marginTop = info.gap + 'px'

	for (let i = 0; i < container.children.length; i++) {
		const image = container.children[i]
		const minHeight = Math.min(...arr)
		const minIndex = arr.indexOf(minHeight)
		image.style.top = minHeight + 'px'
		arr[minIndex] += info.gap + image.height
		image.style.left = (minIndex + 1) * info.gap + minIndex * imageWidth + 'px'
	}

	container.style.height = Math.max(...arr) + info.gap + 'px'
	container.style.marginBottom = info.gap + 'px'
}

function createImg() {
	for (let i = 0; i < urls.length; i++) {
		const image = document.createElement("img");
		image.src = urls[i];
		image.style.width = `${imageWidth}px`;
		container.appendChild(image)
		image.onload = setPositions
	}
}

function bindEvent() {
	let timer
	window.onresize = ()=>{
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(setPositions,200)
	}
}

function main() {
	createImg()
	bindEvent()
}

main()