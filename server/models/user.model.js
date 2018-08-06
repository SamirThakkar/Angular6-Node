module.exports = (mongoose) => {
	/**
	 * User Schema
	 */
	let UserSchema = new mongoose.Schema({
		name: { type: String },
		username: { type: String,  required: [true,'User Name is required'],  index: {unique: [true,'User Name already registered']} },
		email: { type: String,  required: [true,'Email is required'] },
		password: { type: String,  required: [true,'Password is required'] },
		key: { type: String,  required: [false,'key is required'],  index: {unique: [true,'key already exist']} },
        ResetToken: { type: String},
        TokenExpire: { type: String},
		isActive: { type:Boolean, default:true },
		isAdmin: { type:Boolean, default:true },
        isRootUser: { type:Boolean, default:false }
	}, {timestamps: true});
	
	return mongoose.model('User', UserSchema);
};