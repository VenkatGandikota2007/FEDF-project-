## 🪜 Step 1: Go to your project folder

In your terminal, navigate to the project directory:

```bash
cd project

## If you're not sure about the folder name, list all files first:

bash
dir

## Then, find the correct folder name (e.g., project, my-project) and run:

bash
cd "exact-folder-name"

## 🧰 Step 2: Make sure Node.js and npm are installed
   Check if Node.js and npm are available:

bash
node -v
npm -v

## If both commands show version numbers (e.g., v18.19.0), you’re ready ✅
## If not, download and install the LTS version from https://nodejs.org.

## ⚙️ Step 3: Install dependencies
   Once you’re inside your project folder (where package.json exists), install all dependencies:

bash
npm install

## This will create a node_modules folder and install everything needed.

## If you face any issues, try cleaning and reinstalling:

bash
rm -r node_modules
rm package-lock.json
npm cache clean --force
npm install

## 🚀 Step 4: Start the development server
   Run the development server using:

bash
npm run dev

 ## If you see an error like Missing script: "dev", check available scripts:

bash
type package.json | findstr "scripts"

## Look for something like:

json
"scripts": {
  "dev": "vite",
  "start": "vite preview"
}

## If there's no dev script but there is a start script, use:

bash
npm start

## 🌐 Step 5: Open the app
   Once the server starts successfully, the terminal will show something like:

arduino
VITE v5.0.0  ready in 500ms
➜  Local:   http://localhost:5173/

## Now open the given link (for example, http://localhost:5173/) in your web browser to view your app 🎉

