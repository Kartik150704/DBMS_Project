import { useState } from "react";
function generateID(prefix) {

    if (prefix.length < 2) {
        console.error('Prefix should have at least 2 characters.');
        return null;
    }


    const timestamp = Date.now().toString();

    let length = 10;
    const randomChars = Array.from({ length: length - prefix.length - timestamp.length }, () =>
        String.fromCharCode(Math.floor(Math.random() * 26) + 97) // Random lowercase letters
    ).join('');


    const id = prefix.substring(0, 2) + timestamp + randomChars;
    
    return id;
}





export { generateID };