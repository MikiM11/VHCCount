
---
# backend/README.md

# Backend pro VHCCount (Google Apps Script)

Tento skript (`vhc-backend.gs`) slouží jako backend pro aplikaci VHCCount.  
Umožňuje ukládání a čtení dat z Google Sheets přes API vystavené jako Web App.

---

## ⚙️ Nasazení backendu

1. Otevři Google Apps Script: https://script.google.com/
2. Vytvoř nový projekt a vlož obsah souboru `vhc-backend.gs`
3. Klikni na **Deploy → Manage deployments**
4. Vyber **Web App**
5. Nastav:
   - Kdo má přístup: **Anyone**
   - Spustit jako: **Me**
6. Klikni na **Deploy** a zkopíruj výslednou URL

---

## 🔗 Propojení s frontendem

V souboru `js/config.js` nahraď `apiUrl` vlastní URL adresou webového nasazení:

```js
export default {
  apiUrl: "https://script.google.com/macros/s/TVOJE-URL/exec",
};
```

---

## 📄 Funkce backendu

- `doGet(e)` – načte data z tabulky
- `doPost(e)` – zapíše nový záznam (čas, typ, uživatel)
- Ošetřuje CORS a vrací odpověď ve formátu JSON