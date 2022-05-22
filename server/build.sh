echo 'start build redis-server app'

docker build --network=host -t registry.cn-shanghai.aliyuncs.com/chenc/redis-connect-server:0.0.5 .
docker push registry.cn-shanghai.aliyuncs.com/chenc/redis-connect-server:0.0.5

echo 'end build redis-server app'
