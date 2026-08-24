package org.isomorphisms.theta.bakeoff

import android.annotation.SuppressLint
import android.app.Activity
import android.graphics.Color
import android.opengl.GLSurfaceView
import android.os.Bundle
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.FrameLayout
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var nativeView: GLSurfaceView
    private lateinit var nativeRenderer: ThetaSurfaceRenderer
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.decorView.systemUiVisibility =
            View.SYSTEM_UI_FLAG_FULLSCREEN or
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE

        nativeRenderer = ThetaSurfaceRenderer()
        nativeView = GLSurfaceView(this).apply {
            setEGLContextClientVersion(3)
            setRenderer(nativeRenderer)
            renderMode = GLSurfaceView.RENDERMODE_WHEN_DIRTY
            visibility = View.GONE
        }

        webView = WebView(this).apply {
            setBackgroundColor(Color.BLACK)
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = false
            settings.allowFileAccess = true
            settings.allowContentAccess = false
            addJavascriptInterface(NativeBridge(), "AndroidTheta")
            loadUrl("file:///android_asset/index.html")
        }

        setContentView(FrameLayout(this).apply {
            addView(nativeView, FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            ))
            addView(webView, FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            ))
        })
    }

    override fun onResume() {
        super.onResume()
        nativeView.onResume()
    }

    override fun onPause() {
        nativeView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        webView.removeJavascriptInterface("AndroidTheta")
        webView.destroy()
        super.onDestroy()
    }

    private fun floatArray(values: JSONArray): FloatArray =
        FloatArray(values.length()) { index -> values.getDouble(index).toFloat() }

    private fun intArray(values: JSONArray): IntArray =
        IntArray(values.length()) { index -> values.getInt(index) }

    private inner class NativeBridge {
        @JavascriptInterface
        fun setNativeVisible(visible: Boolean) {
            runOnUiThread {
                nativeView.visibility = if (visible) View.VISIBLE else View.GONE
                webView.setBackgroundColor(if (visible) Color.TRANSPARENT else Color.BLACK)
                if (visible) nativeView.requestRender()
            }
        }

        @JavascriptInterface
        fun uploadFrame(payload: String) {
            val frame = JSONObject(payload)
            nativeRenderer.upload(
                floatArray(frame.getJSONArray("positions")),
                floatArray(frame.getJSONArray("colors")),
                intArray(frame.getJSONArray("indices"))
            )
            nativeView.requestRender()
        }

        @JavascriptInterface
        fun setCamera(payload: String) {
            val camera = JSONObject(payload)
            nativeRenderer.setCamera(
                camera.getDouble("yaw").toFloat(),
                camera.getDouble("pitch").toFloat(),
                camera.getDouble("distance").toFloat(),
                camera.getDouble("panX").toFloat(),
                camera.getDouble("panY").toFloat()
            )
            nativeView.requestRender()
        }

        @JavascriptInterface
        fun present() {
            nativeView.requestRender()
        }
    }
}
