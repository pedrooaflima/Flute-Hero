use biblioteca_musicas;
show tables;

CREATE TABLE feedbacks (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    aula_id INT,
    comentario TEXT,
    data_comentario DATETIME,
    FOREIGN KEY (aula_id) REFERENCES aulas_realizadas(id)
);

desc aulas_realizadas;