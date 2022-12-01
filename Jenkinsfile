pipeline {
    agent any
    environment {
        NPMRC_CONFIG = credentials('npmjs_publish')
    }
    stages {
        stage("Prepare environment") {
            steps {
                sh("npm ci")
            }
        }
        stage("Configure NPM for deployment") {
            steps {
                sh('ln -s ${NPMRC_CONFIG} .npmrc')
            }
        }
        stage("Publish") {
            steps {
                sh("npm publish")
            }
        }
    }
    post {
        awlays {
            sh("rm .npmrc")
        }
    }
}
