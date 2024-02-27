import mongoose from "mongoose";

const freightSchema = new mongoose.Schema({
  tempo: {
    capacity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  pickup: {
    capacity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  cantor: {
    capacity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  truck: {
    capacity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },

  categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    require:true

  }
});

export default freightSchema;
