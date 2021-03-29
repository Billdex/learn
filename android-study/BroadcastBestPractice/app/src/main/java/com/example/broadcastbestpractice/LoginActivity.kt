package com.example.broadcastbestpractice

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_login.*

class LoginActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        loadAccount()
        login.setOnClickListener {
            val account = accountEdit.text.toString()
            val password = passwordEdit.text.toString()
            if (account == "admin" && password == "123456") {
                val intent = Intent(this, MainActivity:: class.java)
                if (rememberPass.isChecked) {
                    rememberPassword(account, password)
                } else {
                    clearPassword()
                }
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "account or password is invalid", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun loadAccount() {
        val prefs = getPreferences(Context.MODE_PRIVATE)
        val isRemember = prefs.getBoolean("remember_password", false)
        if (isRemember) {
            val account = prefs.getString("account", "")
            val password = prefs.getString("password", "")
            accountEdit.setText(account)
            passwordEdit.setText(password)
            rememberPass.isChecked = true
        }
    }

    private fun rememberPassword(account: String, password: String) {
        val editor = getPreferences(Context.MODE_PRIVATE).edit()
        editor.putBoolean("remember_password", true)
        editor.putString("account", account)
        editor.putString("password", password)
        editor.apply()
    }

    private fun clearPassword() {
        val editor = getPreferences(Context.MODE_PRIVATE).edit()
        editor.clear()
        editor.apply()
    }

}