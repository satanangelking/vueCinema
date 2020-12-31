module.exports = {
  lintOnSave: false, // false为关闭true为开启
  //proxy代理 可在VUE配置参考中查询
  devServer:{
        proxy:{
        '/ajax':{//api换* *表示所有请求放到某处 ajax表示请求ajax  api表示请求的方式
                //https://m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=B6527C4035F911EB8D661199AFC15D66DD7EB3F5F44E4C8BBB2BF5CFEAC22CDF&optimus_risk_level=71&optimus_code=10
            target: 'https://m.maoyan.com/',//请求Url路径 此处目标为http://m.maoyan.com/ajax
           // ws:true,
            changeOrigin:true
        },
    //可有可无
    //   '/foo':{
    //       target:'<other_url>'
    //   }
        }
    }
}