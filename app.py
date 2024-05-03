from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Conexão com o banco de dados MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mklein2505",
    database="biblioteca_musicas"
)

# Rota para obter todas as músicas
@app.route('/api/music', methods=['GET'])
def get_music():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM musicas")
    musicas = cursor.fetchall()
    return jsonify(musicas)

if __name__ == '__main__':
    app.run(debug=True)