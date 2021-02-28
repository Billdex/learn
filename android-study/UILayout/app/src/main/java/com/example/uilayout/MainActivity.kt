package com.example.uilayout

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), View.OnClickListener {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button1.setOnClickListener(this)
        button2.setOnClickListener(this)
        button3.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when(v?.id) {
            R.id.button1 -> {
                LayoutWeightActivity.actionStart(this)
            }
            R.id.button2 -> {
                RelativeLayoutActivity.actionStart(this)
            }
            R.id.button3 -> {
                FrameLayoutActivity.actionStart(this)
            }
        }
    }
}