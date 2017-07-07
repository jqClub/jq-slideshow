// 轮播图组件
// 展示上一张/下一张
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
// 得到下标
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
// 上一张/下一张 切换（绑定'click'事件）
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
        // 求出下一个/上一个图片的 index
        var index = nextIndex(slide, offset)
        // 显示下一张/上一张图片
        showImageAtIndex(slide, index)
    })
}
// 小圆点的滚动
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
// 下一张 切换
var playNextImage = function() {
    var slide = e('.gua-slide')
    // 求出下一个图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}
// 自动轮播函数
var autoPlay = function() {
    var interval = 2000
    setInterval(function(){
        // 每 2s 都会调用这个函数
        playNextImage()
    }, interval)
}

//***最后才调用,保证只有一个入口
var _main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}
_main()
