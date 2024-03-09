import mongoose, {Schema, SchemaType} from "mongoose";

const geoJsonSchema = new Schema({
    geometry: {
        type:{
            type:String,
            coordinates:{
                type:Schema.Types.Array
            }
        }
    },
    properties: {
        District:{
            type:Schema.Types.String
        },
        STATE:{
            type:Schema.Types.String
        },
        TEHSIL:{
            type:Schema.Types.String
        },
        Shape_Leng:{
            type:Schema.Types.Number
        },
        Shape_Area:{
            type:Schema.Types.Number
        },
        District_ID:{
            type:Schema.Types.Number
        },
        Tehsil_NO:{
            type:Schema.Types.Number
        }
    }
})

export const Maharashtra_taluka = mongoose.model("Maharashtra_taluka", geoJsonSchema)