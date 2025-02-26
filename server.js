const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Serveur en cours sur http://localhost:${PORT}`);
});
