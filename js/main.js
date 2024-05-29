let productName = document.getElementById("productName");
let productCategory = document.getElementById("productCategory");
let productPrice = document.getElementById("productPrice");
let productDesc = document.getElementById("productDescription");

let productList = [];
if (localStorage.getItem("products")) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}
function mainFunc() {
  inputValue();
  displayProducts();
  clearInput();

  // updateProduct();
}

function inputValue() {
  let productInfo = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    desc: productDesc.value,
  };
  if (check(productName.value)) {
    productList.push(productInfo);
    document.getElementById("alert").style.display = "none";
    localStorage.setItem("products", JSON.stringify(productList));
  } else {
    document.getElementById("alert").style.display = "block";
  }
}

function displayProducts() {
  let tBody = "";
  for (let i = 0; i < productList.length; i++) {
    tBody += `
    <tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].desc}</td>
      <td><button class="btn btn-danger text-capitalize" onclick="deleteProduct(${i})">delete</button></td>
      <td><button class="btn btn-info text-capitalize" onclick="updateProduct(${i})" >update</button></td>
    </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = tBody;
}

function clearInput() {
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productDesc.value = "";
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts();
}

function searchInput(value) {
  let tBody = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
      tBody += `
    <tr>
      <td>${i + 1}</td>
      <td>${productList[i].name.replace(
        value,
        `<span class="bg-warning">${value}</span>`
      )}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].desc}</td>
      <td><button class="btn btn-danger text-capitalize" onclick="deleteProduct(${i})">delete</button></td>
      <td><button class="btn btn-info text-capitalize" onclick="updateProduct(${i})" >update</button></td>
    </tr>
    `;
    }
  }
  document.getElementById("tBody").innerHTML = tBody;
}
let productIndex = 0;
function updateProduct(index) {
  productIndex = index;
  productName.value = productList[index].name;
  productCategory.value = productList[index].category;
  productPrice.value = productList[index].price;
  productDesc.value = productList[index].desc;
  window.scroll(0, 0);
  document.getElementById("updataBtn").style.display = "block";
  document.getElementById("addBtn").style.display = "none";
}

function updateProductValue() {
  document.getElementById("updataBtn").style.display = "none";
  document.getElementById("addBtn").style.display = "block";
  productList[productIndex].name = productName.value;
  productList[productIndex].category = productCategory.value;
  productList[productIndex].price = productPrice.value;
  productList[productIndex].desc = productDesc.value;
  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts();
}

function check(word) {
  let regex = /^[A-Z][a-z0-9]{2,8}/;
  return regex.test(word);
}
