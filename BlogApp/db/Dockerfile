FROM postgres:15
ENV POSTGRES_DB=blogdb     POSTGRES_USER=user     POSTGRES_PASSWORD=pass
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432