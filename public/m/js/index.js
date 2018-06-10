
$(function () {
    initlunbo();
    initScroll()
  })

  //封装函数

  //初始化轮播图
  function initlunbo() { 
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
  });
 }

 //初始化区域滚动

 function initScroll(){
   //区域滚动
    mui('.mui-scroll-wrapper').scroll({
      scrollY: true, //是否竖向滚动
      scrollX: false, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      indicators: true, //是否显示滚动条
      deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
      bounce: true //是否启用回弹
    })
 }