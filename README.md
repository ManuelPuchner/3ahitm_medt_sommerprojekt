# Dokumentation

## Installation

### Development

```bash
$ npm/pnpm install

$ npm/pnpm run dev
```

### Production

```bash
$ npm/pnpm install

$ npm/pnpm run build

$ npm/pnpm run start
```

## Sprints
### Sprint 1 **(Planung)**
- siehe [Projekt Planung](./Planung_Projekt_Sommersemester.pdf)
  
### Sprint 2 **(UX/UI Konzept)**
- designen der User Experience und User Interface
- siehe [Projekt Design](https://www.figma.com/file/UnrTOWjqfkQk0GAHZzi5MK/Untitled?node-id=0%3A1&t=XJKaocIF73KvNxVv-1)

### Sprint 3 **(Frontend)**
- Erstellung des GitHub-Repositories
- aufsetzen des Frontends
- Programmierung des Frontends
  - Erstellung der Types
  - Erstellung der Komponenten
    - Header
    - Post
    - Sidebar
  - Implementierung des State-Managers

### Sprint 4 **(Backend/Datenbank)**
- aufsetzen des Backends
- Erstellung der Create-Scripts
- Erstellung der PHP-Klassen für die Datenbank
  - DB.php
    - Anbindung an die Datenbank
    - (singleton pattern)
  - User.php
  - Like.php
  - Comment.php
  - Post.php
  - die Klassen nutzen statische Methoden, um die Datenbank abzufragen
- Response.php
  - um HTTP-Responses zu verschicken
- verschiedenste Endpoints
- Authentication
#### Was ist bereits möglich?
- registrieren
- einloggen
- erstellen von Posts
- anschauen von Profilen
- anschauen von Posts
