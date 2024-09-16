var ctx=document.getElementById("graf").getContext("2d");
var graf = new Chart(ctx, {
    type:"bar",
    data:{
        labels:['Octubre', 'Noviembre', 'Diciembre'],
        datasets:[{
            label:'Los meses con mayores Ventas',
            data:[1069, 1136, 1532],
            backgroundColor:['#623B5A','#55D6BE','#CBEF43'],
            barPercentage: 0.4,
            categoryPercentage: 1
        }]
    },
    options:{
        responsive:true,
        maintainAspectRatio: true,
        scales:{
            y:{
                ticks:{
                    beginAtZero:true
                }
            }
        }
    }
});

var ctx=document.getElementById("graf1").getContext("2d");
var graf1= new Chart(ctx,{
    type:'pie',
    data:{
        labels:['Leche', 'Arroz', 'Tomate'],
        datasets:[{
            label:'Producto más vendido',
            data:[60,50,100],
            backgroundColor:['#ffc100','#51e5ff','#f76c5e']

        }]
    },
    options:{
        responsive:true,
        maintainAspectRadio: true
    }
});

var ctx = document.getElementById("graf2").getContext("2d");
var graf2 = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Ventas',
            data: [542, 817, 463, 951, 711, 1087, 628, 893, 519, 1069, 
                1136, 1532
            ],
            tension: 0.3
        }],
        labels: ['January', 'February', 'March', 'April', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    },
    options: {
        scales: {
            y: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }
});