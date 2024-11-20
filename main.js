fetch('https://open.er-api.com/v6/latest/USD')
    .then((res) => {
        return res.json();
    })
    .then(data => {
        let currency = Object.keys(data.rates);
        for(let el of currency){
            $('#firstCurrency').append(`<option value="${el}">${el}</option>`)
            $('#secondCurrency').append(`<option value="${el}">${el}</option>`)
        }
})

$('#firstCurrency').on('input', function () {
    $('#firstInput').attr('placeholder', $('#firstCurrency').val())

})
$('#secondCurrency').on('input', function () {
    $('#secondInput').attr('placeholder', $('#secondCurrency').val())
})


function changeCurrency(){
    const firstCurrency = $('#firstCurrency').val()
    const secondCurrency = $('#secondCurrency').val()

    $('#firstCurrency').val(secondCurrency)
    $('#secondCurrency').val(firstCurrency)
    
    $('#firstInput').attr('placeholder', $('#firstCurrency').val())
    $('#secondInput').attr('placeholder', $('#secondCurrency').val())


    let firstInput = $('#firstInput').val()
    let secondInput = $('#secondInput').val()

    $('#firstInput').val(secondInput)
    $('#secondInput').val(firstInput)
}
$('#changeCurrency').click(function(){
    changeCurrency()
})
$('#secondInput').click(function(){
    changeCurrency()
})
setInterval(function(){
    fetch('https://open.er-api.com/v6/latest/USD')
    .then((res) => {
        return res.json();
    })
    .then(data => {
        if($('#firstInput').val() === ''){
            $('#secondInput').val('')
        }
        else {
            let mainCurrency = data.rates[$('#secondCurrency').val()];
            let secondCurrency = data.rates[$('#firstCurrency').val()];
            if(mainCurrency > data.rates.USD){
                $('#secondInput').val(($('#firstInput').val() * mainCurrency).toFixed(2))
            } else{
                $('#secondInput').val(($('#firstInput').val() / secondCurrency).toFixed(2))
            }

        }    
    })
}, 100);

function writeWord(output, text, time){
    let endText = '';

    for(let i = 0; i < text.length; i++){
        endText += '?';
        $(output).text(endText)
    }
    setTimeout(function(){
        for(let i=0; i< text.length; i++){
            setTimeout(function(){
                endText = endText.substring(0, i) + text[i] + endText.substring(i + 1)
                $(output).text(endText)
            }, time * i)
        }
    }, time)
}
writeWord('#logoText', 'cashConverter', 50)
