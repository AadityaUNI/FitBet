import dotenv from 'dotenv'
dotenv.config()
const ORIGIN = '*'
const PORT = process.env.PORT || 8080


// For "MongoDB Atlas": edit MONGO_URI in -> .env file
// For "MongoDB Community Server": edit <DB_NAME> in -> MONGO_URI below
<<<<<<< HEAD
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/<DB_NAME>'

console.log("testing env var in constants/index.ts:")
console.log(MONGO_URI)

=======
const MONGO_URI = 
"mongodb+srv://mehdimirzaie18_db_user:zgCj0haQMwONdPxG@fitbetcluster.evghipf.mongodb.net/?retryWrites=true&w=majority&appName=FITBETCLUSTER"
>>>>>>> acfa234 (merging with mehdi)
const MONGO_OPTIONS = {}

const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS, JWT_SECRET }
