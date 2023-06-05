pipeline {
    agent {
        docker {
            image 'node:16.13.0'
            args '-p 3000:3008'
        }
    }
    environment {
        CI = 'false'
        HOME = '.'
        npm_config_cache = 'npm-cache'
        BUCKET_NAME = ''
        REGION = 'us-east-1'
    }
    stages {
        stage('Environment config') {
            steps{
                script{
                    switch(params.ENVIRONMENT) {
                        case 'development':
                            BUCKET_NAME = "creators.dev.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT_STAGING=https://api-dev.staging.getphyllo.com
REACT_APP_API_ENDPOINT_PRODUCTION=https://api.dev.getphyllo.com
REACT_APP_SDK_ENVIRONMENT_STAGING=staging
REACT_APP_SDK_ENVIRONMENT_PRODUCTION=dev
REACT_APP_DASHBOARD_BASE_URL=https://dashboard-api.dev.getphyllo.com
REACT_APP_ANALYTICS_SOURCE_TOKEN=gFJ2BbfUFEVIo6jdU8rJUbWkcAiRJBCr
REACT_APP_SENTRY_API_KEY='https://84c66ae6757f4b798340d29c2eeb1e40@o1351814.ingest.sentry.io/6725515'
EOF
'''
                            break
                        case 'development2':
                            BUCKET_NAME = "creators.dev2.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT_STAGING=https://api2-dev.staging.getphyllo.com
REACT_APP_API_ENDPOINT_PRODUCTION=https://api2.dev.getphyllo.com
REACT_APP_SDK_ENVIRONMENT_STAGING=staging
REACT_APP_SDK_ENVIRONMENT_PRODUCTION=dev2
REACT_APP_DASHBOARD_BASE_URL=https://dashboard-api2.dev.getphyllo.com
REACT_APP_ANALYTICS_SOURCE_TOKEN=''
REACT_APP_SENTRY_API_KEY='https://84c66ae6757f4b798340d29c2eeb1e40@o1351814.ingest.sentry.io/6725515'
EOF
'''
                            break
                        case 'development3':
                            BUCKET_NAME = "creators.dev3.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT_STAGING=https://api3-dev.staging.getphyllo.com
REACT_APP_API_ENDPOINT_PRODUCTION=https://api3.dev.getphyllo.com
REACT_APP_SDK_ENVIRONMENT_STAGING=staging
REACT_APP_SDK_ENVIRONMENT_PRODUCTION=dev3
REACT_APP_DASHBOARD_BASE_URL=https://dashboard-api3.dev.getphyllo.com
REACT_APP_ANALYTICS_SOURCE_TOKEN=''
REACT_APP_SENTRY_API_KEY='https://84c66ae6757f4b798340d29c2eeb1e40@o1351814.ingest.sentry.io/6725515'
EOF
'''
                            break
                        case 'development4':
                            BUCKET_NAME = "creators.dev4.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT_STAGING=https://api4-dev.staging.getphyllo.com
REACT_APP_API_ENDPOINT_PRODUCTION=https://api4.dev.getphyllo.com
REACT_APP_SDK_ENVIRONMENT_STAGING=staging
REACT_APP_SDK_ENVIRONMENT_PRODUCTION=dev4
REACT_APP_DASHBOARD_BASE_URL=https://dashboard-api4.dev.getphyllo.com
REACT_APP_ANALYTICS_SOURCE_TOKEN=''
REACT_APP_SENTRY_API_KEY='https://84c66ae6757f4b798340d29c2eeb1e40@o1351814.ingest.sentry.io/6725515'
EOF
'''
                        break
                        case 'sandbox':
                            BUCKET_NAME = "creators.sandbox.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT=https://api.sandbox.getphyllo.com
REACT_APP_SDK_ENVIRONMENT=sandbox
REACT_APP_ANALYTICS_SOURCE_TOKEN=3pXuFVZY68vxAfiuApqKF2rgn7ukRTxG
EOF
'''
                        break
                            case 'preprod':
                            BUCKET_NAME = "creators.preprod.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT_STAGING=https://api-preprod.staging.getphyllo.com
REACT_APP_API_ENDPOINT_PRODUCTION=https://api.preprod.getphyllo.com
REACT_APP_SDK_ENVIRONMENT_STAGING=staging
REACT_APP_SDK_ENVIRONMENT_PRODUCTION=preprod
REACT_APP_DASHBOARD_BASE_URL=https://dashboard-api.preprod.getphyllo.com
REACT_APP_ANALYTICS_SOURCE_TOKEN=''
EOF
'''
                            break
                        case 'prod':
                            BUCKET_NAME = "creators.getphyllo.com"
                            sh '''
                            rm -rf .env.production.local
cat <<EOF > .env.production.local
REACT_APP_API_ENDPOINT_STAGING=https://api.staging.getphyllo.com
REACT_APP_API_ENDPOINT_PRODUCTION=https://api.getphyllo.com
REACT_APP_SDK_ENVIRONMENT_STAGING=staging
REACT_APP_SDK_ENVIRONMENT_PRODUCTION=production
REACT_APP_DASHBOARD_BASE_URL=https://dashboard-api.getphyllo.com
REACT_APP_ANALYTICS_SOURCE_TOKEN=GBHI45cz96iV2DFs00YjSOQ2qzN43BGD
REACT_APP_SENTRY_API_KEY='https://c408f98939db43bc8199412bdc8371fe@o1351814.ingest.sentry.io/6725451'
EOF
'''
                    }
                }
            }
        }

        stage('Install Packages') {
            steps {
                sh 'npm install'
            }
        }

        stage('Create Build Artifacts') {
            steps {
                sh 'CI=false npm run build'
            }
        }

        stage('Deploy') {
            steps {
                withAWS(region: "${REGION}") {
                    s3Delete(bucket: "${BUCKET_NAME}", path: '**/*')
                    s3Upload(bucket: "${BUCKET_NAME}", workingDir: 'build', acl: 'PublicRead', includePathPattern: '**/*');
                }
            }
        }
    }
}
