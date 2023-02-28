const { Thought } = require ('../models');

module.exports = {
    // get all thoughts of a user
    getAllThought(req, res) {
        Thought.find().then((thought) =>
        res.json(thought)).catch((error) =>
        res.status(500).json(err));
    },


// create a thought to a user
createThought({body}, res) {
    Thought.create(body)
    .then((data) =>{
         User.findOneAndUpdate(
            {_id:body.userID},
            {$push:{ thoughts:data._id}},
            {new:true}

        )
    })
    .then(userData => res.json(userData)).catch((err) => res.status(500).json(err));
},

//update a user
updateThought(req, req){
     Thought.findOneAndUpdate({
        _id: req.params.id
    },
    {$set:req.body},
    {runValidators: true, new:true}
   )
     .then((thought) => {
         !thought ? res.status(404).json({ message: 'No thought by ID'}) : res.json(thought);
    }) .catch((error) => res.status(500).json);
 },


 getThoughtById({ params}, res) {
     Thought.findOne({_id: params.id})
     .then((dbThoughtData)=> {
        if(!dbThoughtData) {
             res.status(404).json({message: "No data found with this ID"});
             return;
         }
         res.json(dbThoughtData);
     })
     .catch((err)=> {
        console.error(err);
        res.status(400).json(err);
    });
},
// delete a thought by id
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
    .catch((err) => res.json(err));
  },

  // add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
    .catch((err) => res.json(err));
  },
  // remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
   .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
   .catch((err) => res.json(err));
  },
};



