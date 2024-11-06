pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        separator(name:'DEPENDENCES', sectionHeader: 'DEPENDENCES');
        choice(name:'NPM_INSTALL', choices:['NOT', 'YES'], description:'npm install?');

    }

    stages {
        stage('Checkout') {
            steps {
                git(branch: "${GITHUB_BRANCH}", url: "${GITHUB_URL}")
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (params.NPM_INSTALL == "YES") {
                        bat 'npm install'
                    } else {
                        echo 'No hay dependencias nuevas...'
                    }
                }
                
            }
        }
        stage('Compile TypeScript') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Run nodejs') {
            steps {
                script {
                    // Inicia el proceso en segundo plano y obtiene el ID del proceso para controlarlo
                    def process = powershell(script: '''
                        $process = Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run start" -PassThru
                        $process.Id
                    ''', returnStdout: true).trim()

                    echo "Node.js process ID: ${process}"
                }
            }
        }

    }

    post {
        always {
            echo 'Backend deployment completed.'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
    }
}
