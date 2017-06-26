#!/bin/bash
gitpush(){
  data=`date +%Y-%m-%d_%H:%M:%S`
  git add -A
  git commit -m "$data"
  git push origin master
}
echo '开始执行任务'
gitpush
echo '推送完成'
ssh root@10.3.2.124 "cd /root/dctxf/image-upload && git pull origin master && pm2 startOrReload pm2.json"
echo '更新完成'
