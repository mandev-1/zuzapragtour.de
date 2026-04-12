# Prague Tour Guide Website

Welcome to the Prague Tour Guide website! This project is designed to provide users with information about various tours available in Prague, along with contact options for inquiries.

## Project Structure

The project is organized as follows:

```
prague-tour-guide
├── public
│   ├── index.html          # Main HTML file for the application
│   ├── robots.txt         # Controls how search engines index the site
│   └── sitemap.xml        # Structured list of pages for search engines
├── src
│   ├── App.tsx            # Main component setting up routing and layout
│   ├── index.tsx          # Entry point of the React application
│   ├── components          # Reusable components for the application
│   │   ├── Header.tsx     # Header component with navigation
│   │   ├── Footer.tsx     # Footer component with contact details
│   │   ├── Contact.tsx    # Component for contact information
│   │   ├── Tours.tsx      # Component displaying available tours
│   │   └── Home.tsx       # Landing page component
│   ├── pages              # Page components for routing
│   │   ├── HomePage.tsx   # Homepage component
│   │   ├── ToursPage.tsx  # Tours page component
│   │   └── ContactPage.tsx # Contact page component
│   ├── styles             # CSS styles for the application
│   │   └── App.css        # Main CSS file
│   └── utils              # Utility functions
│       └── seo.ts         # SEO optimization functions
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd prague-tour-guide
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Build for production:**
   ```
   npm run build
   ```

## Features

- **Tour Information:** Browse through various tours available in Prague.
- **Contact Options:** Reach out via email or phone for inquiries.
- **SEO Optimized:** The website is optimized for search engines to improve visibility.

## Contact

For any questions or feedback, please reach out via:

- **Email:** info@praguetourguides.com
- **Phone:** +420 123 456 789

Thank you for visiting the Prague Tour Guide website! Enjoy your tours!