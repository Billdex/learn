package com.example.uilayout

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class FrameLayoutActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.frame_layout)
    }

    companion object {
        fun actionStart(context: Context) {
            val intent = Intent(context, FrameLayoutActivity::class.java)
            context.startActivity(intent)
        }
    }
}