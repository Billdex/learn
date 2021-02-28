package com.example.uilayout

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class LayoutWeightActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.weight_layout)
    }

    companion object {
        fun actionStart(context: Context) {
            val intent = Intent(context, LayoutWeightActivity::class.java)
            context.startActivity(intent)
        }
    }
}