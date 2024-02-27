import mongoose from "mongoose";

export const connectDB =  () => { 

    mongoose.connect("mongodb+srv://demo:demo@cluster0.qvgjpj2.mongodb.net/", {
        dbName: "demo",
    }).then((c) => console.log(`DB Connected to ${c.connection.host}`) )
    .catch((e) => console.log(e))
};


