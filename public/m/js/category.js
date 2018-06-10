
$(function () {
    initScroll()

    $.ajax({
        url:'/category/queryTopCategory',
        success:function (backData) {
            console.log(backData);
            var data = template('getCategory',backData);
            // console.log(data);
            $('.categoryLeft ul').html(data)
          }
    })
    $('.categoryLeft ul').on('click','li',function (e) { 

        var id = $(this).data("id");
        $(this).addClass('active').siblings().removeClass('active');
        // $.ajax({
        //     url:'/category/querySecondCategory',
        //     data:{id:id},
        //     success:function(backData){
        //         // console.log(backData);
        //         var data = template('categoryRight',backData)
        //         // console.log(data);
        //     $('.categoryRight ul').html(data);  
        //     }
        // })
        brand(id);
     })

     function brand(id) { 
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(backData){
                // console.log(backData);
                var data = template('categoryRight',backData)
                // console.log(data);
                if(data){

                    $('.categoryRight ul').html(data);  
                }else{
                    $('.categoryRight ul').html('没有更多的数据...'); 
                }
            }
        })
      }

      brand(1);
  })

  

  //封装函数
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

