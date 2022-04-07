INSERT INTO users(id, firstname, lastname, email, password)
VALUES
    ('0ae7506d-c090-4926-b3de-240514a03909',
      'Payel',
      'Gayen',
      'payel.gayen@gamil.com',
      '$2a$10$Tbfxj5AS4.48.fJ1Iy1vPu0T/0LmXJFQGFjfnYZTHCQwASABErnoC'
   ),
   ('939e7e80-d756-45c8-9f2e-565cc893b96a', 
      'Daniela',
      'Calderon',
      'Daniela@gamil.com',
      '$2a$10$Tbfxj5AS4.48.fJ1Iy1vPu0T/1LmXJFQGFjfnYZTHCQwASABErnoC'
   );


INSERT INTO schedule(user_id, day, start_time, end_time ) 
values ('0ae7506d-c090-4926-b3de-240514a03909', 7, '6 AM', '8 AM'), ('939e7e80-d756-45c8-9f2e-565cc893b96a', 6, '8 AM', '10 AM');

