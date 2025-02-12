create table player (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(15) not null unique
);

create table slime (
  id int unsigned primary key auto_increment not null,
  name varchar(15) not null,
  color ENUM('grey','red','green','blue') DEFAULT 'grey',
  player_id INT UNSIGNED NOT NULL,
  foreign key(player_id) references player(id)
);

insert into player(id, pseudo) values
  (1, "player");


insert into slime(id, name, color, player_id)
values
  (1, "Slime", "grey", 1);