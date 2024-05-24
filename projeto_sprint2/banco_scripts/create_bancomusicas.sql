create table musicas(
	id int auto_increment,
    nome varchar(30) not null,
	compositor varchar(30) not null,
    ano_lancamento varchar(10),
    primary key (id)
);
alter table musicas add link_traducao varchar(200);
desc musicas;

create table instrumentos(
	id int auto_increment,
    nome_instrumento varchar(30) not null,
    primary key (id)
);

insert into musicas
values (1, "believer", "imagine dragons", "2012", "https://www.vagalume.com.br/imagine-dragons/believer-traducao.html"),
		(2, "perfect", "ed sheeran", "2014", "https://www.vagalume.com.br/ed-sheeran/perfect-traducao.html"),
        (3, "viva-la-vida", "coldplay", "2018", "https://www.vagalume.com.br/coldplay/viva-la-vida-traducao.html"),
        (4, "yellow", "coldplay", "2015", "https://www.vagalume.com.br/coldplay/yellow-traducao.html"),
        (5, "demons", "imagina dragons", "2016", "https://www.vagalume.com.br/imagine-dragons/demons-traducao.html"),
        (6, "paradise", "coldplay", "2019", "https://www.vagalume.com.br/coldplay/paradise-traducao.html"),
        (7, "fortnight", "taylor swift", "2020", "https://www.vagalume.com.br/taylor-swift/fortnight-feat-post-malone-traducao.html"),
        (8, "try", "pink", "2021", "https://www.vagalume.com.br/pink/try-traducao.html"),
        (9, "human", "rag'n'bone man", "2018", "https://www.vagalume.com.br/ragnbone-man/human-traducao.html"),
        (10, "friends", "ella henderson", "2015", "https://www.vagalume.com.br/ella-henderson/friends-traducao.html"),
        (11, "flowers", "miley cyrus", "2013", "https://www.vagalume.com.br/miley-cyrus/flowers-traducao.html"),
        (12, "fast car", "tracy chapman", "2014", "https://www.vagalume.com.br/tracy-chapman/fast-car-traducao.html"),
        (13, "let it be", "the beatles", "2012", "https://www.vagalume.com.br/the-beatles/let-it-be-traducao.html"),
        (14, "count on me", "bruno mars", "2013", "https://www.vagalume.com.br/bruno-mars/count-on-me-traducao.html"),
        (15, "pumped up kicks", "foster the people", "2011", "https://www.vagalume.com.br/foster-the-people/pumped-up-kicks-traducao.html"),
        (16, "too sweet", "hozier", "2011", "https://www.vagalume.com.br/hozier/too-sweet.html"),
        (17, "always", "gavin james", "2013", "https://www.vagalume.com.br/gavin-james/always-traducao.html"),
        (18, "in the end", "linkin park", "2015", "https://www.vagalume.com.br/linkin-park/in-the-end-traducao.html");

select * from musicas;

insert into instrumentos values (1, "flauta-doce"),
								(2, "violao"),
                                (3, "guitarra");

select * from instrumentos;
        