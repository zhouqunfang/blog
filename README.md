使用node.js + mongoDB实现一个简单的有注册、登陆、发文章功能的小博客。
====
相关技术nodejs+express+mongodb+express+ejs模板引擎+session+ajax

 注册页/登陆页:
 ------ 
![这是注册页面](https://github.com/zhouqunfang/blog/blob/master/images/regis.png)
![这是登陆页面](https://github.com/zhouqunfang/blog/blob/master/images/login3.png)
* 使用了jquery插件库的登陆注册页面插件。
* model文件夹里的db.js文件是封装好的具有mongodb增删改查功能的函数。
* 使用express和ajax进行对用户输入的用户名和密码与后台校验。
  eg:校验通过后将用户信息插入到 MongoDB 中，成功则跳转到主页并显示『注册成功』的通知，失败（如用户名被占用）则跳转回注册页面并显示『用户名已被占用』的通知。
* 使用session储存用户输入的信息。

发文章页面
------
![这是发表页面](https://github.com/zhouqunfang/blog/blob/master/images/blog1.png)

我的文章页面
----
![这是发表页面](https://github.com/zhouqunfang/blog/blob/master/images/blog4.png)
* 使用ejs模板引擎实时对页面进行渲染。



