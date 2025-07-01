import express, { Express } from "express";

import config from "./server.config.json";

export function bootstrapApp(start: boolean = true): {
  app: Express;
  config: typeof config;
  urlEncodedParser: (req: any, res: any, next: any) => void;
} {
  const app = express();

  const urlEncodedParser = express.urlencoded({ extended: false });

  app.use("/", express.static("public"));
  app.use(express.json());


  const listen = () => {
    if (start) {
      app.listen(config.server.port, () =>
        console.log(
          `Server is running on ${config.server.protocol}://${config.server.host}:${config.server.port}`
        )
      );
    } else {
      console.log("Server is stopped.");
    }
  };

  listen()

  return { app, config, urlEncodedParser };
}

const { app } = bootstrapApp();


app.get('/', (req, res) => {
    res.status(200).send('Hello World!')    
})
