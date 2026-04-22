**🌲 YelpCamp – Campground Review Platform
📌 Overview

YelpCamp is a full-stack web application where users can explore, create, review, and manage campgrounds. It simulates a real-world platform where people share outdoor experiences, combining CRUD functionality with authentication and RESTful design.

🚀 Features
🏕️ Create, edit, and delete campgrounds
⭐ Add and delete reviews for campgrounds
📍 Interactive campground listings
⚠️ Form validation using Joi
🧹 Data integrity with middleware (e.g., deleting associated reviews)
🛠️ Tech Stack

Frontend:

EJS (Embedded JavaScript Templates)
Bootstrap (for styling)

Backend:

Node.js
Express.js

Database:

MongoDB
Mongoose

Other Tools:

Passport.js (authentication)
Joi (validation)
Method-Override
Express Session

📂 Project Structure
/models         → Mongoose schemas (Campground, Review, User)
/routes         → Express route handlers
/views          → EJS templates
/middleware     → Custom middleware (auth, validation)
/public         → Static files (CSS, JS)
/seeds          → Seed data for database
/app.js         → Main application entry point

🔑 Key Concepts Implemented
RESTful routing
MVC architecture
Middleware chaining
Schema relationships (one-to-many: Campground → Reviews)
Server-side validation
**
