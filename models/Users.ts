import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {type: String, required: true},
  profilePhoto: {
    type: String,
    default: ""
  }
}, {
  toJSON: {
    transform : (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Pre-save hook to set profilePhoto based on the _id
UserSchema.pre('save', function(next) {
  if (!this.profilePhoto) {
    this.profilePhoto = `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
  }
  next();
});

const User = models.User || model("User", UserSchema);

export default User;