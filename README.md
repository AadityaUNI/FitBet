# How to run FitBet:

### 1. Clone the repository:
```
git clone https://github.com/AadityaUNI/FitBet.git
```

### 2. Install dependencies:

Go to the `backend` folder, and run `install`.

```
cd ./backend
npm i
```

Go to the `frontend` folder, and run `install`.

```
cd ./frontend
npm i
```

### 3. Prepare MongoDB:

Prepare your MongoDB database (using [Atlas](https://www.mongodb.com/cloud/atlas),
Then configure your database within `backend/src/constants/index.js` (or `backend/src/.env`), by configuring the `MONGO_URI` variable.

### 4. Start applications:

Go to the `frontend` folder, and run `dev`.

```
cd ./frontend
npm run dev
```

Go to the `backend` folder, and run `dev`.

```
cd ./backend
npm run dev
```

Run the frontend host on any web browser

### HAPPY FITBETTING!!!
