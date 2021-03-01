package com.example.androidstudy

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import kotlinx.android.synthetic.main.second_layout.*
import kotlin.math.log

class SecondActivity : BaseActivity() {
    var clickCount:Int = 0
    val tag = "SecondActivity"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(tag,"onCreate")
        setContentView(R.layout.second_layout)
        clickCount = intent.getIntExtra("clickCount", 0)
        second_button.setOnClickListener {
            clickCount += 1
            Toast.makeText(this, "按钮点击了${clickCount}次", Toast.LENGTH_SHORT).show()
            Log.d("SecondActivity", "按钮点击了$clickCount 次")
        }
        single_top_open.setOnClickListener {
            Toast.makeText(this, "尝试启动SecondActivity", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, SecondActivity::class.java)
            startActivity(intent)
        }
        start_third.setOnClickListener {
            val intent = Intent(this, ThirdActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onBackPressed() {
//        super.onBackPressed()
        Log.d("SecondActivityReturn", "现在返回")
//        val intent = Intent()
        intent.putExtra("data_return", clickCount)
        setResult(RESULT_OK, intent)
        finish()
    }

    companion object {
        fun actionStart(context: Context, data: Int) {
            val intent = Intent(context, SecondActivity::class.java)
            intent.putExtra("clickCount", data)
            context.startActivity(intent)
        }
    }
}