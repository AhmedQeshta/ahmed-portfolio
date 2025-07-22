import { IContactInputs } from '@/features/contact/types/contact';

export const getHtml = ({ name, email, message }: IContactInputs) => `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 20px; 
              border-radius: 8px 8px 0 0; 
              text-align: center;
            }
            .content { 
              background: #f9f9f9; 
              padding: 20px; 
              border-radius: 0 0 8px 8px; 
              border: 1px solid #e0e0e0;
            }
            .field { 
              margin-bottom: 15px; 
            }
            .label { 
              font-weight: bold; 
              color: #555; 
              display: block;
              margin-bottom: 5px;
            }
            .value { 
              padding: 10px; 
              background: white; 
              border-radius: 4px; 
              border-left: 4px solid #667eea;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .message-content { 
              white-space: pre-wrap; 
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">From:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="value message-content">${message}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

export const getText = ({ name, email, message }: IContactInputs) => `
        New Contact Form Submission
        
        From: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `;
