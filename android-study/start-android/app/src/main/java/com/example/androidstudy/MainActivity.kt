package com.example.androidstudy

import android.app.Activity
import android.content.Intent
import android.net.InetAddresses
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.Toast
import kotlinx.android.synthetic.main.main_layout.*

class MainActivity : AppCompatActivity() {
    val tag = "MainActivity"
    var clickCount: Int = 5
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(tag, "onCreate")
        setContentView(R.layout.main_layout)
//        val button1: Button = findViewById(R.id.button1)
        main_button1.setOnClickListener {
            Toast.makeText(this, "显式启动 Second Activity", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, SecondActivity::class.java)
            intent.putExtra("clickCount", clickCount)
            startActivity(intent)
        }
        main_button2.setOnClickListener {
            Toast.makeText(this, "隐式启动 Second Activity", Toast.LENGTH_SHORT).show()
            val intent = Intent("com.example.androidstudy.ACTION_START")
            intent.addCategory("com.example.androidstudy.MY_CATEGORY")
            intent.putExtra("clickCount", clickCount)
//            startActivity(intent)
            startActivityForResult(intent, 1)
        }
        main_open_baidu.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.baidu.com")
            startActivity(intent)
        }
        main_open_tel.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("tel:10086")
            startActivity(intent)
        }
        stand_open.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
        single_top_open.setOnClickListener {
            val intent = Intent(this, SecondActivity::class.java)
            startActivity(intent)
        }



    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        Log.d("MainActivity", "收到返回数据")
        when (requestCode) {
            1 -> if (resultCode == RESULT_OK) {
                Log.d("MainActivity", "是1的返回")
                val returnedData = data?.getIntExtra("data_return", 0)
                Log.d("MainActivity", "总共点击了${returnedData}次")
                if (returnedData != null) {
                    clickCount = returnedData.toInt()
                }
            }
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.add_item -> Toast.makeText(this, "Click Add", Toast.LENGTH_SHORT).show()
            R.id.remove_item -> Toast.makeText(this, "Click Remove", Toast.LENGTH_SHORT).show()
            R.id.finish_program -> finish()
        }
        return true
    }
}