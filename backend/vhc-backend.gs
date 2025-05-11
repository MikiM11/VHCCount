
function doGet() {
  const spreadSheet = SpreadsheetApp.getActive();
  const sheet = spreadSheet.getSheetByName("DB");
  const data = sheet.getDataRange().getValues();
  const goal = spreadSheet.getSheetByName("GOAL").getDataRange().getValues();
  const user = spreadSheet.getSheetByName("USER").getDataRange().getValues();
  const rawData = [];

  rawData.push(data);
  rawData.push(goal);
  rawData.push(user);
  return ContentService.createTextOutput(JSON.stringify(rawData)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    try {
        const requestData = JSON.parse(e.parameter.data); // Přijmeme data jako FormData
        const sheet = SpreadsheetApp.getActive().getSheetByName("DB");

        sheet.appendRow([
            requestData.id,
            requestData.day,
            requestData.month,
            requestData.year,
            requestData.offer,
            requestData.user
        ]);

        return ContentService.createTextOutput(
            JSON.stringify({ status: "success", message: "Data byla přidána." })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({ status: "error", message: error.toString() })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}