## Архітектура проєкту (Feature-Sliced Design)

Проєкт побудовано відповідно до суворих правил FSD-методології, де залежності спрямовані виключно зверху вниз (шари вищого рівня можуть імпортувати компоненти нижчих шарів, але не навпаки).

```mermaid
graph TD
    subgraph App Layer ["app (Ініціалізація, роутер, глобальні стилі)"]
        direction TB
    end

    subgraph Pages Layer ["pages (Сторінки: Home, Users, Lottery, Login тощо)"]
        direction TB
    end

    subgraph Widgets Layer ["widgets (Комбіновані блоки: AppHeader, WinnersBlock, ParticipantsTable)"]
        direction TB
    end

    subgraph Features Layer ["features (Бізнес-процеси: EditParticipantForm тощо)"]
        direction TB
    end

    subgraph Entities / Shared ["entities & shared (Моделі користувачів, Pinia-стори, UI-компоненти, API-сервіси)"]
        direction TB
    end

    App --> Pages
    Pages --> Widgets
    Widgets --> Features
    Features --> Entities
    Entities --> Shared
