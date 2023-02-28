const { Schema, model } = require('mongoose');
//const ReactionSchema = require('./Reaction');


const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: "Thought is Required",
        minlength: 1,
        maxlength: 280,
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (timestamp) => dateFormat(timestamp),
      },
  
      username: {
        type: String,
        required: true,
      },
  
      // array of nested documents created with the ReactionSchema
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });


  const ReactionSchema = new Schema(
    {
      reactionId: {
        // Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId(),
      },
  
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
  
      username: {
        type: String,
        required: true,
      },
  
      createdAt: {
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (timestamp) => dateFormat(timestamp),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  
  const Thought = model("Thought", ThoughtSchema);
  
  module.exports = Thought