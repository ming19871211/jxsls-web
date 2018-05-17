pipeline {
    agent { label 'Slave1' }
    options {
        //超时一小时
        timeout(time: 1, unit: 'HOURS')
    }
    parameters {
       //发布集群地址  IP:PORT:
       string(name:'swarm', defaultValue: "${env.CS_SWARM_UTHER}", description: '发布集群地址')
       //发布stack名称
  	   string(name:'stack_name', defaultValue: "jxsls", description: '发布的栈名称')
       //docekr镜像地址
       string(name:'docker_image', defaultValue: "${env.DOCKER_REGISTRY_URL}/jxsls/jxsls-web", description: '生成的镜像名称')
       //发布配置版本
       string(name:'cloud', defaultValue: "ucloud", description: '云服务供应商')
    }
    stages {
        stage('参数') {
            steps {
                echo "发布集群地址：${params.swarm}"
                echo "源代码工程：${params.src_project}"
                sh 'npm -v'
                sh 'node -v'
            }
        }
        stage('安装依赖') {
            steps {
                dir("${env.WORKSPACE}") {
                  echo "开始下载依赖包..."
                  sh "npm install"
                }
            }
        }
        stage('编译vue') {
            steps {
                dir("${env.WORKSPACE}") {
                  echo "开始编译vue项目......"
                  sh "npm run build:${params.profile}"
                }
            }
        }
        stage('编译DOCKER镜像') {
            steps {
                dir("${env.WORKSPACE}") {
                  echo "整理vue包，准备打包成DOCKER镜像......"
                  sh "docker build -t ${params.docker_image}:${env.BUILD_NUMBER} . "
                  echo "整理vue包，准备打包成DOCKER镜像......"
                }
            }
        }
        stage('上传镜像') {
            steps {
                dir("${env.WORKSPACE}}") {
                 echo "上传本地Docker镜像到私服......"
                  sh "docker push ${params.docker_image}:${env.BUILD_NUMBER}"
                }
            }
        }
        stage('编排部署') {
            steps {
                dir("${env.WORKSPACE}") {
                   echo '部署到生产环境'
                   sh "pwd"
                   echo '设置镜像名称为环境变量'
                   sh "export docker_image=${params.docker_image}"
                   sh "docker -H ${params.swarm} stack deploy -c docker-compose.yml --with-registry-auth ${params.stack_name}"
                }
            }
        }
    }

    post {
        always {
            echo '执行完成'
        }
        success {
            echo '成功!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo '失败 :('
        }
        changed {
            echo 'Things were different before...'
        }
    }
}
