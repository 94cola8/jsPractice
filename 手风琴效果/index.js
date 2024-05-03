const titles = document.querySelectorAll('.menu h2')
const totalTime = 400  //播放动画总时长
for (let i = 0; i < titles.length; i++) {
	titles[i].addEventListener('click', (e) => {
		const beforeOpen = document.querySelector('.submenu[status="open"]')
		if (beforeOpen) {
			closeSubmenu(beforeOpen)
		}
		toggleSubmenu(e.target.nextElementSibling)
	})
}

function openSubmenu(submenu) {
	const status = submenu.getAttribute('status')
	if (status && status !== 'closed') {
		return
	}
	submenu.setAttribute('status', 'playing')
	const lis = submenu.children
	createAnimation({
		from: 0,
		to: lis[0].clientHeight * lis.length,
		totalTime,
		onMove(now, _) {
			submenu.style.height = now + 'px'
		},
		onEnd() {
			submenu.setAttribute('status', 'open')
		}
	})
}

function closeSubmenu(submenu) {
	const status = submenu.getAttribute('status')
	if (status !== 'open') {
		return
	}
	submenu.setAttribute('status', 'playing')
	createAnimation({
		from: submenu.clientHeight,
		to: 0,
		totalTime,
		onMove(now, _) {
			submenu.style.height = now + 'px'
		},
		onEnd() {
			submenu.setAttribute('status', 'closed')
		}
	})
}

function toggleSubmenu(submenu) {
	const status = submenu.getAttribute('status')
	if (status === 'open') {
		closeSubmenu(submenu)
	} else if (status === 'closed' || status === null) {
		openSubmenu(submenu)
	}
}