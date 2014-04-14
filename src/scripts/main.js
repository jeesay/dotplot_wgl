/*
 *  dotplot_wgl: Dot-Plot implementation in JavaScript and WebGL..
 *  Copyright (C) 2014  Jean-Christophe Taveau.
 *
 *  This file is part of dotplot_wgl.
 *
 *  dotplot_wgl is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  dotplot_wgl is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with dotplot_wgl.  If not, see <http://www.gnu.org/licenses/>
 *
 * Authors:
 * Rania Assab
 * Aurélien Luciani
 * Quentin Riché-Piotaix
 * Mathieu Schaeffer
 */

"use strict";

if (localStorage.getItem("alreadyVisited")) {
    var request = window.indexedDB.open("dotplot", g.dbVersion);
    request.addEventListener("error", function(e) {
        console.log("Error opening the DB");
        console.log(e);
        alert("Error opening the DB");
    }, false);

    request.addEventListener("success", function(e) {
        console.log("Success opening the DB");
        g.db = e.target.result;
        g.loadScripts(["scripts/sequences.js", "scripts/matrices.js"]);
    });

    request.addEventListener("upgradeneeded", function(e) {
        console.log("Upgrading the DB...");
        g.db = e.target.result;
        if (!g.db.objectStoreNames.contains("sequencesMetadata")) {
            g.db.createObjectStore("sequencesMetadata", {keyPath: "key", autoIncrement: true});
        }
        if (!g.db.objectStoreNames.contains("sequences")) {
            g.db.createObjectStore("sequences", {keyPath: "key"});
        }
    });
} else {
    g.loadScripts(["scripts/firstLoad.js"]);
}
