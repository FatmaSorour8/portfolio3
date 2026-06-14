# Farouk Seliem — Editable Data Analyst Portfolio

A modern, responsive, Netlify-ready portfolio for **Farouk Hamed Seliem**, built with HTML, CSS, JavaScript, Bootstrap 5, Decap CMS, and Netlify Identity.

## Features

- Data analyst themed design with animated charts.
- Same main portfolio sections as the Fatma Sorour portfolio: Home, About, Experience, Skills, Education, Projects, Contact.
- Editable content from one JSON file: `data/portfolio.json`.
- Decap CMS admin dashboard at `/admin/`.
- Netlify-ready structure.
- Responsive layout for desktop, tablet, and mobile.
- SEO meta tags and JSON-LD schema.
- CV download button.
- Profile image spinner with data-related icons.
- Projects pagination controlled from JSON.

## Project Structure

```txt
.
├── admin/
│   ├── config.yml
│   └── index.html
├── assets/
│   ├── profile.png
│   ├── Farouk_Seliem_CV.pdf
│   └── project images
├── css/
│   └── style.css
├── data/
│   └── portfolio.json
├── js/
│   └── main.js
├── index.html
├── netlify.toml
└── README.md
```

## How to Edit Content

Open:

```txt
data/portfolio.json
```

You can edit name, title, hero text, profile image, CV file, SEO, contact info, social links, skills, experience, education, courses, projects, project images, project links, and projects per page.

## How to Deploy to Netlify

1. Upload the project to GitHub.
2. Open Netlify.
3. Choose **Add new project** → **Import an existing project**.
4. Connect GitHub and select the repository.
5. Use:

```txt
Build command: leave empty
Publish directory: .
```

6. Deploy.

## Admin Dashboard Setup

To edit content from `/admin/`:

1. Open your Netlify project.
2. Go to **Project configuration**.
3. Enable **Identity**.
4. Set registration to **Invite only**.
5. Enable **Git Gateway**.
6. Invite the email that will manage the dashboard.
7. Open `https://your-site-name.netlify.app/admin/`.

## Important Path Notes

Use relative paths in `data/portfolio.json`:

```json
"profileImage": "assets/profile.png",
"cvFile": "assets/Farouk_Seliem_CV.pdf"
```

Do not start asset paths with `/`.

## Responsive hotfix note

The latest version includes a mobile overflow fix, a corrected right-side mobile menu z-index, and safer mobile AOS animations to prevent horizontal scrolling.
