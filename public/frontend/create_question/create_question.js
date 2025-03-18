document
    .querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"]'
    )
    .forEach((elem) => {
        elem.addEventListener("input", (e) => {
            const label = elem.closest(".question").querySelector("label");

            if (e.target.value === "") {
                label.classList.remove("stay-up");
            } else {
                label.classList.add("stay-up");
            }
        });
    });