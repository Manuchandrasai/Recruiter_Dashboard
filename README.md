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

# Screenshots
### Basic Details 
<img width="1365" height="767" alt="Screenshot 2025-07-25 174046" src="https://github.com/user-attachments/assets/ce0086e7-d6e5-4dcc-a1a7-5787c6b53057" />

### Requirements 
<img width="1365" height="767" alt="Screenshot 2025-07-25 174225" src="https://github.com/user-attachments/assets/e809c66d-f0c0-46e1-b626-26b21c637657" />

### Visibility & Filters Wizard  
<img width="1365" height="767" alt="Screenshot 2025-07-25 174245" src="https://github.com/user-attachments/assets/d8e75d30-08ab-4492-a5b0-e266456dfc85" />


### Job Details Example
<img width="1365" height="767" alt="Screenshot 2025-07-25 174414" src="https://github.com/user-attachments/assets/04dcfc6b-31e0-4fab-8e36-5e9dcd63d62d" />
<img width="1365" height="767" alt="Screenshot 2025-07-25 174404" src="https://github.com/user-attachments/assets/7969907e-f42a-4c9f-b224-4a4f675c67be" />

### Gest Scorecard Dashboard  
<img width="1365" height="767" alt="Screenshot 2025-07-25 174441" src="https://github.com/user-attachments/assets/7d1f8939-a2e5-4448-919a-56260238b31a" />
<img width="1365" height="767" alt="Screenshot 2025-07-25 174441" src="https://github.com/user-attachments/assets/e6fd6a2b-9b8c-4e48-bc34-ec8ad61c26db" />
<img width="1359" height="765" alt="Screenshot 2025-07-25 174503" src="https://github.com/user-attachments/assets/4892923c-88b2-4002-914e-6ceb21c6a850" />

### Communication Tools
<img width="1365" height="767" alt="Screenshot 2025-07-25 174614" src="https://github.com/user-attachments/assets/c49c8853-2b10-462b-b910-ee2317c6c7cf" />
<img width="1365" height="767" alt="Screenshot 2025-07-25 174625" src="https://github.com/user-attachments/assets/5ba530e5-257b-483d-97c5-b508b79887e7" />
<img width="1365" height="767" alt="Screenshot 2025-07-25 174641" src="https://github.com/user-attachments/assets/0a247cb1-1a6a-4b8e-875d-2e6fed5dbdf4" />



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
