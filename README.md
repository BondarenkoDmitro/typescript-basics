# TypeScript Basics

Полное руководство по работе с GitHub для вашего проекта.

## 📚 Содержание
1. [Первичная настройка проекта на GitHub](#первичная-настройка)
2. [Обновление проекта (Commit и Push)](#обновление-проекта)
3. [Полезные команды](#полезные-команды)

---

## 🚀 Первичная настройка проекта на GitHub

### Шаг 1: Создать репозиторий на GitHub
1. Перейти на https://github.com/new
2. Введить название репозитория (например: `typescript-basics`)
3. Выбрать Private или Public
4. **НЕ выбирать** README, .gitignore, License (если файлы уже есть локально)
5. Нажать "Create repository"

### Шаг 2: Инициализировать Git локально
```powershell
# Перейти в папку проекта
cd C:\Users\Дмитрий\WebstormProjects\ts_basic

# Инициализировать git (если ещё не сделано)
git init

# Добавить все файлы
git add .

# Создать первый коммит
git commit -m "Initial commit: TypeScript project setup"
```

### Шаг 3: Подключить к GitHub
```powershell
# Добавить удалённый репозиторий (замените URL на ваш)
git remote add origin https://github.com/ВАШ_НИКНЕЙМ/ВАШ_РЕПОЗИТОРИЙ.git

# Переименовать ветку на main
git branch -M main

# Установить upstream и отправить
git push --set-upstream origin main
```

---

## 📝 Обновление проекта (Commit и Push)

### Быстрый способ (3 команды)
```powershell
# 1. Перейти в папку проекта
cd C:\Users\Дмитрий\WebstormProjects\ts_basic

# 2. Добавить все изменения и создать коммит
git add .
git commit -m "Ваше описание изменений"

# 3. Отправить на GitHub
git push
```

### Или всё в одну строку
```powershell
git add . && git commit -m "Описание" && git push
```

### Примеры описаний коммитов
```powershell
git commit -m "Add new TypeScript features"
git commit -m "Fix bug in main.ts"
git commit -m "Update dependencies in package.json"
git commit -m "Refactor code structure"
```

---

## 🔧 Полезные команды

| Команда | Описание |
|---------|---------|
| `git status` | Показать какие файлы изменились |
| `git add .` | Добавить все файлы |
| `git add имя_файла` | Добавить конкретный файл |
| `git commit -m "текст"` | Сохранить изменения с описанием |
| `git push` | Отправить на GitHub |
| `git pull` | Загрузить изменения с GitHub |
| `git log` | Показать историю коммитов |
| `git log --oneline` | Компактный вид истории |

---

## 💡 Советы

✅ **Делайте коммиты часто** — после каждого важного изменения  
✅ **Пишите понятные описания** — чтобы потом понять что вы делали  
✅ **Используйте git status** — перед каждым коммитом  
✅ **Проверяйте GitHub** — убедитесь что всё загрузилось  

---

## 🎯 Обычный рабочий цикл

```
1. Вносите изменения в код
        ↓
2. git add .
        ↓
3. git commit -m "Описание"
        ↓
4. git push
        ↓
5. Проверяете на GitHub ✓
```

---

## 🔗 Полезные ссылки

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
