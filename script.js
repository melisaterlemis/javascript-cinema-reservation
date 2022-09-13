const container = document.querySelector('.container');//container sınıfını seçtik ve container değişkenine atadık
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStrorage();//bilgileri alıp uygulama üzerine dağıtma
calculateTotal();//hesaplama işlemi

container.addEventListener('click', function(e) {//container'a click eventini ekledik. e burda biz hangi elemana tıkladık o bilgiyi verecek
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){//e.target ile bir filtreleme yapıyoruz claslisti seat içeriyorsa diyoruz ve reserved sınıfını içerenleri seçme diyoruz
        e.target.classList.toggle('selected');//eleman içerisinde selected clası varsa siler yoksa ekler
        calculateTotal();

    }  
    });

    select.addEventListener('change', function(e){//movie değiştiği zaman 
        calculateTotal();


    });

    function calculateTotal(){
        const selectedSeats = container.querySelectorAll('.seat.selected');

        const selectedSeatsArr = [];
        const seatsArr = [];

        selectedSeats.forEach(function(seat){//selectedseats üzerinden foreach medtodu ile elemanları dolaşalım 
                                              //ve function içerisindeki her bir eleman seat olarak karşımıza gelir
            selectedSeatsArr.push(seat);//gelen seat bilgisini push ile selectedseatarr içine ekledik

        });

        seats.forEach(function(seat){//seats listesi üzerinden tek tek döncek function içinden gelen her bir seat elemanını dolşırız
            //dolaştığımız her elemanı seatarr içerisine push metoduyla ekleriz 
            seatsArr.push(seat);
        });


        //saklayacağımız index listesi selectedsetaarr üzerindekibütün elemanları map methodu aracılığıyla dolaş ve function oluşturucaz
        //ve her bir eleman seat içine kopyalanacak ve elemanlar içerisinden seat olanları arayacak aslında yaptığımız seçtiğimiz eelman bütün elemanlar içinde kaçıncı index numarasına sahip eleman bunu bulmak istedik
        let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
            return seatsArr.indexOf(seat);
        });

        console.log(selectedSeatIndexs);    
        
      let selectedSeatCount = selectedSeats.length;//container içindeki seçtiğim elemanlar seat ve selected clasına sahip elemanları alıyoruz ve length ile sayısını buluyoruz
      count.innerText = selectedSeatCount;//count spanının innertext bilgisine selectedseatcount bilgisini yazdırıyoruz seçtiğimiz eleman sayısını spana yazdırır

      //selectin içindeki value değerleini al
      amount.innerText = selectedSeatCount * select.value;//amount spanının inertextine seçili olan koltuk ve fiyat bilgisini çarpıp ekle

      saveToLocalStorage(selectedSeatIndexs);//index numaralarını kayıt ediyoruz
    }

    function getFromLocalStrorage(){
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));//alacak olduğumuz bilgi

        if(selectedSeats != null && selectedSeats.length > 0 ){//seçili olan koltuk boş değil ve 0 dan fazla ise bütün koltukları dolaş
            seats.forEach(function(seat, index){//koltuk ve index bilgisi gelir
                if(selectedSeats.indexOf(index) > -1){//localstorage içerisinden gelen selectedseat biilgileri içinde bi arama işlemi yaparız bütün indexleri ararız eşleşen değer -1den büyük ise
                    seat.classList.add('selected');//seatin claslistine selected clasını ekleriz    
                }
            })
        }
        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');//localstroge üzerinden selectedmovie bilgisini aldık

        if(selectedMovieIndex != null){//filmi seçtüğümizde sayfa yenilendiğinde seçili film kalır
            select.selectedIndex = selectedMovieIndex;
        }

    }

    function saveToLocalStorage(indexs){//index numaralarını kayıt ediyor
        localStorage.setItem('selectedSeats', JSON.stringify(indexs));
        localStorage.setItem('selectedMovieIndex', select.selectedIndex);
    }