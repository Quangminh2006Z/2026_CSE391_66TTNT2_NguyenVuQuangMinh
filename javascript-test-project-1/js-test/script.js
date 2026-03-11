const paragraphDiv = document.getElementById(`parent`)
const buttonThem = document.getElementById(`click-me-btn`)


//Event listener cho button

//buttonThem.addEventListener(`click`, function (){} )

//Them phan tu p moi vao div

buttonThem.addEventListener(`click`, function () {
    let doanVanMoi = document.createElement(`p`);
    doanVanMoi.textContent =`Noi dung sau khi click`;
    paragraphDiv.appendChild(doanVanMoi);
})