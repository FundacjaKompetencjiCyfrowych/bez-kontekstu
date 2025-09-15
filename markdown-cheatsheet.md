# 📝 Markdown Cheatsheet - Ściągawka

## 📋 Spis treści

- [Nagłówki](#nagłówki)
- [Tekst](#tekst)
- [Listy](#listy)
- [Linki](#linki)
- [Obrazy](#obrazy)
- [Tabele](#tabele)
- [Kod](#kod)
- [Cytaty](#cytaty)
- [Linie poziome](#linie-poziome)
- [Escape znaki](#escape-znaki)
- [Zaawansowane](#zaawansowane)

---

## 📌 Nagłówki

```markdown
# Nagłówek 1 (największy)

## Nagłówek 2

### Nagłówek 3

#### Nagłówek 4

##### Nagłówek 5

###### Nagłówek 6 (najmniejszy)
```

**Alternatywna składnia:**

```markdown
# Nagłówek 1

## Nagłówek 2
```

---

## ✏️ Tekst

### Podstawowe formatowanie

```markdown
**pogrubiony tekst** lub **pogrubiony tekst**
_pisany kursywą_ lub _pisany kursywą_
**_pogrubiony i kursywa_** lub **_pogrubiony i kursywa_**
~~przekreślony tekst~~
```

### Wyróżnienia

```markdown
==podświetlony tekst== (nie wszystkie parsery)
`kod inline`
```

### Kolory tekstu (HTML)

<span style="color: red;">Czerwony tekst</span>
<span style="color: #ff0000;">Czerwony tekst (hex)</span>
<span style="color: blue;">Niebieski tekst</span>
<span style="color: green;">Zielony tekst</span>
<span style="color: purple;">Fioletowy tekst</span>

### Interlinia (odstępy między wierszami)

<!-- Zmniejszona interlinia -->
<div style="line-height: 1.2;">
To jest tekst z mniejszą interlinią.
Drugi wiersz będzie bliżej pierwszego.
</div>

<!-- Zwiększona interlinia -->
<div style="line-height: 2.0;">
To jest tekst z większą interlinią.
Drugi wiersz będzie dalej od pierwszego.
</div>

<!-- Normalna interlinia (domyślna) -->
<div style="line-height: 1.5;">
To jest tekst z normalną interlinią.
</div>

---

## 📝 Listy

### Lista nieuporządkowana (punkty)

```markdown
- Element 1
- Element 2
  - Podpunkt 2.1
  - Podpunkt 2.2
- Element 3

* Alternatywny marker

- Inny marker
```

### Lista uporządkowana (numerowana)

```markdown
1. Pierwszy element
2. Drugi element
   1. Podpunkt 2.1
   2. Podpunkt 2.2
3. Trzeci element
```

### Lista zadań (checkbox)

```markdown
- [x] Ukończone zadanie
- [ ] Nieukończone zadanie
- [ ] Kolejne zadanie
```

---

## 🔗 Linki

### Podstawowe linki

```markdown
[tekst linku](https://example.com)
[tekst linku z tytułem](https://example.com "Tytuł linku")
```

### Linki z automatycznym URL

```markdown
<https://example.com>
<email@example.com>
```

### Linki wewnętrzne (do sekcji)

```markdown
[Przejdź do sekcji](#nazwa-sekcji)
[Przejdź do innego pliku](./inny-plik.md)
```

### Referencje linków

```markdown
[Google][1]
[GitHub][github]

[1]: https://google.com
[github]: https://github.com "GitHub"
```

---

## 🖼️ Obrazy

### Podstawowe obrazy

```markdown
![alt text](path/to/image.jpg)
![alt text](path/to/image.jpg "Tytuł obrazu")
```

### Obrazy z linkami

```markdown
[![alt text](path/to/image.jpg)](https://example.com)
```

### Obrazy z referencjami

```markdown
![alt text][logo]

[logo]: path/to/logo.png "Logo firmy"
```

---

## 📊 Tabele

```markdown
| Kolumna 1 | Kolumna 2 | Kolumna 3 |
| --------- | --------- | --------- |
| Wiersz 1  | Dane 1    | Dane 2    |
| Wiersz 2  | Dane 3    | Dane 4    |
```

### Wyrównanie w tabelach

```markdown
| Lewo | Środek | Prawo |
| :--- | :----: | ----: |
| L    |   C    |     R |
```

---

## 💻 Kod

### Kod inline

```markdown
Użyj `console.log()` do wyświetlania w konsoli.
```

### Bloki kodu

````markdown
```javascript
function hello() {
  console.log("Hello World!");
}
```
````

### Kod z numeracją linii

````markdown
```javascript {.line-numbers}
function hello() {
  console.log("Hello World!");
}
```
````

### Kod z podświetlaniem linii

````markdown
```javascript {highlight=[1,3]}
function hello() {
  console.log("Hello World!");
  return true;
}
```
````

---

## 💬 Cytaty

```markdown
> To jest cytat.
>
> Może zawierać wiele linii.
>
> > Zagnieżdżony cytat
```

### Cytaty z autorami

```markdown
> "Kod jest jak humor. Kiedy musisz go wyjaśniać, jest zły."
>
> — Cory House
```

---

## ➖ Linie poziome

```markdown
---
---

---

---

---

---
```

---

## 🔤 Escape znaki

```markdown
\*tekst z gwiazdką\*
\# nagłówek z hash
\[link\](url)
```

**Znaki do escapowania:**

- `\` backslash
- `` ` `` backtick
- `*` asterisk
- `_` underscore
- `{}` curly braces
- `[]` square brackets
- `()` parentheses
- `#` hash
- `+` plus
- `-` minus
- `.` dot
- `!` exclamation mark

---

## 🚀 Zaawansowane

### Spis treści (automatyczny)

```markdown
## Spis treści

- [Sekcja 1](#sekcja-1)
- [Sekcja 2](#sekcja-2)
  - [Podsekcja 2.1](#podsekcja-21)
```

### Komentarze (ukryte)

```markdown
<!-- To jest komentarz, nie będzie widoczny -->
```

### Emoji

```markdown
:smile: :heart: :thumbsup: :rocket: :star:
```

### Wideo (HTML)

```markdown
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Twoja przeglądarka nie obsługuje tagu video.
</video>
```

---

## 🎯 Najczęściej używane skróty

| Co chcesz zrobić | Komenda                                      |
| ---------------- | -------------------------------------------- |
| **Pogrubić**     | `**tekst**`                                  |
| _Kursywa_        | `*tekst*`                                    |
| `Kod`            | `` `kod` ``                                  |
| [Link](url)      | `[tekst](url)`                               |
| ![Obraz](url)    | `![alt](url)`                                |
| > Cytat          | `> tekst`                                    |
| - Lista          | `- element`                                  |
| 1. Lista         | `1. element`                                 |
| # Nagłówek       | `# tekst`                                    |
| --- Linia        | `---`                                        |
| Kolor tekstu     | `<span style="color: red;">tekst</span>`     |
| Interlinia       | `<div style="line-height: 1.2;">tekst</div>` |

---

## 💡 Wskazówki

1. **Spójność**: Używaj jednego stylu w całym dokumencie
2. **Czytelność**: Zostawiaj puste linie między sekcjami
3. **Testowanie**: Sprawdzaj jak wygląda w różnych parserach
4. **Skróty**: Zapamiętaj najczęściej używane komendy
5. **Escape**: Używaj `\` gdy chcesz wyświetlić znak specjalny

---
