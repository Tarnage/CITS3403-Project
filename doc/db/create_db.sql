CREATE TABLE users
(
  u_name VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (u_name)
);

CREATE TABLE stats
(
  tot_score INT NOT NULL,
  tot_hints INT NOT NULL,
  tot_words INT NOT NULL,
  four_letters INT NOT NULL,
  five_letters INT NOT NULL,
  six_letters INT NOT NULL,
  seven_letters INT NOT NULL,
  eight_letters INT NOT NULL,
  nine_letters INT NOT NULL,
  tot_time_played INT NOT NULL,
  tot_pool INT NOT NULL,
  u_name VARCHAR NOT NULL,
  FOREIGN KEY (u_name) REFERENCES users(u_name)
);
