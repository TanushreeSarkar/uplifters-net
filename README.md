# 🌍 Uplifters.Net – Joining Hearts & Hands with Technology

<div align="center">
  <img src="img/don/salary.jpg" alt="Uplifters.Net Logo" width="150"><br><br>

  **A full-stack charity platform connecting acts of kindness to real human needs.**  
  
  Built with ❤️ using HTML, CSS, JavaScript, Node.js, Express, MongoDB, Cloudinary, and Gmail SMTP.  
  Deployed on **Render** (Backend) & **Vercel** (Frontend).

  <br><br>
  
  ![GitHub stars](https://img.shields.io/github/stars/TanushreeSarkar/uplifters-net?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/TanushreeSarkar/uplifters-net?style=social)
  ![GitHub issues](https://img.shields.io/github/issues/TanushreeSarkar/uplifters-net)
  ![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
</div>

---

## ✨ Key Features

- 🎨 **Modern & Responsive Design** – Beautiful UI that works seamlessly across all devices
- 🌗 **Light/Dark Mode** – Toggle between themes for comfortable viewing
- 🔥 **Full-Stack Integration** – Complete frontend and backend with cloud services
- ☁️ **Cloud Storage** – Cloudinary-powered image gallery and uploads
- 📊 **Dynamic Metrics Dashboard** – Real-time donation impact tracking
- ✉️ **Smart Contact System** – Gmail SMTP integration with automated responses
- 🔒 **Secure Authentication** – JWT-based auth with role management (Admin/User)
- 🎯 **Campaign Management** – Track and display active donation campaigns
- ⭐ **User Testimonials** – Community feedback with admin moderation

---

## 🖼️ Preview

<div align="center">
  <img src="img/light_home" alt="Homepage Preview" width="700"><br>
  <em>Clean, intuitive, and emotionally engaging interface</em>
</div>

---

## 🛠️ Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| **Frontend**    | HTML5, CSS3, JavaScript, Bootstrap, Swiper.js, Lightbox |
| **Backend**     | Node.js, Express.js, Mongoose, JWT, Multer, Nodemailer |
| **Database**    | MongoDB Atlas |
| **Storage**     | Cloudinary |
| **Email**       | Gmail SMTP (App Password) |
| **Deployment**  | Render (Backend), Vercel (Frontend) |

---

## 📁 Project Structure

```
uplifters-net/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── don/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── gallery.js
│   │   │   ├── contact.js
│   │   │   ├── testimonials.js
│   │   │   └── metrics.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
```

---

## 🔧 Core Backend Modules

### 🔐 Authentication Module
- JWT access and refresh token system
- Secure password hashing with bcrypt
- Token rotation and expiry management
- Role-based access control (Admin/User)

### 🖼️ Gallery Module
- Image upload via Multer middleware
- Cloud storage integration with Cloudinary
- Admin moderation and approval system
- Public gallery API for frontend display

### 💬 Contact Module
- Form submissions stored in MongoDB
- Automated email notifications via Gmail SMTP
- Input validation and sanitization
- Admin dashboard for message management

### ⭐ Testimonials Module
- User-submitted feedback collection
- Admin approval workflow
- Frontend carousel integration with Swiper.js
- Rating and comment system

### 📊 Metrics & Analytics
- Real-time donation impact statistics
- Daily auto-updated counters
- Campaign performance tracking
- Public API for frontend display

### 📁 Campaign Management
- Create and manage donation campaigns
- Category-based organization
- Active/inactive status tracking
- API endpoints for campaign data

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password

### Installation

**1. Clone the Repository**

```bash
git clone https://github.com/TanushreeSarkar/uplifters-net.git
cd uplifters-net
```

**2. Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
```

**3. Configure Environment Variables**

Edit the `.env` file with your credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
```

**4. Start Development Server**

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

**5. Frontend Setup**

Simply open `frontend/index.html` in a browser or use a live server:

```bash
cd frontend
npx live-server
```

---

## 🌐 Deployment

### Backend Deployment on Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables from `.env`
5. Deploy and note your backend URL
6. Test health endpoint: `https://your-app.onrender.com/health`

### Frontend Deployment on Vercel

1. Import project on [Vercel](https://vercel.com)
2. Update API base URL in `frontend/index.html`:

```html
<body data-api-base="https://your-backend.onrender.com/api">
```

3. Deploy and your site is live!

---

## 🌍 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and get JWT | No |
| POST | `/api/auth/refresh` | Refresh access token | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Gallery

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/gallery` | Fetch all gallery items | No |
| POST | `/api/gallery` | Upload image | Admin |
| DELETE | `/api/gallery/:id` | Delete image | Admin |

### Contact

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/contact` | Submit contact form | No |
| GET | `/api/contact` | Get all messages | Admin |

### Testimonials

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/testimonials` | Get approved testimonials | No |
| POST | `/api/testimonials` | Submit testimonial | Yes |
| PATCH | `/api/testimonials/:id` | Approve testimonial | Admin |

### Metrics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/metrics` | Get platform metrics | No |
| PUT | `/api/metrics` | Update metrics | Admin |

### Campaigns

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/campaigns` | Get all campaigns | No |
| POST | `/api/campaigns` | Create campaign | Admin |
| PATCH | `/api/campaigns/:id` | Update campaign | Admin |

**Testing:** Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) for API testing.

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues

- Gallery images may load slowly on first visit (caching improves subsequent loads)
- Email notifications may be delayed during high traffic

---

## 📝 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] SMS notifications
- [ ] Social media integration
- [ ] Volunteer management system

---

## 👨‍💻 Developer

**Tanushree Sarkar**  
Full-Stack Developer & Creator of Uplifters.Net

📧 Email: [2k22.csaiml.2212256@gmail.com](mailto:2k22.csaiml.2212256@gmail.com)  
🔗 GitHub: [@TanushreeSarkar](https://github.com/TanushreeSarkar)  
🔗 LinkedIn: [Tanushree Sarkar](https://www.linkedin.com/in/tanushree-sarkar-32635624b)

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

Free to use for personal and commercial projects.

---

## 🙏 Acknowledgments

- Bootstrap for responsive design components
- Cloudinary for seamless image management
- MongoDB Atlas for reliable database hosting
- Render & Vercel for deployment infrastructure
- All contributors and supporters of this project

---

## 💖 Final Thoughts

> **"Technology becomes truly powerful when it uplifts humanity."**

This platform was built with empathy, purpose, and passion to create real positive impact in the world.

Every donation, every testimonial, and every connection made through this platform represents hope and humanity coming together.

**Thank you for being part of this journey.** 🌟

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/TanushreeSarkar">Tanushree Sarkar</a>
  <br><br>
  ⭐ Star this repo if you found it helpful!
</div>
