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
            ID_0:{
                type:Schema.Types.Number,
            },
            ID_1:{
                type:Schema.Types.Number,
            },
            NAME_1:{
                type:Schema.Types.String,
            },
            VARNAME_1:{
                type:Schema.Types.String,
            },
            TYPE_1:{
                type:Schema.Types.String,
            }
        }
    },
    {
        timestamps: true
    }
)


//geoJsonSchema.plugin(mongooseAggregatePaginate)

export const Country = mongoose.model("Country", geoJsonSchema)