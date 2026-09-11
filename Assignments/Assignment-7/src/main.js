import app from "./app.js";

import env from "./config/env.js";

import { connectDB } from "./common/db/connection.js";

await connectDB();

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});