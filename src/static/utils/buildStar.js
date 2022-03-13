class Point {
	constructor(x, y, cx) {
		this.x = x
		this.y = y
		this.cx = cx
	}
}

class Star {
	constructor(position, radius) {
		this.position = position
		this.radius = radius
	}

	updateRadius(r) {
		this.radius = r
	}
	
	updatePosition(x, y, cx) {
		this.position = {x, y, cx}
	}

	drawInCanvas(ctx) {
		const { x, y } = this.position
		const r = this.radius
		ctx.save()
		const rad = ctx.createRadialGradient(x, y, 0, x, y, r)
		// 给这个星点设置一个渐变色
		rad.addColorStop(0, `rgba(255,255,255, 0.8)`)
		rad.addColorStop(0.1, `rgba(255,255,255, 0.8)`)
		rad.addColorStop(0.2, `rgba(255,255,255,0.08)`)
		rad.addColorStop(1, 'rgba(255,255,255,0)')
		ctx.fillStyle = rad
		ctx.beginPath()
		ctx.arc(x, y, r, 0, 2 * Math.PI, true)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
	}

	drawMeteor(ctx, move = false) {
		ctx.save()
		if(move) {
			this.updatePosition(this.position.y, this.position.x, this.position.cx)
		}
		let { x, y, cx } = this.position
		y = -1 * (cx - x) + y
		const r = 15
		// createRadialGradient()
		const rad = ctx.createRadialGradient(x, y, 0, x, y, r)
		rad.addColorStop(0, `rgba(255,255,255, 0.8)`)
		rad.addColorStop(0.1, `rgba(255,255,255, 0.8)`)
		rad.addColorStop(0.2, `rgba(255,255,255,0.08)`)
		rad.addColorStop(1, 'rgba(255,255,255,0)')
		ctx.fillStyle = rad
		ctx.beginPath()
		ctx.arc(x, y, r, 0, 2 * Math.PI, true)
		ctx.closePath()
		ctx.fill()
		ctx.restore()

		// 计算尾巴
		const range = Math.atan(-1)
		const wY = y + Math.sin(range) * 200
		const wX = x + Math.sin(range) * 100

		const x1 = x + 3
		const y1 = y
		const x2 = x
		const y2 = y - 3
		
		ctx.save()
		const rad2 = ctx.createRadialGradient(x, y, 0, x, y, 100)
		rad2.addColorStop(0, 'rgba(255,255,255,.3)')
		rad2.addColorStop(1, 'rgba(255,255,255,0)')
		ctx.fillStyle = rad2
		ctx.beginPath()
		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.lineTo(wX, wY)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
	}
}

// 坐标集
const starList = []
let meteorList = []
let width = 0
let height = 0
let context = {}


function init(ctx, num) {
	width = document.body.clientWidth
	height = document.body.clientHeight
	context = ctx
	// 初始化一定数目的星星坐标
	for(let i = 0; i < num; i++) {
		const x = Math.random() * width
		const y = Math.random() * height
		const r = Math.random() * 10
		const star = new Star(new Point(x,y), r)
		starList.push(star)
		// 初始化星星
		star.drawInCanvas(ctx)
	}
	return starList
}

function draw() {
	context.clearRect(0, 0, width, height)
	for (const key in starList) {
		const e = starList[key]
		let r = e.radius + Math.random()*2 - 1
		r = Math.max(0, r)
		r = Math.min(10, r)
		e.updateRadius(r)
		e.drawInCanvas(context)
	}
	// if(meteorList.length) {
	// 	let newList = []
	// 	meteorList.forEach(e => {
	// 		// 高度
	// 		e.position.cx -= 5
	// 		e.position.y += 15
	// 		if(e.position.cx > 0 || ((-1)*(e.position.cx - e.position.x) + e.position.y < height)) {
	// 			newList.push(e)
	// 		}
	// 		e.drawMeteor(context, true)
	// 	})
	// 	meteorList = newList
	// }
	// if(Math.random() > 0.98) {
	// 	const meteor = Math.random() * (width - 200) + 200
	// 	meteorList.push(new Star(new Point(meteor, 0, meteor)))
	// }
	window.requestAnimationFrame(draw)
}

function getPixelRatio(ctx) {
  const backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}


export default {
	Point,
	Star,
	draw,
	init,
	getPixelRatio,
	starList
}