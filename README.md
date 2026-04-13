# Modern Full-Stack Portfolio Website

A stunning, modern personal portfolio website built with React, Node.js, and cutting-edge web technologies. Features cinematic animations, 3D elements, and a space-themed design.

## 🚀 Features

### Frontend
- **React 18** with modern hooks and functional components
- **GSAP** for cinematic scroll-triggered animations
- **Shadcn UI** components with Tailwind CSS
- **Spline 3D** integration for interactive 3D elements
- **Space-themed background** with moving stars and particles
- **Custom cursor** with neon glow effects
- **Typewriter effect** for dynamic text animations
- **Responsive design** for all devices
- **Smooth page transitions** and navigation

### Backend
- **Node.js** with Express.js
- **MongoDB** for data persistence
- **RESTful API** endpoints
- **Email integration** with Nodemailer
- **Contact form** with backend processing
- **Project management** system

### Pages
1. **Home Page** - Hero section with cinematic animations and 3D elements
2. **Skills Page** - Animated skill grid with progress bars
3. **Projects Page** - Interactive project cards with flip animations
4. **Contact Page** - Contact form with backend integration

## 🛠️ Tech Stack

### Frontend
- React 18
- JavaScript (JSX)
- Tailwind CSS
- Shadcn UI
- GSAP (GreenSock)
- Spline 3D
- React Router DOM
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- CORS
- Dotenv

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Local: Make sure MongoDB is running on your system
   - Cloud: Use MongoDB Atlas and update the connection string

5. **Seed the database (optional)**
   ```bash
   cd server
   node seed.js
   ```

6. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (port 3000) and Node.js backend (port 5000).

## 🎨 Customization

### Adding Your Spline 3D Scenes
1. Create your 3D scenes in Spline
2. Export and get the scene URL
3. Update the Spline3D components in:
   - `client/src/pages/Home.js`
   - `client/src/pages/Skills.js`
   - `client/src/pages/Projects.js`
   - `client/src/pages/Contact.js`

### Customizing Content
- Update personal information in each page component
- Modify the skills data in `client/src/pages/Skills.js`
- Add your projects in `client/src/pages/Projects.js`
- Update contact information in `client/src/pages/Contact.js`

### Styling
- Modify colors and themes in `client/tailwind.config.js`
- Update global styles in `client/src/index.css`
- Customize animations in individual components

## 📁 Project Structure

```
portfolio-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── SpaceBackground.js
│   │   │   ├── CustomCursor.js
│   │   │   ├── Navigation.js
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Skills.js
│   │   │   ├── Projects.js
│   │   │   └── Contact.js
│   │   ├── lib/            # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── index.js           # Main server file
│   ├── seed.js            # Database seeding
│   ├── env.example        # Environment variables template
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🚀 Deployment

### Frontend (React)
- Deploy to Vercel, Netlify, or any static hosting service
- Build command: `npm run build`
- Output directory: `client/build`

### Backend (Node.js)
- Deploy to Heroku, Railway, or any Node.js hosting service
- Set environment variables in your hosting platform
- Make sure MongoDB is accessible from your hosting platform

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
PORT=5000
NODE_ENV=production
```

## 🎯 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Create new project

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)

### Health
- `GET /api/health` - Server health check

## 🎨 Animation Features

- **Scroll-triggered animations** using GSAP ScrollTrigger
- **Staggered animations** for skill cards and project grids
- **Hover effects** with 3D transforms and glows
- **Loading animations** with custom spinners
- **Page transitions** with smooth fade effects
- **Floating animations** for 3D elements
- **Typewriter effects** for dynamic text

## 🌟 Key Components

- **SpaceBackground** - Animated space theme with stars and particles
- **CustomCursor** - Neon cursor with hover effects
- **TypewriterEffect** - Dynamic text animation
- **Spline3D** - 3D scene integration
- **ProgressBar** - Animated skill proficiency bars
- **ProjectCard** - Interactive project cards with flip animations
- **ContactForm** - Form with backend integration

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Development Scripts

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only frontend
npm run client

# Start only backend
npm run server

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact me through the portfolio contact form.

---

**Built with ❤️ using React, Node.js, and modern web technologies**

# New---Portfolio
