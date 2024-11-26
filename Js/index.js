
var nameInput = document.getElementById('productName');
var urlInput = document.getElementById('productUrl');
var bodyData =document.getElementById('bodyData'); 
var alert = document.querySelector('.alert')
var form = document.querySelector('form')

var productList;



if (localStorage.getItem('products') != null){

productList =JSON.parse(localStorage.getItem('products'))

displayProduct(productList)

}else {
    productList =[]
}



form.addEventListener('submit', function(e){
    e.preventDefault()
})


function addProduct(){

    var testURL = "" ;
    if (validateForm(nameInput)
        && validateForm(urlInput)){
            if (urlInput.value.includes("https")) {
                testURL = urlInput.value;
            } else {
                testURL = 'https:\\' + urlInput.value;
            }

            var product = {
                name : nameInput.value,
                url : testURL,
            
            }
            
            productList.push(product)
            localStorage.setItem('products',JSON.stringify(productList));
            displayProduct(productList)
            clearProduct()
            nameInput.classList.remove('is-valid');
            urlInput.classList.remove('is-valid');
            alert.classList.add('d-none')
    }
    
    else {
    alert.classList.remove('d-none')
    }



}

function clearProduct(){

    nameInput.value = null;
    urlInput.value = null;

}

function displayProduct(arr){
    
    var cartoona =``;
    for (var i = 0 ; i < productList.length ; i++){
        cartoona += 
        `
                    <div class="row">
            <tr>
                <td> ${i+1} </td>
                <td> ${arr[i].name} </td>
                <td><button class=" px-2 btn btn-secondary btn1">
                <i class="fa-solid fa-eye pe-2"></i> 
                <a href="${arr[i].url}" target="_blank" class="text-decoration-none">Visit</a></button></td>
                <td><button onclick="deleteProduct(${i})" class=" px-4 btn btn-danger btn2"><i class="fa-solid fa-trash-can "></i> Delet</button></td>
            </tr>
            </div>
        `
    }
    bodyData.innerHTML = cartoona;
}

function deleteProduct(deleteIndex){
    
    productList.splice(deleteIndex, 1)

    localStorage.setItem('products',JSON.stringify(productList));
    displayProduct(productList)
}

function validateForm(element){

    var regex = {

        productName : /[a-zA-z0-9]{3,}/,
        productUrl : /^(https?:\/\/)?(w{3}\.)?(\w+\.)+\w{2,}\/?(:\d{2,5})?(\/\w+-?\w+)?(\.\w{3,})?\??$/gm,
    }

    if (regex[element.id].test(element.value))
        {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
    
}
