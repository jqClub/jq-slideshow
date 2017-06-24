// 轮播图
// 每个网站包括苹果都有的轮播图组件(什么是组件)
/*
1，写一个 div 里面有 3 个 img 标签
2，只显示当前活动的 img 标签
3，加 1 个按钮，点击的时候切换图片
*/

var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'gua-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    // 切换小圆点
    // 1, 删除当前的小圆点的 class
    removeClassAll('gua-white')
    // 2, 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('gua-white')
}

var nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    // 因为得到的是 string 所以用 parseInt 转成 number
    // 也可以用 Number() 函数来转
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // 求出下一张图片的 id
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event){
        console.log('click next')
        var button = event.target
        // 找到 slide div
        var slide = button.parentElement
        // log('click slide', )
        // 求出 button 的 data-offset
        // 上一张按钮的 offset 是 -1
        // 下一张按钮的 offset 是 1
        var offset = parseInt(button.dataset.offset)
        // 求出下一个图片的 index
        var index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event){
        log('indi 小圆点')
        var self = event.target
        var index = parseInt(self.dataset.index)
        log('index', index)
        // 得到 slide
        var slide = self.closest('.gua-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

// 第一个参数是定时会被调用的函数
// 第二个参数是延迟的时间, 以毫秒为单位, 1000 毫秒等于 1 秒
// setTimeout 只会执行一次
// log('开始时间', new Date())
// setTimeout(function(){
//     log('结束时间', new Date())
// }, 2000)
//
// // setInterval 会无限执行函数
// // setTimeout 和 setInterval 函数都有一个返回值
// // 返回值可以用来清除定时函数
// var clockId = setInterval(function(){
//     log('时间到', new Date())
// }, 1000)
// log('用来删除定时器的 id', clockId)

var playNextImage = function() {
    var slide = e('.gua-slide')
    // 求出下一个图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function(){
        // 每 2s 都会调用这个函数
        playNextImage()
    }, interval)
}

bindEventSlide()
bindEventIndicator()
autoPlay()
