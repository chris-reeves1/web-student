"use strict";

const $ = (selector, root = document) => root.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    initDemo1_changeText();});   

// demo 1: change text content of an element
function initDemo1_changeText() {
    const output= $("#d1-output");
    const button = $("#d1-btn");

    button.addEventListener("click", (event) => {
        output.textContent = "button was clicked, dom updated";
        console.log("button was clicked, dom updated", event.type);});}