use molveno_dev_personal

create table all_menus (id int primary key auto_increment,
  menu_name varchar(1000) not null
);

create table contactinfos (id int primary key auto_increment,
  firstname varchar(1000) not null,
  prefix_lastname varchar(1000),
  lastname varchar(1000) not null,
  address varchar(1000),
  email varchar(1000) not null,
  telephone varchar(1000) not null,
  dateofbirth date,
  greeting varchar(1000)
);

create table ingredients (id int primary key auto_increment,
  name varchar(1000) not null,
  allergen varchar(1000),
  unit_of_measurement varchar(1000) not null,
  amount_in_stock double not null
);

create table menu_items (id int primary key auto_increment,
  name varchar(1000) not null,
  description varchar(1000),
  price double not null
);

create table menu_data (id int primary key auto_increment,
  menu_id int not null,
  menu_item_id int not null,
  foreign key (menu_id) references all_menus(id),
  foreign key (menu_item_id) references menu_items(id)
);

create table menu_item_contents (id int primary key auto_increment,
  menu_item_id int not null,
  ingredient_id int not null,
  foreign key (menu_item_id) references all_menus(id),
  foreign key (ingredient_id) references ingredients(id)
);

create table reservations (id int primary key auto_increment,
  reservation_date date not null,
  start_time time not null,
  hide_menu_price bool not null,
  number_of_guests int not null,
  allergy varchar(1000),
  special_needs varchar(1000),
  contactinfos_id int not null,
  foreign key (contactinfos_id) references contactinfos(id)
);

create table restaurant_invoices (id int primary key auto_increment,
  total_price double not null,
  contactinfos_id int not null,
  foreign key (contactinfos_id) references contactinfos(id)
);

create table restaurant_tables (id int primary key auto_increment,
  capacity int not null,
  available bool not null,
  table_callsign varchar(1000) not null
);

create table restaurant_orders (id int primary key auto_increment,
  special_wishes varchar(1000),
  order_timestamp timestamp not null,
  completed bool not null,
  table_id int not null,
  menu_item_id int not null,
  foreign key (table_id) references restaurant_tables(id),
  foreign key (menu_item_id) references menu_items(id)
);

create table table_reservations (id int primary key auto_increment,
  reservation_id int not null,
  table_id int not null,
  foreign key (reservation_id) references reservations(id),
  foreign key (table_id) references restaurant_tables(id)
);

create table order_invoices (id int primary key auto_increment,
  order_id int not null,
  invoice_id int not null,
  foreign key (order_id) references restaurant_orders(id),
  foreign key (invoice_id) references restaurant_invoices(id)
);
