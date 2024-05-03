(function () {
	const checkAll = document.getElementById('checkAll')
	const tbody = document.getElementsByTagName('tbody')[0]
	const checkOneLists = document.getElementsByTagName('input')
	const ths = document.getElementsByTagName('th')
	let rows = [...tbody.getElementsByTagName('tr')]
	let checkedNum = 0

	// 初始化，注册交互事件
	const initEvents = function () {
		checkAll.addEventListener('click', onCheckAllClick)
		tbody.addEventListener('click', onCheckOneClick)
		for (let i = 1; i < ths.length; i++) {
			sortFn(ths[i], i)
		}
	}

	// 点击全选按钮
	const onCheckAllClick = function () {
		for (let i = 0; i < checkOneLists.length; i++) {
			checkOneLists[i].checked = this.checked
		}
		checkedNum = this.checked ? checkOneLists.length - 1 : 0
	}

	// 点击选中按钮
	const onCheckOneClick = function (e) {
		const target = e.target
		if (target.tagName !== 'INPUT') return
		if (target.checked) {
			checkedNum++
			checkAll.checked = checkedNum === checkOneLists.length - 1
		} else {
			checkedNum--
			checkAll.checked = false
		}
	}

	// 表格排序
	const sortFn = function (th, index) {
		th.addEventListener('click', function () {
			if (index % 2) {
				rows = rows.sort((a, b) => a.getElementsByTagName('td')[index].innerHTML - b.getElementsByTagName('td')[index].innerHTML)
			} else {
				rows = rows.sort((a, b) => a.getElementsByTagName('td')[index].innerHTML.localeCompare(b.getElementsByTagName('td')[index].innerHTML, 'zh'))
			}
			for (let i = 0; i < rows.length; i++) {
				tbody.appendChild(rows[i])
			}
		})

	}
	initEvents()
})()