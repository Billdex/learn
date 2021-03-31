package com.example.databasetest

import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val dbHelper = MyDatabaseHelper(this, "BookStore.db", 2)
        createDatabase.setOnClickListener {
            dbHelper.writableDatabase
        }
        addData.setOnClickListener {
            val db = dbHelper.writableDatabase
            val values1 = ContentValues().apply {
                put("name", "第一行代码")
                put("author", "郭霖")
                put("pages", 692)
                put("price", 99)
            }
            db.insert("Book", null, values1)
            Toast.makeText(this, "add a data ", Toast.LENGTH_SHORT).show()
        }
        updateData.setOnClickListener {
            val db = dbHelper.writableDatabase
            val values = ContentValues()
            values.put("price", 88.99)
            db.update("Book", values, "name = ?", arrayOf("第一行代码"))
        }
        deleteData.setOnClickListener {
            val db = dbHelper.writableDatabase
            db.delete("Book", "pages > ?", arrayOf("1000"))
        }
        queryData.setOnClickListener {
            val db = dbHelper.writableDatabase
            val cursor = db.query("Book", null, null, null, null, null, null)
            if (cursor.moveToFirst()) {
                 do {
                     val name = cursor.getString(cursor.getColumnIndex("name"))
                     val author = cursor.getString(cursor.getColumnIndex("author"))
                     val pages = cursor.getInt(cursor.getColumnIndex("pages"))
                     val price = cursor.getDouble(cursor.getColumnIndex("price"))
                     Log.d("MainActivity", "book name: $name, author: $author, pages: $pages, price: $price")
                 } while (cursor.moveToNext())
            }
            cursor.close()
        }
    }
}