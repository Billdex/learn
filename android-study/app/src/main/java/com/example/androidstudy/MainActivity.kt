package com.example.androidstudy

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.Toast
import kotlinx.android.synthetic.main.main_layout.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_layout)
//        val button1: Button = findViewById(R.id.button1)
        main_button1.setOnClickListener {
            Toast.makeText(this, "显式启动 Second Activity", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, SecondActivity::class.java)
            startActivity(intent)
        }
        main_button2.setOnClickListener {
            Toast.makeText(this, "隐式启动 Second Activity", Toast.LENGTH_SHORT).show()
            val intent = Intent("com.example.androidstudy.ACTION_START")
            intent.addCategory("com.example.androidstudy.MY_CATEGORY")
            startActivity(intent)
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