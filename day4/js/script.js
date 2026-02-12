"use strict";

const $ = (selector, root = document) => root.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    initDemo1_changeText();
    initDemo2_addNumbers();
    initDemo3_liveTyping(); 
    initDemo4_EventDelegation();
    initDemo5_CreateElements();
});   

// demo 1: change text content of an element
function initDemo1_changeText() {
    const output= $("#d1-output");
    const button = $("#d1-btn");

    button.addEventListener("click", (event) => {
        output.textContent = "button was clicked, dom updated";
        console.log("button was clicked, dom updated", event.type);});}

// demo2: grab 2 inputs and validate and return addition

function initDemo2_addNumbers() {
    const aInput = $("#d2-a");
    const bInput = $("#d2-b");
    const button = $("#d2-add");
    const result = $("#d2-result");
  
    button.addEventListener("click", () => {
      const a = Number(aInput.value);
      const b = Number(bInput.value);
  
      if (Number.isNaN(a) || Number.isNaN(b)) {
        result.textContent = "Please enter valid numbers in both fields.";
        return;
      }
  
      result.textContent = `Result: ${a + b}`;
    });
  }

// demo 3 live typing
function initDemo3_liveTyping() {
    const input = $("#d3-text"); 
    const live = $("#d3-live"); 
    
    input.addEventListener("input", () => { 
        live.textContent = input.value.trim() === "" ? "(empty)" : input.value;
    });
}

// demo 4

function initDemo4_EventDelegation(){
    const pad = $("#d4-pad");
    const out = $("#d4-out");

    pad.addEventListener("click", (event) => { 
        // event.target is the actual element. 
        // const button = event.target.closest("button[data-op]");
        const button = event.target.closest("button[data-op]"); // looks up the tree for a button with data-op attribute.
        if (!button) return; // click wasnt on a matching button.
        out.textContent = `You clicked ${button.dataset.op}`; 
        console.log(`${button.dataset.op}`); });

}

/**
 * Demo 5: Create and append elements to a list.
 */
function initDemo5_CreateElements() {
    const input = $("#d5-item");
    const button = $("#d5-add");
    const list = $("#d5-list");
  
    button.addEventListener("click", () => {
      const text = input.value.trim();
      if (text === "") return;
  
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
  
      input.value = "";
      input.focus();
    });
  }