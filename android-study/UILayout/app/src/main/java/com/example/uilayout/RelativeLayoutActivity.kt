package com.example.uilayout

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class RelativeLayoutActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.relative_layout)
    }

    companion object {
        fun actionStart(context: Context) {
            val intent = Intent(context, RelativeLayoutActivity::class.java)
            context.startActivity(intent)
        }
    }
}