//*********AFFICHAGE DE LA GALERIE********//
const apiWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works");
    const jsonData = await response.json();
    return jsonData;
};

//**************LOGIN ET LOGOUT BUTTON***********//
const userToken = localStorage.getItem('token');
if(userToken){
    document.querySelector('#logButton').innerHTML = '<a href="javascript:void(0);">Logout</a>';
    
 };
document.querySelector('#logButton').addEventListener('click', (event) => {
    if(event.target.innerText === 'Logout'){
        localStorage.removeItem('token');
        window.location.reload(true);
    }
});
//*************AFFICHAGE DU BANDEAU A LA CONNEXION************//
const userTokenOk = localStorage.getItem('token');
const navigation = document.getElementById('blackHeader');

if (userTokenOk) {
    navigation.style.display = 'flex';
} else {
    navigation.style.display = 'none';
}
//**********AFFICHAGE DES BUTTONS MODIFIER A LA CONNEXION**********//
const modifierMesprojets = document.querySelector('.modify');

if (userTokenOk) {
    modifierMesprojets.style.display = 'flex';
} else {
    modifierMesprojets.style.display = 'none';
}

const modifierPicture = document.querySelector('.modifierpicture');

if (userTokenOk) {
    modifierPicture.style.display = 'flex';
} else {
    modifierPicture.style.display = 'none';
}

/***********************************************/
const getAllWorks = async () => {
    let allWorks = await apiWorks();
    document.querySelector('.gallery').innerHTML = ' ';
    allWorks.forEach(element => {
        const figureElement = document.createElement("figure");
        figureElement.dataset.catid = element.categoryId;

        const imageElement = document.createElement('img');
        imageElement.setAttribute('src', element.imageUrl);
        imageElement.setAttribute('alt', element.title);
       

        const figcaptionELement = document.createElement('figcaption');
        figcaptionELement.innerText = element.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionELement);

        document.querySelector('.gallery').appendChild(figureElement);

    });
}
//****************FILTRES****************//
const apiFilter = async () => {
    const response = await fetch("http://localhost:5678/api/categories");
    const jsonData = await response.json();
    return jsonData;
}

const getAllCategories = async () => {
    let allcategories = await apiFilter();

    const boutonTous = document.createElement("button");
    boutonTous.textContent = "Tous";
    boutonTous.classList.add('filter');
    boutonTous.dataset.catid = 0;
    document.querySelector('.filters').appendChild(boutonTous);

    allcategories.forEach(element => {
        const buttonCat = document.createElement('button');
        buttonCat.textContent = element.name;
        buttonCat.classList.add('filter');
        buttonCat.dataset.catid = element.id;
        document.querySelector('.filters').appendChild(buttonCat);
    });

    filterEvent();
}

const filterEvent = () => {
    Array.from(document.querySelectorAll('.filter')).forEach(element => {
        element.addEventListener('click', (e) => {
            const categorySelected = parseInt(e.target.dataset.catid);
            //console.log('Je sélectionne ma catégorie ', categorySelected);
            Array.from(document.querySelectorAll('figure')).forEach(element => {
                if(categorySelected === 0){
                    element.style.display = 'grid';
                }else{
                    if(parseInt(element.dataset.catid) !== categorySelected){
                        element.style.display = 'none';
                    }else{
                        element.style.display = 'grid';
                    }
                }

            });
        });
    });
}

getAllWorks();
getAllCategories();


//*********************MODALE 1********************//
const openModal = (e) => {
    e.preventDefault();
    const target = document.querySelector('.modal');
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal','true');
    document.querySelector('.modal-modifier').innerHTML = ' ';
    getModalWorks();
};

Array.from(document.querySelectorAll('.js-modal')).forEach(a => {
    a.addEventListener('click', openModal);
});

const closeModal = (e) => {
    e.preventDefault();
    const target = document.querySelector('.modal');
    target.style.display = 'none';
    target.setAttribute('aria-hidden','true');
    target.removeAttribute('aria-modal');
};

Array.from(document.querySelectorAll('.close-modal')).forEach(a => {
   a.addEventListener('click', closeModal);
});


const apiModalWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works");
    const jsonData = await response.json();
    return jsonData;
}

const getModalWorks = async () => {
    let modalWorks = await apiModalWorks();

    modalWorks.forEach(element => {

        const figureElement = document.createElement("figure");
        figureElement.dataset.catid = element.categoryId;

        const deleteELement = document.createElement('span');
        deleteELement.classList.add('deleteElement');
        deleteELement.dataset.id = element.id;
        console.log('Delete Element', deleteELement);
        deleteELement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>';
        figureElement.appendChild(deleteELement);


        const imageElement = document.createElement('img');
        imageElement.setAttribute('src', element.imageUrl);
        figureElement.appendChild(imageElement);

        const editerElement = document.createElement('div');
        editerElement.innerText = 'éditer';
        figureElement.appendChild(editerElement);

        const sectionModal = document.querySelector('.modal-modifier');
        sectionModal.appendChild(figureElement);

    });

    deleteEventListener();

}

//********************DELETE PICTURES***************//
const deleteEventListener = async (e) => {
    Array.from(document.querySelectorAll('.deleteElement')).forEach(element => {
        element.addEventListener('click', async (event) => {
            const idWorks = parseInt(event.target.closest('span').dataset.id);
            const userToken = localStorage.getItem('token');
            console.log('Delete ID Works', idWorks, event.target.tagName,userToken);
            if (!isNaN(idWorks)) {
                const deleteApi = await fetch(`http://localhost:5678/api/works/${idWorks}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    }
                });
                const dateRes = await deleteApi.json();

                const modalElement = document.querySelector(`span[data-id="${idworks}"]`);
                if (modalElement) {
                    modalElement.remove();
                }

                const homepageElement = document.querySelector(`div[data-id="${idworks}"]`);
                if (homepageElement) {
                    homepageElement.remove();
                }
            }

        });
    });
}

//********************MODALE2*********************//
const openSecondeModal = (e) => {
    e.preventDefault();
    const open = document.querySelector('.secondmodal');
    open.style.display = 'flex';
    open.removeAttribute('aria-hidden');
    open.setAttribute('aria-modal','true');
    console.log('opensecondemodal');
    const close = document.querySelector('.modal');
    close.style.display = 'none';
    console.log('closefirstmodal');

    
};
Array.from(document.querySelectorAll('.buttonajouter')).forEach(a => {
    a.addEventListener('click', openSecondeModal);
});

//****************MODALE2 RETURN**********//

const returnSecondeModal = (e) => {
    e.preventDefault();
    const arrowReturn = document.querySelector('.modal');
    arrowReturn.style.display = 'flex';
    arrowReturn.removeAttribute('arria-hidden');
    arrowReturn.setAttribute('aria-modal','true');
    const closeSecondModal = document.querySelector('.secondmodal');
    closeSecondModal.style.display = 'none';
};
Array.from(document.querySelectorAll('.return-modal2')).forEach(a => {
    a.addEventListener('click',returnSecondeModal);
});

//****************MODALE2 CLOSE**************//

const closeSecondModal = (e) => {
    e.preventDefault();
    const target = document.querySelector('.secondmodal');
    target.style.display = 'none';
    target.setAttribute('aria-hidden','true');
    target.removeAttribute('aria-modal');
};

Array.from(document.querySelectorAll('.close-modal2')).forEach(a => {
   a.addEventListener('click', closeSecondModal);
});


/* Add media with post method */
const form = document.querySelector('#addMedias');
const photoInput = addMediasForm.querySelector('input[name="imageUrl"]');
const previewImage = addMediasForm.querySelector('#previewImage');

photoInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        // Affichez l'image sélectionnée dans l'élément <img> de prévisualisation
        previewImage.style.display = 'flex';
        previewImage.src = URL.createObjectURL(selectedFile);
    } else {
        // Cachez l'élément <img> de prévisualisation si aucune image n'est sélectionnée
        previewImage.style.display = 'none';
    }
});
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérer le fichier depuis l'input file
    const imageInput = document.querySelector('.ajouterphoto');
    const imageFile = imageInput.files[0];

    // Créer un objet FormData et y ajouter les données
    const formData = new FormData();
    formData.append('title', document.querySelector('#titre').value);
    formData.append('category', document.querySelector('#categoryId').value);
    formData.append('image', imageFile); // Ajouter le fichier image


    const userToken = localStorage.getItem('token');
    const addPictureApi = await fetch(`http://localhost:5678/api/works`,{
        method: 'POST',
        headers: {'Authorization': `Bearer ${userToken}`,},
        body: formData,
    });

    // Réinitialisez la prévisualisation de l'image
    previewImage.style.display = 'none';
    previewImage.src = '';

    // Reset the form
    form.reset();

    /* Reuse the function to see the works */
    getAllWorks();
    
});


