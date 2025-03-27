// export function searchMedia(searchRequest){
//     return searchRequest.replaceAll(" ", "+");
// }

// export function searchHandle(){
// const searchBtn = document.querySelector('.search__icon');

// searchBtn.addEventListener('click', ()=>{
//     let searchRequest = document.getElementById('search__input').value.trim();
//     if(!searchRequest){return}
//     const searchResults = searchMedia(searchRequest);
//     // console.log(`search.html?title=${searchResults}`);
//     window.location.href = `search.html?title=${searchResults}`
// });

// document.getElementById('search__input').addEventListener('keyup', function(event){
//     if(event.key === 'Enter'){
//         searchBtn.click()
//     }
// })
// }