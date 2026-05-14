/**
 * FLOWGENT STUDIO - PREMIUM ENQUIRY BACKEND
 * 
 * Handles:
 * - Google Sheets storage
 * - Premium HTML email generation
 * - Dynamic personalized content
 * 
 * Spreadsheet: 1XOk6QhSZ8wt--FI-Bj0OtZAk8Yh5ong_sc3mF0lfQ_8
 * Email: contact@flowgentstudio.com
 */

const SPREADSHEET_ID = '1XOk6QhSZ8wt--FI-Bj0OtZAk8Yh5ong_sc3mF0lfQ_8';
const BUSINESS_EMAIL = 'contact@flowgentstudio.com';
const SHEET_NAME = 'Project Enquiries';

/**
 * Main POST handler
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate
    if (!data.name || !data.business || !data.phone || !data.email) {
      return jsonResponse(false, 'Missing required fields');
    }
    
    // Store in Google Sheets
    storeEnquiry(data);
    
    // Send confirmation email to customer
    sendCustomerEmail(data);
    
    // Send notification to business owner
    sendOwnerNotification(data);
    
    return jsonResponse(true, 'Enquiry submitted successfully');
    
  } catch (error) {
    console.log('Error:', error.toString());
    return jsonResponse(false, error.toString());
  }
}

/**
 * JSON response helper
 */
function jsonResponse(success, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success, message }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Store enquiry in Google Sheets
 */
function storeEnquiry(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    setupSheet(sheet);
  }
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.business,
    data.phone,
    data.email,
    data.q1 || '',
    data.q2 || '',
    data.q3 || '',
    data.q4 || '',
    data.q5 || '',
    'New',
    ''
  ]);
}

/**
 * Setup sheet headers
 */
function setupSheet(sheet) {
  const headers = [
    'Timestamp', 'Name', 'Business Name', 'Phone', 'Email',
    'Business Type', 'Challenge', 'Service Needed', 'Contact Method',
    'Desired Experience', 'Status', 'Notes'
  ];
  
  const range = sheet.getRange(1, 1, 1, headers.length);
  range.setValues([headers]);
  range.setFontWeight('bold');
  range.setBackground('#f5f5f5');
  sheet.setFrozenRows(1);
}

/**
 * Send premium confirmation email to customer
 */
function sendCustomerEmail(data) {
  const html = generatePremiumEmail(data);
  
  try {
    GmailApp.sendEmail(
      data.email,
      'Your Project Discovery Request Has Been Received — ' + data.business,
      '',
      {
        htmlBody: html,
        name: 'FlowGent Studio'
      }
    );
    console.log('Email sent to: ' + data.email);
  } catch (err) {
    console.log('Customer email error: ' + err.toString());
  }
}

/**
 * Generate premium HTML email
 */
function generatePremiumEmail(data) {
  const personalizedMsg = getPersonalizedMessage(data);
  const business = data.business || 'your business';
  const name = data.name || 'there';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Discovery Request Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; color: #0a0a0a; line-height: 1.6;">
  
  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 60px 24px;">
        
        <!-- Main Container -->
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; background-color: #ffffff;">
          
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 40px; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #0a0a0a;">FlowGent Studio</h1>
            </td>
          </tr>
          
          <!-- Title Section -->
          <tr>
            <td style="padding-top: 40px; padding-bottom: 12px;">
              <h2 style="margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.025em; line-height: 1.2; color: #0a0a0a;">
                Your Project Discovery Request<br>Has Been Received
              </h2>
            </td>
          </tr>
          
          <!-- Subtitle -->
          <tr>
            <td style="padding-bottom: 32px;">
              <p style="margin: 0; font-size: 16px; color: #6b7280; line-height: 1.6;">
                Thank you for sharing your business requirements with FlowGent Studio, ${name}.
              </p>
            </td>
          </tr>
          
          <!-- Summary Card -->
          <tr>
            <td style="padding-bottom: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    
                    <!-- Business -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="padding-bottom: 16px; border-bottom: 1px solid #e5e5e5;">
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 4px;">Business Name</span>
                          <span style="font-size: 16px; font-weight: 500; color: #0a0a0a;">${data.business}</span>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Details Grid -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 4px;">Business Type</span>
                          <span style="font-size: 14px; color: #374151;">${data.q1 || 'Not specified'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 4px;">Current Challenge</span>
                          <span style="font-size: 14px; color: #374151;">${data.q2 || 'Not specified'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 4px;">Requested Service</span>
                          <span style="font-size: 14px; color: #374151;">${data.q3 || 'Not specified'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 4px;">Desired Experience</span>
                          <span style="font-size: 14px; color: #374151;">${data.q5 || 'Not specified'}</span>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Personalized Message -->
          <tr>
            <td style="padding-bottom: 32px;">
              <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.75;">
                ${personalizedMsg}
              </p>
            </td>
          </tr>
          
          <!-- Next Steps -->
          <tr>
            <td style="padding-bottom: 32px;">
              <h3 style="margin: 0 0 20px 0; font-size: 15px; font-weight: 600; color: #0a0a0a;">What Happens Next</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                
                <!-- Step 1 -->
                <tr>
                  <td width="36" style="vertical-align: top; padding-bottom: 16px;">
                    <table width="28" height="28" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a; border-radius: 50%;">
                      <tr>
                        <td align="center" valign="middle" style="font-size: 12px; font-weight: 600; color: #ffffff;">1</td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left: 12px; padding-bottom: 16px; vertical-align: top;">
                    <span style="display: block; font-size: 14px; font-weight: 500; color: #0a0a0a; margin-bottom: 2px;">Business Requirement Review</span>
                    <span style="display: block; font-size: 13px; color: #6b7280;">I'll analyze your current situation and understand your goals</span>
                  </td>
                </tr>
                
                <!-- Step 2 -->
                <tr>
                  <td width="36" style="vertical-align: top; padding-bottom: 16px;">
                    <table width="28" height="28" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a; border-radius: 50%;">
                      <tr>
                        <td align="center" valign="middle" style="font-size: 12px; font-weight: 600; color: #ffffff;">2</td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left: 12px; padding-bottom: 16px; vertical-align: top;">
                    <span style="display: block; font-size: 14px; font-weight: 500; color: #0a0a0a; margin-bottom: 2px;">Workflow & Experience Analysis</span>
                    <span style="display: block; font-size: 13px; color: #6b7280;">Understanding how customers interact with your business</span>
                  </td>
                </tr>
                
                <!-- Step 3 -->
                <tr>
                  <td width="36" style="vertical-align: top; padding-bottom: 16px;">
                    <table width="28" height="28" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a; border-radius: 50%;">
                      <tr>
                        <td align="center" valign="middle" style="font-size: 12px; font-weight: 600; color: #ffffff;">3</td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left: 12px; padding-bottom: 16px; vertical-align: top;">
                    <span style="display: block; font-size: 14px; font-weight: 500; color: #0a0a0a; margin-bottom: 2px;">System Planning</span>
                    <span style="display: block; font-size: 13px; color: #6b7280;">Designing a tailored solution for your needs</span>
                  </td>
                </tr>
                
                <!-- Step 4 -->
                <tr>
                  <td width="36" style="vertical-align: top;">
                    <table width="28" height="28" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a; border-radius: 50%;">
                      <tr>
                        <td align="center" valign="middle" style="font-size: 12px; font-weight: 600; color: #ffffff;">4</td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left: 12px; vertical-align: top;">
                    <span style="display: block; font-size: 14px; font-weight: 500; color: #0a0a0a; margin-bottom: 2px;">Project Discussion</span>
                    <span style="display: block; font-size: 13px; color: #6b7280;">I'll reach out to discuss details and next steps</span>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">
                Designed for modern business experiences.
              </p>
              <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #0a0a0a;">
                FlowGent Studio
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                <a href="mailto:contact@flowgentstudio.com" style="color: #6b7280; text-decoration: none;">Email</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:contact@flowgentstudio.com" style="color: #6b7280; text-decoration: none;">WhatsApp</a>
              </p>
            </td>
          </tr>
          
        </table>
        <!-- End Main Container -->
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;
}

/**
 * Generate personalized message based on answers
 */
function getPersonalizedMessage(data) {
  const type = (data.q1 || '').toLowerCase();
  const challenge = (data.q2 || '').toLowerCase();
  const service = (data.q3 || '').toLowerCase();
  const business = data.business || 'your business';
  
  // Salon + Booking
  if (type.includes('salon') && (challenge.includes('booking') || service.includes('booking'))) {
    return `Based on your enquiry, ${business} may benefit from a streamlined booking and customer management system designed to reduce manual coordination, eliminate scheduling conflicts, and create a smoother experience for both your team and customers.`;
  }
  
  // Salon generic
  if (type.includes('salon')) {
    return `Based on your enquiry, ${business} may benefit from a comprehensive digital system designed to enhance how customers discover, interact with, and return to your salon. I'll analyze your specific needs and create a tailored approach.`;
  }
  
  // Bakery + Orders
  if (type.includes('bakery') && (challenge.includes('order') || service.includes('order'))) {
    return `Based on your enquiry, ${business} may benefit from an efficient order management system that captures custom cake requests and special orders without losing important details during busy hours.`;
  }
  
  // Bakery generic
  if (type.includes('bakery')) {
    return `Based on your enquiry, ${business} may benefit from a digital system that makes it easier for customers to discover your products and place orders conveniently.`;
  }
  
  // Café + Queue
  if ((type.includes('café') || type.includes('cafe')) && challenge.includes('queue')) {
    return `Based on your enquiry, ${business} may benefit from a mobile ordering system that reduces queue congestion and improves customer convenience during peak hours.`;
  }
  
  // Café generic
  if (type.includes('café') || type.includes('cafe')) {
    return `Based on your enquiry, ${business} may benefit from a digital presence that showcases your offerings effectively and makes it easy for customers to engage with your café.`;
  }
  
  // Clinic + Appointments
  if (type.includes('clinic') && (challenge.includes('no-show') || challenge.includes('appointment') || service.includes('booking'))) {
    return `Based on your enquiry, ${business} may benefit from an automated appointment reminder system that reduces no-shows, keeps your schedule organized, and improves the overall patient experience.`;
  }
  
  // Clinic generic
  if (type.includes('clinic')) {
    return `Based on your enquiry, ${business} may benefit from a patient-friendly digital system that streamlines appointment booking and enhances the overall clinic experience.`;
  }
  
  // Restaurant + Reservations
  if (type.includes('restaurant') && (challenge.includes('reservation') || challenge.includes('booking'))) {
    return `Based on your enquiry, ${business} may benefit from an online reservation system with confirmation features that reduces no-shows and manages your seating efficiently.`;
  }
  
  // Restaurant generic
  if (type.includes('restaurant')) {
    return `Based on your enquiry, ${business} may benefit from a digital system that helps customers discover your restaurant and make reservations seamlessly.`;
  }
  
  // Hospitality
  if (type.includes('hotel') || type.includes('resort') || type.includes('hospitality')) {
    return `Based on your enquiry, ${business} may benefit from a guest management system that creates premium experiences from booking through checkout, ensuring consistent and personalized service.`;
  }
  
  // Fitness
  if (type.includes('fitness') || type.includes('gym') || type.includes('studio')) {
    return `Based on your enquiry, ${business} may benefit from a class booking and member management system that reduces administrative work and improves the member experience.`;
  }
  
  // Generic booking
  if (challenge.includes('booking') || service.includes('booking')) {
    return `Based on your enquiry, ${business} may benefit from a streamlined booking and customer management experience designed to reduce manual coordination and improve customer convenience.`;
  }
  
  // Generic enquiries
  if (challenge.includes('enquiry') || challenge.includes('enquiries')) {
    return `Based on your enquiry, ${business} may benefit from a system that captures, organizes, and ensures every customer enquiry receives a prompt and professional response.`;
  }
  
  // Generic automation
  if (challenge.includes('manual') || service.includes('automation')) {
    return `Based on your enquiry, ${business} may benefit from automation that handles repetitive tasks, giving you more time to focus on what matters most — serving your customers.`;
  }
  
  // Generic outdated
  if (challenge.includes('outdated')) {
    return `Based on your enquiry, ${business} may benefit from a premium digital presence that accurately reflects the quality of your business and builds trust with potential customers.`;
  }
  
  // Generic follow-up
  if (challenge.includes('follow') || challenge.includes('return')) {
    return `Based on your enquiry, ${business} may benefit from a systematic follow-up approach that keeps customers engaged and encourages repeat business without requiring manual effort.`;
  }
  
  // Generic complete system
  if (service.includes('complete') || challenge.includes('everything') || challenge.includes('improv')) {
    return `Based on your enquiry, ${business} may benefit from a comprehensive digital system designed to improve customer interactions, streamline operations, and support business growth. I'll review your requirements and create a tailored solution.`;
  }
  
  // Ultimate fallback
  return `Based on your enquiry, ${business} may benefit from a tailored digital system designed to improve how customers interact with your business and how you manage daily operations. I'll analyze your specific needs and get back to you with personalized recommendations.`;
}

/**
 * Send notification to business owner
 */
function sendOwnerNotification(data) {
  try {
    const subject = `New Project Discovery: ${data.business} (${data.q1 || 'Business'})`;
    const body = `
New Project Discovery Request

━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.name}
Business: ${data.business}
Phone: ${data.phone}
Email: ${data.email}

━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━
Business Type: ${data.q1 || 'Not specified'}
Current Challenge: ${data.q2 || 'Not specified'}
Requested Service: ${data.q3 || 'Not specified'}
Contact Method: ${data.q4 || 'Not specified'}
Desired Experience: ${data.q5 || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━
VIEW IN SHEET
━━━━━━━━━━━━━━━━━━━━━━━━
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}
    `;
    
    GmailApp.sendEmail(BUSINESS_EMAIL, subject, body, {
      name: 'FlowGent Studio'
    });
    console.log('Owner notification sent');
  } catch (error) {
    console.log('Owner notification error:', error.toString());
  }
}

/**
 * Test the email system
 */
function testEmailSystem() {
  const testData = {
    name: 'Test Customer',
    business: 'Luxe Hair Studio',
    phone: '+91 98765 43210',
    email: 'arunkumail29@gmail.com',
    q1: 'Salon',
    q2: 'Booking confusion',
    q3: 'Booking system',
    q4: 'WhatsApp',
    q5: 'Premium'
  };
  
  sendCustomerEmail(testData);
  console.log('Test email sent to: ' + testData.email);
}

/**
 * Test storage
 */
function testStorage() {
  const testData = {
    name: 'Test',
    business: 'Test Business',
    phone: '+91 9876543210',
    email: 'test@test.com',
    q1: 'Salon',
    q2: 'Test',
    q3: 'Booking',
    q4: 'WhatsApp',
    q5: 'Premium'
  };
  
  storeEnquiry(testData);
  console.log('Test row added to sheet');
}

/**
 * Run both tests
 */
function runFullTest() {
  const testData = {
    name: 'Test Customer',
    business: 'Luxe Hair Studio',
    phone: '+91 98765 43210',
    email: 'arunkumail29@gmail.com',
    q1: 'Salon',
    q2: 'Booking confusion',
    q3: 'Booking system',
    q4: 'WhatsApp',
    q5: 'Premium'
  };
  
  storeEnquiry(testData);
  sendCustomerEmail(testData);
  sendOwnerNotification(testData);
  console.log('Full test complete - check email and sheet');
}