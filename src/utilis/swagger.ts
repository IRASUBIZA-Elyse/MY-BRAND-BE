import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "console";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: version,
      description: "This is the API for the blog",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ["./src/routes/routes.ts", "./scr/models/*"],
};
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
  //swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Docs in JSON format
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Docs available at http//localhost:${port}/api-docs`);
}
export default swaggerDocs;
