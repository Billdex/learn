package com.example.uiwidgettest

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import kotlinx.android.synthetic.main.activity_main.*
import java.sql.Time

class MainActivity : AppCompatActivity(), View.OnClickListener {
    var imgSrc: String = "bcjh"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button.setOnClickListener(this)
        alertButton.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.button -> {
                val inputText = editText.text.toString().toInt()
                Log.d("main", "isClick")
//                Toast.makeText(this, inputText, Toast.LENGTH_SHORT).show()
                if (inputText in 0..100) {
                    horizontalBar.progress = inputText
                }
                if (imgSrc == "bcjh") {
                    imgSrc = "bcjh_s"
                    imageView.setImageResource(R.drawable.bcjh_s)
                    progressBar.visibility = View.VISIBLE
                } else {
                    imgSrc = "bcjh"
                    imageView.setImageResource(R.drawable.bcjh)
                    progressBar.visibility = View.GONE
                }
            }
            R.id.alertButton -> {
                AlertDialog.Builder(this).apply {
                    setTitle("This is Dialog")
                    setMessage("information")
                    setCancelable(false)
                    setPositiveButton("OK") {
                        dialog, which -> {
                        Log.d("dialog", "choose OK")
                    }
                    }
                    setNegativeButton("Cancel") {
                         dialog, which -> {
                        Log.d("dialog", "choose Cancel")
                    }
                    }
                    show()
                }
            }
        }
    }
}