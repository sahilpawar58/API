import mongoose, {Schema, SchemaType} from "mongoose";

const dustbinSchema = new Schema({
    location: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    imageUrl: {
      type: String,
      required: true
    },
    LastServiced: {
      type: String,
      required: true,
    },
    
  });

  
export const Dustbin = mongoose.model("Dustbin", dustbinSchema)