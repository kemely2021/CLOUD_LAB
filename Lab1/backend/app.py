from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    return "Hola desde el Backend con Flask 🚀"

@app.route('/db')
def db_check():
    try:
        conn = mysql.connector.connect(
            host="db",
            user="usuario",
            password="clave123",
            database="prueba"
        )
        cursor = conn.cursor()
        cursor.execute("SELECT 'Conexión OK con MySQL!'")
        result = cursor.fetchone()
        return jsonify({"db_response": result[0]})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
