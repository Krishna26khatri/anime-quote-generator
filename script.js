const quoteq1 = document.getElementById('quote');
const author = document.getElementById('author');
const get_quote = document.getElementById('new');
const speechBtn = document.querySelector(".speech");
 const copyBtn = document.querySelector(".copy");
 const twitterBtn = document.querySelector(".twitter");
const synth = speechSynthesis;
get_quote.addEventListener('click', generatequote);
async function generatequote(){
    get_quote.classList.add("loading");
    get_quote.innerText = "Loading Quote...";
    fetch("https://animechan.xyz/api/random").then(
        response => response.json()).then
        (result => {
        quoteq1.innerHTML = result.quote;
       author.innerText = result.character;  
       get_quote.classList.remove("loading");
       get_quote.innerText = "New Quote";  
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!get_quote.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteq1.innerText} by ${author.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteq1.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteq1.innerText}`;
    window.open(tweetUrl, "_blank");
});