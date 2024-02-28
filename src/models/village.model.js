import mongoose, {Schema, SchemaType} from "mongoose";
//import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const geoJsonSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        geometry: {
            type:{
                type:String,
                coordinates:{
                    type:Schema.Types.Array
                }
            }
        },
        properties:{
            DISTRICT:{
                type:Schema.Types.String,
            },
            SUB_DISTRICT:{
                type:Schema.Types.String,
            },
            District_ID:{
                type:Schema.Types.Number,
            },
            NAME:{
                type:Schema.Types.String,
            }
        }
    },
    {
        timestamps: true
    }
)


//geoJsonSchema.plugin(mongooseAggregatePaginate)

export const Maharashtra_village = mongoose.model("Maharashtra_village", geoJsonSchema)