document.addEventListener('DOMContentLoaded', () => {
    let playBtn = document.querySelector('.play-button');

    adress=window.location.href;
    adress = adress.split("/");
    adress = adress[adress.length - 2];
    adress = "http://" + adress;

    console.log(adress);

    playBtn.addEventListener('click', () => {
        window.location.href = adress + '/game/start';
        
    }
    );




});
