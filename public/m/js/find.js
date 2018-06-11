var leTao;
//创建入口函数
$(function () {
    //实例对象
    leTao = new search();
    leTao.getLocalStorage();
    leTao.createLocalStorage();
    leTao.deleteLocalStorage();
    // leTao.demo();
  })

  
  //创建构造函数

  var search = function () {  }

   //在函数原型上创建方法
   search.prototype={
       //获取数据
       getLocalStorage:function () {
         var data= window.localStorage.getItem('searchData');
            //判断数据
            if(data&&JSON.parse(data).length>0){
                data = JSON.parse(data);
                
            }else{
                data =[];
            }
            data = data.reverse();
            //下边的rows的作用在于模板引擎上判断是否加ul的作用
            $('.hostoryData').html(template('search',{'rows':data}))
            
        },

    //创建数据
       createLocalStorage:function () {
            $('.main a').click(function (e) {
                //获取数据
                var text = $('.main input').val();
                //判断数据，是否为空值

                if(!text.trim()){
                    alert('请输入你要搜索的商品');
                    return;
                }

                //本地数据只能是字符串形式存在，其它任何数据格式都不能存在；

                //获取本地存储的数据
                var arr = window.localStorage.getItem('searchData');
                //声明一个id,为后边的删除做准备；
                var id = 0;
                console.log(arr);
                //判断获取的arr是否有值；
                if(arr&&JSON.parse(arr).length>0){
                    arr = JSON.parse(arr);
                    id=arr[arr.length-1].id+1;
                }else{
                    //这里起到初始化的作用，让本地数据最开始就是一个数组的形式存在；
                    //因为最开始数据就为空；所以可以后边加
                    arr=[];
                    id=0;
                }
                //判断搜索数据是否存在与数据库中
                //定义一个变量
                var flage = false;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].searchData==text){
                        flage=true;
                    }
                }
                //如果不存在数据库中就添加进去
                if(flage==false){
                    arr.push({
                        "searchData":text,
                        "id":id
                    })
                }

                //把新的数据添加到LocalStorage中
                window.localStorage.setItem('searchData',JSON.stringify(arr))
                //查询数据 并渲染数据

                leTao.getLocalStorage();
              })
         },

         //删除数据
         deleteLocalStorage:function () {
             $('.hostoryData').on('click','.delete',function () {
                 //获取点击的数据的id
                 var id = $(this).parent().data('id');
                 console.log(id);
                 //获取数据
                 var getData=window.localStorage.getItem('searchData');

                 //判断数组是否为空数组
                 if(getData && JSON.parse(getData).length>0){
                     getData = JSON.parse(getData);
                 }else{
                     getData=[];
                 }

                 //遍历数组
                 for(var i= 0 ;i<getData.length;i++){
                     if(getData[i].id==id){
                         //i表示数组中数据的下标，id只是器中的一个属性，因为删除一个数据后
                         //删除id为0的数据，id为1的下标就是0了，所以始终都有一个删不掉，因为没有0项了

                         getData.splice(i,1);
                     }
                 }

                //把新数据存入localStorage中
                console.log(getData);
                window.localStorage.setItem('searchData',JSON.stringify(getData));
                leTao.getLocalStorage();
              })
             
           },

        //    demo:function(){
        //     var arr = '"name":{"name":"xiaoming"}';
        //     console.log(JSON.parse(arr));

        //    }
   }