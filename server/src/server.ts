import { app } from "./app";
import { getEnvInfo } from "./lib/getEnvInfo";

const port = getEnvInfo("PORT") || 3333;

app.listen(port, () => {
  console.log(`Server is running on port ${port} ✅`);
});
