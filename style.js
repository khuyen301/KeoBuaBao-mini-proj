//tạo 1 bảng chứa giá trị dạng table
const VALUES = [
    {id:"scissors", value:"✌️"}, //0
    {id:"rock", value:"✊"},     //1
    {id:"paper", value:"✋"},   //2
]

//tạo hàm mà mỗi lần gọi thì nó sẽ thay đổi giá trị của máy
let i = 0;
const handleChange = () => {
    const computer = document.querySelector("#computer");
    computer.textContent = VALUES[i].value//đổi giá trị cho computer
    computer.dataset.id = VALUES[i].id//đổi data-id cho computer
    if(i === VALUES.length - 1){
        i = 0;
    }else{
        i++;
    }
}
//viết 1 hàm liên tục gọi handleChange
let interval = setInterval(handleChange, 100) 

//hàm compare (hàm so sánh kết quả người dùng và máy)
const compare = (valuePlayer, valueComputer) =>{
    //dựa trên giá trị người dùng tìm vị trí của nó trong mảng VALUES
    let indexPlayer = VALUES.findIndex(item => item.id === valuePlayer)
    //dựa trên giá trị máy tìm vị trí của nó trong mảng VALUES
    let indexComputer = VALUES.findIndex(item => item.id === valueComputer)
    let check = indexPlayer - indexComputer;
    // alert(indexUser + " " + indexComputer)
    if(check == 1 || check == -2){
        return 1;
    }else if(check == 0){
        return 0;
    }else{
        return -1;
    }
}


//DOM đến danh sách các nút của người chơi
let playerItem = document.querySelectorAll(".user")
playerItem.forEach(item => {
    item.addEventListener("click", event =>{
        clearInterval(interval) 
        let valueComputer = computer.dataset.id;
        let valuePlayer = event.target.id;
        let result = compare(valuePlayer, valueComputer)
        playerItem.forEach(_item => {
            _item.classList.remove("actived")
            _item.style.pointerEvents = "none"
        });
        event.target.classList.add("actived") 
        //thông báo kết quả
        const alertPost = document.createElement("div")
        alertPost.classList.add("alert") 
        let msg = ""; 
        if(result === 1){
            msg = "Bạn thắng"
            alertPost.classList.add("alert-success")
        }else if(result === -1){
            msg = "Bạn còn thua cả con máy"
            alertPost.classList.add("alert-dark")
        }else{
            msg = "Bạn cũng chỉ bằng con máy"
            alertPost.classList.add("alert-warning")
        }
        alertPost.textContent = msg;
        document.querySelector(".notification").appendChild(alertPost)
        document.querySelector("#play-again").classList.remove("d-none")
    })
});
//làm sự kiện bấm chơi lại
document.querySelector(".btn-play-again").addEventListener("click", event =>{
    interval = setInterval(handleChange, 100)
    playerItem.forEach(_item =>{
        _item.classList.remove("actived")
        _item.style.pointerEvents = ""

    });
    document.querySelector(".notification").innerHTML = "";
    document.querySelector("#play-again").classList.add("d-none")

})