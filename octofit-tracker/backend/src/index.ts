import { connectDatabase } from "./config/database.js";
import { app, PORT, API_BASE_URL } from "./server.js";

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Backend server running at ${API_BASE_URL}`);
      console.log(`API root available at ${API_BASE_URL}/api`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

startServer();
