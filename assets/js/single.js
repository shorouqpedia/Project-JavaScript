const id = sessionStorage.getItem('id');
const ApiProducts = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+id;
const productArea = document.getElementById('area');
productArea.style.display='none';
const body =document.getElementById('alert');
body.style.display='none';
const go=()=>window.location.href='index.html'; //redirect when no product choosed



if(id===null) {
    console.log(id)
    const alert =document.createElement('h1');
    body.display='block'
    alert.textContent = 'Sorry this page is not available you\'ll be redirected '
    body.appendChild(alert)
    setTimeout(()=>{window.location.href='index.html'},5000);
}
else {
    const prodName = document.getElementById('product-name');
    const prodImg = document.getElementById('product-img');
    const DSC = document.getElementById('description');
    const price = document.getElementById('price')
    const AVB = document.getElementById('availabality');
    const form = document.forms.addToCart;
    const qnt = document.getElementById('n');

    let ar = ["Category","CurrencyCode","DateOfSale",
                "Description","DimUnit","Name","Price",
                "ProductId","ProductPicUrl","Quantity",
                "Status","WeightUnit"]; // create array of elements that out of description
    const breif = document.getElementById('breif');
    new Promise((resolve , reject)=> {
        let xhr = new XMLHttpRequest();
        xhr.onload=()=>
        {
            if(xhr.readyState === 4 && xhr.status === 200)
            resolve(JSON.parse(xhr.responseText));
            else 
            reject(Error(xhr.statusText)); 
        };
        xhr.open("GET",ApiProducts,true);
        xhr.send();
    }).then(
        (result) =>{
            let details=result.data;
            document.title=details['Name']
            price.textContent="Price : "+details['Price']+" "+details['CurrencyCode'];
            if (details['Status']==='Available')
            {
                AVB.textContent='This item is now available';
            }
            else
            {
                qnt.disabled=true
                AVB.textContent='This item is not available';
            }
            let AllData ="";
            for(key in details)
            {
                if (!ar.includes(key)){
                    if(key==='Depth'||key==='Height'||key==='Width')
                    {
                        AllData+=key+' : '+details[key]+' '+details['DimUnit']+'<br>'
                    }
                    else if (key==='WeightMeasure')
                    {
                        AllData+=key+' : '+details[key]+' '+details['WeightUnit']+'<br>';
                    }
                    else
                    {
                        AllData+=key+' : '+details[key]+'<br>';
                    }
                }
            }
            prodName.textContent=details['Name'];
            breif.textContent=details['Description'];
            prodImg.src=details['ProductPicUrl'];
            DSC.innerHTML=AllData;
            productArea.style.display='block';
            form.onsubmit=(ev)=>{
                ev.preventDefault();
                let amount = qnt.value;
                if(Number(amount)>0)
                {
                    alert('Added');
                    if(sessionStorage.getItem('productId')==null)
                    {
                        sessionStorage.setItem('productId',id);
                        sessionStorage.setItem('quantity',amount);
                    }
                    else
                    {
                        let cartHistoryID=sessionStorage.getItem('productId')
                        let cartHistoryQ=sessionStorage.getItem('quantity')
                        let newHistoryID=cartHistoryID+','+id;
                        let newHistoryQ=cartHistoryQ+','+amount;
                        sessionStorage.setItem('productId',newHistoryID);
                        sessionStorage.setItem('quantity',newHistoryQ);
                        form.reset();
                    }
                }
                else
                {
                    alert('NOT ALLOWED PLEASE ENTER A POSITIVE NUMBER')
                }
                console.log(sessionStorage.getItem('productId'))
            }
    },
    (er) => console.log(er)
    )
}