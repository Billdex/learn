package com.example.uibestpratice

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), View.OnClickListener {
    private val msgList = ArrayList<Msg>()

    private var adapter: MsgAdapter ?= null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initMsg()
        val layoutManager = LinearLayoutManager(this)
        recyclerView.layoutManager = layoutManager
        adapter = MsgAdapter(msgList)
        recyclerView.adapter = adapter
        send_button.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when(v) {
            send_button -> {
                val content = editText.text.toString()
                if (content.isNotEmpty()) {
                    val msg = Msg(content, Msg.TYPE_SENT)
                    msgList.add(msg)
                    adapter?.notifyItemInserted(msgList.size - 1)
                    recyclerView.scrollToPosition(msgList.size - 1)
                    editText.setText("")
                }
            }
        }
    }

    private fun initMsg() {
        val msg1 = Msg("Hello", Msg.TYPE_RECEIVED)
        msgList.add(msg1)
        val msg2 = Msg("Hello, Who is that?", Msg.TYPE_SENT)
        msgList.add(msg2)
        val msg3 = Msg("This is Tom. Nice talking to you", Msg.TYPE_RECEIVED)
        msgList.add(msg3)
    }
}