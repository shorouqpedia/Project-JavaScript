const contact_us = "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us";
const ApiProducts = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";
const productsDiv =  document.getElementById('products');

/////////////////////////////////////////////
const createProduct=(imgSrc,head,desc,productPrice,id)=>{
    let divOfProduct = document.createElement('div');
    productsDiv.appendChild(divOfProduct);
    divOfProduct.classList.add('product','center');
    let div = document.createElement('div');
    let img = document.createElement('img');
    divOfProduct.appendChild(img);
    img.src=imgSrc;
    let header = document.createElement('h3');
    header.textContent=head;
    let description = document.createElement('p');
    description.textContent=desc;
    let price = document.createElement('p');
    price.textContent=productPrice;
    price.className='price';
    let moreLink = document.createElement('a');
    moreLink.href='product.html';
    moreLink.textContent='More details ';
    let icon=document.createElement('i');
    icon.classList.add("fa", "fa-long-arrow-right");
    icon.setAttribute('aria-hidden', 'true');
    moreLink.appendChild(icon);
    div.append(header,description,price,moreLink);
    divOfProduct.appendChild(div);
    //send id
    moreLink.onclick=()=>{
        sessionStorage.setItem("id",id);
    }
}

///////////////////////////////////////////

//** Function to Get the data using api link **//
const GetData =(API)=>{
    return new Promise((resolve , reject)=> {
        let xhr = new XMLHttpRequest();
        xhr.onload=()=>
        {
            if(xhr.readyState === 4 && xhr.status === 200)
                resolve(JSON.parse(xhr.responseText));
            else 
                reject(Error(xhr.statusText)); 
        };
        xhr.open("GET",API,true);
        xhr.send();
    })
};
GetData(ApiProducts).then(
    (result) =>{
        for (p of result.data) 
        {
            let descrip=p.Description;
            let price ='';
            if (p.Description.length>90)
                descrip=descrip.substring(0,80)+' ...';
            price=p.Price+' '+p.CurrencyCode;
            createProduct(p.ProductPicUrl,p.Name,descrip,price,p.ProductId)
        }
        return document.getElementsByClassName('product');
    },
    (er) => console.log(er)
)
/*.then(
    (x)=> {
        console.log(x[0]);
    },
    (er) => console.log(er)
)*/
