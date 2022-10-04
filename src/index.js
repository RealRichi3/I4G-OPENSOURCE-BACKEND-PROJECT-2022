import app from "./app.js";

import { PORT, dbUri } from "./utils/config.js";
import { connectDB } from "./db/connect_db.js";

async function start() {
    try {
        // Connect to Database
        await connectDB(dbUri);

        app.listen(PORT, function () {
            console.log(`Server is running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error);
    }
}

start()

