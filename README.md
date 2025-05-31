# Dental Clinic Management System

A comprehensive, production-ready web application for managing dental clinic operations with role-based access control, built with Next.js 15, MongoDB, and TypeScript.

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication with secure cookies
- Password hashing with bcrypt
- Role-based access control (Admin, Dentist, Receptionist, Patient)
- Protected API routes and middleware

### 👨‍⚕️ Admin Panel
- **Dashboard**: Real-time KPIs and system overview
- **User Management**: CRUD operations for staff members
- **Inventory Management**: Track supplies with low-stock alerts
- **System Analytics**: Revenue tracking and performance metrics

### 🦷 Dentist Portal
- **Patient Records**: Complete medical history and treatment notes
- **Appointment Management**: Today's schedule and patient information
- **Treatment Planning**: Add and track treatment progress
- **Clinical Notes**: Comprehensive patient documentation

### 📋 Receptionist Panel
- **Appointment Booking**: Interactive calendar with time slots
- **Patient Check-in**: Streamlined patient intake process
- **Billing Management**: Invoice creation and payment tracking
- **Communication**: Patient reminders and notifications

### 👤 Patient Portal
- **Appointment Booking**: Self-service scheduling system
- **Medical History**: View treatment records and notes
- **Billing**: Invoice viewing and payment status
- **Document Management**: Upload and manage medical documents

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with App Router, React 18, TypeScript
- **Backend**: Next.js API Routes, MongoDB with native driver
- **Authentication**: JWT with jose library, bcrypt for password hashing
- **UI/UX**: Tailwind CSS, shadcn/ui components, Lucide React icons
- **Database**: MongoDB with proper indexing and relationships
- **Deployment**: Vercel-optimized with environment variables

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB database (local or cloud)
- npm or yarn

### Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd dental-clinic-management
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Variables**
   Create a `.env.local` file:
   \`\`\`env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   \`\`\`

4. **Seed the database** (Development only)
   \`\`\`bash
   curl -X POST http://localhost:3000/api/seed
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@clinic.com | admin123 |
| Dentist | dentist@clinic.com | dentist123 |
| Receptionist | reception@clinic.com | reception123 |
| Patient | patient@clinic.com | patient123 |

## 🏗 Project Structure

\`\`\`
├── app/
│   ├── admin/              # Admin dashboard and pages
│   ├── dentist/            # Dentist portal pages
│   ├── receptionist/       # Receptionist panel pages
│   ├── patient/            # Patient portal pages
│   ├── auth/               # Authentication pages
│   └── api/                # API routes
├── components/
│   ├── layouts/            # Role-based layout components
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── hooks/                  # Custom React hooks for data fetching
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── mongodb.ts          # Database connection
│   └── database-operations.ts # Database CRUD operations
└── middleware.ts           # Route protection middleware
\`\`\`

## 🗄 Database Schema

### Collections

#### Users
\`\`\`typescript
{
  _id: ObjectId,
  email: string,
  password: string, // bcrypt hashed
  firstName: string,
  lastName: string,
  phone: string,
  role: "admin" | "dentist" | "receptionist" | "patient",
  dateOfBirth?: string, // patients only
  address?: string, // patients only
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Appointments
\`\`\`typescript
{
  _id: ObjectId,
  patientId: ObjectId,
  dentistId: ObjectId,
  date: string, // YYYY-MM-DD
  time: string, // HH:MM
  type: string,
  status: "pending" | "confirmed" | "completed" | "cancelled",
  notes?: string,
  duration: number, // minutes
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Invoices
\`\`\`typescript
{
  _id: ObjectId,
  patientId: ObjectId,
  invoiceNumber: string,
  description: string,
  amount: number,
  status: "pending" | "paid" | "overdue" | "cancelled",
  dueDate: string,
  paidDate?: string,
  notes?: string,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Inventory
\`\`\`typescript
{
  _id: ObjectId,
  name: string,
  category: string,
  currentStock: number,
  minStock: number,
  maxStock: number,
  unit: string,
  supplier: string,
  cost: number,
  expiryDate?: string,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Patient registration
- `POST /api/auth/logout` - User logout

### Users (Admin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Appointments
- `GET /api/appointments` - Get appointments (filtered by role)
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Cancel appointment

### Invoices
- `GET /api/invoices` - Get invoices (filtered by role)
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/[id]` - Update invoice status

### Inventory
- `GET /api/inventory` - Get inventory items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/[id]` - Update inventory item
- `DELETE /api/inventory/[id]` - Delete inventory item

### Dashboard
- `GET /api/dashboard/stats` - Get role-specific dashboard statistics

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`
     - `JWT_SECRET`
   - Deploy automatically

3. **Seed Production Database** (Optional)
   - Remove the production check in `/api/seed/route.ts`
   - Call the seed endpoint once
   - Re-add the production check

### Other Platforms
- **Railway**: Connect GitHub repo, add environment variables
- **DigitalOcean App Platform**: Use GitHub integration
- **Render**: Connect repository with environment variables

## 🔧 Configuration

### Environment Variables

\`\`\`env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dental_clinic

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Optional: Email configuration (for future features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
\`\`\`

### MongoDB Setup

1. **Create MongoDB Atlas Account** (recommended)
2. **Create a new cluster**
3. **Create database user**
4. **Whitelist IP addresses**
5. **Get connection string**

## 🎯 Key Features Implementation

### Real-time Dashboard Statistics
- Dynamic stats based on user role
- MongoDB aggregation queries
- Cached results for performance

### Role-based Access Control
- Middleware protection for all routes
- API-level permission checking
- UI components adapt to user role

### Secure Authentication
- JWT tokens with secure cookies
- Password hashing with bcrypt
- Session management with automatic expiry

### Responsive Design
- Mobile-first approach
- Collapsible sidebar navigation
- Adaptive layouts for all screen sizes

### Data Validation
- Client-side form validation
- Server-side input sanitization
- MongoDB schema validation

## 🔮 Future Enhancements

- [ ] **Email Notifications**: Automated appointment reminders
- [ ] **Payment Gateway**: Stripe integration for online payments
- [ ] **File Upload**: Document and image management
- [ ] **Advanced Reporting**: Analytics dashboard with charts
- [ ] **Mobile App**: React Native companion app
- [ ] **Multi-clinic Support**: Manage multiple clinic locations
- [ ] **Insurance Integration**: Claims processing automation
- [ ] **Telemedicine**: Video consultation features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the demo accounts and test the features

---

**Built with ❤️ for dental professionals**
