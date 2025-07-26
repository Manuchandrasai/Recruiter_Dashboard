# Recruiter Dashboard

A full-stack web application for recruiters to create, manage, and filter job/internship postings with customized requirements and advanced visibility controls.

---

## Features

- **Multi-step Job/Internship Posting Wizard**
  - **Basic Details**: Fill out job title, description, location, stipend/CTC, job type, duration, bond details, and work mode (on-site, remote, hybrid).
  - **Requirements**: Specify required skills, select relevant tech stack, and apply academic filters including minimum CGPA, branch, and year of study.
  - **Visibility & Filters**: Restrict posting visibility to all students, filtered colleges, or only GEST-qualified students (by year). See estimated student/institution reach based on filters.

- **Dashboard & Management**
  - View, edit, and delete all job/internship postings from a single dashboard.
  - Detailed job view page with a complete summary of requirements and criteria.
  - Simple navigation to manage and update postings.

---

## Tech Stack

- **Frontend:** ReactJS, CSS
- **Backend:** *(Specify here, e.g., Node.js/Express, or C# .NET Core)*
- **Database:** *(Specify here, e.g., MongoDB, SQL Server)*
- **API:** RESTful endpoints

---

## Screenshots

**Basic Details**  
<img width="1365" height="767" alt="Screenshot 2025-07-25 174046" src="https://github.com/user-attachments/assets/ce0086e7-d6e5-4dcc-a1a7-5787c6b53057" />

**Requirements** 
<img width="1365" height="767" alt="Screenshot 2025-07-25 174225" src="https://github.com/user-attachments/assets/e809c66d-f0c0-46e1-b626-26b21c637657" />

**Visibility & Filters Wizard**  
<img width="1365" height="767" alt="Screenshot 2025-07-25 174245" src="https://github.com/user-attachments/assets/d8e75d30-08ab-4492-a5b0-e266456dfc85" />


**Job Details Example**  
<img width="1365" height="767" alt="Screenshot 2025-07-25 174414" src="https://github.com/user-attachments/assets/04dcfc6b-31e0-4fab-8e36-5e9dcd63d62d" />
<img width="1365" height="767" alt="Screenshot 2025-07-25 174404" src="https://github.com/user-attachments/assets/7969907e-f42a-4c9f-b224-4a4f675c67be" />

**Basic Details Wizard**  
![Basic Details Step](attachments/Screenshot-2025-07-25-174046.jpg)

---

## Getting Started

### Prerequisites

- Node.js (Recommended LTS version)
- npm or yarn
- *(If C# backend: .NET SDK)*
- Database server as per backend

### Installation

1. **Clone the Repository**

`git clone https://github.com/Manuchandrasai/Recruiter_Dashboard.git`

`cd Recruiter_Dashboard`


2. **Frontend Setup**

`cd frontend`

`npm install`


3. **Backend Setup**

`cd ../backend/RecruiterApi`

`npm install`

6. **Access the application:**  
Open `http://localhost:3000` in your web browser.

---

## Usage Guide

1. **Create a New Job/Internship Posting**
- Fill in the required information step-by-step: Basic Details → Requirements → Visibility & Filters.
- Add required skills (e.g., C++, Java), tech stack, academic filters (CGPA, branch, year), and choose visibility options.

2. **Manage All Postings**
- Use the dashboard to view, edit, or delete your postings.
- Detailed job pages show all criteria, eligibility, and requirements for each position.

---

## Contributing

1. Fork the repo
2. Create a feature branch  
`git checkout -b feature/YourFeature`
3. Commit and push changes  
`git commit -am 'Add feature'`  
`git push origin feature/YourFeature`
4. Open a Pull Request

---

## License

MIT License

---

**Happy Recruiting!**



