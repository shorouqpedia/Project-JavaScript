////////////////////////////////////////////////////////
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
    const row = document.getElementById('tableBody');
    for(let i=0;i<products.length;i++)
    {
        GetProduct(products[i]).then(
            (result) =>{
                x=result.data;
                row.innerHTML+=`
                                <tr>
                                    <th class="s" scope="row">
                                        <img src="${x['ProductPicUrl']}" class="item" >
                                        ${x['Name']}
                                    </th>
                                    <td style="padding-top: 45px;">
                                        ${x['Price']}
                                    </td>
                                    <td style="padding-top: 45px;">
                                        ${amounts[i]}
                                    </td>
                                    <td style="padding-top: 45px;">
                                        ${Number(x['Price'])*Number(amounts[i])}
                                    </td>
                                </tr>` ;
            },
            (er) => console.log(er)
        )

    }
}
/*
.then(
    (result) =>{
        details=result.data;
    },
    (er) => console.log(er)
)
*/
let x=GetProduct('HT-1000').then(
    (result) =>{
       console.log(result.data);
    },
    (er) => console.log(er)
)
