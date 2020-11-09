const mongoose =require('mongoose')
const crypto =require('crypto')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true,
        index:true,
        lowercase:true
    },
        name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
    },
            email:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true,
        lowercase:true,
    },
            profile:{
        type:String,
        required:true,
    },
            hashed_password:{
        type:String,
        required:true,
    },
         salt:String,
             about:{
        type:String
    },
            role:{
        type:Number,
        default:0
    },
              photo:{
        data:Buffer,
        contentType :String
    },
                resetPasswordLink:{
        data:String,
        default:''
    }
},{timestamps:true});
//Arrow function does not have own scope for this
userSchema.virtual('password')
.set(function(password){
    //Creating A temporary variable called _password
    this._password =password;
    //generating Salt
    this.salt =this.makeSalt()
    //encryptPassword
    this.hashed_password=this.encryptPassword(password);
})
//It will Get the Temporary Variable
.get(function(){
    return this._password;
});

userSchema.methods={
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword:function(password){
        if(!password) return ''
        try {
            return crypto.createHmac('sha1',this.salt)
            .update(password).digest('hex');
        } catch (error) {
            return '';
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf()*Math.random()) + '';
    }
}

module.exports =mongoose.model('User',userSchema);