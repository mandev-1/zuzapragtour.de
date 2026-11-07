# Bezpečnostní politika (Security Policy): zuzapragtour-de

## 1. Hlášení bezpečnostních zranitelností
Pokud v tomto projektu narazíte na bezpečnostní zranitelnost, postupujte prosím zodpovědně:
- **Nehlaste** zranitelnosti veřejně v otevřených GitHub Issues.
- Kontaktujte správce projektu soukromým kanálem nebo přes GitHub Security Advisory.
- Uveďte detailní kroky k reprodukci, dotčené verze a možný dopad.

## 2. Správa závislostí
- Závislosti projektu jsou pravidelně kontrolovány na přítomnost známých CVE/GHSA zranitelností.
- V případě kritické či vysoké zranitelnosti je vydána záplata v nejkratším možném termínu.
- Nové balíčky jsou posuzovány z hlediska důvěryhodnosti autora, velikosti a licence.

## 3. Zásady pro zdrojový kód
- Žádné API klíče, hesla ani privátní certifikáty nesmí být uloženy v gitu.
- Pro lokální vývoj používejte vzorové konfigurační soubory (např. `.env.example`).
- Každý release je tagován a podepsán.