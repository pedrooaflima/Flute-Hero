from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="mklein2505",
        database="biblioteca_musicas"
    )

# Rota para obter todas as músicas
@app.route('/api/music', methods=['GET'])
def get_music():
    mydb = get_db_connection()
    cursor = mydb.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM musicas")
        musicas = cursor.fetchall()
        print("Músicas retornadas:", musicas)  # Log dos dados retornados
        return jsonify(musicas)
    except mysql.connector.Error as err:
        print("Erro ao buscar músicas:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

# Rota para obter todos os alunos
@app.route('/api/students', methods=['GET'])
def get_students():
    mydb = get_db_connection()
    cursor = mydb.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM alunos")
        alunos = cursor.fetchall()
        print("Alunos retornados:", alunos)  # Log dos dados retornados
        return jsonify(alunos)
    except mysql.connector.Error as err:
        print("Erro ao buscar alunos:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

# Rota para adicionar uma nova atividade
@app.route('/api/atividade', methods=['POST'])
def add_atividade():
    mydb = get_db_connection()
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
    try:
        cursor.execute(query, (data_envio, nome_aluno, nome_musica, compositor, link_musica))
        mydb.commit()
        return jsonify({'message': 'Atividade adicionada com sucesso!'}), 201
    except mysql.connector.Error as err:
        print("Erro ao adicionar atividade:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

# Rota para obter todas as atividades
@app.route('/api/select_atv', methods=['GET'])
def select_atividade():
    mydb = get_db_connection()
    cursor = mydb.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM atividades")
        atividades = cursor.fetchall()
        print("Atividades retornadas:", atividades)  # Log dos dados retornados
        return jsonify(atividades)
    except mysql.connector.Error as err:
        print("Erro ao buscar atividades:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

# Rota para deletar uma atividade
@app.route('/api/delete_atv/<int:id>', methods=['DELETE'])
def delete_atividade(id):
    mydb = get_db_connection()
    cursor = mydb.cursor()
    try:
        query = "DELETE FROM atividades WHERE id = %s"
        cursor.execute(query, (id,))
        mydb.commit()
        print(f"Atividade com id {id} excluída com sucesso!")  # Log de sucesso
        return jsonify({"message": "Atividade excluída com sucesso!"}), 200
    except mysql.connector.Error as err:
        print(f"Erro ao excluir atividade com id {id}:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

@app.route('/api/aulas_realizadas', methods=['GET'])
def get_aulas_realizadas():
    mydb = get_db_connection()
    cursor = mydb.cursor(dictionary=True)
    try:
        query = """
        SELECT ar.data_aula, ar.instrumento, a.nome as nome_aluno, p.nome as nome_professor, ar.id
        FROM aulas_realizadas ar
        JOIN alunos a ON ar.id_aluno = a.id
        JOIN professor p ON ar.id_professor = p.id
        """
        cursor.execute(query)
        aulas = cursor.fetchall()
        print("Aulas realizadas retornadas:", aulas)  # Log dos dados retornados
        return jsonify(aulas)
    except mysql.connector.Error as err:
        print("Erro ao buscar aulas realizadas:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

# Rota para adicionar feedback
@app.route('/api/feedback', methods=['POST'])
def add_feedback():
    mydb = get_db_connection()
    data = request.json
    print('Dados recebidos:', data)  # Log dos dados recebidos

    aula_id = data.get('aula_id')
    comentario = data.get('comentario')
    data_comentario = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    print(f'aula_id: {aula_id}, comentario: {comentario}, data_comentario: {data_comentario}')  # Log dos valores extraídos

    if not all([aula_id, comentario]):
        return jsonify({'error': 'Faltam dados'}), 400

    cursor = mydb.cursor()
    try:
        query = """
        INSERT INTO feedbacks (aula_id, comentario, data_comentario)
        VALUES (%s, %s, %s)
        """
        cursor.execute(query, (aula_id, comentario, data_comentario))
        mydb.commit()
        print('Feedback inserido com sucesso')  # Log de sucesso
        return jsonify({'message': 'Feedback enviado com sucesso!'}), 201
    except mysql.connector.Error as err:
        print('Erro ao inserir feedback:', err)  # Log do erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

@app.route('/api/feedbacks', methods=['GET'])
def get_feedbacks():
    mydb = get_db_connection()
    cursor = mydb.cursor(dictionary=True)
    try:
        query = """
        SELECT ar.data_aula, p.nome as nome, a.nome as nome_aluno, ar.instrumento, f.comentario
        FROM feedbacks f
        JOIN aulas_realizadas ar ON f.aula_id = ar.id
        JOIN alunos a ON ar.id_aluno = a.id
        JOIN professor p ON ar.id_professor = p.id
        """
        cursor.execute(query)
        feedbacks = cursor.fetchall()
        print("Feedbacks retornados:", feedbacks)  # Log dos dados retornados
        return jsonify(feedbacks)
    except mysql.connector.Error as err:
        print("Erro ao buscar feedbacks:", err)  # Log de erro
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        mydb.close()

if __name__ == '__main__':
    app.run(debug=True)