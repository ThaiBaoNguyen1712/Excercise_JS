function renderContact() {
    let ListContact = JSON.parse(localStorage.getItem("List-contact")) || [];
    let contact = `
    <thead>
    <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>SDT</th>
        <th>Email</th>
        <th>Detail</th>
    </tr>
    </thead>`;

    ListContact.forEach((value, index) => {
        contact += `
        <tr>
        <td>${index + 1}</td>
        <td>${value.Name}</td>
        <td>${value.PhoneNumber}</td>
        <td>${value.Email}</td>
        <td><button onclick="EditForm(${index})" class="btn btn-warning">Edit</button> 
        <button onclick="Delete(${index})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    });

    document.getElementById('tableContent').innerHTML = contact;
}

function AddForm()
{
    document.getElementById('AddForm').style.display= "block";
    document.getElementById('EditForm').style.display= "none";
    document.getElementById('btn-add').style.display= "block";
    document.getElementById('btn-save').style.display= "none";
    document.getElementById('btn-cancel').style.display= "block";
}
function Add()
{
    let name= document.getElementById('InputName').value;
    let phoneNumber=document.getElementById('InputPhoneNumber').value;
    let email=document.getElementById('InputEmail').value;

    let phoneNumberIsValid = validatePhoneNumber(phoneNumber);
    let emailIsValid = validateEmail(email)
    let nameIsValid = validateName(name)
    if (phoneNumberIsValid && emailIsValid && nameIsValid) {
        let ListContact = JSON.parse(localStorage.getItem("List-contact")) || [];

        ListContact.push({
            Name:name,
            PhoneNumber:phoneNumber,
            Email:email
        });
        localStorage.setItem("List-contact",JSON.stringify(ListContact));
        renderContact()
        ClearForm()
        Cancel()
    } 
    else {
        if(!nameIsValid)
        {
            alert("Tên không được để trống!")
        }
        if (!phoneNumberIsValid) {
            alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra và nhập lại.");
        }
        if (!emailIsValid) {
            alert("Email không hợp lệ. Vui lòng kiểm tra và nhập lại.");
        }
        
    }
    
}   
function EditForm(index) {
    let ListContact = JSON.parse(localStorage.getItem("List-contact")) || [];

    document.getElementById('EditName').value = ListContact[index].Name
    document.getElementById('EditPhoneNumber').value = ListContact[index].PhoneNumber
    document.getElementById('EditEmail').value = ListContact[index].Email
    document.getElementById('ID').value = index

    document.getElementById('EditForm').style.display = "block";
    document.getElementById('AddForm').style.display = "none";
    document.getElementById('btn-add').style.display = "none";
    document.getElementById('btn-save').style.display = "block";
    document.getElementById('btn-cancel').style.display = "block";
   
}

function SaveEdit() {
    if (confirm("Bạn có chắc muốn thay đổi?")) {
        
    let phoneNumberIsValid= validatePhoneNumber(document.getElementById('EditPhoneNumber').value)
    let emailIsValid = validateEmail(document.getElementById('EditEmail').value)
    let nameIsValid = validateName(document.getElementById('EditName').value)

    if ( phoneNumberIsValid && emailIsValid &&nameIsValid)  {
    let ListContact = JSON.parse(localStorage.getItem("List-contact")) || []
    let index =document.getElementById('ID').value

    ListContact[index]=
    {
        Name:document.getElementById('EditName').value,
        PhoneNumber:document.getElementById('EditPhoneNumber').value,
        Email:document.getElementById('EditEmail').value

    }
    localStorage.setItem("List-contact",JSON.stringify(ListContact))
    ClearForm()
    Cancel()
    renderContact()
    }
    else {
        if (!nameIsValid) {
            alert("Tên không được để trống!")
        }
        if (!phoneNumberIsValid) {
            alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra và nhập lại.")
        }
        if (!emailIsValid) {
            alert("Email không hợp lệ. Vui lòng kiểm tra và nhập lại.")
        }
    }
  
      
}
}
function Cancel()
{
    document.getElementById('AddForm').style.display= "none";
    document.getElementById('EditForm').style.display= "none";
    document.getElementById('btn-save').style.display= "none";
    document.getElementById('btn-add').style.display= "none";
    document.getElementById('btn-cancel').style.display= "none";
    ClearForm();
}
function ClearForm() {
    document.getElementById('EditName').value = "";
    document.getElementById('EditPhoneNumber').value = "";
    document.getElementById('EditEmail').value = "";
    document.getElementById('InputName').value = "";
    document.getElementById('InputPhoneNumber').value = "";
    document.getElementById('InputEmail').value = "";
}
function Delete(index) {
    if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
    let ListContact = JSON.parse(localStorage.getItem("List-contact")) || []
    ListContact.splice(index, 1);
    localStorage.setItem("List-contact",JSON.stringify(ListContact))
    renderContact()
    }
}
function validatePhoneNumber(PhoneNumber) {
    var sdtPattern = /^[0-9]{10}$/;
    return sdtPattern.test(PhoneNumber);
}
function validateName(Name)
{
    if(Name.trim()==='')
    {
        return false;
    }
    return true;
}
function validateEmail(Email) {
    var emailPattern = /.+@gmail\.com$/;
    return emailPattern.test(Email);
}