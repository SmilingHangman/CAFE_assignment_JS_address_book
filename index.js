let inputName = (document.getElementById("fullName"));
let inputEmail = (document.getElementById("email"));
// let inputAddress = (document.getElementById("address"));
// let inputPhone = (document.getElementById("phoneNumber"));
// let inputDescription = (document.getElementById("description"));
let addressArr = JSON.parse(localStorage.getItem("addressArrStorage")) || [];


document.getElementById("form").addEventListener("submit", (event) => {
        let contact = {name: "", email: ""};
        event.preventDefault();
        
        contact.name = inputName.value;
        contact.email = inputEmail.value;
        addressArr.push(contact);
        localStorage.setItem("addressArrStorage", JSON.stringify(addressArr));

        render();

        inputName.value = null;
        inputEmail.value = null;
});

function render() {
        let contactBox = document.createElement("ul");
        addressArr.forEach((value, index) => {
                let list = document.createElement("li");
                list.className = value.isFavorite ? "favorite" : "";
                contactBox.appendChild(list);

                let nameBox = document.createElement("p");
                nameBox.textContent = value.name;
                list.appendChild(nameBox);

                let mailBox = document.createElement("a");
                mailBox.textContent = value.email;
                mailBox.href = "mailto:" + value.email;
                list.appendChild(mailBox);

                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.className = "editbutton"
                list.appendChild(editBtn);
                editBtn.addEventListener("click", (event) => {
                        
                });
                
                let favBox = document.createElement("input");
                favBox.setAttribute("type", "checkbox");
                favBox.checked = value.isFavorite;
                list.appendChild(favBox);
                favBox.addEventListener("change", function() {
                        if(favBox.checked) {
                                list.classList.add("favorite");
                        }
                        if(!favBox.checked) {
                                list.classList.remove("favorite");
                        }
                        addressArr[index].isFavorite = favBox.checked;
                        localStorage.setItem("addressArrStorage", JSON.stringify(addressArr));
                });

                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Remove this contact";
                deleteBtn.className = "deletebutton"
                list.appendChild(deleteBtn);
                deleteBtn.addEventListener("click", (event) => {
                        contactBox.removeChild(list);
                        addressArr.splice(index, 1);
                        localStorage.setItem("addressArrStorage", JSON.stringify(addressArr));
                });
        });
        
        document.getElementById("addressBookDisplay").innerHTML = null;
        document.getElementById("addressBookDisplay").appendChild(contactBox);
};

render();