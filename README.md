# 🎬 Movie Tracker

A full-stack web application for tracking movies, building watchlists, and sharing recommendations with friends.

## ✨ Features

- **User Authentication** - Secure login and registration
- **Movie Database** - Access to thousands of movies via TMDB API
- **Watchlist Management** - Create and manage personal watchlists with different statuses
- **Movie Reviews** - Write and read reviews, rate movies
- **Advanced Search** - Filter movies by genre, year, and rating
- **Shared Watchlists** - Share your watchlists with friends
- **User Profiles** - View and edit your profile information
- **Admin Dashboard** - Administrative controls for managing users and content
- **Modern UI** - Beautiful dark theme with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **TMDB API** - Movie data

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- TMDB API Key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/KaracanMustafa/Movie-Tracker.git
cd Movie-Tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📂 Project Structure

```
Movie-Tracker/
├── backend/
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Custom middleware (auth, admin)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts (make-admin)
│   ├── server.js        # Express server setup
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable React components
    │   ├── pages/        # Page components
    │   ├── services/     # API service calls
    │   ├── context/      # React Context (Auth)
    │   ├── App.jsx       # Main app component
    │   └── index.css     # Global styles
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── .env
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/search` - Search movies
- `GET /api/movies/discover` - Discover movies with filters
- `GET /api/movies/:id` - Get movie details

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add item to watchlist
- `PUT /api/watchlist/:id` - Update watchlist item
- `DELETE /api/watchlist/:id` - Remove from watchlist

### Reviews
- `GET /api/reviews/movie/:tmdbId` - Get reviews for a movie
- `POST /api/reviews` - Create a review
- `DELETE /api/reviews/:id` - Delete a review

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/role` - Change user role

## 👤 User Roles

- **User** - Default role with full access to features
- **Admin** - Full system access including user management

## 🔐 Creating an Admin User

To create an admin user, run:

```bash
cd backend
node scripts/make-admin.js user@email.com
```

## 🎨 Styling

The project uses Tailwind CSS v3 with a modern dark theme:

- Dark blue-gray backgrounds
- Indigo/purple accent colors
- Smooth transitions and hover effects
- Fully responsive design
- Mobile-first approach

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-tracker
JWT_SECRET=your_secret_key_here
TMDB_API_KEY=your_tmdb_api_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Dependencies

### Frontend Key Packages
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP requests
- `tailwindcss` - CSS framework

### Backend Key Packages
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT auth
- `axios` - HTTP requests
- `dotenv` - Environment variables

## 🚦 Running the Application

### Development Mode

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Mustafa Karacan** - [GitHub](https://github.com/KaracanMustafa)

## 🆘 Support

For support, please open an issue on the GitHub repository or contact the author.

## 🗺️ Roadmap

- [ ] Social features (friend requests, activity feed)
- [ ] Movie recommendations based on ratings
- [ ] Advanced notifications system
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Export watchlist functionality
- [ ] Integration with other streaming platforms

## 📊 Database Schema

### Users
- Username, email, password (hashed)
- Profile information
- Role (user/admin)
- Creation/update timestamps

### Watchlist Items
- User ID, TMDB Movie ID
- Status (Plan to Watch, Watching, Completed, On-Hold, Dropped)
- Score (0-10)
- Creation/update timestamps

### Reviews
- User ID, TMDB Movie ID
- Rating (1-10), review text
- Creation/update timestamps

### Shared Watchlists
- Owner ID, invited users
- Watchlist items
- Permissions

---

**Made with ❤️ for movie enthusiasts**
