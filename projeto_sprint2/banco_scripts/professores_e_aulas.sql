use biblioteca_musicas;

create table alunos(
	id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null
);

create table professor(
	id int auto_increment primary key,
    nome varchar(50)
);

insert into professor values (1, "TAYLOR SWIFT"),
							 (2, "ARIANA GRANDE"),
                             (3, "ROBERTO CARLOS"),
                             (4, "BEYONCÉ"),
                             (5, "JOHN LENON");

create table aulas_realizadas(
	id int auto_increment primary key,
    id_professor int not null,
    id_aluno int not null,
    instrumento varchar(50) not null,
    CONSTRAINT fk_professor FOREIGN KEY (id_professor) REFERENCES professor(id),
    CONSTRAINT fk_aluno FOREIGN KEY (id_aluno) REFERENCES alunos(id)
);

alter table aulas_realizadas add column data_aula varchar(50);

insert into aulas_realizadas values (1, 1, 1, "FLAUTA-DOCE"),
									(2, 2, 2, "VIOLAO"),
									(3, 3, 3, "VIOLINO"),
									(4, 4, 4, "BATERIA"),
									(5, 5, 5, "GUITARRA"),
                                    (6, 1, 5, "FLAUTA-DOCE"),
									(7, 2, 4, "VIOLAO"),
									(8, 3, 3, "VIOLINO"),
									(9, 4, 2, "BATERIA"),
									(10, 5, 1, "GUITARRA");

update aulas_realizadas set data_aula='2024/04/2024';

select * from aulas_realizadas;