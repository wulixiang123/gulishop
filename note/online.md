### 上线软件介绍

PuTTY 和 FileZilla

PuTTY       使用命令行连接远程服务器

FileZilla     给服务器上传文件使用



### 上线演示

1. 打包dist文件


2. 服务器配置相关

   购买服务器，选择系统镜像 centOS 7.6(如果重装系统需要重置密码)

   创建好服务器之后进来先改密码

   配置防火墙,允许FTP 端口21 访问(允许我们使用软件远程连接服务器)


3. cd    cd ..    ls    mkdir    rm -rf    pwd

   上传文件(上传打包的dist文件)到指定位置
   
   > linux常用指令
   >
   > | 命令                                      | 介绍                                                         |
   > | ----------------------------------------- | ------------------------------------------------------------ |
   > | touch 文件名                              | 创建一个文件                                                 |
   > | mkdir 文件夹名称                          | 创建文件夹（make directory）                                 |
   > | <span style="color:red">ls</span>         | 查看文件夹下的文件 （list 单词的缩写）                       |
   > | <span style="color:red">cd</span>         | 改变工作目录，（change directory 缩写）                      |
   > | Tab                                       | 路径自动补全                                                 |
   > | clear                                     | 清屏（也可以使用 <span style="color:red">ctrl + l </span> 快捷键） |
   > | rm 文件名                                 | 删除文件或文件夹                                             |
   > | rm -rf 文件名                             | 强制删除(慎用)                                               |
   > | echo 文本 > 文件名                        | 文件写入文本                                                 |
   > | cat 文件名                                | 查看文件内容                                                 |
   > | <span style="color:red">ctrl + c</span>   | 取消命令                                                     |
   > | cp  文件名1  文件名2                      | 复制[文件名1]粘贴[文件名2]                                   |
   > | mv 文件名1 文件名2                        | [文件名1]重命名[文件名2]                                     |
   > | mv 文件名1 路径                           | [文件名1]移动到[路径]                                        |
   > | pwd                                       | 查看当前的绝对路径                                           |
   > | <span style="color:red">上下方向键</span> | 查看命令历史                                                 |
   >


4. nginx 简介

   nginx 帮我们做简易的web服务器，怎么访问 IP 找到 dist 文件访问
   nginx 帮我们去做代理转发，因为生产环境没有 dev-server


5. 正向代理 和 反向代理

   正向代理：帮客户端实现  用户很明确的知道数据来源（数据目的地网站）
   反向代理：帮服务器实现  用户根本不知道数据来源


6. centOS里面安装nginx
   ```js
   yum install nginx  安装
   yum remove  nginx  卸载
   ```
   > ubuntu安装   sudo apt-get install nginx


7. 配置nginx服务和代理(在 /etc/nginx 目录下 有一个 nginx.config 文件,使用vim编辑器打开进行配置)
   ```
   server {
       listen       80 default_server;
       listen       [::]:80 default_server;
       server_name  _;
       root         /root/lqm/www/gulishop-client/dist;
   
       include /etc/nginx/default.d/*.conf;
       
       location / {
           root       /root/lqm/www/gulishop-client/dist;
           index      index.html;
           try_files  $uri $uri/ /index.html;
       }
       
       # 反向代理
       location /api {
           proxy_pass http://gmall-h5-api.atguigu.cn;
       }
   }
   ```
   > 如果有权限问题需要修改第一行
   > user root;
   
8. 重启nginx服务
      > 之前的指令 - 不好使
      >
      > service nginx start
      >
      > service nginx restart
      >
      > service nginx stop
   
      
   
      cent os7 指令
   
      systemctl start nginx            --- 启动nginx
   
      systemctl restart nginx        --  重启nginx
   
      systemctl nginx stop            -- 停止nginx













