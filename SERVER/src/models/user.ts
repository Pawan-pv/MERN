export type UserType ={
    _id: String;
    emai: String;
    password: String;
    firstName: String;
    lastName: String;

};

const userSchema = new mongoose.schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, },
    firstName: {type: String, required: true, },
    lastName: {type: String, required: true, },
    

})

const User = mongoose.model<UserType>("User", userSchema);

export default User