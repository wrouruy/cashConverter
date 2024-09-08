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
        // document.onkeydown = function(e){
        //     if(e.keyCode === 13){
        //         console.clear()
        //         console.log(`${$('#firstCurrency').val()}: ${data.rates[$('#firstCurrency').val()]}`)
        //         console.log(`${$('#secondCurrency').val()}: ${data.rates[$('#secondCurrency').val()]}`)
        //     }
        // }
        console.log(currency.length)
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









setInterval(function(){
    $('#logoText').css('bottom', (window.innerHeight / 2) + 100)
    if(window.innerWidth < 650){
        $('#rowInput').css('flexDirection', 'column')
        $('.line').css('margin', '10px')
        $('#changeCurrency').css('position', 'fixed')
        $('#changeCurrency').css('right', '10px')
        $('#changeCurrency').css('width', '90px')
        $('#changeCurrency').css('height', '90px')
        $('#changeCurrency').css('fontSize', '30px')
        $('#secondLine').css('flexDirection', 'row-reverse')
        $('.selectionSecond').css('borderRadius', '0 5px 5px 0')
        $('.inputSecond').css('borderRadius', '5px 0 0 5px')
        $('#rowInput').css('backgroundColor', 'transparent')
        $('#rowInput').css('border', 'none')
    } else{
        $('#rowInput').css('flexDirection', 'row')
        $('.line').css('margin', '0px')
        $('#changeCurrency').css('position', 'static')
        $('#changeCurrency').css('right', 'auto')
        $('#changeCurrency').css('width', '35px')
        $('#changeCurrency').css('height', '35px')
        $('#changeCurrency').css('fontSize', '15px')
        $('#secondLine').css('flexDirection', 'row')
        $('.inputSecond').css('borderRadius', '0 5px 5px 0')
        $('.selectionSecond').css('borderRadius', '5px 0 0 5px')
        $('#rowInput').css('backgroundColor', 'rgba(0, 0, 0, 0.160)')
        $('#rowInput').css('border', '1px solid rgba(0, 0, 0, 0.15)')
    }
}, 50)

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
writeWord('#title', $('#title').text(), 50)