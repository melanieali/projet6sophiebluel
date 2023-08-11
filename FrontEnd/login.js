    function ajoutListenerConnexion() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", async function(event){
        event.preventDefault();

        const connect =  {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=motdepasse]").value,
        };

        const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(connect),
    });
        const jsonData = await reponse.json();
        console.log(jsonData); 

        if(jsonData.token){
            console.log('Token validé');
            localStorage.setItem('token', jsonData.token);
            window.location.href = 'index.html';
            elementUl.getElementsByClassName('login').innerText = 'Logout';
        }else{
            console.log('Erreur de connexion');
           alert('Erreur de connexion : Merci de vérifier l\'email et/ou le mot de passe');
        }
    
    });
}

ajoutListenerConnexion();



