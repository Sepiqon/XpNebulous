# SERVER

## EndPointy

### register

<!--region REGISTER-->
<img src="https://lh3.googleusercontent.com/u/0/d/11Rhj69Qt92ooKd2qWaG0DhKbTqygj3Gb=w702-h641-iv1">

Errors:

|                        PL                        |         ENG         | Unsafe (automatic logout) |   Location    |
| :----------------------------------------------: | :-----------------: | :-----------------------: | :-----------: |
|           Nieprawidłowe dane wejściowe           |    InvalidInput     |            No             |   register    |
|                   Email zajęty                   |      EmailBusy      |            No             |   register    |
|                   Nazwa zajęta                   |      NameBusy       |            No             |   register    |
|            Brak identyfikatora sesji             |    LackSessionId    |            No             |     csrf      |
|              Twój CSRF token wygasł              |  CSRFTokenExpired   |            No             |     csrf      |
|                Błędny CSRF token                 |  CSRFTokenInvalid   |            Yes            |     csrf      |
|            Brak CSFR token w database            |   LackCSFRTokenDB   |            Yes            |     csrf      |
| Niezgodność z csrf-token z identyfikatorem sesji | IncompatibilityCSRF |            Yes            |     csrf      |
|                 Brak CSFR token                  |    LackCSFRToken    |            No             |     csrf      |
|                Jesteś zalogowany                 |       Logged        |            No             | responseClass |

<br>
<br>
<br>
<!--endregion REGISTER-->

### login

<!--region LOGIN-->
<img src="https://lh3.googleusercontent.com/u/0/d/117doj1j8MX9sF17ZpjK7IWGM2yLysNFK=w702-h641-iv1">

Errors:

|                        PL                        |         ENG         | Unsafe (automatic logout) |   Location    |
| :----------------------------------------------: | :-----------------: | :-----------------------: | :-----------: |
|             Nie udało się zalogować              |      NotLogged      |            No             |     login     |
|            Brak identyfikatora sesji             |    LackSessionId    |            No             |     csrf      |
|              Twój CSRF token wygasł              |  CSRFTokenExpired   |            No             |     csrf      |
|                Błędny CSRF token                 |  CSRFTokenInvalid   |            Yes            |     csrf      |
|            Brak CSFR token w database            |   LackCSFRTokenDB   |            Yes            |     csrf      |
| Niezgodność z csrf-token z identyfikatorem sesji | IncompatibilityCSRF |            Yes            |     csrf      |
|                 Brak CSFR token                  |    LackCSFRToken    |            No             |     csrf      |
|                Jesteś zalogowany                 |       Logged        |            No             | responseClass |

<br>
<br>
<br>
<!--endregion LOGIN-->

### refresh

<!--region REFRESH-->
<img src="https://lh3.googleusercontent.com/u/0/d/1sBmowR1g3lvCwqC_snvuAgpW7FgGhhct=w649-h657-iv1">

Errors:

|                        PL                        |         ENG         | Unsafe (automatic logout) | Location |
| :----------------------------------------------: | :-----------------: | :-----------------------: | :------: |
|               Brak refresh tokenu                |  LickRefreshToken   |            No             | refresh  |
|                   Brak tokenu                    |      TokenLack      |            No             | refresh  |
|               Błędny refresh token               | InvalidRefreshToken |            Yes            | refresh  |
|                   Błędny token                   |    TokenInvalid     |            Yes            | refresh  |
|           Tokeny nie pasują do siebie            |    InvalidTokens    |            Yes            | refresh  |
|            Brak tokenu w bazie danych            |     LackTokenDB     |            Yes            | refresh  |
|            Brak identyfikatora sesji             |    LackSessionId    |            No             |   csrf   |
|              Twój CSRF token wygasł              |  CSRFTokenExpired   |            No             |   csrf   |
|                Błędny CSRF token                 |  CSRFTokenInvalid   |            Yes            |   csrf   |
|            Brak CSFR token w database            |   LackCSFRTokenDB   |            Yes            |   csrf   |
| Niezgodność z csrf-token z identyfikatorem sesji | IncompatibilityCSRF |            Yes            |   csrf   |
|                 Brak CSFR token                  |    LackCSFRToken    |            No             |   csrf   |

<br>
<br>
<br>
<!--endregion REFRESH-->

### csrf

<!--region csrf-->

<img src="https://lh3.googleusercontent.com/u/0/d/1sYHJg5qUkZUbwiRyPdvjFFkblBv5wwKx=w1360-h657-iv1">

Errors:

| PL  | ENG | Unsafe (automatic logout) | Location |
| :-: | :-: | :-----------------------: | :------: |
|     |     |                           |          |

0 ERRORS

<br>
<br>
<br>

<!--endregion csrf-->

### Action Authorization (getme)

<!--region getme-->

<img src="https://lh3.googleusercontent.com/u/0/d/1WBqrdCp68Qp-5_GrrosuNO4fIuePzwlh=w649-h657-iv1">

Errors:

|                        PL                        |         ENG          | Unsafe (automatic logout) |   Location    |
| :----------------------------------------------: | :------------------: | :-----------------------: | :-----------: |
|             Nie udało się zalogować              |      NotLogged       |            No             |     login     |
|            Brak identyfikatora sesji             |    LackSessionId     |            No             |     csrf      |
|              Twój CSRF token wygasł              |   CSRFTokenExpired   |            No             |     csrf      |
|                Błędny CSRF token                 |   CSRFTokenInvalid   |            Yes            |     csrf      |
|            Brak CSFR token w database            |   LackCSFRTokenDB    |            Yes            |     csrf      |
| Niezgodność z csrf-token z identyfikatorem sesji | IncompatibilityCSRF  |            Yes            |     csrf      |
|                 Brak CSFR token                  |    LackCSFRToken     |            No             |     csrf      |
|                Twój token wygasł                 |     TokenExpired     |            No             | Authorization |
|                   Błędny token                   |     TokenInvalid     |            Yes            | Authorization |
|        CSRF token nieprawidłowy do sesji         | CSRFInvalidToSession |            Yes            | Authorization |
|                Zostałeś usunięty                 |  UserHasBeenDeleted  |            Yes            | Authorization |
|         Twoja rola jest niewystarczająca         |     RoleIsTooLow     |            No             | Authorization |
|                   Brak tokenu                    |      TokenLack       |            No             | Authorization |

<br>
<br>
<br>

<!--endregion getme-->

# STRONA

## Akcje

### Zaloguj

### Zarejestruj

### Pobierz Moje dane

### Refresh

### Csrf
