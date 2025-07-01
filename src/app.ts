import express, { Express } from "express";


const __PORT = process.env.PORT || 3000;
const __PROTOCOL = process.env.PROTOCOL || "http";
const __HOST = process.env.HOST || "localhost";


// Bootstrapping App

export function bootstrapApp(start: boolean = true): { app: Express; urlEncodedParser: (req: any, res: any, next: any) => void} {
  const app = express();

  const urlEncodedParser = express.urlencoded({ extended: false });

  app.use("/", express.static("public"));
  app.use(express.json());


  const listen = () => {
    if (start) {
      app.listen(__PORT, () =>
        console.log(
          `Server is running on ${__PROTOCOL}://${__HOST}:${__PORT}`
        )
      );
    } else {
      console.log("Server is stopped.");
    }
  };

  listen()

  return { app, urlEncodedParser };
}

const { app } = bootstrapApp();


// Routes

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')    
})
