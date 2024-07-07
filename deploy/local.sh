#!/bin/zsh
source ~/.zshrc


DIR="/Users/yangwoolee/repo/captured-refactoring/"
BACKEND="/Users/yangwoolee/repo/captured-refactoring/backend/"


DOCKER_LOCAL="docker-compose -f ./deploy/docker-local/docker_compose.local.yml up --build"
GO_COMPILE="CGO_ENABLED=0 GOOS=linux go build -a -ldflags='-s -w' -installsuffix cgo -o compiler/GO_LOCAL ./main.go"

RUN_SSH_TUNNEL="/Users/yangwoolee/repo/captured-refactoring/deploy/run_ssh_tunnel.sh"

# Run npm build and Go compile in parallel

npm run build 

# npm run build &

# echo "Compiling Golang...."
# cd "$BACKEND" && eval "$GO_COMPILE" &

# # Wait for all background jobs to finish
# wait

# if [ $? -eq 0 ]; then
#     echo "Finished!!"
# else
#     echo "Compiling Failed"
#     exit 1
# fi


cd "$DIR" && eval $DOCKER_LOCAL

echo "Current directory: $current_dir"





if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 성공"
elif [ $? -eq 127 ]; then
    echo "에러 : Colima 실행 필요"
    exit 1
else
    echo "로컬 내 Dockerfile 빌드 실패"
    exit 1
fi



