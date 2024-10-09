// 1.fetch ,load and show categories

// create loadCategories
const loadCategories = () => {
    
    // fetch the data

    fetch(' https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => displayPets(data.categories))
        .catch((error) => console.log(error));
};


// load card
const loadCard = () => {

    const spinner = document.getElementById('loadingSpinner');
    const cardContainer = document.getElementById('whole-card');

    spinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    
    // fetch the data

    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                spinner.classList.add('hidden');
                cardContainer.classList.remove('hidden');
            
                displayCards(data.pets);
        }, 2000);
})
        .catch ((error) => {
    console.log(error);
    spinner.classList.add('hidden');
    cardContainer.classList.remove('hidden');
});
};


const loadCategoryPets = (id) => {
    const spinner = document.getElementById('loadingSpinner');
    const cardContainer = document.getElementById('card');
   
    
    spinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) =>
            {
                setTimeout(() => {
                    spinner.classList.add('hidden');
                    cardContainer.classList.remove('hidden');
                
                    displayCards(data.data);
            }, 1000);
    })
        
       
        .catch((error) => {
            console.log(error);
            spinner.classList.add('hidden');
            cardContainer.classList.remove('hidden');
        });
}


let allCards = [];
const loadCard2 = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => {
            allCards = data.pets;
            displayCards(allCards)
        })
        .catch((error) => console.log(error));
}


// api details pet
const loadPets =async (id) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData);
};

const displayDetails = (details) => {
    const detailsContainer = document.getElementById('display-details');
    
    detailsContainer.innerHTML = `
    <img src="${details?.image}" class="rounded-xl w-full  mx-auto" alt="${details?.pet_name}" />
    <h2 class="text-2xl font-bold text-center md:text-left mt-4">${details?.pet_name || 'Unknown'}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <p class="flex items-center"><i class="fas fa-paw mr-2"></i><strong>Breed:</strong> ${details?.breed || 'Not specified'}</p>
        <p class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i><strong>Date of Birth:</strong> ${details?.date_of_birth || 'Not found'}</p>
        <p class="flex items-center"><i class="fas fa-dollar-sign mr-2"></i><strong>Price:</strong> $${details?.price || 'Not specified'}</p>
        <p class="flex items-center"><i class="fa-solid fa-venus mr-2"></i><strong>Gender:</strong> ${details?.gender || 'Not specified'}</p>
        <p class="flex "><i class="fas fa-syringe mr-2"></i><strong>Vaccination Status:</strong> ${details?.vaccinated_status || 'Not Available'}</p>
    </div>
    <hr class="my-4">
    <p class="text-lg md:text-xl"><i class="fas fa-info-circle mr-2"></i><strong>Details Information:</strong> ${details?.pet_details || 'Not available'}</p>
`;



    document.getElementById('my_modal_5').showModal();

}


// like button functionality
const loadLikeButton =async (id) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(uri);
    const data = await res.json();
    displayLikeDetails(data.petData);
};

const displayLikeDetails = (likes) => {
    const detailsLikeContainer = document.getElementById('display-like');


    const likedPetDiv = document.createElement('div');      
    
    likedPetDiv.innerHTML = `
         <img src="${likes?.image}" class="rounded-xl   mx-auto" alt="${likes?.pet_name}" />
    `;
    detailsLikeContainer.appendChild(likedPetDiv);

    
}




const displayCards = (cards) => {
    const cardContainer = document.getElementById('card');
    const likedPetsContainer = document.getElementById('likedPets');
    cardContainer.innerHTML = "";

    if (cards.length == 0) {
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="images/error.webp"/>
        <h2 class=" text-center font-bold text-xl">No Pet are here in this category</h2>
        </div>
        `;
        return;
    }
    else {
        cardContainer.classList.add("grid");
    }

    cards.forEach(card => {

        const readyCard = document.createElement("div");
        readyCard.classList = "card  border";
        readyCard.innerHTML = `
         <figure class="px-5 py-5 ">
     <img
      src=${card.image}
      alt=""
      class="rounded-xl" />
     </figure>
     <div class="card-body py-2">
     <h1 class="text-2xl text-[#131313] font-semibold">${card.pet_name || 'Unknown Pet'}</h1>
     <h3 class="flex items-center mt-1"><i class="fas fa-paw mr-2"></i>Breed:${card.breed || 'Not specified'}</h3>
     <p class="flex items-center"><i class="fas fa-calendar-alt mr-2"></i>Birth:${card.date_of_birth || 'Not found'}</p>

     <p class="flex items-center"><i class="fa-solid fa-venus mr-2"></i></i>Gender:${card.gender || 'Not specified'}</p>
     <p class="flex items-center"><i class="fas fa-dollar-sign mr-2 text-[#131313B3]"></i> Price:${card.price || 'undefined'}</p>
     <hr>
    
     <div class="flex space-x-3 mt-4 justify-between items-center">
     <div onclick="loadLikeButton('${card.petId}')" class="flex justify-between items-center  space-x-3">
     <button class="like-btn rounded py-2 px-2 border" data-pet-id="${card.petId}">
     <i class="fas fa-thumbs-up mr-2"></i></button>
     </div>
     
     <button class="adopt-btn  rounded py-2 px-4 text-[#0E7A81] border font-bold" data-card-id="${card.petId}">
     Adopt</button>
    
     <button onclick="loadPets('${card.petId}')" class="details-btn rounded py-2 px-2 text-[#0E7A81] border font-bold" data-pet-id="${card.petId}">
     Details</button>
        
     
    </div>
  </div>
        
        `;
        cardContainer.append(readyCard);
       
    });

    addAdoptButtonFunctionality();

    
};



// Function to handle adopt button behavior
const addAdoptButtonFunctionality = () => {
    const adoptButtons = document.querySelectorAll('.adopt-btn');


    adoptButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled)
                return;
            const modal = document.getElementById('adoptModal');
            modal.classList.remove('hidden');

            let countdown = 3;
            const countdownElement = document.getElementById('countdown');
            const interval=setInterval(() =>{
                countdownElement.innerText = countdown; 
                countdown--;

                if (countdown < 0) {
                    clearInterval(interval);

                    modal.classList.add('hidden');

                    button.innerText = "Adopted";
                    button.disabled = true;
                    button.classList.add("bg-gray-300","cursor-not-allowed")
                 
                }
            }, 500); 
        });
    });
};
// Sorting function
const sortCardsByPrice = () => {
    const sortedCards = allCards.sort((a, b) => b.price - a.price);
displayCards(sortedCards);
};


document.getElementById('short').addEventListener('click', sortCardsByPrice);

// create displayPets
const displayPets = (categories) => {

    const buttonContainer = document.getElementById('categories');
    buttonContainer.innerHTML = '';
    categories.forEach((item) => {
        console.log(item);
        
        

        // create a button
        const button = document.createElement('button');
        button.classList = "flex space-x-2 p-3 px-12 md:px-6 lg:px-14 border rounded-full bg-[#0E7A81] hover:bg-bg-blue-200 transition duration-300 mb-4";

        button.setAttribute('data-id', item.id);

        // create an image element
        const img = document.createElement('img');
        img.src = item.category_icon;
        img.classList = "category-img";
        img.classList = "w-10 h-10";
        
        const categoryText = document.createElement('span');
        categoryText.classList="font-bold text-lg"

        categoryText.innerText = item.category;


        // show active
        button.addEventListener('click', () => {
          
            document.querySelectorAll('#categories button').forEach(btn => btn.classList.remove('bg-[#0E7A81]','text-white'));
            

            button.classList.add('bg-[#0E7A81]','text-white');
            console.log('click');

            loadCategoryPets(item.category);
        });
        

        // add button to category container
        button.appendChild(img);
        button.appendChild(categoryText);
        buttonContainer.append(button);

    });
};

loadCategories();
loadCard();
loadCard2();




