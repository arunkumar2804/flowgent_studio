const SPREADSHEET_ID = '1XOk6QhSZ8wt--FI-Bj0OtZAk8Yh5ong_sc3mF0lfQ_8';
const BUSINESS_EMAIL = 'contact@flowgentstudio.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (!data.name || !data.business || !data.phone || !data.email) {
      return ContentService.createTextOutput(JSON.stringify({success: false, message: 'Missing fields'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('Project Enquiries') || ss.insertSheet('Project Enquiries');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp','Name','Business','Phone','Email','Business Type','Services Needed','Current Challenges','Contact Methods','Desired Experience','Status']);
    }
    sheet.appendRow([new Date(), data.name, data.business, data.phone, data.email, data.q1||'', data.q2||'', data.q3||'', data.q4||'', data.q5||'', 'New']);
    
    sendCustomerEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Success'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function formatArrayValue(val) {
  if (!val) return 'Not specified';
  if (Array.isArray(val)) return val.join(', ');
  return val;
}

function sendCustomerEmail(data) {
  const services = formatArrayValue(data.q2);
  const challenges = formatArrayValue(data.q3);
  const contactMethods = formatArrayValue(data.q4);
  const experience = formatArrayValue(data.q5);
  
  const servicesList = Array.isArray(data.q2) ? data.q2.map(s => `<li style="padding: 8px 0; border-bottom: 1px solid #eeeeee;"><span style="color: #333333; font-size: 14px;">${s}</span></li>`).join('') : '';
  const challengesList = Array.isArray(data.q3) ? data.q3.map(c => `<li style="padding: 8px 0; border-bottom: 1px solid #eeeeee;"><span style="color: #333333; font-size: 14px;">${c}</span></li>`).join('') : '';
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Discovery Request Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; line-height: 1.5; -webkit-font-smoothing: antialiased;">
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 48px 20px;">
        
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 520px;">
          
          <!-- Main Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 24px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              
              <!-- Inner Padding -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 48px 40px;">
                
                <!-- Logo -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <h1 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.03em; color: #1a1a1a;">FlowGent Studio</h1>
                    <p style="margin: 6px 0 0 0; font-size: 11px; color: #999999; font-weight: 500; letter-spacing: 0.05em;">Smooth Experiences</p>
                  </td>
                </tr>
                
                <!-- Title -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.25; color: #1a1a1a;">Request Received</h2>
                  </td>
                </tr>
                
                <!-- Subtitle -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <p style="margin: 0; font-size: 15px; color: #666666; line-height: 1.6;">Hi ${data.name}, thank you for your enquiry. We'll review your requirements and get back to you shortly.</p>
                  </td>
                </tr>
                
                <!-- Divider -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <div style="height: 1px; background-color: #eeeeee;"></div>
                  </td>
                </tr>
                
                <!-- Business Card -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border-radius: 16px;">
                      <tr>
                        <td style="padding: 24px 28px;">
                          <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #999999;">Business</p>
                          <p style="margin: 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">${data.business}</p>
                          <p style="margin: 8px 0 0 0; font-size: 13px; color: #888888;">${data.q1 || ''}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Services Needed -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #999999;">Services Needed</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border-radius: 16px;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <ul style="margin: 0; padding: 0; list-style: none;">
                            ${servicesList || `<li style="padding: 8px 0;"><span style="color: #333333; font-size: 14px;">${services}</span></li>`}
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Current Challenges -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #999999;">Current Challenges</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border-radius: 16px;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <ul style="margin: 0; padding: 0; list-style: none;">
                            ${challengesList || `<li style="padding: 8px 0;"><span style="color: #333333; font-size: 14px;">${challenges}</span></li>`}
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Divider -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <div style="height: 1px; background-color: #eeeeee;"></div>
                  </td>
                </tr>
                
                <!-- Personalized Message -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <p style="margin: 0; font-size: 15px; color: #444444; line-height: 1.75;">
                      Based on your enquiry, ${data.business} may benefit from a connected digital system designed to improve customer handling, automate repetitive tasks, and create a smoother online experience.
                    </p>
                  </td>
                </tr>
                
                <!-- Next Steps -->
                <tr>
                  <td style="padding-bottom: 32px;">
                    <p style="margin: 0 0 24px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #999999;">What Happens Next</p>
                    
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      
                      <!-- Step 1 -->
                      <tr>
                        <td style="padding-bottom: 16px; width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #1a1a1a; border-radius: 50%; text-align: center;">
                            <span style="display: block; line-height: 28px; font-size: 12px; font-weight: 600; color: #ffffff;">1</span>
                          </div>
                        </td>
                        <td style="padding-bottom: 16px; padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 500; color: #1a1a1a;">Review</p>
                          <p style="margin: 0; font-size: 13px; color: #888888;">Requirements analysis</p>
                        </td>
                      </tr>
                      
                      <!-- Step 2 -->
                      <tr>
                        <td style="padding-bottom: 16px; width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #1a1a1a; border-radius: 50%; text-align: center;">
                            <span style="display: block; line-height: 28px; font-size: 12px; font-weight: 600; color: #ffffff;">2</span>
                          </div>
                        </td>
                        <td style="padding-bottom: 16px; padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 500; color: #1a1a1a;">Consultation</p>
                          <p style="margin: 0; font-size: 13px; color: #888888;">Detailed discussion</p>
                        </td>
                      </tr>
                      
                      <!-- Step 3 -->
                      <tr>
                        <td style="padding-bottom: 16px; width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #1a1a1a; border-radius: 50%; text-align: center;">
                            <span style="display: block; line-height: 28px; font-size: 12px; font-weight: 600; color: #ffffff;">3</span>
                          </div>
                        </td>
                        <td style="padding-bottom: 16px; padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 500; color: #1a1a1a;">Proposal</p>
                          <p style="margin: 0; font-size: 13px; color: #888888;">Custom solution outline</p>
                        </td>
                      </tr>
                      
                      <!-- Step 4 -->
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #1a1a1a; border-radius: 50%; text-align: center;">
                            <span style="display: block; line-height: 28px; font-size: 12px; font-weight: 600; color: #ffffff;">4</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: top;">
                          <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 500; color: #1a1a1a;">Implementation</p>
                          <p style="margin: 0; font-size: 13px; color: #888888;">Project kickoff</p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding-top: 24px; border-top: 1px solid #eeeeee;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #888888;">FlowGent Studio</p>
                    <p style="margin: 0; font-size: 12px; color: #bbbbbb;">contact@flowgentstudio.com</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
  
</body>
</html>`;
  
  GmailApp.sendEmail(data.email, 'Your Project Discovery Request Has Been Received', '', {htmlBody: html, name: 'FlowGent Studio'});
}

function testEmail() {
  sendCustomerEmail({
    name: 'Sarah Chen',
    business: 'Luxe Hair Studio',
    email: 'arunkumail29@gmail.com',
    q1: 'Salon',
    q2: ['Booking System', 'WhatsApp Automation', 'Customer Management'],
    q3: ['Manual booking handling', 'Slow customer response'],
    q4: ['WhatsApp', 'Instagram', 'Phone Calls'],
    q5: 'Premium'
  });
}