// define all variables and calling them in JS as first step : 

var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var bookMarkerContainer = [];
var nameError = document.getElementById('nameError')



if(localStorage.getItem('sites') != null)
{
    bookMarkerContainer = JSON.parse(localStorage.getItem('sites'));
    displaySiteUrl(bookMarkerContainer);
} 





function addSite()
{
    if(validateSiteName() || validateUrlName() == true)
    {
        var sites = {
            name:siteNameInput.value,
            url:siteUrlInput.value,
        }
    
        bookMarkerContainer.push(sites);
        localStorage.setItem('sites', JSON.stringify( bookMarkerContainer ) );
        displaySiteUrl(bookMarkerContainer);
        clearForm();
    }
    validateSiteName();
    validateUrlName();

}




function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}





function displaySiteUrl(arr)
{
    var tableContainer = ``;

    for ( var i = 0 ; i < arr.length; i++)
    {
        tableContainer += `<tr>
        <td>${arr[i].name}</td> 
        <td><button class="btn btn-info ms-3"><a class="text-decoration-none text-white" href="${arr[i].url}">Visit</a></button></td>
        <td><button onclick="deleteBookmark(${i});" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = tableContainer;

}


function deleteBookmark(sitesIndex)
{
    bookMarkerContainer.splice(sitesIndex,1);
    localStorage.setItem('sites', JSON.stringify( bookMarkerContainer ) );
    displaySiteUrl(bookMarkerContainer);
}


function validateSiteName()
{
    var regex = /^[A-Z][a-z]{3,8}$/;

    if(regex.test(siteNameInput.value) == true)
    {
        nameError.classList.replace('d-block' , 'd-none')
        return true;
    }
    else{
        nameError.classList.replace('d-none' , 'd-block')
        return false;
    }
}

function validateUrlName()
{
    var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    if(regex.test(siteUrlInput.value) == true)
    {
        urlError.classList.replace('d-block' , 'd-none')
        return true;
    }
    else{
        urlError.classList.replace('d-none' , 'd-block')
        return false;
    }
}