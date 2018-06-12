var leTao;
var searchB;
//创建入口函数
$(function () {
    leTao = new search();
    searchB = getQueryString('search');
    leTao.click();
    leTao.downPullRefresh();
    leTao.searchProductList();
    leTao.productSort();
  })

  
  //创建构造函数

    var search = function () {}
    var page = 1;
   //在函数原型上创建方法
   search.prototype={
       //点击变色
       click:function () {
          $('form').on('tap','a',function(){
             searchB = $('form input').val();
              leTao.getData({proName:searchB},function (param) {
                var ruselt = template('product',param)
                $('.sport-content .mui-row').html(ruselt);
                //刷新上拉显示数据
                mui('#refreshContainer').pullRefresh().refresh(true);
                })
          })
         },


         //创建下拉刷新
       downPullRefresh: function () {
           mui.init({
               pullRefresh: {
                   container: "#refreshContainer",
                   down: {
                       contentrefresh: "正在刷新...",
                       callback: function () {
                           //使用定时器的作用就是 设置刷新需要的时间
                           setTimeout(function () {
                               //使用回调函数，来渲染数据
                                leTao.getData({
                                    proName:searchB
                                },function (data) {
                                    console.log(searchB);
                                    var ruselt = template('product',data)
                                    $('.sport-content .mui-row').html(ruselt);
                                  });
                               //停止刷新
                               //    mui('#refreshContainer').pullRefresh().refresh();
                               //填true 表示数据结束刷新，不填表示只是结束本次刷新，还可以进行下一次刷新；
                               //不填true，‘显示还可以继续更新’，填true 显示“没有更多数据”
                               mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                               //这一步用于刷新上拉，让其显示‘上拉加载更多’；
                               mui('#refreshContainer').pullRefresh().refresh(true);
                               page=1;
                           }, 1000)
                       }
                   },
                   up: {
                       contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                       contentnomore: '没 有 更 多 数 据 了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                       callback: function () {
                           setTimeout(function () {
                               leTao.getData({
                                   proName:searchB,
                                   page:++page,
                                   pageSize:2
                               },function (data) {
                                   console.log(data);
                                var ruselt = template('product',data)
                                $('.sport-content .mui-row').append(ruselt);
                                if(data.data.length>0){
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                 }else{
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                     
                                 }
                                 })
                                 
                           }, 1000)
                       }//必选
                   }
               }
           });
       },
       //进入此页面就应该刷新带过来的数据的资料；
       searchProductList:function () {
            leTao.getData({
                proName:searchB
            },function (param) {
                console.log(param);
                var ruselt = template('product',param);
                $('.sport-content .mui-row ').html(ruselt);
              });
         },
       getData:function (obj,callback) {
            $.ajax({
                url:'/product/queryProduct',
                data:{
                    page:obj.page||1,
                    pageSize:obj.pageSize||2,
                    proName:obj.proName,
                    price:obj.price,
                    num:obj.num
                },
                success:function (backData) {
                    //判断是否有值，有值才使用回调函数
                  if(backData){
                    callback(backData);
                  }
                  }
            })
         },
         productSort:function () {
            $('.section').on("tap",'a',function () {
                
                $(this).addClass('active').siblings().removeClass('active');
                var price=  $(this).data('sort-type');
                console.log(price);
                var num = $(this).data('sort')
                console.log(num);
                if(num==1){
                    num=2
                }else{
                    num=1
                };
                if(price=='price'){
                    leTao.getData({
                        proName:searchB,
                        price:num
                    },function (param) {
                            var ruselt = template('product',param);
                            $('.sport-content .mui-row').html(ruselt);
                          })
                }else if(price=='num'){
                    leTao.getData({
                        proName:searchB,
                        price:num
                    },function (param) {
                            var ruselt = template('product',param);
                            $('.sport-content .mui-row').html(ruselt);
                          })
                    }
                    $(this).attr('data-sort',num);
              })
           }



         //获取url中传递的数据
         

   }
   function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    // console.log(r);
    if (r != null) {
        // console.log(decodeURI(r[2]))
        return decodeURI(r[2]);
    } else {
        return null;
    }
}