# NoteKeeper API

Этот проект представляет собой простой API для управления записками, разработанный на Node.js с использованием SQLite. API предоставляет базовые CRUD-операции (создание, чтение, обновление, удаление) для работы с пользователями в базе данных SQLite.

## API Энпоинты

- **GET /api/notes** - получение всех записок.
- **GET /api/notes/{id}** - получение записки по id.
- **POST /api/notes** - создание новой записки.
  - Необходимые параметры: { "title": "test title", "text": "test text" }.
- **PUT /api/notes/{id}** - изменение записки по id.
  - Необходимые параметры: { "title": "updated title", "text": "updated text" }.
- **DELETE /api/notes/{id}** - удаление записки по id.

## Использование

Для тестирования запросов вы можете использовать Postman, cURL или любой другой HTTP-клиент.

1. **GET /api/notes**

- Отправка запроса:

  ```bash
  curl http://localhost:3000/api/notes
  ```

- Ответ:
  ```json
  [{ "id": 1, "title": "title", "text": "text" }]
  ```

2. **GET /api/notes/{id}**

- Отправка запроса:

  ```bash
  curl http://localhost:3000/api/notes/{id}
  ```

- Ответ:
  ```json
  { "id": 1, "title": "title", "text": "text" }
  ```

3. **POST /api/notes**

- Отправка запроса:
  ```bash
  curl -X POST http://localhost:3000/api/notes -H "Content-Type: application/json" -d '{ "title": "test", "text": "test" }'
  ```
- Ответ:
  ```json
  { "id": 1 }
  ```

4. **PUT /api/notes/{id}**

- Отправка запроса:

  ```bash
  curl -X PUT http://localhost:3000/api/notes/{id} -H "Content-Type: application/json" -d '{ "title": "updated title", "text": "updated text" }'
  ```

- Ответ:
  ```json
  { "id": 1 }
  ```

5. **DELETE /api/notes/{id}**

- Отправка запроса:

  ```bash
  curl -X DELETE http://localhost:3000/api/notes/{id}
  ```

- Ответ:
  ```json
  { "id": 1 }
  ```

## Установка

1. Склонируйте репозиторий к себе на компьютер.

   ```bash
   git clone https://github.com/rashupkintimur/NoteKeeper-API.git
   ```

2. Перейдите в директорию проекта.

   ```bash
   cd NoteKeeper-API
   ```

3. Установките необходимые зависимости.

   ```bash
   npm install
   ```

4. Запустите API.
   ```bash
   npm run dev
   ```
