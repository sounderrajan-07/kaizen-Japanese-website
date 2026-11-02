import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'leads.json');
const TESTIMONIALS_FILE = path.join(__dirname, 'testimonials.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Leads Database (local JSON)
if (!fs.existsSync(LEADS_FILE)) {
  const initialData = [
    {
      id: 'demo-1',
      type: 'Job Support',
      name: 'Karthik Raja',
      email: 'karthik.raja@example.com',
      phone: '+91 9876543210',
      pathway: 'IT & Engineering Visa',
      qualification: 'B.E. Computer Science',
      jlptLevel: 'N5 in progress',
      location: 'Coimbatore',
      message: 'Looking for software engineering opportunities in Tokyo. Would like weekend offline classes.',
      date: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: 'Contacted'
    },
    {
      id: 'demo-2',
      type: 'Higher Education',
      name: 'Priya Sundaram',
      email: 'priya.s@example.com',
      phone: '+91 9123456780',
      pathway: 'Higher Japanese Language School',
      qualification: 'B.Sc. Biotechnology',
      jlptLevel: 'Beginner',
      location: 'Tirupur / Coimbatore',
      message: 'Interested in admission for October batch through Apple.co collaboration.',
      date: new Date(Date.now() - 3600000 * 8).toISOString(),
      status: 'New'
    }
  ];
  fs.writeFileSync(LEADS_FILE, JSON.stringify(initialData, null, 2));
}

function getLeads() {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveLead(newLead) {
  const leads = getLeads();
  leads.unshift(newLead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  return leads;
}

// Nodemailer Transporter Configuration
let transporter = null;
let etherealAccount = null;

async function initMailer() {
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || '').replace(/\s+/g, '');

  if (emailUser && emailPass) {
    if (emailUser.includes('gmail.com') || !process.env.SMTP_HOST) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
      console.log(`[Nodemailer] Configured with Gmail service (${emailUser})`);
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
      console.log(`[Nodemailer] Configured with custom SMTP (${process.env.SMTP_HOST})`);
    }
  } else {
    // Generate test SMTP service account from ethereal.email for zero-config development
    try {
      etherealAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: etherealAccount.user,
          pass: etherealAccount.pass,
        },
      });
      console.log(`[Nodemailer] Connected to Ethereal Test Mailer (${etherealAccount.user})`);
    } catch (err) {
      console.warn('[Nodemailer] Fallback: running in simulation mode without external SMTP server.', err.message);
      transporter = {
        sendMail: async (opts) => {
          console.log('[Nodemailer Simulated Send]:', opts.subject, 'To:', opts.to);
          return { messageId: 'simulated-' + Date.now(), preview: null };
        }
      };
    }
  }
}

initMailer();

// HTML Email Template Generator
function generateEmailHtml({ title, badge, details, callToAction }) {
  const rows = Object.entries(details)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #27272a; color: #a1a1aa; font-weight: 500; font-size: 14px; width: 35%;">${key}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #27272a; color: #ffffff; font-weight: 600; font-size: 14px;">${value}</td>
      </tr>
    `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      </style>
    </head>
    <body style="background-color: #09090b; padding: 30px 15px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #991b1b 100%); padding: 28px 24px; text-align: center;">
          <div style="display: inline-block; background-color: #000000; color: #ffffff; font-weight: 900; font-size: 18px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 10px;">
            改善 KAIZEN
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Kaizen Japanese Language Academy</h1>
          <p style="color: #fee2e2; margin: 6px 0 0; font-size: 13px;">Learn Japanese • Work in Japan • Higher Education</p>
        </div>

        <!-- Notification Banner -->
        <div style="padding: 20px 24px; border-bottom: 1px solid #27272a;">
          <span style="display: inline-block; background-color: rgba(220, 38, 38, 0.15); color: #ef4444; border: 1px solid rgba(220, 38, 38, 0.3); font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 8px;">
            ${badge || 'New Lead Enquiry'}
          </span>
          <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 700;">${title}</h2>
        </div>

        <!-- Details Table -->
        <div style="padding: 10px 24px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>

        <!-- Footer / Contact Note -->
        <div style="background-color: #09090b; padding: 20px 24px; text-align: center; border-top: 1px solid #27272a;">
          <p style="color: #a1a1aa; font-size: 13px; margin: 0 0 8px;">
            Branch: <strong>Coimbatore, Tamil Nadu</strong> | Call: <strong>+91 8668136788</strong>
          </p>
          <p style="color: #71717a; font-size: 12px; margin: 0;">
            Official Partner in Japan: <strong>Apple.co Pvt. Ltd.</strong> | <a href="https://www.kaizenjapaneseclass.com" style="color: #ef4444; text-decoration: none;">www.kaizenjapaneseclass.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mailerStatus: transporter ? 'active' : 'uninitialized',
    etherealUser: etherealAccount?.user || null
  });
});

// Submit Enquiry / Demo Registration
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, email, phone, course, mode, message, preferredTime, source } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: 'Name, email, and phone are required.' });
    }

    const lead = {
      id: 'lead-' + Date.now(),
      type: 'Demo / Course Registration',
      name,
      email,
      phone,
      course: course || 'General Japanese / JLPT N5',
      mode: mode || 'Offline (Coimbatore)',
      preferredTime: preferredTime || 'Flexible',
      message: message || '',
      source: source || 'Website Registration Form',
      date: new Date().toISOString(),
      status: 'New'
    };

    saveLead(lead);

    // Send Notification Email
    const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'notifications@kaizenjapaneseclass.com';
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER || 'admin@kaizenjapaneseclass.com';
    const emailHtml = generateEmailHtml({
      title: 'New Student Demo & Course Registration',
      badge: 'Course Enquiry',
      details: {
        'Student Name': name,
        'Phone Number': phone,
        'Email Address': email,
        'Selected Course': course || 'JLPT N5 Batch',
        'Study Mode': mode || 'Offline (Coimbatore) / Online',
        'Preferred Timing': preferredTime || 'Flexible',
        'Notes / Message': message || 'None',
        'Submission Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
    });

    let mailResult = { messageId: 'simulated', preview: null };
    if (transporter) {
      const info = await transporter.sendMail({
        from: `"Kaizen Japanese Academy" <${senderEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `[Kaizen Lead] New Registration from ${name} (${course || 'JLPT N5'})`,
        html: emailHtml
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      mailResult = {
        messageId: info.messageId,
        preview: previewUrl || null
      };

      if (previewUrl) {
        console.log(`[Nodemailer] Email preview URL: ${previewUrl}`);
      }
    }

    res.json({
      success: true,
      message: 'Registration received successfully! Our career counselor will contact you shortly.',
      leadId: lead.id,
      previewUrl: mailResult.preview
    });
  } catch (err) {
    console.error('Error handling enquiry:', err);
    res.status(500).json({ success: false, error: 'Internal server error processing enquiry.' });
  }
});

// Submit Job Pathway Application (IT, SSW, TITP)
app.post('/api/job-applications', async (req, res) => {
  try {
    const { name, email, phone, pathway, qualification, experience, jlptLevel, message } = req.body;

    if (!name || !email || !phone || !pathway) {
      return res.status(400).json({ success: false, error: 'Name, email, phone, and visa pathway are required.' });
    }

    const lead = {
      id: 'job-' + Date.now(),
      type: 'Job Support in Japan',
      name,
      email,
      phone,
      pathway,
      qualification: qualification || 'Not specified',
      experience: experience || 'Not specified',
      jlptLevel: jlptLevel || 'Beginner',
      message: message || '',
      date: new Date().toISOString(),
      status: 'New'
    };

    saveLead(lead);

    const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'careers@kaizenjapaneseclass.com';
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER || 'admin@kaizenjapaneseclass.com';
    const emailHtml = generateEmailHtml({
      title: `Job Support Application: ${pathway}`,
      badge: 'Work in Japan Application',
      details: {
        'Applicant Name': name,
        'Phone Number': phone,
        'Email Address': email,
        'Selected Visa Pathway': pathway,
        'Highest Qualification': qualification || '12th / Diploma / Degree',
        'Work Experience': experience || 'Fresher / Experienced',
        'Current JLPT Level': jlptLevel || 'Beginner (Ready to start)',
        'Applicant Note': message || 'None',
        'Submission Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
    });

    let mailResult = { messageId: 'simulated', preview: null };
    if (transporter) {
      const info = await transporter.sendMail({
        from: `"Kaizen Japanese Academy" <${senderEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `[Job Support Japan] Application from ${name} - ${pathway}`,
        html: emailHtml
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      mailResult = {
        messageId: info.messageId,
        preview: previewUrl || null
      };

      if (previewUrl) {
        console.log(`[Nodemailer] Job App preview URL: ${previewUrl}`);
      }
    }

    res.json({
      success: true,
      message: 'Your Japan Career Application has been recorded! Our placement cell in Coimbatore will review and call you.',
      leadId: lead.id,
      previewUrl: mailResult.preview
    });
  } catch (err) {
    console.error('Error handling job application:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// Submit Higher Education Application (Apple.co Pvt. Ltd. Collaboration)
app.post('/api/higher-education', async (req, res) => {
  try {
    const { name, email, phone, currentEducation, intendedIntake, budgetRange, jlptLevel, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: 'Name, email, and phone are required.' });
    }

    const lead = {
      id: 'study-' + Date.now(),
      type: 'Higher Education in Japan (Apple.co Collaboration)',
      name,
      email,
      phone,
      currentEducation: currentEducation || 'Degree / +2',
      intendedIntake: intendedIntake || 'Upcoming Intake (April / October)',
      budgetRange: budgetRange || 'Standard',
      jlptLevel: jlptLevel || 'Beginner',
      message: message || '',
      date: new Date().toISOString(),
      status: 'New'
    };

    saveLead(lead);

    const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'study@kaizenjapaneseclass.com';
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER || 'admin@kaizenjapaneseclass.com';
    const emailHtml = generateEmailHtml({
      title: 'Higher Education Counselling Request (Apple.co Japan Partner)',
      badge: 'Study in Japan Enquiry',
      details: {
        'Student Name': name,
        'Phone Number': phone,
        'Email Address': email,
        'Current Qualification': currentEducation || 'Not provided',
        'Target Intake': intendedIntake || 'Next Intake (April / Oct)',
        'Language Proficiency': jlptLevel || 'Beginner',
        'Student Message': message || 'None',
        'Submission Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
    });

    let mailResult = { messageId: 'simulated', preview: null };
    if (transporter) {
      const info = await transporter.sendMail({
        from: `"Kaizen Japanese Academy" <${senderEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `[Higher Education Japan] Counselling Request from ${name}`,
        html: emailHtml
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      mailResult = {
        messageId: info.messageId,
        preview: previewUrl || null
      };

      if (previewUrl) {
        console.log(`[Nodemailer] Higher Ed preview URL: ${previewUrl}`);
      }
    }

    res.json({
      success: true,
      message: 'Counselling request booked! Our study abroad team and Apple.co coordinators will guide you step by step.',
      leadId: lead.id,
      previewUrl: mailResult.preview
    });
  } catch (err) {
    console.error('Error handling higher ed application:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// Admin Leads API
app.get('/api/admin/leads', (req, res) => {
  const leads = getLeads();
  res.json({ success: true, count: leads.length, leads });
});

// Update Lead Status
app.patch('/api/admin/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index].status = status || leads[index].status;
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    return res.json({ success: true, lead: leads[index] });
  }
  res.status(404).json({ success: false, error: 'Lead not found.' });
});

// Test Email Trigger API
app.post('/api/test-email', async (req, res) => {
  try {
    const { targetEmail } = req.body;
    const recipient = targetEmail || process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'test@example.com';
    const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'no-reply@kaizenjapaneseclass.com';

    const emailHtml = generateEmailHtml({
      title: 'Nodemailer Connectivity Test',
      badge: 'System Verification',
      details: {
        'Status': 'Connected & Operational',
        'Server Host': process.env.EMAIL_USER ? 'Gmail Service' : (process.env.SMTP_HOST || 'Ethereal Test SMTP'),
        'Timestamp': new Date().toISOString(),
        'Academy': 'Kaizen Japanese Language Academy - Coimbatore'
      }
    });

    if (transporter) {
      const info = await transporter.sendMail({
        from: `"Kaizen Japanese Academy" <${senderEmail}>`,
        to: recipient,
        subject: `[Kaizen Academy] Nodemailer Test Verification (${new Date().toLocaleTimeString()})`,
        html: emailHtml
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      res.json({
        success: true,
        message: `Test email dispatched to ${recipient}`,
        previewUrl: previewUrl || null
      });
    } else {
      res.status(500).json({ success: false, error: 'Transporter not ready.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Testimonials API Helpers
function getTestimonials() {
  try {
    if (!fs.existsSync(TESTIMONIALS_FILE)) return [];
    return JSON.parse(fs.readFileSync(TESTIMONIALS_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
}

function saveTestimonials(list) {
  fs.writeFileSync(TESTIMONIALS_FILE, JSON.stringify(list, null, 2));
}

// Testimonials Endpoints
app.get('/api/testimonials', (req, res) => {
  const testimonials = getTestimonials();
  res.json({ success: true, count: testimonials.length, testimonials });
});

app.post('/api/testimonials', (req, res) => {
  try {
    const { name, role, company, avatar, badge, jlpt, quote, location, pressProof, featured } = req.body;
    
    if (!name || !quote) {
      return res.status(400).json({ success: false, error: 'Student name and quote are required.' });
    }

    const newTestimonial = {
      id: 'testimonial-' + Date.now(),
      name,
      role: role || 'Japan Career Aspirant',
      company: company || 'Kaizen Japanese Academy',
      avatar: avatar || '/images/testimonials/Kaushik Nivesh P.jpeg',
      badge: badge || 'Placement Milestone',
      jlpt: jlpt || 'JLPT N5 / N4',
      quote,
      location: location || 'Coimbatore Campus',
      pressProof: pressProof || null,
      featured: Boolean(featured),
      date: new Date().toISOString().split('T')[0]
    };

    const testimonials = getTestimonials();
    testimonials.push(newTestimonial);
    saveTestimonials(testimonials);

    res.json({ success: true, testimonial: newTestimonial });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/testimonials/:id', (req, res) => {
  try {
    const { id } = req.params;
    let testimonials = getTestimonials();
    const initialLength = testimonials.length;
    testimonials = testimonials.filter(t => t.id !== id);

    if (testimonials.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Testimonial not found.' });
    }

    saveTestimonials(testimonials);
    res.json({ success: true, message: 'Testimonial deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Image Upload Endpoint (handles base64 uploads from admin)
app.post('/api/upload-image', (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'No image provided.' });
    }

    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, error: 'Invalid base64 string.' });
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const safeName = (filename || 'student-photo.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `upload-${Date.now()}-${safeName}`;
    const targetDir = path.join(__dirname, '../public/images/testimonials');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, uniqueFilename);
    fs.writeFileSync(targetPath, buffer);

    res.json({
      success: true,
      url: `/images/testimonials/${uniqueFilename}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Kaizen Node.js API Server running on port ${PORT}`);
  console.log(`📧 Nodemailer forwarding service ready`);
  console.log(`===============================================`);
});

