function exitbutton(){
    window.location.href = "index.html";
}
function backbutton(){
    window.location.href = "inicio.php";
}
function verdetalle(){
    window.location.href = "detalle_factura.php"
}

const search = document.querySelector('.container input'),
    table_rows = document.querySelectorAll('tbody tr');

    search.addEventListener('input', searchTable);

    function searchTable(){
        table_rows.forEach((row,i)=>{
            let table_data = row.textContent.toLowerCase(),
                search_data = search.value.toLowerCase();

            row.classList.toggle('hide',table_data.indexOf(search_data)< 0);
            row.style.setProperty('--delay',i/25 + 's');
        })
    }