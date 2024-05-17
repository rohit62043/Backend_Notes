// require('dotenv').config({ path: './env' })
import connectDB from "./db/index.js";

connectDB();


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