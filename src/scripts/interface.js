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

window.addEventListener("DOMContentLoaded", function() {
    var canvas = g.$("canvas");

    //declaring listeners
    canvas.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("pixel clicked at x: " + e.layerX + ", y: " + e.layerY);
    }, false);

    g.$("download").addEventListener("click", function(e) {
        e.preventDefault();
        var ghostAnchor = g.$("ghost-anchor");
        ghostAnchor.download = "image.png";
        try {
            canvas.toBlob(function(blob) {
                ghostAnchor.href = window.URL.createObjectURL(blob);
                ghostAnchor.click();
            });
        } catch(error) {
            console.log("canvas.toBlob not supported");
            ghostAnchor.href = canvas.toDataURL();
            ghostAnchor.click();
        }
    }, false);

    g.$("clean-up").addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("alreadyVisited");
        location.reload();
    }, false);

    //nav buttons
    var nav = function(e) {
        e.preventDefault();
        g.$(e.target.dataset.target).classList.toggle("active-section");
    };
    Array.prototype.forEach.call((document.getElementsByClassName("internal-nav")), function(anchor) {
        anchor.addEventListener("click", nav, false);
    });

    g.$("sequence-list").addEventListener("click", function(e) {
        if (e.target.tagName === "DIV") {
            g.seqMan.remove(parseInt(e.target.dataset.key));
        }
    }, false);

    try {
        g.seqMan.updateDOM();
    } catch(err) {}
}, false);
