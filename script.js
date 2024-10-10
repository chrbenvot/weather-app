String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
const loading=document.getElementById('loading')
async function weatherFetch(url){
    loading.textContent="Loading...";
    const weather= await fetch(url,{mode:'cors'});
    const weatherInfo= await weather.json();
    return weatherInfo
}
async function giphyFetch(url){
    const gif=await fetch(url,{mode:'cors'})
    const gifFinal=await gif.json();
    return gifFinal
}
const div=document.querySelector('#container');
// location,date didnt show
function weatherLoader(element,info){
    element.textContent=element.id+" : "+info;
}
async function pageLoader(url){
    const location=document.getElementById('location');
    const datetime=document.getElementById('datetime');
    const temperature=document.getElementById('temperature');
    const temp=document.getElementById('temp');
    const tempmin=document.getElementById('tempmin');
    const tempmax=document.getElementById('tempmax');
    const conditions=document.getElementById('conditions');
    const description=document.getElementById('description');
    let list1=[datetime,temp,tempmin,tempmax,conditions,description];
    let list2=[datetime,temperature,conditions,description];
    const information=await weatherFetch(url);
    loading.textContent="";
    location.textContent=information.address.capitalize();
    for (let i of list1){
        weatherLoader(i,information.days[0][i.id])
    };
    temperature.appendChild(temp);
    temperature.appendChild(tempmin);
    temperature.appendChild(tempmax);
    div.appendChild(location);
    for (let i of list2){
        div.appendChild(i)
    };
}
const form=document.querySelector('form');
const input=document.querySelector('input');
const img=document.querySelector('img')
form.addEventListener('submit',async function(e){
    e.preventDefault();
    let source=await weatherFetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+input.value.toLocaleLowerCase()+"?key=EU4XS2YXK6Y3TKLA2XKVD4Q55");
    pageLoader("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+input.value.toLocaleLowerCase()+"?key=EU4XS2YXK6Y3TKLA2XKVD4Q55");
    let sourceJson=await giphyFetch("https://api.giphy.com/v1/gifs/translate?api_key=t3OO23yKZpPfzLYROHtWR49DLmtu6VC5&s="+source.days[0].conditions);
    img.src=sourceJson.data.images.original.url;
});