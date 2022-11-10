const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let query = params.query;
  let hostname = window.location.hostname;
  let productId = params.edit;
  let jwt = document.querySelector('[data-jwt]').value;
  let apiUrl = 'http://localhost/Api';
  //slugify image names

  function slugify (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  };



export function showContainer(selector,inputOne, inputTwo){
    selector.classList.toggle('active');
    let values = selector.querySelectorAll('.uk-radio');
    for(let i = 0; i < values.length; i++) {
        let single = values[i];
       single.addEventListener('click', ()=> {
            let label = single.parentElement;
            let text = label.textContent;
            let value = single.value;
            inputOne.setAttribute('value', text);
            inputTwo.setAttribute('value', value);
            if(selector.classList.contains('active')){
                selector.classList.remove('active')
            }
        })
    }
}

export function filterList(text,list){
    text = text.toLowerCase();
    list.forEach(option=> {
        let label = option.querySelector('label');
        let word = label.textContent;
        let isVisible = word.toLowerCase().includes(text)
        if(!isVisible){
            option.style.display = 'none';
        } else{
            option.style.display = 'block'
        }
    })
}

export const selectFile = (element)=> {
    element.addEventListener('change', ()=> {
        let span = element.nextElementSibling;
        let message = span.nextElementSibling;
        if(element.value){
            let text = element.value.match( /[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            message.innerHTML = text;
        } else{
            message.innerHTML = 'no picture selected'; 
        }
    })
}

export function switchTabs(button,element){
    const value = button.getAttribute('data-tabs-button');
    const next = element.nextElementSibling;
    const tabs = next.querySelectorAll('.admin-tab');
    const activeTab = next.querySelector(`#${value}`);
    const buttons = element.querySelectorAll('.tabs-button')
    buttons.forEach(btn=> {
        if(btn.classList.contains('active')){
            btn.classList.remove('active')
        }
    })
    tabs.forEach(tab=> {
        if(tab.classList.contains('active')){
            tab.classList.remove('active');
        }
    })
    activeTab.classList.toggle('active')
    button.classList.toggle('active')
}

//get business
export async function getFetch(url, params){
    return fetch(url, {
        method: 'POST',
        headers:{'content-type': 'application/json'},
        "body": JSON.stringify(params)
    }).then(response=>response.json())   
}


let UploadImage = (image) => {
    const hostname = window.location.hostname;
    const url = 'https://images.konectify.info/upload';
    const formData = new FormData();
    formData.append('url', hostname);
    formData.append('cat_img', image);
    return new Promise((resolve, reject)=> (
        fetch(url, {
            method:'POST',
            body:formData
        })
        .then(response=>response.json())
        .then(success=>resolve(success))
        .then(error=>reject(error))
    ))
    
   
}

//delete image from DO spaces
export const deleteImage = async(image) => {
    const url = 'https://images.konectify.info/delete';
    return new Promise((resolve,reject)=> (
        fetch(url, {
            method: 'DELETE',
            headers:{'content-type': 'application/json'},
            "body": JSON.stringify({
                "url": ""+hostname+"",
                "cat_pic": ""+image+""
            })
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    ))
}




export async function postFetch(url, method, params){
    return new Promise((resolve,reject)=> (
        fetch(url, {
            method: method,
            headers:{'content-type': 'application/json'},
            "body": JSON.stringify(params)
        }).then(response=>response.json())
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    ))   
}



export const editProductImg = async(id,picture)=> {
    let url = 'http://localhost/Api/edit-product-images.php';
    let method = 'PATCH';
    const data = {
        "jwt": ""+jwt+"",
        "id": ""+productId+"",
        "picid": ""+id+"",
        "pic": ""+picture+""
    }
    let send = await postFetch(url, method, data);
    return send;   
}


export const postCategory = async(category, image)=> {
    let url = `${apiUrl}/post-category.php`;
    let method = 'POST';
    const data = {
        "jwt": ""+jwt+"",
        "biz_id": ""+query+"",
        "cat_name": ""+category+"",
        "cat_img": ""+image+""
    }
    let send = await postFetch(url,method,data);
    return send;
}

export const formEdit = async(id,name,image)=> {
    let url = 'http://localhost/Api/edit-category.php';
    let method = 'PATCH';
    const data = {
        "jwt": ""+jwt+"",
        "id": ""+id+"",
        "bid": ""+query+"",
        "name": ""+name+"",
        "image": ""+image+""
    }
    let send = await postFetch(url, method, data);
    return send;   
}

//delete category
export const delete_category = async(id)=> {
    let url = `${apiUrl}/delete-category.php`;
    let method = 'DELETE';
    const data = {"jwt": ""+jwt+"", "id": ""+id+"", "bid": ""+query+""}
    let send = await postFetch(url,method,data);
    return send;
}

export const delete_subcategory = async(id)=> {
    let url = `${apiUrl}/delete-subcategory.php`;
    let method = 'DELETE';
    const data = {"jwt": ""+jwt+"", "id": ""+id+"", "bid": ""+query+""}
    let send = await postFetch(url,method,data);
    return send;
}


export const postSubCategory = async(category,name, image)=> {
    let url = `${apiUrl}/post-subcategory.php`;
    let method = 'POST';
    const data = {
        "jwt": ""+jwt+"",
        "cat_id": ""+category+"",
        "sub_name": ""+name+"",
        "biz_id": ""+query+"",
        "sub_img": ""+image+""
    }
    let send = await postFetch(url,method,data);
    return send;
}



export const editSubcategory = async(id, category, name, img)=> {
    let url = `${apiUrl}/edit-subcategory.php`;
    let method = 'PATCH';
    const data = {
        "jwt": ""+jwt+"",
        "id": ""+id+"",
        "bid": ""+query+"",
        "cname": ""+category+"",
        "name": ""+name+"",
        "simage": ""+img+""
    }
    let send = await postFetch(url, method, data);
    return send;   
}


export const editProfile = async(logo, biz, username, numbers, email, location)=> {
    const url = `${apiUrl}/update-profile.php`;
    const method = 'PATCH';
    const data = {
        "jwt": ""+jwt+"",
        "id": ""+query+"",
        "name": ""+biz+"",
        "email": ""+email+"",
        "numbers": ""+numbers+"",
        "username": ""+username+"",
        "logo": ""+logo+"",
        "location": ""+location+""
    }
    let send = await postFetch(url, method, data);
    return send; 
}

export const addProduct = async(category, subcategory, price, saleOption, sale_price, total, featuredHome, featuredCategory, name, description, colors, sizes )=> {
    let url = `${apiUrl}/post-products.php`;
    let method = 'POST';
    const data = {
        "jwt": ""+jwt+"",
        "category": ""+category+"",
        "biz_id": ""+query+"",
        "subcategory": ""+subcategory+"",
        "price": ""+price+"",
        "sale": ""+saleOption+"",
        "sale_price": ""+sale_price+"",
        "number": ""+total+"",
        "fhome": ""+featuredHome+"",
        "fcategory": ""+featuredCategory+"",
        "product": ""+name+"",
        "description": ""+description+"",
        "colors": ""+colors+"",
        "sizes": ""+sizes+""
    }
    let send = await postFetch(url, method, data);
    return send;   
}

export const addProductImg = async(id, picture)=> {
    let url = `${apiUrl}/add-product-images.php`;
    let method = 'POST';
    const data = {"jwt": ""+jwt+"", "id": ""+id+"", "picture":""+picture+""}
    let send = await postFetch(url,method,data);
    return send;
}


export const editProduct = async(category,subcategory, price,saleOption, sale_price, total,featuredHome,featuredCategory, name, description, colors, sizes)=> {
    let url = 'http://localhost/Api/edit-product.php';
    let method = 'PATCH';
    const data = {
        "jwt": ""+jwt+"",
        "id": ""+productId+"",
        "category": ""+category+"",
        "biz_id": ""+query+"",
        "subcategory": ""+subcategory+"",
        "price": ""+price+"",
        "sale": ""+saleOption+"",
        "sale_price": ""+sale_price+"",
        "number": ""+total+"",
        "fhome": ""+featuredHome+"",
        "fcategory": ""+featuredCategory+"",
        "product": ""+name+"",
        "description": ""+description+"",
        "colors": ""+colors+"",
        "sizes": ""+sizes+""
    }
    let send = await postFetch(url, method, data);
    return send;   
}





//delete subcategory
export const deleteSubCategory = async(jwt,id)=> {
    let url = 'https://api.konectify.co.ke/delete-subcategory.php';
    return new Promise((resolve,reject)=> (
        fetch(url, {
            method: 'DELETE',
            headers:{'content-type': 'application/json'},
            "body": JSON.stringify({
                "jwt": ""+jwt+"",
                "id": ""+id+"",
                "bid": ""+query+""
            })
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    ))
}



//search categories
export async function searchItem(searchText){
    let results = document.querySelector('[data-search-results]');
    if(searchText.length === 0){
        getCategories()
        results.innerHTML = ''
    } else{
        let response = await fetch(`https://api.konectify.co.ke/search-category.php?${searchText}`, {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            "body": JSON.stringify({
                "url": ""+hostname+"",
                "id": ""+query+""
            })
        })
        let categories = await response.json();
        let html = '';
        categories.forEach(category=> {
            let {id,name,picture} = category;
            let htmlSegment = `
            <li>
                <div class="li_deat">
                    <img src="https://konectify.sgp1.cdn.digitaloceanspaces.com/konectify/cms/${picture}" alt="">
                    <h6>${name}</h6>
                </div>
                <div class="li_buttons">
                    <button type="button" onClick="showModal('${id}', '${name}', '${picture}')"><i class="ri-edit-box-line"></i><span>edit</span></button>
                    <button class="delete"><i class="ri-delete-bin-line"></i><span>delete</span></button>
                </div>
            </li>
            `;
            html +=htmlSegment;
        })
        results.innerHTML = html;
    }
}

//search subcategories
export async function searchSubCategory(searchText){
    let results = document.querySelector('[data-subcat-results]');
    if(searchText.length === 0){
        getSubCategories()
        results.innerHTML = '';
    } else{
        let response = await fetch(`https://api.konectify.co.ke/search-subcategories.php?${searchText}`, {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            "body": JSON.stringify({
                "url": ""+hostname+"",
                "id": ""+query+""
            })
        })
        let subcategories = await response.json();
        if(subcategories.length == 0){
            results.innerHTML = 'No subcategories found'
        } else{
             let html = '';
            subcategories.forEach(subcategory=> {
                let {id,name, category,picture} = subcategory;
                let htmlSegment = `
                <li>
                    <div class="li_deat sub_category">
                            <img src="https://konectify.sgp1.cdn.digitaloceanspaces.com/konectify/cms/${picture}" alt="">
                            <h4>${name}</h4>
                    </div>
                    <div class="sub_cat">
                        <h6>${category}'</h6>
                    </div>
                    <div class="li_buttons">
                        <button onClick="showSubCatModal('${id}', '${name}', '${category}', '${picture}')"><i class="ri-edit-box-line"></i><span>edit</span></button>
                        <button class="delete"><i class="ri-delete-bin-line"></i><span>delete</span></button>
                    </div>
                </li>
                `;
                html +=htmlSegment;
            })
            results.innerHTML = html;
        }
       
    }
}

export {slugify, UploadImage}

