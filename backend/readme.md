# Backend

## MySQL

1. Levanta los contenedores con `docker compose up -d`.
2. Ejecuta `npm install` para instalar dependencias.
3. Ejecuta `npm run db:init` para crear o actualizar las tablas y datos semilla.
4. Inicia el backend con `npm start`.

La conexion usa `mysql2` sin ORM y apunta por defecto a la base `course_db` del `compose.yml`.
