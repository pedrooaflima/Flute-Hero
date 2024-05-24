from flask import Flask, jsonify, request
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
    try:
        cursor.execute("SELECT * FROM musicas")
        musicas = cursor.fetchall()
        return jsonify(musicas)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()

# Rota para obter todos os alunos
@app.route('/api/students', methods=['GET'])
def get_students():
    cursor = mydb.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM alunos")
        alunos = cursor.fetchall()
        return jsonify(alunos)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()

# Rota para adicionar uma nova atividade
@app.route('/api/atividade', methods=['POST'])
def add_atividade():
    data = request.json
    print('Recebido:', data)  # Adicione este log para verificar os dados recebidos

    nome_aluno = data.get('nome_aluno')
    data_envio = data.get('data_envio')
    nome_musica = data.get('nome_musica')
    compositor = data.get('compositor')
    link_musica = data.get('link_musica')

    if not all([nome_aluno, data_envio, nome_musica, compositor, link_musica]):
        return jsonify({'error': 'Faltam dados'}), 400

    cursor = mydb.cursor()
    query = """
    INSERT INTO atividades (data_envio, nome_aluno, nome_musica, compositor, link)
    VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (data_envio, nome_aluno, nome_musica, compositor, link_musica))
    mydb.commit()
    cursor.close()

    return jsonify({'message': 'Atividade adicionada com sucesso!'}), 201

# Rota para obter todas as atividades
@app.route('/api/select_atv', methods=['GET'])
def select_atividade():
    cursor = mydb.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM atividades")
        atividades = cursor.fetchall()
        return jsonify(atividades)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()

# Rota para deletar uma atividade
@app.route('/api/delete_atv/<int:id>', methods=['DELETE'])
def delete_atividade(id):
    cursor = mydb.cursor()
    try:
        query = "DELETE FROM atividades WHERE id = %s"
        cursor.execute(query, (id,))
        mydb.commit()
        return jsonify({"message": "Atividade excluída com sucesso!"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()

@app.route('/api/aulas_realizadas', methods=['GET'])
def get_aulas_realizadas():
    cursor = mydb.cursor(dictionary=True)
    try:
        query = """
        SELECT ar.data_aula, ar.instrumento, a.nome as nome_aluno, p.nome as nome_professor
        FROM aulas_realizadas ar
        JOIN alunos a ON ar.id_aluno = a.id
        JOIN professor p ON ar.id_professor = p.id
        """
        cursor.execute(query)
        aulas = cursor.fetchall()
        return jsonify(aulas)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)