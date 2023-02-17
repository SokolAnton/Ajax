
const filmDB = `http://www.omdbapi.com/?i=tt3896198&apikey=5e6bdb8`;

let moviePage = 1

$('#searchButton').on('click', function (event) {



    const filmShow = $('#filmshow')
 

    let count = 0;



    let movieName = $('#seacrh').val();
    let movieType = $('#type').val();

    async function getSearch() {

        console.log("Zapros")
        
        filmShow.html('')
        filmShow.css('border', 'none')

        const URL = `https://omdbapi.com/?s=${movieName}&page=${moviePage}&type=${movieType}&apikey=5e6bdb8`;
        const responce = await fetch(`${URL}`)
        const respJson = await responce.json()
        const filmList = respJson.Search
        if (respJson.Response == 'False') {
            alert("Your film is not found: ")
        }


        for (let i = 0; i < filmList.length; i++) {
            const filmCard = $(`<div class="card"></div>`)
            filmShow.append(filmCard)

            filmCard.append($(`<div class='title'>${filmList[i].Title}</div>`))
            filmCard.append($(`<div class='year'>${filmList[i].Year}</div>`))
            filmCard.append($(`<div class='img'><img src="${filmList[i].Poster}" alt=""></div>`))

        }
    }
    getSearch();


    async function pageSearch() {
        

        const pagination = $('.pagination-items')
        pagination.html('')
        pagination.css('border', 'none')


        const URL = `https://omdbapi.com/?s=${movieName}&page=${moviePage}&type=${movieType}&apikey=5e6bdb8`;
        const responce = await fetch(`${URL}`)
        const respJson = await responce.json()
        console.log('page', respJson)

        if (respJson % 10 == 0) {
            count = respJson.totalResults / 10
            console.log(count)
        } else {
            count = (respJson.totalResults / 10) + 1
            console.log(count)

        }
        for(let i=0;i<count;i++){
            pagination.append($(`<div class='paginationBtn'>${i+1}</div>`))
        }
        if(count>10){
            $(pagination).slick({
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 5,
              });
        }

        let items = $('.paginationBtn');
        
        items.on('click', function(event){
            moviePage = parseInt(event.target.innerText)                    
            getSearch();

        })
        
    }
    pageSearch()
})



