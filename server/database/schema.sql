create table player (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(15) not null unique
);

create table slime (
  id int unsigned primary key auto_increment not null,
  name varchar(15) not null DEFAULT 'Slime',
  status ENUM('hidden','alive', 'dead') DEFAULT 'hidden',
  color ENUM('grey','red','green','blue') DEFAULT 'grey',
  player_id INT UNSIGNED NOT NULL,
  foreign key(player_id) references player(id)
);

create table quest (
 id int unsigned primary key auto_increment not null,
 keep_slime boolean default false,
 choose_color boolean default false,
 player_id int unsigned NOT null,
 foreign key(player_id) references player(id)
);

insert into player(id, pseudo) 
values
  (1, "player");

insert into slime(id, name, player_id)
values
  (1, "Slime", 1);