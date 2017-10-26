---
title: centOS 7 服务器简单保护
date: 2017-07-20 00:33:57
categories:
tags:
---
# centOS 7 服务器简单保护
参考如下

[redhat linux 计算机安全](https://access.redhat.com/documentation/zh-CN/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Using_Firewalls.html#sec-Start_firewalld)

[linux 中国](https://linux.cn/article-8076-1.html)

### 防火墙

我用的是 vultr 的vps os 为 centOS 7

因此防火墙不能再使用 iptables 服务。可以使用firewall-cmd代替

**1 - 查看是否已经开启防火墙**
```bash
systemctl status firewalld
```

**1.1 - 开启防火墙**
```bash
systemctl start firewalld
```

**2 - 配置防火墙**

**2.1 - 使用CLI查看防火墙设置**

```bash
firewall-cmd --state # 得到 firewalld 的状态的文本显示
firewall-cmd --get-active-zones # 查看活动分区的列别，并附带一个目前分配给它们的接口列表
firewall-cmd --get-zone-of-interface=public # 找出当前分配了接口（例如 public）的区域
sudo firewall-cmd --zone=public --list-interfaces # 找出分配给一个区域（例如公共区域）的所有接口,从 NetworkManager 可以得到这个信息，并且仅显示接口而非连接。
sudo firewall-cmd --zone=public --list-all # 找出像公共区域这样的一个区域的所有设置
sudo firewall-cmd --list-all # 列出所有设置
sudo firewall-cmd --get-service # 查看目前活动的网络区域
# 这样将列出 /usr/lib/firewalld/services/ 中的服务器名称。注意，配置文件是以服务本身命名的 service-name.xml。

sudo firewall-cmd --get-service --permanent # 查看所有在防火墙下次加载后将活跃的网络区域
```

**2.2 - 使用CLI更改设置**
因为不是专业的运维，很多都不懂，所以就只开启流量端口
```bash
sudo firewall-cmd --permanent --zone=public --add-port=443/tcp
sudo firewall-cmd --permanent --zone=public --add-port=443/udp
sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
sudo firewall-cmd --permanent --zone=public --add-port=3090/tcp
sudo firewall-cmd --permanent --zone=public --remove-port=3090/tcp # 移除
sudo firewall-cmd --permanent --zone=public --remove-port=5000/tcp # 移除
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
# 目前服务器只用在翻墙，所以只开443的tcp协议和udp协议
# 将来可能会用作建站，所以就允许了http服务的流量和https的流量以及80的端口
netstat -tunlp |grep ftp                                      #查看ftp端口使用端口情况
netstat -ntlp                                                 #查看监听(Listen)的端口
netstat -antp                                                 #查看所有建立的TCP连接
iptables -L                                                   #查看防火墙规则
```
**3 - 重载防火墙**
```bash
sudo firewall-cmd --reload
```
