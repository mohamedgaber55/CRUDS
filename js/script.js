// get total 
// create product 
// save data in localStorage
// read
// count function
// delete 
// update
// search 
// clean


// get all inputs 
let title = document.querySelector('.title');
let price = document.querySelector('.price');
let taxes = document.querySelector('.taxes');
let ads = document.querySelector('.ads');
let discount = document.querySelector('.discount');
let count = document.querySelector('.count');
let category = document.querySelector('.category');
let search = document.querySelector('.search');
let total = document.querySelector('.total');
let tBody = document.querySelector('.tBody');

// get all buttons
let create = document.querySelector('.create');
let search_title = document.querySelector('.search-title');
let search_category = document.querySelector('.search-category');


// two variables for updateProduct function
let mood = 'create';
let temp;


// get total function
function getTotal(){
    if(price.value !== ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#58cb5bff'
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = '#ff4d20'
    }
}

price.addEventListener('keyup', getTotal)
taxes.addEventListener('keyup', getTotal)
ads.addEventListener('keyup', getTotal)
discount.addEventListener('keyup', getTotal)


// **************************//

// localStorage.clear()
// create product & save data in localStorage
let localProducts = localStorage.getItem('product');
let productsData;

if(localProducts !== null){
    productsData = JSON.parse(localProducts);
}
else{
    productsData = [];
}

create.onclick = function (){
    if((title.value && price.value && taxes.value && ads.value && discount.value && category.value) == ''){
        Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "Inputs Data Can't Be Empty!",
        });
    }else if(count.value > 51){
        Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "Products Count Can't Be More than 50 Product!",
        });
    }
    else{
        let dataObject = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            category: category.value,
            count: count.value,
            total: total.innerHTML,
        }

        if(mood === 'create'){
            if(dataObject.count > 1){
                for(let i = 0; i < dataObject.count; i++){
                    productsData.push(dataObject);
                }
            }else
            {
                productsData.push(dataObject);
            }
        }
        else{
            productsData[temp] = dataObject
            mood = 'create';
            create.innerHTML = 'Create';
            create.style.backgroundColor = '#4baeff';
            count.style.display = 'block';
        }


        // save data in localStorage
        localStorage.setItem('product', JSON.stringify(productsData));

        // clear data
        clearData();

        // show data
        showData();
    }
    
}

// ***************** //
// clear inputs data 
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = '#ff4d20'
}



// ********************* //
// read function
function showData(){

    // crete table to set data inner it
    let table = '';

    for(let i = 0; i < productsData.length; i++){
        table += 
        `                       
            <tr>
                <td>${i+1}</td>
                <td>${productsData[i].title}</td>
                <td>${productsData[i].price}</td>
                <td>${productsData[i].taxes}</td>
                <td>${productsData[i].ads}</td>
                <td>${productsData[i].discount}</td>
                <td>${productsData[i].total}</td>
                <td>${productsData[i].category}</td>
                <td class="actions">
                    <button class="btn update" onclick = 'updateProduct(${i})'>Update</button>
                    <button class="btn delete" onclick = 'deleteProduct(${i})'>Delete</button>
                </td>
            </tr>
        `
    }

    // set data after get it inner table body 
    document.querySelector('.tBody').innerHTML = table;

    let deleteAll = document.querySelector('.deleteAll');

    // create product and its count 
    if(productsData.length > 0){
        deleteAll.innerHTML =
        `<button class="delete-all" onclick = 'deleteAllProducts()'>Delete All Products (${productsData.length})</button>`;
    }
    else{
        deleteAll.innerHTML = '';
    }

}

// to show data in dom always
showData();


// *************** //
// delete function 
function deleteProduct(i){
    productsData.splice(i,1);
    localStorage.product = JSON.stringify(productsData);
    showData()
}

function deleteAllProducts(){
    productsData.length = 0;
    localStorage.clear();
    showData();
}

// *************** //
// update function 
function updateProduct(i){
    title.value = productsData[i].title;
    price.value = productsData[i].price;
    taxes.value = productsData[i].taxes;
    ads.value = productsData[i].ads;
    getTotal()
    discount.value = productsData[i].discount;
    category.value = productsData[i].category;
    count.style.display = 'none';

    // create style 
    create.innerHTML = 'Update';
    create.style.backgroundColor = '#58cb5bff';

    // update and temp variabel for change mood and upgrade the scope of [i] to be avilable out this function 
    mood = 'update';
    temp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// *************** //
// search function 
let searchMood = 'title';
function getSearchMood(){

    if(this.className == 'search-title'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.focus();
    search.value = '';
    showData();
}

search_title.addEventListener('click', getSearchMood);
search_category.addEventListener('click', getSearchMood);


function searchData(){
    let table = '';
    if(searchMood == 'title')
    {
        for(let i = 0; i < productsData.length; i++){
            if(productsData[i].title.includes(this.value.toLowerCase())){
                
            table += 
            `                       
                <tr>
                    <td>${i+1}</td>
                    <td>${productsData[i].title}</td>
                    <td>${productsData[i].price}</td>
                    <td>${productsData[i].taxes}</td>
                    <td>${productsData[i].ads}</td>
                    <td>${productsData[i].discount}</td>
                    <td>${productsData[i].total}</td>
                    <td>${productsData[i].category}</td>
                    <td class="actions">
                        <button class="btn update" onclick = 'updateProduct(${i})'>Update</button>
                        <button class="btn delete" onclick = 'deleteProduct(${i})'>Delete</button>
                    </td>
            `

            }
        }
    }
    else{
        for(let i = 0; i < productsData.length; i++){
            if(productsData[i].category.includes(this.value.toLowerCase())){
                
            table += 
            `                       
                <tr>
                    <td>${i+1}</td>
                    <td>${productsData[i].title}</td>
                    <td>${productsData[i].price}</td>
                    <td>${productsData[i].taxes}</td>
                    <td>${productsData[i].ads}</td>
                    <td>${productsData[i].discount}</td>
                    <td>${productsData[i].total}</td>
                    <td>${productsData[i].category}</td>
                    <td class="actions">
                        <button class="btn update" onclick = 'updateProduct(${i})'>Update</button>
                        <button class="btn delete" onclick = 'deleteProduct(${i})'>Delete</button>
                    </td>
            `

            }
        }
    }

    // set all search results in tBody
    document.querySelector('.tBody').innerHTML = table;
}

search.addEventListener('keyup', searchData);