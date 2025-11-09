🪜 Step 1: Go to your project folder

In your screenshot, you typed cd proejct (spelling mistake).

Correct it like this:

cd project

If you’re not sure what the folder name is, check by listing the contents:

dir

Look for the real folder name — maybe it’s project, my-project, or something else — and then use that exact name:

cd "exact-folder-name"

🧰 Step 2: Make sure Node.js and npm are installed

Check the versions:

node -v
npm -v


If both show version numbers (like v18.19.0 or similar), you’re good ✅
If not, go to https://nodejs.org
 and install the LTS version.

⚙️ Step 3: Install dependencies

Once you’re inside your project folder (where you can see a package.json file when you run dir), install all dependencies:

npm install


This command will download everything listed in your package.json and create a node_modules folder.

If you get any errors, try cleaning and reinstalling:

rm -r node_modules
rm package-lock.json
npm cache clean --force
npm install

🚀 Step 4: Start the development server

Now start your app:

npm run dev


If it says “Missing script: dev”, check what scripts are available:

type package.json | findstr "scripts"


Look for something like:

"scripts": {
  "dev": "vite",
  "start": "vite preview"
}


If dev isn’t there but start is, run:

npm start

🌐 Step 5: Open the app

Once the server starts, you’ll see something like this in the terminal:

VITE v5.0.0  ready in 500ms
➜  Local:   http://localhost:5173/


Open that link (http://localhost:5173/) in your web browser — your app will be live! 🎉
