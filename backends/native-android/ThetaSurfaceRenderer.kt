package org.isomorphisms.theta.bakeoff

import android.opengl.GLES30
import android.opengl.GLSurfaceView
import android.opengl.Matrix
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.FloatBuffer
import java.nio.IntBuffer
import javax.microedition.khronos.egl.EGLConfig
import javax.microedition.khronos.opengles.GL10
import kotlin.math.cos
import kotlin.math.sin

/**
 * Thin Android/GLES adapter for the renderer bakeoff.
 *
 * Edriç supplies the Float32 positions/colors, triangle indices, and camera
 * state. This class deliberately contains no theta evaluation, Wegert color
 * logic, gesture recognition, or parameter semantics.
 */
class ThetaSurfaceRenderer : GLSurfaceView.Renderer {
    private var program = 0
    private var positionBuffer = 0
    private var colorBuffer = 0
    private var indexBuffer = 0
    private var indexCount = 0

    private var pendingPositions: FloatArray? = null
    private var pendingColors: FloatArray? = null
    private var pendingIndices: IntArray? = null

    private var yaw = 0.65f
    private var pitch = 0.8f
    private var distance = 3.25f
    private var panX = 0f
    private var panY = 0f
    private var width = 1
    private var height = 1

    fun upload(positions: FloatArray, colors: FloatArray, indices: IntArray) {
        pendingPositions = positions
        pendingColors = colors
        pendingIndices = indices
    }

    fun setCamera(
        yaw: Float,
        pitch: Float,
        distance: Float,
        panX: Float,
        panY: Float
    ) {
        this.yaw = yaw
        this.pitch = pitch
        this.distance = distance
        this.panX = panX
        this.panY = panY
    }

    override fun onSurfaceCreated(unused: GL10?, config: EGLConfig?) {
        program = linkProgram(VERTEX_SHADER, FRAGMENT_SHADER)
        val names = IntArray(3)
        GLES30.glGenBuffers(3, names, 0)
        positionBuffer = names[0]
        colorBuffer = names[1]
        indexBuffer = names[2]
        GLES30.glEnable(GLES30.GL_DEPTH_TEST)
        GLES30.glDisable(GLES30.GL_CULL_FACE)
        GLES30.glClearColor(0f, 0f, 0f, 1f)
    }

    override fun onSurfaceChanged(unused: GL10?, width: Int, height: Int) {
        this.width = width.coerceAtLeast(1)
        this.height = height.coerceAtLeast(1)
        GLES30.glViewport(0, 0, this.width, this.height)
    }

    override fun onDrawFrame(unused: GL10?) {
        uploadPendingBuffers()
        GLES30.glClear(GLES30.GL_COLOR_BUFFER_BIT or GLES30.GL_DEPTH_BUFFER_BIT)
        if (indexCount == 0) return

        val horizontal = distance * cos(pitch)
        val eyeX = panX + horizontal * sin(yaw)
        val eyeY = panY + horizontal * cos(yaw)
        val eyeZ = distance * sin(pitch)

        val view = FloatArray(16)
        val projection = FloatArray(16)
        val mvp = FloatArray(16)
        Matrix.setLookAtM(view, 0, eyeX, eyeY, eyeZ, panX, panY, 0f, 0f, 0f, 1f)
        Matrix.perspectiveM(projection, 0, 42f, width.toFloat() / height, 0.01f, 100f)
        Matrix.multiplyMM(mvp, 0, projection, 0, view, 0)

        GLES30.glUseProgram(program)
        GLES30.glUniformMatrix4fv(GLES30.glGetUniformLocation(program, "u_mvp"), 1, false, mvp, 0)

        GLES30.glBindBuffer(GLES30.GL_ARRAY_BUFFER, positionBuffer)
        GLES30.glEnableVertexAttribArray(0)
        GLES30.glVertexAttribPointer(0, 3, GLES30.GL_FLOAT, false, 0, 0)

        GLES30.glBindBuffer(GLES30.GL_ARRAY_BUFFER, colorBuffer)
        GLES30.glEnableVertexAttribArray(1)
        GLES30.glVertexAttribPointer(1, 3, GLES30.GL_FLOAT, false, 0, 0)

        GLES30.glBindBuffer(GLES30.GL_ELEMENT_ARRAY_BUFFER, indexBuffer)
        GLES30.glDrawElements(GLES30.GL_TRIANGLES, indexCount, GLES30.GL_UNSIGNED_INT, 0)
    }

    private fun uploadPendingBuffers() {
        val positions = pendingPositions ?: return
        val colors = pendingColors ?: return
        val indices = pendingIndices ?: return

        GLES30.glBindBuffer(GLES30.GL_ARRAY_BUFFER, positionBuffer)
        GLES30.glBufferData(
            GLES30.GL_ARRAY_BUFFER,
            positions.size * 4,
            floatBuffer(positions),
            GLES30.GL_DYNAMIC_DRAW
        )
        GLES30.glBindBuffer(GLES30.GL_ARRAY_BUFFER, colorBuffer)
        GLES30.glBufferData(
            GLES30.GL_ARRAY_BUFFER,
            colors.size * 4,
            floatBuffer(colors),
            GLES30.GL_DYNAMIC_DRAW
        )
        GLES30.glBindBuffer(GLES30.GL_ELEMENT_ARRAY_BUFFER, indexBuffer)
        GLES30.glBufferData(
            GLES30.GL_ELEMENT_ARRAY_BUFFER,
            indices.size * 4,
            intBuffer(indices),
            GLES30.GL_DYNAMIC_DRAW
        )
        indexCount = indices.size
        pendingPositions = null
        pendingColors = null
        pendingIndices = null
    }

    private fun floatBuffer(values: FloatArray): FloatBuffer =
        ByteBuffer.allocateDirect(values.size * 4)
            .order(ByteOrder.nativeOrder())
            .asFloatBuffer()
            .apply { put(values); position(0) }

    private fun intBuffer(values: IntArray): IntBuffer =
        ByteBuffer.allocateDirect(values.size * 4)
            .order(ByteOrder.nativeOrder())
            .asIntBuffer()
            .apply { put(values); position(0) }

    private fun linkProgram(vertexSource: String, fragmentSource: String): Int {
        fun compile(type: Int, source: String): Int {
            val shader = GLES30.glCreateShader(type)
            GLES30.glShaderSource(shader, source)
            GLES30.glCompileShader(shader)
            return shader
        }
        val result = GLES30.glCreateProgram()
        GLES30.glAttachShader(result, compile(GLES30.GL_VERTEX_SHADER, vertexSource))
        GLES30.glAttachShader(result, compile(GLES30.GL_FRAGMENT_SHADER, fragmentSource))
        GLES30.glLinkProgram(result)
        return result
    }

    companion object {
        private const val VERTEX_SHADER = """#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_color;
uniform mat4 u_mvp;
out vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = u_mvp * vec4(a_position, 1.0);
}
"""

        private const val FRAGMENT_SHADER = """#version 300 es
precision highp float;
in vec3 v_color;
out vec4 frag_color;
void main() {
  frag_color = vec4(v_color, 1.0);
}
"""
    }
}
