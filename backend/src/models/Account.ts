import { type Document, model, Schema } from 'mongoose'
import { type Account } from '../@types'

interface I extends Document, Account {
	googleAccessToken?: string | null;
	googleRefreshToken?: string | null;
  	googleTokenExpiry?: Date | null;
    followersCount?: number | 0;
    followingCount?: number | 0;
}


const instance = new Schema<I>(
  {
    /*
      document ID is set by default via MongoDB - the next line is deprecated!
      _id: mongoose.Schema.Types.ObjectId,
    */

    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
		},
	
	googleAccessToken: {
		type: String,
		required: false,
		default: null
		},
	
	googleRefreshToken: {
		type: String,
		required: false,
		default: null
		},
	googleTokenExpiry: {
		type: Date,
		required: false,
		default: null
		},
	
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = 'Account'

export default model<I>(modelName, instance)
