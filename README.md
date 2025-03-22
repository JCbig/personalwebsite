# 个人网站 - aipay.it.com

这是一个简单的个人网站项目，托管在Cloudflare上。

## 目录结构

```
personal-website/
│
├── index.html          # 主页
├── css/                # 样式文件
│   └── style.css       # 主要样式
├── js/                 # JavaScript文件
│   └── main.js         # 主要脚本
├── img/                # 图片文件
└── public/             # 公共资源
```

## 本地开发

要在本地查看网站，只需在浏览器中打开`index.html`文件即可。

## 部署到Cloudflare Pages

1. 创建一个GitHub/GitLab仓库，将网站文件推送到仓库
2. 登录Cloudflare控制台
3. 导航到Pages服务
4. 选择"创建项目"并连接到你的代码仓库
5. 按照Cloudflare的说明完成部署

## DNS配置

要将域名aipay.it.com指向你的Cloudflare Pages网站：

1. 在Cloudflare控制台中导航到DNS管理
2. 添加CNAME记录，将aipay.it.com指向你的Cloudflare Pages网站URL
3. 保存设置，等待DNS传播完成（可能需要几分钟到几小时）

## 自定义与扩展

你可以通过以下方式扩展这个基础网站：

- 添加更多页面（如博客、项目展示等）
- 整合内容管理系统
- 添加表单与用户交互功能
- 添加分析工具追踪访问情况 