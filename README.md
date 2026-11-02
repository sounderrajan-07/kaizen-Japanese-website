# Kaizen Japanese Language Academy (改善)
> **Learn Japanese. Work in Japan. Build Your Future.**  
> High-performance modern web application built with **React + Vite + Tailwind CSS** with automated email forwarding powered by **Node.js & Nodemailer**.

---

## 🌟 Overview & Key Client Enhancements

This project transforms the previous static website into an ultra-modern, high-converting digital platform that accurately reflects the client's brand guidelines, regional identity, and international partnerships:

1. **Brand Identity & Strict Color Palette**:
   - Built exclusively in the client's signature palette: **Red (`#DC2626`), White (`#FFFFFF`), and Jet Black (`#09090B`)**.
   - Elegant Japanese aesthetics, clean cards, subtle kanji accents (改善 - Kaizen), and modern typography (`Plus Jakarta Sans` & `Noto Sans JP`).

2. **Client Audio & Document Requirements Implemented**:
   - **Flash News Ticker**: Top animated announcements ticker highlighting Coimbatore offline batches, launch discounts, and partner updates.
   - **Marketing Posters Pop-up (WhatsApp Images)**: Interactive modal showcasing the Coimbatore Launch Offer and Work in Japan posters with full preview, zoom, and direct CTA actions.
   - **Page 1: Job Support in Japan**: Dedicated section covering IT & Engineering, Specified Skilled Worker (SSW), and TITP visa pathways, 8-step journey, interview prep, and direct application form with Google Form link option.
   - **Page 2: Higher Education in Japan**: Official collaboration with **Apple.co Pvt. Ltd., Japan**, Japanese language school selection, admission assistance, and 7-step study journey.
   - **Exclusive Coimbatore Focus**: Removed all references to Salem as explicitly instructed; Coimbatore campus is highlighted prominently.
   - **Tamil Language Instruction**: Highlights *"தமிழ் வழியில் ஜப்பானிய மொழி"* (Learn Japanese through Tamil & English).
   - **Interactive Visa Eligibility Calculator**: Enables students and professionals to self-assess their eligibility based on qualification, field, and Japanese level.
   - **Interactive Japanese Sakura Animation**: Subtle toggleable falling cherry blossom petals.

3. **Backend & Nodemailer Mail Forwarding**:
   - Node.js + Express API server running on port `5000`.
   - Real-time automated email forwarding for registrations, job applications, higher education inquiries, and eligibility evaluations.
   - Styled HTML emails with branded red/black headers, applicant information tables, and timestamps.
   - Zero-config Ethereal test SMTP enabled by default with live preview links logged in responses.
   - Seamless production `.env` configuration for custom SMTP (Gmail App Password, Brevo, SendGrid, Amazon SES, or Hostinger).
   - Local JSON lead persistence (`server/leads.json`) accessible via the built-in **Admin Dashboard**.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Frontend + Backend Concurrently
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API & Nodemailer**: [http://localhost:5000](http://localhost:5000)

---

## 📧 Email Configuration (`.env`)

By default, the server uses **Ethereal Mail** for testing, generating clickable preview links for each email sent.

To route emails to a live inbox (e.g. Gmail):
```env
PORT=5000

# Gmail Example (Generate an App Password from your Google Account)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password

# Notification Target
ADMIN_EMAIL=kaizenjapaneseclass@gmail.com
```

---

## 🛡️ Admin Management Dashboard

- Access by clicking the **Shield Icon** in the top navigation or footer.
- Default Password: `sensei123` (or click *"Quick Preview"*).
- Features:
  - Real-time lead tracking (Course Bookings, Job Applications, Higher Education).
  - Status updates (`New`, `Contacted`, `Enrolled`, `Archived`).
  - Search by candidate name, email, or pathway.
  - Export leads to **CSV**.
  - **Instant Nodemailer Connection Test** button.

---

## 📱 Official Contact Details
- **Phone**: +91 8668136788
- **Website**: www.kaizenjapaneseclass.com
- **Campus**: Exclusive Offline Japanese Class, Coimbatore, Tamil Nadu
- **Japan Partner**: Apple.co Pvt. Ltd., Japan

