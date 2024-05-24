use biblioteca_musicas;

create table atividades (
	id int auto_increment primary key,
	data_envio varchar(50),
    nome_aluno varchar(50),
    nome_musica varchar(50),
    compositor varchar(50),
    ano_lançamento varchar(50)
);