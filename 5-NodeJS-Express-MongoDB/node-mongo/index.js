const MongoClient = require("mongodb").MongoClient;
const dbops = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected correctly to server");

    const db = client.db(dbname);

    db.dropCollection("campsites")
      .then((result) => {
        console.log("Dropped Collection:", result);
      })
      .catch((err) => console.log("No collection to drop."));

    dbops
      .insertDocument(
        db,
        { name: "Breadcrumb Trail Campground", description: "Test" },
        "campsites"
      )

      .then((result) => {
        console.log("Insert Document:", result.ops);

        return dbops.findDocuments(db, "campsites");
      })

      .then((docs) => {
        console.log("Found Documents:", docs);

        return dbops.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "Updated Test Description" },
          "campsites"
        );
      })

      .then((result) => {
        console.log("Updated Document Count:", result.result.nModified);

        return dbops.findDocuments(db, "campsites");
      })

      .then((docs) => {
        console.log("Found Documents:", docs);

        return dbops.removeDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          "campsites"
        );
      })

      .then((result) => {
        console.log("Deleted Document Count:", result.deletedCount);

        return client.close();
      })

      .catch((err) => {
        console.log(err);
        client.close();
      });
  })

  .catch((err) => console.log(err));
