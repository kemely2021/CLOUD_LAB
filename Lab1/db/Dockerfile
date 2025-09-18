FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=root123
ENV MYSQL_DATABASE=prueba
ENV MYSQL_USER=usuario
ENV MYSQL_PASSWORD=clave123

COPY init.sql /docker-entrypoint-initdb.d/
