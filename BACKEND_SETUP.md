# FlowGent Studio - Backend Setup Guide

## Overview
This project uses Google Apps Script as a lightweight backend to:
1. Store enquiries in Google Sheets
2. Send premium HTML confirmation emails
3. Manage lead status workflow

## Spreadsheet Setup

### Step 1: Create/Access Google Sheet
- **Sheet ID:** `1XOk6QhSZ8wt--FI-Bj0OtZAk8Yh5ong_sc3mF0lfQ_8`
- The sheet should already exist with this ID
- If creating new: Note the spreadsheet ID from the URL

### Step 2: Column Headers
The following columns are configured automatically on first enquiry:
| Column | Purpose |
|--------|---------|
| A | Timestamp |
| B | Name |
| C | Business Name |
| D | Phone Number |
| E | Email Address |
| F | Business Type |
| G | Main Challenge |
| H | Requested Service |
| I | Current Contact Method |
| J | Desired Experience |
| K | Selected Package |
| L | Status (New/Contacted/etc.) |
| M | Notes |

## Google Apps Script Deployment

### Step 1: Open Apps Script
1. Go to Google Apps Script: https://script.google.com
2. Click "New project"
3. Name it: "FlowGent Studio Backend"

### Step 2: Add Code
1. Replace the default `Code.gs` content with the contents of `apps-script.js`
2. Update these values if needed:
```javascript
const SPREADSHEET_ID = '1XOk6QhSZ8wt--FI-Bj0OtZAk8Yh5ong_sc3mF0lfQ_8';
const BUSINESS_EMAIL = 'contact@flowgentstudio.com';
const SHEET_NAME = 'Project Enquiries';
```

### Step 3: Deploy Web App
1. Click **Deploy** → **New deployment**
2. Select type: **Web app**
3. Configure:
   - Description: "FlowGent Studio API v1"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the **Web app URL**

### Step 4: Update Frontend
1. Open `index.html`
2. Find this line:
```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```
3. Replace `YOUR_SCRIPT_ID` with your deployed web app URL

## Testing the Flow

### Test the Enquiry Form
1. Open the website
2. Click "Start Your Project"
3. Complete the conversational flow
4. Submit
5. Check:
   - Google Sheet for new row
   - Email inbox for confirmation email

### Verify Email Design
The confirmation email should:
- Have clean black & white design
- Show business summary card
- Display personalized content based on answers
- Show next steps
- Have premium footer

## Lead Status Workflow

### Status Values
| Status | Meaning |
|--------|---------|
| New | Just received |
| Contacted | Initial contact made |
| Discussion Started | In conversation |
| Proposal Sent | Proposal submitted |
| Closed | Not proceeding |
| Won | Project started |

### Updating Status
Manually update in Google Sheet, or automate later with status update functionality.

## Troubleshooting

### Email Not Sending
- Check spam folder
- Verify sender email authorization
- Check execution logs in Apps Script

### Data Not Storing
- Verify spreadsheet ID is correct
- Check Apps Script execution logs
- Ensure proper permissions

### CORS Errors
- The frontend uses `mode: 'no-cors'` to handle CORS
- This means response data won't be accessible (normal for Apps Script)
- Success is assumed if no error is thrown

## Future Enhancements

### Suggested Upgrades
1. **CRM Dashboard** - Admin panel to manage leads
2. **WhatsApp Integration** - Send confirmations via WhatsApp
3. **Analytics** - Track conversion rates
4. **Automated Status Updates** - Trigger based on email opens
5. **Proposal Generator** - Generate PDF proposals

### Architecture Notes
- Frontend and backend are decoupled
- Communication via REST API
- Data stored in Google Sheets (scalable to Database)
- Email system is modular and can be extended

## Support
For issues with the backend:
1. Check Apps Script execution logs
2. Verify spreadsheet permissions
3. Test API endpoint directly