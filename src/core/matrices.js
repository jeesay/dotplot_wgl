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

g.matMgr.list = [];
g.matMgr.currentType = null;

g.matMgr.updateDOM = function() {
    var type;
    try {
        type = (
            g.DOM.opt1.options[g.DOM.opt1.selectedIndex].dataset.type === "nucleic" &&
            g.DOM.opt2.options[g.DOM.opt2.selectedIndex].dataset.type === "nucleic"
        ) ? "nucleic" : "proteic";
    } catch (err) {
        return;
    }
    if (g.matMgr.currentType !== type) {
        g.matMgr.list.forEach(function(mat) {
            if (mat.dataset.type === type) {
                g.DOM.mat.appendChild(mat);
            } else {
                try {
                    g.DOM.mat.removeChild(mat);
                } catch (err) {}
            }
        });
        g.matMgr.currentType = type;
    }
};

(function() {
    var init = function(mat, i) {
        var dom = document.createElement("option");
        dom.textContent = mat;
        dom.dataset.type = this.type;
        dom.dataset.offset = i * this.size;
        g.matMgr.list.push(dom);
    };
    ["Blosum 30", "Blosum 35", "Blosum 40", "Blosum 45", "Blosum 50", "Blosum 55", "Blosum 60", "Blosum 62-12", "Blosum 62", "Blosum 65", "Blosum 70", "Blosum 75", "Blosum 80", "Blosum 85", "Blosum 90", "Blosum N", "Identity", "PAM 10", "PAM 20", "PAM 30", "PAM 40", "PAM 50", "PAM 60", "PAM 70", "PAM 80", "PAM 90", "PAM 100", "PAM 110", "PAM 120", "PAM 130", "PAM 140", "PAM 150", "PAM 160", "PAM 170", "PAM 180", "PAM 190", "PAM 200", "PAM 210", "PAM 220", "PAM 230", "PAM 240", "PAM 250", "PAM 260", "PAM 270", "PAM 280", "PAM 290", "PAM 300", "PAM 310", "PAM 320", "PAM 330", "PAM 340", "PAM 350", "PAM 360", "PAM 370", "PAM 380", "PAM 390", "PAM 400", "PAM 410", "PAM 420", "PAM 430", "PAM 440", "PAM 450", "PAM 460", "PAM 470", "PAM 480", "PAM 490", "PAM 500"].forEach(init, {type: "proteic", size: 24});
    ["DNA Full", "Identity"].forEach(init, {type: "nucleic", size: 16});
    if (g.DOMLoaded) {
        g.matMgr.updateDOM();
        g.DOM.opt1.addEventListener("change", g.matMgr.updateDOM, false);
        g.DOM.opt2.addEventListener("change", g.matMgr.updateDOM, false);
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            g.matMgr.updateDOM();
            g.DOM.opt1.addEventListener("change", g.matMgr.updateDOM, false);
            g.DOM.opt2.addEventListener("change", g.matMgr.updateDOM, false);
        }, false);
    }
})();