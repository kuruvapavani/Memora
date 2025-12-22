# ⏳ Memora – A Digital Time Capsule

**Memora** is a digital time capsule platform designed to help you preserve memories for the future. Whether it’s personal thoughts, life milestones, or special moments, Memora allows you to securely store them today and relive them tomorrow—exactly when the time feels right.

This project blends **technology with emotion**, focusing on access-controlled privacy, automation, and meaningful user experiences.

---

## 🌍 Live Demo

🔗 https://memora-kp.vercel.app/

---

## 🌟 About Memora

Memora enables users to create **time-locked memory capsules** containing text, images, videos, or voice notes. Each capsule remains locked until the chosen future date and can only be accessed by authenticated users.

To enhance the emotional experience, Memora also includes **automated reminder emails**, ensuring users never miss the moment their capsule is about to unlock.

### 🎯 Mission
To create a safe, personalized digital space where memories can be preserved, cherished, and revisited across time.

### 🔮 Vision
To build a future where technology safeguards emotions—ensuring that no story, feeling, or journey is ever lost.

---

## 🚀 Features

- 🔐 **Secure Authentication**
  - User registration and login using JWT
  - Protected routes for capsule access

- 📦 **Time-Locked Memory Capsules**
  - Create capsules with text, images, audio, or video
  - Capsules remain locked until a selected future date
  - Backend enforces unlock-time access restrictions

- ⏰ **Automated Capsule Reminder Emails**
  - Users receive an email reminder **one day before capsule unlock**
  - Reminder emails are sent automatically at **9:00 PM**
  - Implemented using **cron jobs in Vercel deployment**

- ☁️ **Media Upload & Storage**
  - Images, videos, and audio securely stored using **Cloudinary**
  - Media access handled through authenticated backend APIs

- 🎨 **Immersive UI & Animations**
  - 3D visual elements built with **React Three Fiber**
  - Smooth animations and transitions powered by **GSAP**

- 📱 **Responsive & Performance Optimized**
  - Optimized for mobile and desktop devices
  - Reduced heavy assets to improve load times and performance

- 🔒 **Access-Controlled Privacy**
  - Capsules are private by default
  - Media files are not publicly discoverable
  - Access is restricted to authenticated users
  - Capsules cannot be accessed before the unlock date

---

## 🛠️ Tech Stack

- **Frontend**
  - React.js
  - React Three Fiber
  - GSAP
  - Tailwind CSS

- **Backend**
  - Node.js
  - Express.js
  - REST APIs
  - JWT Authentication

- **Database**
  - MongoDB (Mongoose)

- **Media Storage**
  - Cloudinary (Images, Videos, Audio)

- **Automation & Scheduling**
  - Cron jobs (Vercel) for capsule reminder emails

- **Deployment**
  - Frontend: Vercel
  - Backend: Node.js server

---

## 📦 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kuruvapavani/memora.git
cd memora
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🧠 How It Works

1. **Create**

   * Add messages, photos, videos, or voice notes to your capsule.

2. **Lock**

   * Choose a future date to seal the capsule.

3. **Reminder**

   * An automated email reminder is sent **one day before unlock at 9 PM**.

4. **Relive**

   * When the unlock date arrives, access the capsule and relive your memories.

---

## 🔮 Future Improvements

* Client-side encryption before media upload
* Time-based signed URLs for media access
* Capsule sharing with explicit user consent
* Custom reminder timing preferences

---

## 👨‍💻 Crafted By

**Kuruva Pavani**
Full Stack Developer | MERN Stack Enthusiast

Memora reflects my focus on clean architecture, backend automation, performance optimization, and building emotionally meaningful digital experiences.
