const productJsonRootUrl = "https://sdwebau.shopainternal.com/json/";

// Get the productname from the URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("productName");

const jsonUrl = `${productJsonRootUrl}${productName}.json`;
console.log(jsonUrl);

const resultContainer = document.getElementById("resultContainer");

async function getProduct() {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const productJson = await response.json();

    const imgUrl = `https://sdwebau.shopainternal.com/images/coupons/${productJson.ImageUri}`;

    console.log(imgUrl);
    const setCtas = getCTA(productJson);
    const setLocations = getLocation(productJson);

    const setContacts = getContacts(productJson);
    // Create HTML elements to display the nested fetch response
    const nestedDataDiv = document.createElement("div");

    function addPropertyIfExists(property, template) {
      if (property !== null) {
        return template;
      }
      return "";
    }
    nestedDataDiv.innerHTML = `

                                  <!-- /.first row start  -->
                                  <div class="row  shadow-lg m-5 py-2  bg-white"> 
                                          <div class=" row  py-2   ">  
                                          <div class="col-lg-4 ">
                                           <img src="${imgUrl}"{
                                            productJson.ImageUri
    }" class="img-fluid rounded m-3" alt="${productJson.Headline} with ${
      productJson.Advertiser
    }">
                                          </div>
                                      
                                          <div class="col-lg-8">
                                              <div class="card-body m-3  ">
                                              <h1 class="card-title">${
                                                productJson.Headline
                                              }</h1>
                                              <h5 class="card-title">${
                                                productJson.Advertiser
                                              }</h5>
                                             <!-- <p class="card-text pt-3"><i class="fas fa-fw fa-tag"></i> ${
                                               productJson.Saving
                                             }</p> -->
                                              ${setLocations}
                                              ${addPropertyIfExists(
                                                productJson.ValidUntil,
                                                `<p class="card-text mt-3"><i class="far fa-fw fa-clock"></i> ${productJson.ValidUntil}</p> `
                                              )}
                                              ${setCtas}
        
                                              <div class="d-flex justify-content-between">
                                              <div><a class=" mt-3 btn btn-outline-light text-dark " href="#"><i class="fa fa-fw fa-print"></i> Print Offer</a> </div>
                                              <div class="pt-4"><span class="m-4" ><i class="far fa-fw fa-heart"></i></span></div>
                                            </div> 
                                              
                                                  
                                              </div>
                                          </div>
                              
                                          </div>  
                              
                                  <!-- /.first row end -->
                              
                                  <!-- /.inner nav -->
                              
                                  <nav class="navbar navbar-expand-lg navbar-light navbar-collapse ">
                                          <div class="container-fluid border-top border-bottom py-2 px-5">
                                      <span class="navbar-text fw-bold ">
                                      Navigate to:
                                  </span>
                                      
                                      <div class="collapse navbar-collapse" >
                                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold " href="#offerDetails">Offer Details</a>
                                          </li>
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold" href="#aboutAdvertiser">About ${
                                            productJson.Advertiser
                                          } </a>
                                          </li>
                              
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold" href="#contact"> Contact </a>
                                          </li>
                              
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold" href="#terms"> Terms & Conditions </a>
                                          </li>
                                                  
                                      </ul>
                                      <div class="d-flex">
                              
                                          <span class="pt-2 fw-bold">Share this offer:</span>
                                      <div class="btn-group" role="group" aria-label="Share buttons">
                                      
                                      <a href="#" class="btn btn-outline-light text-dark " target="_blank" rel="noopener noreferrer">
                                          <i class="fab fa-facebook-f"></i> 
                                      </a>
                                      <a href="#" class="btn btn-outline-light text-dark" target="_blank" rel="noopener noreferrer">
                                          <i class="fab fa-twitter"></i>
                                      </a>
                                      <a href="#" class="btn btn-outline-light text-dark">
                                          <i class="fas fa-envelope"></i> 
                                      </a>
                                      </div>
                              
                                          
                                      </div>
                                      </div>
                                  </div>
                              </nav>
                              
                              <!-- /.inner nav end -->
                              
                              
                              <!-- /.offer detail start  -->

                              ${addPropertyIfExists(
                                productJson.Detail,
                                `                              
                              <div class="row m-2 pt-2 border-bottom " id="offerDetails" >
                              <h4 class="text-danger" >Offer Details</h4>
                                  <div class="ms-3"> ${productJson.Detail} </div>
                              
                                 
                              </div> `
                              )}
                              
                              <!-- /.offer detail end  -->
                              
                              <!-- / About  start  -->

                              
                              ${addPropertyIfExists(
                                productJson.About,

                                `<div class="row m-2 pt-2 border-bottom " id="offerDetails" >
                              
                                 <h4 class="text-danger" id="aboutAdvertiser">About ${productJson.Advertiser}</h4>
                                 
                                  <div class="ms-3 pb-4"> ${productJson.About} </div>
                              
                                 
                              </div> `
                              )}
                              
                              <!-- / About  end  -->
                              
                              <!-- / Contact Details start  -->
                              
                              <div class="row m-2 pt-2 border-bottom " id="contact" >
                              
                                 <h4 class="text-danger" id="aboutAdvertiser">Contact Details</h4>
                                 <span>Click address to view on Google Maps.</span>
                                 <div class="ms-3 pb-4"> Contacts ${setContacts} </div>
                              
                                 
                              </div>
                              
                              <!-- /Contact Details  end  -->
                              
                              
                              
                              
                              <!-- /  Terms & Conditions  start  -->

                              ${addPropertyIfExists(
                                productJson.Terms,

                                `<div class="row m-2 pt-2  " id="offerDetails" >
                              
                                 <h4 class="text-danger" id="terms"> ${productJson.Advertiser} Terms & Conditions</h4>
                                 <div class="ms-3 pb-4"> ${productJson.Terms} </div>
                              
                                 
                              </div> `
                              )}
                              
                              <!-- / Terms & Conditions  end  -->
                                                          
                                                            
                                  
                              </div>


                                  `;

    resultContainer.innerHTML = "";
    resultContainer.appendChild(nestedDataDiv);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getProduct();

function getCTA(productJson) {
  return productJson.Ctas.map((cta) => {
    if (cta.Type === "Phone") {
      return `<a class="btn btn-danger me-2 joinbtn" href="tel:${cta.Link}"><i class="fas fa-fw fa-phone-alt"></i> ${cta.Text}</a>`;
    } else if (cta.Type === "Email") {
      return `<a class="btn btn-danger joinbtn" href="mailto:${cta.Link}"><i class="fas fa-fw fa-${cta.Icon}"></i> ${cta.Text}</a>`;
    }
  }).join("");
}

function getLocation(productJson) {
  if (!productJson.Locations) {
    return "";
  }

  return productJson.Locations.filter(
    (location) =>
      location.LocationType === "Address" && location.Address1 !== null
  )
    .map(
      (location) =>
        `<p><i class="fas fa-fw fa-map-marker-alt"></i><span>${location.Address1}</span> </p>`
    )
    .join("");
}

function getContacts(productJson) {
  if (!productJson.Contacts) {
    return "";
  }

  return productJson.Contacts.map((contact) => {
    return contact.ContactType === "Address"
      ? `<a href="${contact.ContactLink}" target="_blank" class="nav-link"><i class="fas fa-fw fa-map-marker-alt pt-4"></i> ${contact.ContactMethod}</a> <br>`
      : contact.ContactType === "Phone"
      ? `<a href="${contact.ContactLink}" class="nav-link"><i class="fas fa-fw fa-phone-alt "></i> ${contact.ContactMethod}</a> <br>`
      : contact.ContactType === "Web"
      ? `<a href="${contact.ContactLink}" target="_blank"><button type="button" class="btn btn-danger loginbtn "><i class="fas fa-fw fa-globe "></i> ${contact.ContactMethod}</button></a>`
      : "";
  }).join("");
}

/* Copyright currentYear */
var currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

/* back to top */

window.addEventListener("scroll", function () {
  var backToTopButton = document.getElementById("backToTopButton");
  backToTopButton.classList.toggle("show", window.scrollY > 50);
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
