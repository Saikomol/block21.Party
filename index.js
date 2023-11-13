const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB_PT/recipes'
//3variable for ark(fetch) server

const mainEl = document.querySelector('main')
const formEl = document.querySelector('form')// we gonna put the button in form document
const recipeName = document.querySelector('#recipeName')//target all input 
const recipeImageUrl = document.querySelector('#imageUrl')
const Instructions = document.querySelector('#Instructions')
//main tag in HTML
async function getRecipes()//1first create asyncs function
//and  give its a names// function to call the 
{   try{//wrap must do last
    const response = await fetch(BASE_URL)
    //2ask(fetch) for server then we need to specific aske for stuff
    const data = await response.json()// this is how jason worl-k with fetch
    console.log(data.data);
    return data.data;// to get data 
    } catch(err){
        console.log(err);
    }
}

function render(recipes){//3display function on main HTML

    const template = recipes.map(recipe =>{
        return(// we will return the big string
            `<section><!--template for recipe-->
            <h2>${recipe.name}</h2>
            <img src="${recipe.imageUrl}">
            <p>${recipe.description}</p>
            <button data-id="${recipe.id}">Delete</button> 
            </section>`
        )// we need to put all the variable to template H2,img, p
    }).join('')
    mainEl.innerHTML = template
}



async function recipeAPP(){//FUNCTION TO displat to the page
    
    const recipes = await getRecipes()//get data
    render(recipes)// display the data

}

recipeAPP()// 9get data

formEl.addEventListener('submit',async(event)=>{
    event.preventDefault()//stop from refresh
    try{//wrap must do last
    await fetch(BASE_URL,{
        method: 'POST',//we need the "POST" mathod to connect with the server
        headers: {
            'Content-Type': 'application/json',
            //this package is given 
        },
        body: JSON.stringify({
        name: recipeName.value,//create object placement
        imageUrl: recipeImageUrl.value,
        description: Instructions.value,
        })
    })
    recipeName.value = '';
    recipeImageUrl.value = '';
    Instructions.value = '' ; 

    recipeAPP() 
    } catch(err) {
        console.log(err);
    }

 })

 mainEl.addEventListener('click', async(event) =>{

    if(event.target.matches('button')){
      const id = event.target.dataset.id
      await fetch(`${BASE_URL}/${id}`,{
        method: 'DELETE'
      })
      recipeAPP() 
      console.log(id)  
    }
 })
