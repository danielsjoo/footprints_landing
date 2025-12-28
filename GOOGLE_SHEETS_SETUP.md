# Google Sheets + Email Form Backend Setup

This setup allows you to save form submissions to a Google Sheet and receive email notifications automatically, for free.

## Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **blank spreadsheet**.
2. Name it something like "Footprints Landing Page Leads".
3. In the first row (Header), add these columns:
   - Column A: `Timestamp`
   - Column B: `Type`
   - Column C: `Email`
   - Column D: `Name`
   - Column E: `Message`

## Step 2: Add the Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code in the editor (e.g., `function myFunction() {...}`).
3. Paste the following code:

```javascript
/*
  Simple Form Handler
  - Saves to Sheet
  - Emails daniel.sh.joo2@gmail.com
*/

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    
    // Get form data
    var params = e.parameter; // Handles 'application/x-www-form-urlencoded' from standard forms or fetch
    
    var formType = params.formType || 'unknown';
    var email = params.email || 'No email';
    var name = params.name || '';
    var message = params.message || '';
    
    // 1. Save to Google Sheet
    sheet.appendRow([timestamp, formType, email, name, message]);
    
    // 2. Send Email Notification
    var recipient = "daniel.sh.joo2@gmail.com";
    var subject = "[Footprints] New " + formType + " submission";
    var body = "You have a new submission!\n\n" +
               "Type: " + formType + "\n" +
               "Email: " + email + "\n" +
               "Name: " + name + "\n" +
               "Message: " + message + "\n\n" +
               "View spreadsheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();
               
    MailApp.sendEmail(recipient, subject, body);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (floppy disk).

## Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) -> **New deployment**.
2. Click the specific **Select type** gear icon -> **Web app**.
3. Fill in:
   - **Description**: `Footprints Form API`
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (IMPORTANT: Must be "Anyone" so your website can talk to it).
4. Click **Deploy**.
5. You will be asked to **Authorize Access**. Click it, choose your Google account.
   - *Note: Google might warn "This app isn't verified". Click "Advanced" > "Go to (Script Name) (unsafe)" to proceed. It is safe since you wrote it.*
6. Copy the **Web App URL** (starts with `https://script.google.com/macros/s/...`).

## Step 4: Connect to Landing Page
1. Open this project in your code editor.
2. Go to `src/components/Hero.astro`.
   - Find `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';` at the bottom.
   - Replace that string with your copied Web App URL.
3. Go to `src/components/Contact.astro`.
   - Find the same line and Paste the same URL there too.

That's it! Your forms will now save to the exact sheet you created and email you instantly.
