class Pager{
	constructor(currentPage = 1, pageNum, mostNum, container){
		this.currentPage = currentPage;
		this.pageNum = pageNum;

		this.mostNum = mostNum;
		this.container = document.getElementById(container);
		this.createPager()
	}

	/**
	 * @description: 创建分页器
	 * @author: cola
	 * @date: 2024--05--06 20--22
	 */
	createPager(){
		this.container.className = 'paging'
		// 首页和上一页
		if (this.currentPage === 1) {
			this.container.appendChild(this.createAnchorElement('首页',2))
			this.container.appendChild(this.createAnchorElement('上一页',2))
		}else {
			this.container.appendChild(this.createAnchorElement('首页',0))
			this.container.appendChild(this.createAnchorElement('上一页',0))
		}

		// 记录分页器起始页和结束页
		let start = this.currentPage - Math.floor(this.mostNum / 2)
		let	end = start + this.mostNum - 1
		if(start < 1) {
			start = 1
			end = this.mostNum
		}
		if(end > this.pageNum) {
			end = this.pageNum
			start = end - this.mostNum + 1 >= 1 ? end - this.mostNum + 1 : 1
		}

		for (let i = start; i <= end; i++) {
			if(this.currentPage === i) {
				this.container.appendChild(this.createAnchorElement(i,1))
				continue
			}
			this.container.appendChild(this.createAnchorElement(i,0))
		}

		//尾页和下一页
		if (this.currentPage === this.pageNum) {
			this.container.appendChild(this.createAnchorElement('下一页',2))
			this.container.appendChild(this.createAnchorElement('尾页',2))
		}else {
			this.container.appendChild(this.createAnchorElement('下一页',0))
			this.container.appendChild(this.createAnchorElement('尾页',0))
		}
	}

	/**
	 * @description: 描述信息
	 * @author: cola
	 * @date: 2024--05--06 20--33
	 * @param {String | Number} content - 显示的文字内容
	 * @param {Number} type - 样式类型，0代表默认，1代表选中，2代表禁用
	 * @return {HTMLAnchorElement} a标签元素
	 */
	 createAnchorElement(content, type){
		const types = ['', 'active', 'disabled']
		const link = document.createElement('a')
		link.innerText = content
		link.className = types[type]
		if (typeof content === 'number') {
			link.addEventListener('click',(link)=>{
				this.currentPage = Number(link.target.innerText)
				this.removeAllChildren()
				this.createPager()
			})
		}
		if (content === '首页') {
			link.addEventListener('click',()=>{
				this.currentPage = 1
				this.removeAllChildren()
				this.createPager()
			})
		}
		if (content === '上一页') {
			link.addEventListener('click',()=>{
				this.currentPage = this.currentPage - 1
				this.removeAllChildren()
				this.createPager()
			})
		}
		if (content === '下一页') {
			link.addEventListener('click',()=>{
				this.currentPage = this.currentPage + 1
				this.removeAllChildren()
				this.createPager()
			})
		}
		if (content === '尾页') {
			link.addEventListener('click',()=>{
				this.currentPage = this.pageNum
				this.removeAllChildren()
				this.createPager()
			})
		}
		return link
	}

	removeAllChildren() {
		while (this.container.firstChild) {
			this.container.removeChild(this.container.firstChild);
		}
	}
}
