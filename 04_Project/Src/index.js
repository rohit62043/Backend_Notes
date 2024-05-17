// require('dotenv').config({ path: './env' })
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port : ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("Mongo DB conection failed!!!", err)
});


// console.log(process.env.MONGODB_URI)
// const app = express();

// (
//     async () => {
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//             app.on("error", (error) => {
//                 console.log("ERROR in express after DB connection : ", error);
//                 throw error;
//             })

//             app.listen(process.env.PORT, () => {
//                 console.log(`App is listening on port ${process.env.PORT}`);
//             })
//         } catch (error) {
//             console.error('Error connecting to MongoDB:', error);
//             throw error;
//         }
//     }
// )()