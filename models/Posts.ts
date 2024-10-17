import { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String,required: true},
  author: {type: String, required: true}
}, {
  toJSON: {
    transform : (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Post = models.Post || model("Post", PostSchema);

export default Post;