const database = [];

function validate() {
    // get the input fields
    var fullname_input = document.getElementById('fullname');
    var email_input = document.getElementById('email');
    var phone_input = document.getElementById('phone');
    var password_input = document.getElementById('password');

    // get the error message placeholders
    var invalid_feedbacks = document.getElementsByClassName('invalid-feedback');

    // get the success message placeholder
    var success_message = document.getElementById('alert-success');

    // retrieve input values
    var fullname = fullname_input.value;
    var email = email_input.value;
    var phone = phone_input.value;
    var password = password_input.value;


    // validatio;
    var is_validated = true;
    
    // validate name
    if ( ! /^[a-zA-Z ]+$/.test(fullname) ) {
        invalid_feedbacks[0].innerHTML = 'Invalid fullname format!';
        fullname_input.classList.add('is-invalid');
        is_validated = false;
    }
    else{
        fullname_input.classList.remove('is-invalid');
    }

    // validate email
    var email_pattern = /^[a-z]+\.{1}[a-z]+\@xool\.com$/;
    if ( ! email_pattern.test(email) ) {
        invalid_feedbacks[1].innerHTML = 'Invalid email format!';
        email_input.classList.add('is-invalid');
        is_validated = false;
    }else{
        email_input.classList.remove('is-invalid');
    }

    // validate phone
    var phone_pattern = /^0[0-9]{10}$/;
    if ( ! phone_pattern.test(phone) ) {
        invalid_feedbacks[2].innerHTML = 'Invalid phone number format!';
        phone_input.classList.add('is-invalid');
        is_validated = false;
    }else{
        phone_input.classList.remove('is-invalid');
    }

    // validate password
    var password_pattern = /^.{8,}$/;
    if ( ! password_pattern.test(password) ) {
        invalid_feedbacks[3].innerHTML = 'Invalid password format!';
        password_input.classList.add('is-invalid');
        is_validated = false;
    }else{
        password_input.classList.remove('is-invalid');
    }

    // if validation passes
    if ( is_validated ) {

        // convert info to record
        var validatedData = {
            'fullname': fullname,
            'email': email,
            'phone': phone,
            'password': password,
        }
    
        // save record to db
        database.push(validatedData)

        // clear input fields
        fullname_input.value = '';
        email_input.value = '';
        phone_input.value = '';
        password_input.value = '';

        // display success message
        success_message
        .classList
        .remove('d-none');
        
        // display content of the db
        print_database();
    }
    else{
        // hide success message if visible
        success_message
        .classList
        .add('d-none');

    }
    
}

function print_database() {

    var table_body = document.getElementById('table-body');
    var rows = '';
    var sn = 0;

    database.forEach(record => {
        index = sn;
        rows =  rows + 
            '<tr>' +
                '<td>'+ ++sn + '</td>' +
                '<td>'+ record.fullname + '</td>' +
                '<td>'+ record.email + '</td>' + 
                '<td>'+ record.phone + '</td>' +
                '<td>'+ record.password + '</td>' +
                `<td> 
                    <button class="btn btn-danger" onclick="remove_row(` + index + `)">
                        <i class="bi bi-person-x"></i>
                    </button>
                </td>` +
            '</tr>';
    });

    table_body.innerHTML = rows;
}

function remove_row( index ) {
    database.splice(index, 1);
    print_database();
}

document.getElementById('submit-btn')
.addEventListener('click', function(e){
    e.preventDefault();
    validate();
});


