/////////////////////////////////////////////////////////
const removeDuplicates=(num)=>{
    var x,
        len=num.length,
        out=[],
        obj={};

    for (x=0; x<len; x++) {
        obj[num[x]]=0;
    }
    for (x in obj) {
        out.push(x);
    }
    return out;
}

const GetProduct=(id)=>{
    return new Promise((resolve , reject)=> {
        let xhr = new XMLHttpRequest();
    xhr.onload=()=>
    {
        if(xhr.readyState === 4 && xhr.status === 200)
        resolve(JSON.parse(xhr.responseText));
        else 
        reject(Error(xhr.statusText)); 
    };
    xhr.open("GET",
    "https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+id
    ,true);
    xhr.send();
})
}
/////////////////////////////////////////////////////////
const Table = document.getElementById('table');
let Cart=[];
//*********Check if there's products **********//
if(sessionStorage.getItem('productId')==null) // no products in Cart
{
    Table.style.display='none';
    const note = document.getElementById('note');
    note.textContent='your cart is empty';
    note.style.marginBottom='450px';
}
else // there is products in Cart
{
    let products=sessionStorage.getItem('productId').split(',')
    let amounts=sessionStorage.getItem('quantity').split(',')
    /*
    for(let i=0;i<products.length;i++)
    {
        Cart.push({id:products[i],q:amounts[i]});
    }
    console.log(Cart)*/


let x=Number(localStorage.getItem('counter'))
localStorage.setItem('counter',x+1)

    const row = document.getElementById('tableBody');
    for(let i=0;i<products.length;i++)
    {
        GetProduct(products[i]).then(
            (result) =>{
                x=result.data;
                row.innerHTML+=`
                                <tr>
                                    <td class="item-cart">
                                        <img src="${x['ProductPicUrl']}" class="item" >
                                        ${x['Name']}
                                    </td>
                                    <td id="price${x['ProductId']}" class="align-middle text-center">
                                        ${x['Price']}
                                    </td>
                                    <td class="align-middle text-center">
                                        <input id="${x['ProductId']}" type="number" class="form-control col-sm-4 center" value="${amounts[i]}">
                                    </td>
                                    <td id="total${x['ProductId']}" class="align-middle text-center">
                                    ${x['Price']*amounts[i]}
                                    </td>   
                                </tr>` ;
                                
            },
            (er) => console.log(er)
            )
            
        }
    }
    const focusElement=()=> {
        let active = document.activeElement;
        let x = active.tagName;
        if(x==="INPUT")
        {
            let pid = active.id;
            console.log(pid);
            let totalPrice=document.getElementById('total'+pid);
            console.log(totalPrice);
            let price=document.getElementById('price'+pid)
            totalPrice.textContent=Number(active.value)*Number(price.textContent)
        }
        console.log(x);
    }
/*
.then(
    (result) =>{
        details=result.data;
    },
    (er) => console.log(er)
)
*/
/* let x=GetProduct('HT-1000').then(
    (result) =>{
       console.log(result.data);
    },
    (er) => console.log(er)
) */
