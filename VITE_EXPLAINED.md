# 🚀 Как работает npm run dev - Полный гид

## 📚 Содержание
1. [Что такое npm run dev](#что-такое-npm-run-dev)
2. [Что такое Vite](#что-такое-vite)
3. [Как это все работает вместе](#как-это-все-работает-вместе)
4. [Свойства Vite](#свойства-vite)
5. [Конфигурация](#конфигурация)

---

## 🔍 Что такое `npm run dev`?

### Шаг 1: Что происходит когда вы пишете `npm run dev`

```bash
npm run dev
```

**NPM** (Node Package Manager) ищет команду `dev` в файле `package.json`:

```json
{
  "scripts": {
    "dev": "vite"  // ← Вот эта команда запускается!
  }
}
```

**Простыми словами:** `npm run dev` = запустить команду `vite`

---

## ⚡ Что такое Vite?

**Vite** (французское слово, означает "быстрый") - это инструмент для разработки веб-приложений.

### Почему Vite такой быстрый?

#### 🐌 Старый подход (Webpack):
```
Запуск → Собирает ВСЕ файлы → Ждем 30+ секунд → Браузер
```

#### ⚡ Vite подход:
```
Запуск → Мгновенно открывает сервер → Загружает только нужные файлы → Браузер
```

### Ключевое отличие:
- **Webpack/Parcel**: сначала собирает все, потом показывает
- **Vite**: показывает сразу, собирает только то, что нужно

---

## 🔄 Как это все работает вместе (пошагово)

### 1️⃣ Вы запускаете `npm run dev`

```bash
npm run dev
```

### 2️⃣ NPM находит команду в package.json

```json
"scripts": {
  "dev": "vite"
}
```

### 3️⃣ Vite запускает dev сервер

```
VITE v6.4.1  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4️⃣ Что делает Vite:

1. **Создает HTTP сервер** на порту 5173
2. **Читает index.html** в корне проекта
3. **Ждет запросов** от браузера

### 5️⃣ Вы открываете http://localhost:5173

Браузер запрашивает `index.html`:

```html
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <script type="module" src="/src/script/main.ts"></script>
</body>
</html>
```

### 6️⃣ Vite обрабатывает запросы:

#### Запрос 1: `GET /style.css`
```
Браузер → Vite → public/style.css → Браузер
```

#### Запрос 2: `GET /src/script/main.ts`
```
Браузер → Vite → 
  1. Читает main.ts
  2. Компилирует TypeScript → JavaScript
  3. Находит импорты: import './counter'
  4. Отправляет JavaScript браузеру
```

#### Запрос 3: `GET /src/script/counter.ts`
```
Браузер → Vite → 
  1. Читает counter.ts
  2. Компилирует TypeScript → JavaScript
  3. Отправляет JavaScript браузеру
```

### 7️⃣ Hot Module Replacement (HMR)

Вы изменяете файл `counter.ts`:

```
1. Vite видит изменение файла
2. Через WebSocket отправляет сообщение браузеру
3. Браузер перезагружает ТОЛЬКО измененный модуль
4. Страница обновляется БЕЗ полной перезагрузки!
```

**Результат:** Изменения видны мгновенно! ⚡

---

## 🎯 Свойства Vite (подробно)

### 1. **Dev Server (Сервер разработки)**

```typescript
// vite.config.ts
export default {
  server: {
    port: 5173,           // Порт сервера
    host: 'localhost',    // Хост
    open: true,           // Автоматически открыть браузер
    cors: true,           // CORS для API запросов
    
    // Прокси для API
    proxy: {
      '/api': 'http://localhost:3000'
    },
    
    // HMR настройки
    hmr: {
      overlay: true       // Показывать ошибки на экране
    }
  }
}
```

**Что это дает:**
- 🌐 Локальный веб-сервер
- 🔄 Автоматическое обновление при изменениях
- 🔗 Прокси для backend API
- 🐛 Ошибки прямо на экране

---

### 2. **Build (Сборка для продакшна)**

```bash
npm run build
```

Что происходит:

```
1. TypeScript → JavaScript (через tsc)
2. JavaScript → Оптимизированный bundle (через Rollup)
3. Минимизация кода (удаление пробелов, короткие имена)
4. Tree-shaking (удаление неиспользуемого кода)
5. Code-splitting (разбиение на маленькие файлы)
6. Результат → папка dist/
```

**Конфигурация:**

```typescript
// vite.config.ts
export default {
  build: {
    outDir: 'dist',              // Папка для сборки
    assetsDir: 'assets',         // Папка для CSS/JS/Images
    minify: 'esbuild',           // Минимизатор (быстрее Terser)
    sourcemap: true,             // Source maps для дебага
    
    rollupOptions: {
      output: {
        manualChunks: {          // Разделить код на части
          'vendor': ['react', 'react-dom']
        }
      }
    }
  }
}
```

---

### 3. **Public Directory (Папка для статики)**

```typescript
export default {
  publicDir: 'public'
}
```

**Файлы в `public/`:**
- ✅ Копируются как есть (без обработки)
- ✅ Доступны через корень: `/style.css`, `/logo.svg`
- ✅ НЕ проходят через build систему

**Пример:**
```html
<!-- В HTML можно использовать напрямую -->
<link rel="stylesheet" href="/style.css">
<img src="/logo.svg">
```

---

### 4. **Module Resolution (Разрешение модулей)**

Vite понимает разные способы импорта:

```typescript
// 1. Относительные импорты
import { setupCounter } from './counter'

// 2. Абсолютные импорты из node_modules
import React from 'react'

// 3. Импорт CSS
import './style.css'

// 4. Импорт JSON
import data from './data.json'

// 5. Импорт Assets (изображения)
import logo from './logo.svg'  // → возвращает URL

// 6. Динамические импорты (lazy loading)
const module = await import('./heavy-module.js')
```

---

### 5. **TypeScript поддержка**

Vite **не проверяет типы** (для скорости), но **компилирует** TS → JS:

```typescript
// counter.ts
export function setupCounter(element: HTMLElement) {
  // TypeScript код
}

// ↓ Vite компилирует ↓

// counter.js (в браузере)
export function setupCounter(element) {
  // JavaScript код
}
```

**Для проверки типов:**
```bash
npm run build  # Сначала запускает tsc --noEmit
```

---

### 6. **Hot Module Replacement (HMR)**

**Магия обновления без перезагрузки страницы:**

```typescript
// counter.ts
export function setupCounter(element: HTMLElement) {
  let counter = 0;
  // ...
}

// Vite автоматически добавляет HMR код:
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Обновить только этот модуль
  })
}
```

**Как это работает:**

1. **WebSocket соединение:** Браузер ↔ Vite сервер
2. **Вы изменяете файл** → Vite видит изменение
3. **Vite отправляет** через WebSocket: "обновить counter.ts"
4. **Браузер загружает** только новый counter.ts
5. **Модуль заменяется** БЕЗ перезагрузки страницы!

```
🔄 HMR процесс:
Файл изменен → WebSocket сообщение → Загрузка модуля → Замена → Готово!
⏱️ Скорость: ~50-200ms
```

---

### 7. **CSS/SCSS поддержка**

```typescript
// main.ts
import './style.css'        // Простой CSS
import './style.scss'       // SCSS (нужно: npm i -D sass)
import './style.module.css' // CSS Modules

// CSS Modules пример:
import styles from './style.module.css'
element.className = styles.button  // → "button_a3f2k"
```

**Что Vite делает с CSS:**
- ✅ Автоматически добавляет в `<head>`
- ✅ HMR для CSS (без перезагрузки)
- ✅ PostCSS обработка (автопрефиксы)
- ✅ Минимизация в production

---

### 8. **Плагины**

Vite имеет систему плагинов (на базе Rollup):

```typescript
// vite.config.ts
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    react(),  // Поддержка React
    vue(),    // Поддержка Vue
  ]
}
```

**Популярные плагины:**
- `@vitejs/plugin-react` - React + JSX
- `@vitejs/plugin-vue` - Vue SFC
- `vite-plugin-pwa` - PWA (Progressive Web App)
- `vite-imagetools` - Оптимизация изображений

---

### 9. **Оптимизации**

#### Dependency Pre-Bundling (Предварительная сборка зависимостей)

```
При первом запуске:
1. Vite сканирует все import из node_modules
2. Собирает их в один файл (через esbuild)
3. Кеширует в node_modules/.vite/
4. При следующих запусках - мгновенная загрузка!
```

**Почему это быстро:**
- esbuild написан на Go (10-100x быстрее JS)
- Кеширование (один раз собрали - много раз использовали)

#### Tree Shaking

```javascript
// lodash имеет 300+ функций
import { debounce } from 'lodash'

// В финальном билде будет ТОЛЬКО debounce
// Размер: вместо 70KB → 2KB
```

---

## 🔧 Полная конфигурация Vite (пример)

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // Корень проекта
  root: '.',
  
  // Папка для статических файлов
  publicDir: 'public',
  
  // База URL (для подкаталогов)
  base: '/',
  
  // Dev сервер
  server: {
    port: 5173,
    host: 'localhost',
    open: true,              // Автооткрытие браузера
    cors: true,
    strictPort: false,       // Если порт занят - взять другой
    
    // HMR
    hmr: {
      overlay: true,         // Показывать ошибки
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    
    // Прокси для API
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    
    // HTTPS (для тестирования)
    https: false
  },
  
  // Build настройки
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',       // Минимизация
    sourcemap: false,        // Source maps
    target: 'es2015',        // Таргет браузера
    cssCodeSplit: true,      // Разделять CSS
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react']
        }
      }
    }
  },
  
  // Обработка CSS
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  
  // Алиасы путей
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  
  // Переменные окружения
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
})
```

---

## 🌐 Как работает браузер с Vite

### Схема запросов:

```
1. Браузер запрашивает: GET http://localhost:5173/
   ← Vite возвращает: index.html

2. Браузер видит: <script type="module" src="/src/script/main.ts">
   Браузер запрашивает: GET /src/script/main.ts
   ← Vite:
     - Читает main.ts
     - Компилирует TS → JS
     - Преобразует импорты: './counter' → './counter.ts'
     - Возвращает JavaScript

3. Браузер видит: import { setupCounter } from './counter'
   Браузер запрашивает: GET /src/script/counter.ts
   ← Vite повторяет процесс

4. Браузер видит: <link rel="stylesheet" href="/style.css">
   Браузер запрашивает: GET /style.css
   ← Vite:
     - Читает public/style.css
     - Возвращает CSS (без изменений)
```

**Ключевой момент:** 
Каждый файл загружается **отдельным HTTP запросом**.  
Это медленно? НЕТ! Потому что:
- HTTP/2 позволяет много параллельных запросов
- Браузер кеширует файлы
- Только измененные файлы перезагружаются

---

## 🆚 Vite vs Webpack

| Характеристика | Vite | Webpack |
|----------------|------|---------|
| **Старт dev сервера** | ~100-300ms | 5-30 секунд |
| **HMR скорость** | ~50-200ms | 1-5 секунд |
| **Подход** | ESM нативный | Bundling все |
| **Конфигурация** | Минимальная | Сложная |
| **Production** | Rollup | Webpack |
| **TypeScript** | Встроенный | Нужен loader |

---

## 💡 Итог

### Что происходит при `npm run dev`:

1. **npm** читает `package.json` → находит `"dev": "vite"`
2. **Vite** запускается:
   - Создает HTTP сервер (порт 5173)
   - Читает `vite.config.ts`
   - Сканирует зависимости → pre-bundle (кеш)
   - Открывает WebSocket для HMR
3. **Вы открываете браузер** → http://localhost:5173
4. **Браузер загружает**:
   - index.html
   - CSS файлы (из public/)
   - TypeScript файлы (компилируются на лету)
5. **Вы редактируете файл**:
   - Vite видит изменение
   - Компилирует файл
   - Через WebSocket уведомляет браузер
   - Браузер обновляет модуль БЕЗ перезагрузки

### Почему это быстро:

- ⚡ **ESM** - браузер сам загружает модули
- ⚡ **esbuild** - компиляция в 10-100x быстрее
- ⚡ **Кеширование** - зависимости собираются один раз
- ⚡ **HMR** - обновляет только измененные модули
- ⚡ **Lazy loading** - загружает только нужное

---

**🎯 Ваш проект использует Vite 6.4.1 - новейшую версию!**

Теперь вы знаете, что происходит "под капотом" когда вы запускаете `npm run dev`! 🚀

## 📚 Зміст
1. [Що таке npm run dev](#що-таке-npm-run-dev)
2. [Що таке Vite](#що-таке-vite)
3. [Як це все працює разом](#як-це-все-працює-разом)
4. [Властивості Vite](#властивості-vite)
5. [Конфігурація](#конфігурація)

---

## 🔍 Що таке `npm run dev`?

### Крок 1: Що відбувається коли ви пишете `npm run dev`

```bash
npm run dev
```

**NPM** (Node Package Manager) шукає команду `dev` в файлі `package.json`:

```json
{
  "scripts": {
    "dev": "vite"  // ← Ось ця команда запускається!
  }
}
```

**Простими словами:** `npm run dev` = запустити команду `vite`

---

## ⚡ Що таке Vite?

**Vite** (французьке слово, означає "швидкий") - це інструмент для розробки веб-додатків.

### Чому Vite такий швидкий?

#### 🐌 Старий підхід (Webpack):
```
Запуск → Збирає ВСІ файли → Чекаємо 30+ секунд → Браузер
```

#### ⚡ Vite підхід:
```
Запуск → Миттєво відкриває сервер → Завантажує тільки потрібні файли → Браузер
```

### Ключова відмінність:
- **Webpack/Parcel**: спочатку збирає все, потім показує
- **Vite**: показує відразу, збирає тільки те, що потрібно

---

## 🔄 Як це все працює разом (покроково)

### 1️⃣ Ви запускаєте `npm run dev`

```bash
npm run dev
```

### 2️⃣ NPM знаходить команду в package.json

```json
"scripts": {
  "dev": "vite"
}
```

### 3️⃣ Vite запускає dev сервер

```
VITE v6.4.1  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4️⃣ Що робить Vite:

1. **Створює HTTP сервер** на порту 5173
2. **Читає index.html** у корені проєкту
3. **Чекає запитів** від браузера

### 5️⃣ Ви відкриваєте http://localhost:5173

Браузер запитує `index.html`:

```html
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <script type="module" src="/src/script/main.ts"></script>
</body>
</html>
```

### 6️⃣ Vite обробляє запити:

#### Запит 1: `GET /style.css`
```
Браузер → Vite → public/style.css → Браузер
```

#### Запит 2: `GET /src/script/main.ts`
```
Браузер → Vite → 
  1. Читає main.ts
  2. Компілює TypeScript → JavaScript
  3. Знаходить імпорти: import './counter'
  4. Відправляє JavaScript браузеру
```

#### Запит 3: `GET /src/script/counter.ts`
```
Браузер → Vite → 
  1. Читає counter.ts
  2. Компілює TypeScript → JavaScript
  3. Відправляє JavaScript браузеру
```

### 7️⃣ Hot Module Replacement (HMR)

Ви змінюєте файл `counter.ts`:

```
1. Vite бачить зміну файлу
2. Через WebSocket відправляє повідомлення браузеру
3. Браузер перезавантажує ТІЛЬКИ змінений модуль
4. Сторінка оновлюється БЕЗ повного перезавантаження!
```

**Результат:** Зміни видно миттєво! ⚡

---

## 🎯 Властивості Vite (детально)

### 1. **Dev Server (Сервер розробки)**

```typescript
// vite.config.ts
export default {
  server: {
    port: 5173,           // Порт сервера
    host: 'localhost',    // Хост
    open: true,           // Автоматично відкрити браузер
    cors: true,           // CORS для API запитів
    
    // Проксі для API
    proxy: {
      '/api': 'http://localhost:3000'
    },
    
    // HMR налаштування
    hmr: {
      overlay: true       // Показувати помилки на екрані
    }
  }
}
```

**Що це дає:**
- 🌐 Локальний веб-сервер
- 🔄 Автоматичне оновлення при змінах
- 🔗 Проксі для backend API
- 🐛 Помилки прямо на екрані

---

### 2. **Build (Збірка для продакшну)**

```bash
npm run build
```

Що відбувається:

```
1. TypeScript → JavaScript (через tsc)
2. JavaScript → Оптимізований bundle (через Rollup)
3. Мінімізація коду (видалення пробілів, коротші імена)
4. Tree-shaking (видалення невикористаного коду)
5. Code-splitting (розбиття на маленькі файли)
6. Результат → папка dist/
```

**Конфігурація:**

```typescript
// vite.config.ts
export default {
  build: {
    outDir: 'dist',              // Папка для збірки
    assetsDir: 'assets',         // Папка для CSS/JS/Images
    minify: 'esbuild',           // Мінімізатор (швидший за Terser)
    sourcemap: true,             // Source maps для дебагу
    
    rollupOptions: {
      output: {
        manualChunks: {          // Розділити код на частини
          'vendor': ['react', 'react-dom']
        }
      }
    }
  }
}
```

---

### 3. **Public Directory (Папка для статики)**

```typescript
export default {
  publicDir: 'public'
}
```

**Файли в `public/`:**
- ✅ Копіюються як є (без обробки)
- ✅ Доступні через корінь: `/style.css`, `/logo.svg`
- ✅ НЕ проходять через білд систему

**Приклад:**
```html
<!-- В HTML можна використовувати напряму -->
<link rel="stylesheet" href="/style.css">
<img src="/logo.svg">
```

---

### 4. **Module Resolution (Розпізнавання модулів)**

Vite розуміє різні способи імпорту:

```typescript
// 1. Відносні імпорти
import { setupCounter } from './counter'

// 2. Абсолютні імпорти з node_modules
import React from 'react'

// 3. Імпорт CSS
import './style.css'

// 4. Імпорт JSON
import data from './data.json'

// 5. Імпорт Assets (зображення)
import logo from './logo.svg'  // → повертає URL

// 6. Динамічні імпорти (lazy loading)
const module = await import('./heavy-module.js')
```

---

### 5. **TypeScript підтримка**

Vite **не перевіряє типи** (для швидкості), але **компілює** TS → JS:

```typescript
// counter.ts
export function setupCounter(element: HTMLElement) {
  // TypeScript код
}

// ↓ Vite компілює ↓

// counter.js (в браузері)
export function setupCounter(element) {
  // JavaScript код
}
```

**Для перевірки типів:**
```bash
npm run build  # Спочатку запускає tsc --noEmit
```

---

### 6. **Hot Module Replacement (HMR)**

**Магія оновлення без перезавантаження сторінки:**

```typescript
// counter.ts
export function setupCounter(element: HTMLElement) {
  let counter = 0;
  // ...
}

// Vite автоматично додає HMR код:
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Оновити тільки цей модуль
  })
}
```

**Як це працює:**

1. **WebSocket з'єднання:** Браузер ↔ Vite сервер
2. **Ви змінюєте файл** → Vite бачить зміну
3. **Vite відправляє** через WebSocket: "оновити counter.ts"
4. **Браузер завантажує** тільки новий counter.ts
5. **Модуль замінюється** БЕЗ перезавантаження сторінки!

```
🔄 HMR процес:
Файл змінено → WebSocket повідомлення → Завантаження модуля → Заміна → Готово!
⏱️ Швидкість: ~50-200ms
```

---

### 7. **CSS/SCSS підтримка**

```typescript
// main.ts
import './style.css'        // Простий CSS
import './style.scss'       // SCSS (потрібно: npm i -D sass)
import './style.module.css' // CSS Modules

// CSS Modules приклад:
import styles from './style.module.css'
element.className = styles.button  // → "button_a3f2k"
```

**Що Vite робить з CSS:**
- ✅ Автоматично додає до `<head>`
- ✅ HMR для CSS (без перезавантаження)
- ✅ PostCSS обробка (автопрефікси)
- ✅ Мінімізація в production

---

### 8. **Плагіни**

Vite має систему плагінів (на базі Rollup):

```typescript
// vite.config.ts
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    react(),  // Підтримка React
    vue(),    // Підтримка Vue
  ]
}
```

**Популярні плагіни:**
- `@vitejs/plugin-react` - React + JSX
- `@vitejs/plugin-vue` - Vue SFC
- `vite-plugin-pwa` - PWA (Progressive Web App)
- `vite-imagetools` - Оптимізація зображень

---

### 9. **Оптимізації**

#### Dependency Pre-Bundling (Попередня збірка залежностей)

```
При першому запуску:
1. Vite сканує всі import з node_modules
2. Збирає їх в один файл (через esbuild)
3. Кешує в node_modules/.vite/
4. При наступних запусках - миттєве завантаження!
```

**Чому це швидко:**
- esbuild написаний на Go (10-100x швидше JS)
- Кешування (один раз зібрали - багато разів використали)

#### Tree Shaking

```javascript
// lodash має 300+ функцій
import { debounce } from 'lodash'

// В фінальному білді буде ТІЛЬКИ debounce
// Розмір: замість 70KB → 2KB
```

---

## 🔧 Повна конфігурація Vite (приклад)

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // Корінь проєкту
  root: '.',
  
  // Папка для статичних файлів
  publicDir: 'public',
  
  // База URL (для підкаталогів)
  base: '/',
  
  // Dev сервер
  server: {
    port: 5173,
    host: 'localhost',
    open: true,              // Автовідкриття браузера
    cors: true,
    strictPort: false,       // Якщо порт зайнятий - взяти інший
    
    // HMR
    hmr: {
      overlay: true,         // Показувати помилки
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    
    // Проксі для API
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    
    // HTTPS (для тестування)
    https: false
  },
  
  // Build налаштування
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',       // Мінімізація
    sourcemap: false,        // Source maps
    target: 'es2015',        // Таргет браузера
    cssCodeSplit: true,      // Розділяти CSS
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react']
        }
      }
    }
  },
  
  // Обробка CSS
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  
  // Аліаси шляхів
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  
  // Змінні середовища
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
})
```

---

## 🌐 Як працює браузер з Vite

### Схема запитів:

```
1. Браузер запитує: GET http://localhost:5173/
   ← Vite повертає: index.html

2. Браузер бачить: <script type="module" src="/src/script/main.ts">
   Браузер запитує: GET /src/script/main.ts
   ← Vite:
     - Читає main.ts
     - Компілює TS → JS
     - Перетворює імпорти: './counter' → './counter.ts'
     - Повертає JavaScript

3. Браузер бачить: import { setupCounter } from './counter'
   Браузер запитує: GET /src/script/counter.ts
   ← Vite повторює процес

4. Браузер бачить: <link rel="stylesheet" href="/style.css">
   Браузер запитує: GET /style.css
   ← Vite:
     - Читає public/style.css
     - Повертає CSS (без змін)
```

**Ключовий момент:** 
Кожен файл завантажується **окремим HTTP запитом**.  
Це повільно? НІ! Тому що:
- HTTP/2 дозволяє багато паралельних запитів
- Браузер кешує файли
- Тільки змінені файли перезавантажуються

---

## 🆚 Vite vs Webpack

| Характеристика | Vite | Webpack |
|----------------|------|---------|
| **Старт dev сервера** | ~100-300ms | 5-30 секунд |
| **HMR швидкість** | ~50-200ms | 1-5 секунд |
| **Підхід** | ESM нативний | Bundling все |
| **Конфігурація** | Мінімальна | Складна |
| **Production** | Rollup | Webpack |
| **TypeScript** | Вбудований | Потрібен loader |

---

## 💡 Підсумок

### Що відбувається при `npm run dev`:

1. **npm** читає `package.json` → знаходить `"dev": "vite"`
2. **Vite** запускається:
   - Створює HTTP сервер (порт 5173)
   - Читає `vite.config.ts`
   - Сканує залежності → pre-bundle (кеш)
   - Відкриває WebSocket для HMR
3. **Ви відкриваєте браузер** → http://localhost:5173
4. **Браузер завантажує**:
   - index.html
   - CSS файли (з public/)
   - TypeScript файли (компільовані на льоту)
5. **Ви редагуєте файл**:
   - Vite бачить зміну
   - Компілює файл
   - Через WebSocket повідомляє браузер
   - Браузер оновлює модуль БЕЗ перезавантаження

### Чому це швидко:

- ⚡ **ESM** - браузер сам завантажує модулі
- ⚡ **esbuild** - компіляція в 10-100x швидше
- ⚡ **Кешування** - залежності збираються один раз
- ⚡ **HMR** - оновлює тільки змінені модулі
- ⚡ **Lazy loading** - завантажує тільки потрібне

---

**🎯 Ваш проєкт використовує Vite 6.4.1 - найновішу версію!**

Тепер ви знаєте, що відбувається "під капотом" коли ви запускаєте `npm run dev`! 🚀


