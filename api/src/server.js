// HTTP lifecycle only: the entry point supplies the database preparation policy.
function createServerLifecycle({ app, port, prepareDatabase, connection }) {
  let server;

  async function startServer() {
    await prepareDatabase();

    return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        resolve(server);
      });
      server.once('error', reject);
    });
  }

  async function stopServer(signal) {
    if (signal) console.log(`Received ${signal}. Closing server.`);

    try {
      if (server) {
        await new Promise((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        });
      }
    } finally {
      await connection.close();
    }
  }

  return { startServer, stopServer };
}

module.exports = { createServerLifecycle };
