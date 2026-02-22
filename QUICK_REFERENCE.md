# ⚡ Vite - Быстрый справочник

## 📋 Основные команды

```bash
# Разработка (dev сервер)
npm run dev
# → Запускает Vite dev сервер на http://localhost:5173

# Сборка для продакшна
npm run build
# → Создает папку dist/ с оптимизированным кодом

# Предварительный просмотр сборки
npm run preview
# → Запускает локальный сервер с dist/ папки
```

---

## 🔑 Ключевые понятия

### 1. **Dev Server** (Сервер разработки)
- Локальный HTTP сервер на вашем компьютере
- Автоматически компилирует TypeScript → JavaScript
- Обновляет браузер при изменениях файлов

### 2. **HMR (Hot Module Replacement)**
- Замена модулей "на горячую"
- БЕЗ перезагрузки всей страницы
- Мгновенные изменения (50-200ms)

### 3. **ESM (ES Modules)**
- Стандарт JavaScript для модулей
- Браузеры понимают нативно
- `import` / `export` вместо `require`

### 4. **Bundle** (Сборка)
- Объединение всех файлов в один
- Минимизация кода
- Оптимизация для продакшна

### 5. **esbuild**
- Сверхбыстрый компилятор (написан на Go)
- 10-100x быстрее Babel/Webpack
- Используется Vite для компиляции

---

## 📁 Структура проекта

```
ts_basic/
│
├── index.html          # Входная точка
│   └── <script type="module" src="/src/script/main.ts">
│
├── vite.config.ts      # Настройки Vite
│
├── package.json        # Зависимости и скрипты
│   └── "scripts": { "dev": "vite" }
│
├── public/             # Статические файлы (как есть)
│   └── *.css, *.svg    # Доступны через /
│
└── src/
    └── script/         # TypeScript код
        ├── main.ts     # Главный файл
        ├── counter.ts  # Модуль
        └── new_step.ts # Модуль
```

---

## 🎯 Как это работает (коротко)

### Dev режим (`npm run dev`):

```
1. Vite запускает HTTP сервер
2. Вы открываете браузер
3. Браузер запрашивает файлы по одному
4. Vite компилирует TypeScript на лету
5. При изменении файла → HMR обновляет только его
```

### Build режим (`npm run build`):

```
1. TypeScript проверяет типы
2. Rollup собирает все файлы
3. esbuild минимизирует код
4. Результат → папка dist/
```

---

## 🔄 Жизненный цикл файла

```
Вы создаете: counter.ts
              ↓
Импортируете:   main.ts → import './counter'
              ↓
Браузер запрашивает: GET /src/script/counter.ts
              ↓
Vite:         1. Читает файл
              2. TypeScript → JavaScript
              3. Возвращает браузеру
              ↓
Браузер:      Выполняет JavaScript
              ↓
Вы редактируете: counter.ts (изменение)
              ↓
Vite:         WebSocket → Браузер "обновить!"
              ↓
Браузер:      Загружает новый counter.ts
              Заменяет модуль БЕЗ перезагрузки
              ↓
✅ Изменения видны!
```

---

## 📦 Что такое зависимости?

```json
// package.json
{
  "devDependencies": {
    "vite": "^6.4.1",        // Инструмент сборки
    "typescript": "^5.2.2",  // Компилятор TypeScript
    "prettier": "^3.3.1"     // Форматирование кода
  }
}
```

**Устанавливаются командой:**
```bash
npm install
```

**Сохраняются в:**
```
node_modules/  ← Все пакеты здесь
```

---

## 🌐 HTTP запросы (пример)

```
Браузер → Vite:
  GET http://localhost:5173/

Vite → Браузер:
  200 OK
  Content-Type: text/html
  <html>...</html>

─────────────────────────────

Браузер → Vite:
  GET http://localhost:5173/src/script/main.ts

Vite → Браузер:
  200 OK
  Content-Type: application/javascript
  import { setupCounter } from './counter';
  ...

─────────────────────────────

Браузер → Vite:
  GET http://localhost:5173/style.css

Vite → Браузер:
  200 OK
  Content-Type: text/css
  body { margin: 0; }
  ...
```

---

## ⚙️ vite.config.ts (основные опции)

```typescript
export default {
  // Dev сервер
  server: {
    port: 5173,        // Порт
    open: true,        // Автооткрытие браузера
    host: 'localhost'  // Хост
  },
  
  // Папка для статики
  publicDir: 'public',
  
  // Сборка
  build: {
    outDir: 'dist',    // Папка результата
    minify: true       // Минимизация
  }
}
```

---

## 🐛 Типичные ошибки и решения

### ❌ Ошибка: "Failed to load module"
**Причина:** Неправильный путь к файлу  
**Решение:** Проверить путь в index.html или импорте

### ❌ Ошибка: "Port 5173 already in use"
**Причина:** Порт уже занят  
**Решение:**
```bash
# Остановить процесс
Stop-Process -Name node -Force

# Или изменить порт в vite.config.ts
server: { port: 5174 }
```

### ❌ Ошибка: TypeScript типы
**Причина:** Ошибка в коде TypeScript  
**Решение:** Исправить тип или добавить `as any`

---

## 💡 Советы

### ✅ Используйте без расширения .ts
```typescript
// ✅ Правильно
import { setupCounter } from './counter'

// ❌ Неправильно (может не работать)
import { setupCounter } from './counter.ts'
```

### ✅ Статические файлы в public/
```
public/style.css → доступен как /style.css
public/logo.svg  → доступен как /logo.svg
```

### ✅ Проверка перед коммитом
```bash
npm run build  # Проверит типы и сделает сборку
```

---

## 📊 Скорость (сравнение)

| Инструмент | Старт | HMR | Сложность |
|------------|-------|-----|-----------|
| Webpack    | 20s   | 3s  | Высокая   |
| Parcel     | 10s   | 2s  | Средняя   |
| **Vite**   | 0.1s  | 0.05s | **Низкая** |

---

## 🎓 Терминология

- **npm** - менеджер пакетов (устанавливает зависимости)
- **package.json** - файл с информацией о проекте
- **node_modules** - папка с установленными пакетами
- **TypeScript** - JavaScript с типами
- **Bundler** - инструмент сборки (Vite, Webpack)
- **Dev Server** - локальный сервер для разработки
- **Production** - готовый код для публикации
- **HMR** - обновление без перезагрузки
- **ESM** - стандарт JavaScript модулей

---

## 🚀 Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev сервер
npm run dev

# 3. Открыть браузер
http://localhost:5173

# 4. Редактировать файлы
# Изменения видны мгновенно!

# 5. Сделать билд
npm run build

# Готово! 🎉
```

---

**🎯 Это все, что нужно знать для работы с Vite!**

## 📋 Основні команди

```bash
# Розробка (dev сервер)
npm run dev
# → Запускає Vite dev сервер на http://localhost:5173

# Збірка для продакшну
npm run build
# → Створює папку dist/ з оптимізованим кодом

# Попередній перегляд збірки
npm run preview
# → Запускає локальний сервер з dist/ папки
```

---

## 🔑 Ключові поняття

### 1. **Dev Server** (Сервер розробки)
- Локальний HTTP сервер на вашому комп'ютері
- Автоматично компілює TypeScript → JavaScript
- Оновлює браузер при змінах файлів

### 2. **HMR (Hot Module Replacement)**
- Заміна модулів "на гарячу"
- БЕЗ перезавантаження всієї сторінки
- Миттєві зміни (50-200ms)

### 3. **ESM (ES Modules)**
- Стандарт JavaScript для модулів
- Браузери розуміють нативно
- `import` / `export` замість `require`

### 4. **Bundle** (Збірка)
- Об'єднання всіх файлів в один
- Мінімізація коду
- Оптимізація для продакшну

### 5. **esbuild**
- Надшвидкий компілятор (написаний на Go)
- 10-100x швидше за Babel/Webpack
- Використовується Vite для компіляції

---

## 📁 Структура проєкту

```
ts_basic/
│
├── index.html          # Входова точка
│   └── <script type="module" src="/src/script/main.ts">
│
├── vite.config.ts      # Налаштування Vite
│
├── package.json        # Залежності та скрипти
│   └── "scripts": { "dev": "vite" }
│
├── public/             # Статичні файли (як є)
│   └── *.css, *.svg    # Доступні через /
│
└── src/
    └── script/         # TypeScript код
        ├── main.ts     # Головний файл
        ├── counter.ts  # Модуль
        └── new_step.ts # Модуль
```

---

## 🎯 Як це працює (коротко)

### Dev режим (`npm run dev`):

```
1. Vite запускає HTTP сервер
2. Ви відкриваєте браузер
3. Браузер запитує файли по одному
4. Vite компілює TypeScript на льоту
5. При зміні файлу → HMR оновлює тільки його
```

### Build режим (`npm run build`):

```
1. TypeScript перевіряє типи
2. Rollup збирає всі файли
3. esbuild мінімізує код
4. Результат → папка dist/
```

---

## 🔄 Життєвий цикл файлу

```
Ви створюєте: counter.ts
              ↓
Імпортуєте:   main.ts → import './counter'
              ↓
Браузер запитує: GET /src/script/counter.ts
              ↓
Vite:         1. Читає файл
              2. TypeScript → JavaScript
              3. Повертає браузеру
              ↓
Браузер:      Виконує JavaScript
              ↓
Ви редагуєте: counter.ts (зміна)
              ↓
Vite:         WebSocket → Браузер "оновити!"
              ↓
Браузер:      Завантажує новий counter.ts
              Замінює модуль БЕЗ перезавантаження
              ↓
✅ Зміни видно!
```

---

## 📦 Що таке залежності?

```json
// package.json
{
  "devDependencies": {
    "vite": "^6.4.1",        // Інструмент збірки
    "typescript": "^5.2.2",  // Компілятор TypeScript
    "prettier": "^3.3.1"     // Форматування коду
  }
}
```

**Встановлюються командою:**
```bash
npm install
```

**Зберігаються в:**
```
node_modules/  ← Всі пакети тут
```

---

## 🌐 HTTP запити (приклад)

```
Браузер → Vite:
  GET http://localhost:5173/

Vite → Браузер:
  200 OK
  Content-Type: text/html
  <html>...</html>

─────────────────────────────

Браузер → Vite:
  GET http://localhost:5173/src/script/main.ts

Vite → Браузер:
  200 OK
  Content-Type: application/javascript
  import { setupCounter } from './counter';
  ...

─────────────────────────────

Браузер → Vite:
  GET http://localhost:5173/style.css

Vite → Браузер:
  200 OK
  Content-Type: text/css
  body { margin: 0; }
  ...
```

---

## ⚙️ vite.config.ts (основні опції)

```typescript
export default {
  // Dev сервер
  server: {
    port: 5173,        // Порт
    open: true,        // Автовідкриття браузера
    host: 'localhost'  // Хост
  },
  
  // Папка для статики
  publicDir: 'public',
  
  // Збірка
  build: {
    outDir: 'dist',    // Папка результату
    minify: true       // Мінімізація
  }
}
```

---

## 🐛 Типові помилки та рішення

### ❌ Помилка: "Failed to load module"
**Причина:** Неправильний шлях до файлу  
**Рішення:** Перевірити шлях в index.html або імпорті

### ❌ Помилка: "Port 5173 already in use"
**Причина:** Порт вже зайнятий  
**Рішення:**
```bash
# Зупинити процес
Stop-Process -Name node -Force

# Або змінити порт у vite.config.ts
server: { port: 5174 }
```

### ❌ Помилка: TypeScript типи
**Причина:** Помилка в коді TypeScript  
**Рішення:** Виправити тип або додати `as any`

---

## 💡 Поради

### ✅ Використовуйте без розширення .ts
```typescript
// ✅ Правильно
import { setupCounter } from './counter'

// ❌ Неправильно (може не працювати)
import { setupCounter } from './counter.ts'
```

### ✅ Статичні файли в public/
```
public/style.css → доступний як /style.css
public/logo.svg  → доступний як /logo.svg
```

### ✅ Перевірка перед комітом
```bash
npm run build  # Перевірить типи та зробить збірку
```

---

## 📊 Швидкість (порівняння)

| Інструмент | Старт | HMR | Складність |
|------------|-------|-----|------------|
| Webpack    | 20s   | 3s  | Висока     |
| Parcel     | 10s   | 2s  | Середня    |
| **Vite**   | 0.1s  | 0.05s | **Низька** |

---

## 🎓 Термінологія

- **npm** - менеджер пакетів (встановлює залежності)
- **package.json** - файл з інформацією про проєкт
- **node_modules** - папка з встановленими пакетами
- **TypeScript** - JavaScript з типами
- **Bundler** - інструмент збірки (Vite, Webpack)
- **Dev Server** - локальний сервер для розробки
- **Production** - готовий код для публікації
- **HMR** - оновлення без перезавантаження
- **ESM** - стандарт JavaScript модулів

---

## 🚀 Швидкий старт

```bash
# 1. Встановити залежності
npm install

# 2. Запустити dev сервер
npm run dev

# 3. Відкрити браузер
http://localhost:5173

# 4. Редагувати файли
# Зміни видно миттєво!

# 5. Зробити білд
npm run build

# Готово! 🎉
```

---

**🎯 Це все, що потрібно знати для роботи з Vite!**


