from flask import Flask, request, jsonify
import mysql.connector, os
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)

db_config = {
    'host': os.getenv("DB_HOST", "db"),
    'user': os.getenv("DB_USER", "root"),
    'password': os.getenv("DB_PASSWORD", "example"),
    'database': os.getenv("DB_NAME", "usuarios_db")
}

def get_db():
    return mysql.connector.connect(**db_config)

@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route("/usuarios", methods=["POST"])
def agregar_usuario():
    nuevo = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (nombre, email) VALUES (%s, %s)",
                   (nuevo["nombre"], nuevo["email"]))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"msg": "Usuario agregado"}), 201

@app.route("/usuarios/<int:id>", methods=["DELETE"])
def borrar_usuario(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id=%s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"msg": "Usuario eliminado"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
