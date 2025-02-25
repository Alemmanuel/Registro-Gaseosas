# 🥤 Soda Registry

This project is a web application for recording and managing soda sales. It uses Tailwind CSS for design and provides an intuitive user interface for registering, filtering, and managing soda sales.

## ✨ Features

- Recording of soda sales with details such as flavor, quantity, size, total value, status, payment method, and person's name.
- Filtering of records by date, payment method, size, quantity, and status.
- Editing and deleting existing records.
- Responsive design that adapts to different screen sizes.

## 🛠️ Technologies Used

- HTML5
- Tailwind CSS
- JavaScript
- Font Awesome
- Express
- Neon
- PostgreSQL
- CORS
- Vercel

## 📁 Project Structure

```

/c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server/
│   ├── server.js
│   ├── controllers/
│   │   └── gaseosasController.js
│   ├── models/
│   │   └── gaseosa.js
│   └── routes/
│       └── gaseosasRoutes.js
├── tailwind.config.js
└── README.md

```plaintext

## 🛠️ Installation

1. Clone the repository to your local machine.
   ```bash
   git clone <REPOSITORY_URL>
```

2. Navigate to the project directory.

```shellscript
cd /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2
```


3. Install Node.js dependencies.

```shellscript
npm install
```




## 🎨 Tailwind CSS Configuration

The `tailwind.config.js` file contains the Tailwind CSS configuration. Here you can customize colors, fonts, and other design aspects.

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        neutral: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  // ...existing code...
}
```

## 🚀 Usage

### 📝 Soda Registration

1. Open the `index.html` file in your browser.
2. Complete the registration form with the soda details.
3. Click the "Register Soda" button to open the confirmation modal.
4. Confirm the registration to add the soda to the list.


### 🔍 Record Filtering

1. Use the filter fields to select the desired criteria.
2. Click "Apply Filters" to view records matching the criteria.
3. Click "Remove Filters" to reset filters and view all records.


### ✏️🗑️ Editing and Deleting Records

1. Click the edit icon next to the record you want to edit.
2. Complete the fields in the edit modal and click "Save".
3. Click the delete icon next to the record you want to delete.
4. Confirm deletion in the confirmation modal.


## 📱💻 Responsive Design

The application design is responsive and adapts to different screen sizes. On small screens, form cells are displayed one below the other. On medium and large screens, cells are displayed in two columns.

```html
<!-- filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/public/index.html -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200">
  <!-- ...existing code... -->
</div>
```

## 📋 Modals

The application uses modals to confirm registration, edit, and delete records. Modals have a white background and are centered on the screen.

```html
<!-- filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/public/index.html -->
<div id="confirmModal" class="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center hidden">
  <div class="bg-white p-6 rounded-lg shadow-lg w-80">
    <!-- ...existing code... -->
  </div>
</div>
```

## 📜 Scroll in Records Table

The records table has a container with horizontal scroll to handle long records.

```html
<!-- filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/public/index.html -->
<div id="gaseosasList" class="bg-gray-200 p-6 rounded-lg shadow-md overflow-x-auto">
  <table class="min-w-full divide-y divide-neutral-300">
    <!-- ...existing code... -->
  </table>
</div>
```

## 🖥️ Backend and JavaScript Files

### app.js

The `app.js` file contains the application logic, including form management, modals, and record filtering.

#### Functionalities of the `app.js` file

- **Soda Registration**: Handles the logic for registering new sodas.
- **Modals**: Controls the opening and closing of confirmation, edit, and delete modals.
- **Record Filtering**: Applies and removes filters to display specific records.


```javascript
// filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/public/app.js
document.addEventListener('DOMContentLoaded', () => {
  // Logic to handle soda registration
  const gaseosaForm = document.getElementById('gaseosaForm');
  const gaseosasList = document.getElementById('gaseosasList');
  const confirmModal = document.getElementById('confirmModal');
  const editModal = document.getElementById('editModal');
  const deleteModal = document.getElementById('deleteModal');

  // Function to open the confirmation modal
  document.getElementById('openConfirmModal').addEventListener('click', () => {
    confirmModal.classList.remove('hidden');
  });

  // Function to close the confirmation modal
  document.getElementById('cancelRegister').addEventListener('click', () => {
    confirmModal.classList.add('hidden');
  });

  // Function to confirm registration
  document.getElementById('confirmRegister').addEventListener('click', () => {
    // Logic to register the soda
    confirmModal.classList.add('hidden');
  });

  // Function to open the edit modal
  gaseosasList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
      editModal.classList.remove('hidden');
    }
  });

  // Function to close the edit modal
  document.getElementById('cancelEdit').addEventListener('click', () => {
    editModal.classList.add('hidden');
  });

  // Function to save edit changes
  document.getElementById('saveEdit').addEventListener('click', () => {
    // Logic to save changes
    editModal.classList.add('hidden');
  });

  // Function to open the delete modal
  gaseosasList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      deleteModal.classList.remove('hidden');
    }
  });

  // Function to close the delete modal
  document.getElementById('cancelDelete').addEventListener('click', () => {
    deleteModal.classList.add('hidden');
  });

  // Function to confirm deletion
  document.getElementById('confirmDelete').addEventListener('click', () => {
    // Logic to delete the record
    deleteModal.classList.add('hidden');
  });

  // Function to apply filters
  document.getElementById('applyFilters').addEventListener('click', () => {
    // Logic to apply filters
  });

  // Function to remove filters
  document.getElementById('clearFilters').addEventListener('click', () => {
    // Logic to remove filters
  });
});
```

## 🎨 CSS Files

### styles.css

The `styles.css` file contains additional custom styles that complement Tailwind CSS styles.

#### Functionalities of the `styles.css` file

- **Custom Styles**: Defines additional styles not covered by Tailwind CSS.
- **Typography**: Configures the main font of the application.


```css
/* filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/public/styles.css */
/* Custom styles */
body {
  font-family: 'Inter', sans-serif;
}
/* ...existing code... */
```

## 📦 Dependencies

### Node.js Dependencies

To use the backend functionalities in this project, it's necessary to install the following dependencies:

- **express**: A web framework for Node.js.
- **neon**: A PostgreSQL client.
- **pg**: A PostgreSQL client for Node.js.
- **cors**: A middleware to enable CORS (Cross-Origin Resource Sharing).


Installing dependencies:

```shellscript
npm install express neon pg cors
```

### Server Configuration

The `server.js` file contains the server configuration using Express.

```javascript
// filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/server/server.js
const express = require('express');
const cors = require('cors');
const gaseosasRoutes = require('./routes/gaseosasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/gaseosas', gaseosasRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Controllers

The `gaseosasController.js` file contains the logic to handle CRUD operations (Create, Read, Update, Delete) for sodas.

```javascript
// filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/server/controllers/gaseosasController.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getGaseosas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gaseosas');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGaseosa = async (req, res) => {
  const { sabor, cantidad, tamaño, valor_total, estado, modo_pago, nombre_persona } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gaseosas (sabor, cantidad, tamaño, valor_total, estado, modo_pago, nombre_persona) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [sabor, cantidad, tamaño, valor_total, estado, modo_pago, nombre_persona]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ...other CRUD operations...

module.exports = {
  getGaseosas,
  createGaseosa,
  // ...other exports...
};
```

### Routes

The `gaseosasRoutes.js` file defines the routes for soda CRUD operations.

```javascript
// filepath: /c:/Users/cmonroyitos/Documents/Proyectos/Registro_Gaseosas2/server/routes/gaseosasRoutes.js
const express = require('express');
const { getGaseosas, createGaseosa } = require('../controllers/gaseosasController');

const router = express.Router();

router.get('/', getGaseosas);
router.post('/', createGaseosa);
// ...other routes...

module.exports = router;
```

## ☁️ Using Vercel and the Cloud

### Deployment on Vercel

This project is deployed on Vercel, a cloud deployment platform that facilitates the implementation of web applications. Vercel provides continuous integration and continuous deployment (CI/CD) that allows code changes to be automatically deployed.

### Vercel Configuration

To deploy this project on Vercel, follow these steps:

1. Create an account on [Vercel](https://vercel.com/).
2. Connect your GitHub, GitLab, or Bitbucket repository to Vercel.
3. Import the project and select the branch you want to deploy.
4. Configure the necessary environment variables, such as `DATABASE_URL`.
5. Click "Deploy" to deploy the project.


### Cloud Benefits

Using the cloud to deploy applications offers several benefits:

- **Scalability**: The ability to automatically scale according to demand.
- **Availability**: High availability and redundancy to ensure the application is always online.
- **Security**: Advanced security measures to protect data and the application.
- **Maintenance**: Reduction of time and effort required for server maintenance.


## 🏆 Project Merit

The merit of this project lies in the modernization of a microenterprise that managed its records on paper, bringing it to an efficient and accessible digital platform where it is much easier to keep a portfolio report and help the ecosystem. This transformation has allowed for better data management, greater accessibility, and a more intuitive user interface.

## 📸 Screenshots

Here are some screenshots of the application:

![image](https://github.com/user-attachments/assets/ae17e3f0-dddf-4683-bcd7-f75b7c384936)



![image](https://github.com/user-attachments/assets/d7cfe062-46ba-4379-87cf-4a43dd3dffe3)



![image](https://github.com/user-attachments/assets/07d4ee44-a5ff-4ee0-9971-e0a4f5528704)



![image](https://github.com/user-attachments/assets/74ec4455-c039-4ef0-a3a0-f6953de00f92)



![image](https://github.com/user-attachments/assets/eb4ad5ff-8f2d-4eb4-9db9-37aee02ae966)

## 📧 Contact

If you have any questions or need more information, you can contact me via my email: [[alemmanuel0412@gmail.com](mailto:alemmanuel0412@gmail.com)].
