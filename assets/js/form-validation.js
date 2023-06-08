const contactFrom = document.getElementById('contact-form');

const username = document.getElementById('name')
const emailId = document.getElementById('email')
const subject = document.getElementById('subject')
const comment = document.getElementById('comment')

function sendEmail(name, email, sub, content){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "nandhusanthosh87@gmail.com",
        Password : "523859698571E43539D03C5F4D42768ED0CA",
        To : 'nandhusanthosh87@gmail.com',
        From : "nandhusanthosh87@gmail.com",
        Subject : "Contact form entry",
        Body : `
            Name: ${name}
            Email: ${email}
            Subject: ${sub}
            Content: ${content}
        `
    }).then(
    message => alert(message)
    );
}


contactFrom.addEventListener('submit', (event)=>{
    event.preventDefault();
    validate();
})

const validate = () => {
    const name = username.value.trim();
    const email = emailId.value.trim();
    const sub = subject.value.trim();
    const content = comment.value.trim();


    // console.log(name +" " +  email + " " + sub + " " + content);
    let validName = 1, validEmail = 1, validSubject = 1, validContent = 1;
    //validate name
    if(name === ''){
        setErrormsg(username, 'username cannot be blank');
        validName = 0;
    }
    else if(name.length <= 2){
        setErrormsg(username, 'username is very short');
        validName = 0;
    }
    else{
        setSuccessMsg(username);
    }

    //validate email
    if(email === ""){
        setErrormsg(emailId,'email cannot be blank');
        validEmail = 0;
    }
    else if(isEmail(email)){
        setErrormsg(emailId, 'Email not valid' )
        validEmail = 0;
    }
    else{
        setSuccessMsg(emailId);
    }

    //subject validation
    if(sub.split(" ").length < 5){
        setErrormsg(subject, 'Please enter atlease 5 words')
        validSubject = 0;
    }
    else{
        setSuccessMsg(subject);
    }

    //content validation
    if( content.split(" ").length <= 10){
        setErrormsg(comment, 'please enter atlease 10 words')
        validContent = 0;
    }
    else{
        setSuccessMsg(comment);
    }

    if(validEmail && validName && validSubject && validContent){
        sendEmail(name, email, sub, content);
    }
}

// validating email
const isEmail = (email)=>{
    if(email[0] == '@'){
        return true;
    }
    if(email[email.length-1] == '.'){
        return true;
    }
    if(email.indexOf('@') + 3 >= email.indexOf('.')){
        return true;
    }
    return false;
}

const setSuccessMsg = (element)=>{
    const formControl = element.parentElement;
    //removing error if any
    const errorSpan = formControl.querySelector('.error-msg')
    errorSpan.classList.remove('error')
    //adding success message
    const successSpan = formControl.querySelector('.success-msg')
    successSpan.innerHTML = `<i class="fa-solid fa-circle-check " style="color: green"></i> success`
    successSpan.classList.add('success')
}

const setErrormsg = (element, message)=> {
    const formControl = element.parentElement;

    //removing success message
    const successSpan = formControl.querySelector('.success-msg')
    successSpan.classList.remove('success')

    //adding error message
    const errorSpan = formControl.querySelector('.error-msg')
    errorSpan.innerHTML = `<i class="fa-solid fa-circle-exclamation " style="margin-right: 10px"></i>`  +   message ;
    errorSpan.classList.add('error')
}

console.log(contactFrom) 