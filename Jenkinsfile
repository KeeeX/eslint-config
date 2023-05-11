pipeline {
    agent any
    stages {
        stage("Prepare environment") {
            steps {
                sh("npm ci")
            }
        }
        stage("Publish") {
            steps {
                withNPM(npmrcConfig: 'npmjs_publish') {
                    sh("npm publish")
                }
            }
        }
    }
}
