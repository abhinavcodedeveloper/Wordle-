let words = ["SQUID", "WORLD", "MEDAL"]; //Words with length 5
let height = 6; //number of rows
let width = 5;

let s = words[Math.floor(Math.random()*words.length)];
let gameover = false;
// Indexing
let row = 0;
let col = 0;



function createboard() {
  // now the main part starts Here
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      // here I will make the board using indexing
      let miniBoxes = document.createElement("div");
      miniBoxes.id = r.toString() + "-" + c.toString();
      miniBoxes.classList.add("miniBoxes");
      miniBoxes.innerText = "";
      document.getElementById("board").appendChild(miniBoxes);
    }
  }
  document.addEventListener("keyup", (ev) => {
    if(gameover == true){
        return;
    }
    //I used keyup as if I want to register a word only when the user holds up his/her finger from keyboard...if i'll use key down then the user will inuput all the 5 letters without lifting his finger
    // alert(ev.code); this will telll me the info of the key that i pressed KeyX
    if ("KeyA" <= ev.code && ev.code <= "KeyZ") {
      if (col < width) {
        let currbox = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currbox.innerText == "") {
          currbox.innerText = ev.code[3];
          col += 1;
        }
      }
      //   how to implement the back space...just decrease the col  
    }
    
    else if (ev.code == "Backspace") {
      // the iterator shoukd be within the limits of the board

      if (col > 0 && col <= width) {
        col -= 1; //this condition is important as if i am on the zerothindex and if I will press the backspace then the col will become -1 and the line 27 will point to no element so no word will get input from the user
      }
      let currbox = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currbox.innerText = ""; //if backspace then just empty the string which has the word earlier
    }

    else if(ev.code == "Enter" && col==width){
        let count = 0;
        for(let c = 0;c < width;c++){
            let currbox = document.getElementById(row.toString() + '-' + c.toString());
            let currletter = currbox.innerText;
          if(currletter!=""){
            if(s[c] == currletter ){
                currbox.classList.add('correct');
                count += 1;
            }
            else if(s.includes(currletter)){
                currbox.classList.add('rightguessbutnotcorrect');
            }
            else{
                currbox.classList.add('wrong');
            }
            if(count == width){
                gameover = true;
            }
          }
        }
       
        row += 1;
        col = 0;
    }
  

    if(gameover == false && row == height){
        gameover == true;
        // let sahijawab = document.createElement('img');
        // sahijawab.src = ""
        let finalword = document.getElementById('finalword');
        finalword.innerText = s;
        finalword.classList.add('lastword');
        finalword.style.color = 'black';
        

        // lastword animation
        let lastimg = document.getElementById('cloudimg');
        lastimg.classList.add('cloudimganimation')
        lastimg.style.display = 'block';
    }
  });
}

// A play again button which will refresh my page 
let playbtn = document.getElementById('playbtn');
playbtn.addEventListener('click',(ev)=>{
  location.reload();
})

window.onload = function () {
  createboard();
};
