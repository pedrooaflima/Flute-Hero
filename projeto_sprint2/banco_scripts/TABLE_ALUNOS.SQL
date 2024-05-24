use biblioteca_musicas;

create table alunos(
	id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(20) not null
);

insert into alunos values (1, "ALICE SANTOS", "ALICESANTOS@EMAILEXEMPLO.COM.BR", "ALICE123"),
						  (2, "FERNANDO MATOS", "FERNANDO_MATOS_12334@EMAILEXEMPLO.COM.BR", "FERNANDO123"),
                          (3, "LEONARDO FRAGA", "LEOFRAGA@EMAILEXEMPLO.COM.BR", "123LEO123"),
                          (4, "PAULO BRAGA", "PAULIN@EMAILEXEMPLO.COM.BR", "PAULIN123"),
                          (5, "MATEUS KLEIN", "MATEUSKLEIN@EMAILEXEMPLO.COM.BR", "MATEUS123"),
                          (6, "PEDRO SILVA", "PPEDROSILVA@EMAILEXEMPLO.COM.BR", "PEDRO123");