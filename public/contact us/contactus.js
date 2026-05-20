console.log("script connected");
const form = document.getElementById("contactForm");

form.addEventListener("submit", async(formSubmission) => {
    formSubmission.preventDefault();
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#:~:text=querySelector()%20returns%20the%20first%20Element
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value#:~:text=represents%20the%20current%20value%20of%20the%20%3Cinput%3E%20element%20as%20a%20string.
    const formData = {
        name: document.querySelector("#name").value.trim(),
        email: document.querySelector("#email").value.trim(),
        category: document.querySelector("#category").value.trim(),
        message: document.querySelector("#message").value.trim()
    }


    if (formData.name.length < 2) {
        alert("Please enter a valid name, The name you enter must be 2 characters or more.");
        return;
    } else if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
        // /pattern/ --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#:~:text=which%20consists%20of%20a%20pattern%20enclosed%20between%20slashes
        // ^ beginning of input --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions#:~:text=Input%20boundary%20beginning%20assertion%3A
        // \s match single whitsapce char --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#:~:text=White%20space%20character%20class%20escape
        // [^ ] negates char class --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#:~:text=Negated%20character%20class%3A%20Matches%20anything%20that%20is%20not%20enclosed%20in
        // [^\s@]+ means every repeating character that is not a whitepsace or an @ symbol --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#:~:text=Character%20class%3A%20Matches%20any%20one%20of%20the%20enclosed%20characters 
        //                                                          --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers#:~:text=Meaning-,x*,-Matches%20the%20preceding
        // /^[every repearing non whitepace of @ symbol char] followed by @ [same as before] followed by . [same as before]
        alert("Please Enter a valid email address.");
        return;
    }

    // manual post fetch. form submit causes issues with response to send user back to contact us pg
    const response = await fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success === true) {
        alert(result.message);
        window.location.href = "/contact%20us/contactus.html"; // https://www.w3schools.com/js/js_window_location.asp#:~:text=JavaScript%20Window%20Location
    } else {
        alert("Message was not sent. Please try again.");
    }
});


