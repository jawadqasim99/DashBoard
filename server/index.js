import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


/* CONFIGRATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());  

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/general" , generalRoutes);
app.use("/management" , managementRoutes);
app.use("/sales" , salesRoutes);

/* MONGOOSE CONNECT */
const PORT=process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL,
     { useNewUrlParser: true, useUnifiedTopology: false }
     ).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Port : ${PORT}`);
    })
})
.catch((e)=>{
    console.log(`${e} did not find`);
})
// console.log(process.env.MONGO_URL);


