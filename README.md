## Архітектура проєкту (Feature-Sliced Design)

Проєкт побудовано відповідно до суворих правил FSD-методології, де залежності спрямовані виключно зверху вниз.

```mermaid
graph TD
    App["App (Ініціалізація, Роутер, Стилі)"] --> Pages["Pages (Сторінки додатку)"]
    Pages --> Widgets["Widgets (Комбіновані блоки)"]
    Widgets --> Features["Features (Бізнес-процеси)"]
    Features --> Entities["Entities (Моделі та Стори)"]
    Entities --> Shared["Shared (UI-компоненти, API, Утиліти)"]

    style App fill:#f3f4f6,stroke:#374151,stroke-width:2px,color:#111827
    style Pages fill:#e5e7eb,stroke:#374151,stroke-width:2px,color:#111827
    style Widgets fill:#d1d5db,stroke:#374151,stroke-width:2px,color:#111827
    style Features fill:#9ca3af,stroke:#374151,stroke-width:2px,color:#111827
    style Entities fill:#6b7280,stroke:#374151,stroke-width:2px,color:#ffffff
    style Shared fill:#4b5563,stroke:#374151,stroke-width:2px,color:#ffffff
