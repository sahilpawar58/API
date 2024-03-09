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
            District:{
                type:Schema.Types.String,
            },
            State_LGD:{
                type:Schema.Types.String,
            },
            DISTRICT_L:{
                type:Schema.Types.String,
            }
        }
    },
    {
        timestamps: true
    }
)


//geoJsonSchema.plugin(mongooseAggregatePaginate)

export const Maharashtra_district = mongoose.model("Maharashtra_district", geoJsonSchema)