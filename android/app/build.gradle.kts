plugins {
    id("com.android.application")
}

android {
    namespace = "org.isomorphisms.theta.bakeoff"
    compileSdk = 36

    defaultConfig {
        applicationId = "org.isomorphisms.theta.bakeoff"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "0.0.1"
    }

    sourceSets.getByName("main").java.srcDir("../../backends/native-android")

    buildTypes {
        getByName("debug") {
            isMinifyEnabled = false
        }
        getByName("release") {
            isMinifyEnabled = false
        }
    }
}
