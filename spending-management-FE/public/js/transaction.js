//show form create transaction
function showCreateTransactionForm() {
    showModalCreateTransaction();
    getWallet();
    getCategory();
}

function showModalCreateTransaction() {
    let now = moment().format('YYYY-MM-DD');
    let html = `<div class="form-group">
                    <label for="name">Money</label>
                    <input type="text" class="form-control" id="money">
                </div>
                <br>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description">
                </div>
                <div class="form-group">
                    <label for="time">Time</label>
                    <input type="date" class="form-control" id="time" value="${now}">
                </div>
                <br>
                <div class="form-group"> 
                    <label for="amount">Wallet</label>
                    <select id="selectWallet" class="form-control" >        
                        
                    </select>
                </div>
                <div class="form-group"> 
                    <label for="amount">Category</label>
                    <select id="selectCategory" class="form-control" >        
                        
                    </select>
                </div>
                <br>`;
    let html1 = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createTransaction()">Create</button>`;
    $('.modal-title').html('Create Transaction');
    $("#modal-body").html(html);
    $('#modal-footer').html(html1);
};

function createTransaction() {
    let money = $('#money').val();
    let description = $('#description').val();
    let time = $('#time').val();
    let walletId = $('#selectWallet').val();
    let categoryId = $('#selectCategory').val();
    $.ajax({
        headers: {
            "Content-Type": "Application/json",
            'Authorization': 'Bearer ' + token.token
        },
        type: "GET",
        url: `${API_URL}/categories/getOneCategory/${categoryId}`,
        success: function (data) {
            let transaction = {};
            if (data.type === 'pay') {
                transaction = {
                    money: -money,
                    description: description,
                    time: time,
                    walletId: walletId,
                    categoryId: categoryId
                };
            }else {
                transaction = {
                    money: money,
                    description: description,
                    time: time,
                    walletId: walletId,
                    categoryId: categoryId
                };
            }
            $.ajax({
                headers: {
                    "Content-Type": "Application/json",
                    'Authorization': 'Bearer ' + token.token
                },
                type: "POST",
                url: `${API_URL}/transaction`,
                data: JSON.stringify(transaction),
                success: async function () {
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Create Success!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })
        }
    })

};

//get Wallet
function getWallet() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/wallets`,
        success: function (data) {
            let html = '<option>-- Select type --</option>';
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i]._id}">${data[i].name}</option>`
            }
            $('#selectWallet').html(html);
        }
    })
}

//get Category
function getCategory() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/categories/category`,
        success: function (data) {
            let html = '<option>-- Select type --</option>';
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i]._id}" type="${data[i].type}">${data[i].name}</option>`
            }
            $('#selectCategory').html(html);
        }
    })
};

//show Transaction Open
function showDetailWallet(id){
    headerTableWallet1();
    theadWallet1();
    showTransactionList(id);
}

function headerTableWallet1(){
    let html = `<h6 class="mb-0" id="title">Transaction List</h6>`
    $("#header-table").html(html)
}

function theadWallet1(){
    let thTransaction = `<tr class="text-dark">
                        <th scope="col">#</th>
                        <th scope="col">Money</th>
                        <th scope="col">Description</th>
                        <th scope="col">Time</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>`
    $("#thead-list").html(thTransaction);
}

function showTransactionList(id){
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        type: 'GET',
        url: `${API_URL}/transaction/${id}`,
        success: function (data) {
            let html = '';
            for (let i = 0; i < data.length; i++) {
                let date = new Date(data[i].time);
                html += `<tr id="${data[i]._id}">
                        <td>${i + 1}</td>
                        <td>${data[i].money}</td>
                        <td>${data[i].description}</td>
                       <td>${date.toLocaleDateString("en-US")}</td>
                        <td>${data[i].categoryId.name}</td>
                        <td><button type="button" onclick="deleteTransaction('${data[i]._id}')" class="btn btn-primary">Delete</button></td>
                    </tr>`
            };
            $('#tbody-list').html(html);
        }
    })
}

//delete Transaction
function deleteTransaction(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                headers: {
                    'Authorization': 'Bearer ' + token.token
                },
                type: 'DELETE',
                url: `${API_URL}/transaction/${id}`,
                success: function () {
                    console.log(123)
                    Swal.fire(
                        'Deleted!',
                        'Category has been deleted.',
                        'success'
                    )
                    $(`#${id}`).remove();
                }
            })
        }
    })
};