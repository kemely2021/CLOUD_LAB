FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=example
ENV MYSQL_DATABASE=usuarios_db
COPY init.sql /docker-entrypoint-initdb.d/
