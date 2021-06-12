const msgApi ="https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us";

const msgForm = document.forms.send_msg;
const Name = msgForm.elements.Name;
const email = msgForm.elements.Email;
const sbj = msgForm.elements.Subject;
const msg = msgForm.elements.Message;
const header = document.getElementById("header-of-form")

const Send =(API)=>{
    fetch(API ,{
        method:'POST',
        body:JSON.stringify({
            name: Name.value,
            email: email.value,
            subject: sbj.value,
            message: msg.value }),
        headers:{"Content-Type":"application/json; charset=UTF-8"}
        }).then(
            ()=>{
                let alert = document.createElement('p');
                header.appendChild(alert)
                alert.style.color='cadetblue';
                alert.style.fontWeight='700'
                alert.textContent='** Message sent successfully , Thank you **';
                msgForm.reset();
                window.location.href = "Contact-us.html#header-of-form";
                console.log('Success')
            },
            (er) => console.log(er) )
}

msgForm.onsubmit=(ev)=>{
    ev.preventDefault();
    Send(msgApi)
}