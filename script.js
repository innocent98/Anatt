document.addEventListener("DOMContentLoaded", function () {
  initializeCarousel();
  servicesCard();
  nouvelleCard();
  menuComponent();
  contactModal();
});

// carousel slide
async function initializeCarousel() {
  const track = document.querySelector(".carousel__track");

  // Fetch data from the JSON file
  const response = await fetch("/jsons/slides.json");
  const slidesData = await response.json();

  // Create slides dynamically based on fetched data
  slidesData.forEach((slide) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add(
      "carousel__slide",
      "flex",
      "flex-col",
      "lg:flex-row",
      "min-w-full",
      "transition",
      "duration-500"
    );

    const imgElement = document.createElement("img");
    imgElement.src = slide.src;
    imgElement.alt = slide.alt;
    imgElement.classList.add(
      "lg:w-[75%]",
      "w-[100%]",
      "lg:h-full",
      "h-[250px]"
    );

    const contentDiv = document.createElement("div");
    contentDiv.classList.add(
      "bg-primary",
      "p-4",
      "flex",
      "flex-col",
      "items-center",
      "gap-6",
      "lg:gap-10",
      "w-[100%]",
      "lg:w-[25%]",
      "h-[100%]"
    );

    const textElement = document.createElement("p");
    textElement.classList.add(
      "text-white",
      "text-lg",
      "md:text-2xl",
      "font-bold"
    );
    textElement.innerText = slide.text;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add(
      "text-white",
      "py-2",
      "px-4",
      "font-bold",
      "text-lg",
      "rounded-lg",
      "lg:mt-20",
      "w-48",
      "sm:w-80",
      "lg:w-48",
      "bg-secondary"
    );
    buttonElement.innerText = "En savoir plus";

    const navDiv = document.createElement("div");
    navDiv.classList.add(
      "flex",
      "w-36",
      "sm:w-48",
      "justify-between",
      "lg:mt-10"
    );

    const backButton = document.createElement("div");
    backButton.classList.add(
      "border-secondary",
      "flex",
      "items-center",
      "justify-center",
      "h-10",
      "w-10",
      "border",
      "rounded-full",
      "cursor-pointer"
    );
    backButton.innerHTML =
      '<span class="material-symbols-outlined text-white" id="prevButton">arrow_back</span>';

    const forwardButton = document.createElement("div");
    forwardButton.classList.add(
      "border-secondary",
      "flex",
      "items-center",
      "justify-center",
      "h-10",
      "w-10",
      "border",
      "rounded-full",
      "cursor-pointer"
    );
    forwardButton.innerHTML =
      '<span class="material-symbols-outlined text-white" id="nextButton">arrow_forward</span>';

    navDiv.appendChild(backButton);
    navDiv.appendChild(forwardButton);

    contentDiv.appendChild(textElement);
    contentDiv.appendChild(buttonElement);
    contentDiv.appendChild(navDiv);

    slideElement.appendChild(imgElement);
    slideElement.appendChild(contentDiv);

    track && track.appendChild(slideElement);

    // Attach event listeners to the buttons
    backButton.addEventListener("click", () => {
      stopAutoSlide();
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      moveToSlide(currentIndex);
      startAutoSlide();
    });

    forwardButton.addEventListener("click", () => {
      stopAutoSlide();
      currentIndex = (currentIndex + 1) % slideCount;
      moveToSlide(currentIndex);
      startAutoSlide();
    });
  });

  const slides = track && Array.from(track.children);
  const slideCount = slides && slides.length;
  let currentIndex = 0;
  const intervalTime = 3000;
  let intervalId;

  const moveToSlide = (index) => {
    if (track) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      moveToSlide(currentIndex);
    }, intervalTime);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalId);
  };

  // Initial start of auto sliding
  startAutoSlide();
}

// service
async function servicesCard() {
  const serviceContainer = document.querySelector(".service_container");
  const serviceCardContent = document.getElementById("service_card_content");
  const serviceCardTitle = document.getElementById("service_card_title");

  let currentServiceItem = 1;

  // Fetch data from the JSON file
  const response = await fetch("/jsons/services.json");
  const servicesData = await response.json();

  // Loop through the data and create service items
  servicesData.forEach((service, index) => {
    // Create elements for each service item
    const serviceItem = document.createElement("div");
    serviceItem.classList.add(
      "flex",
      "items-center",
      "gap-2",
      currentServiceItem === index + 1 ? "bg-primary" : "bg-transparent",
      "rounded-2xl",
      currentServiceItem === index + 1 ? "border-secondary" : "border-primary",
      "border-2",
      "w-full",
      "px-2",
      "pr-6",
      "py-3",
      "cursor-pointer",
      currentServiceItem === index + 1 ? "text-white" : "text-primary",
      "hover:text-white",
      "hover:bg-primary",
      "ease-in",
      "duration-300"
    );

    if (currentServiceItem === index + 1) {
      if (serviceCardContent && serviceCardTitle) {
        serviceCardContent.innerText = service.text;
        serviceCardTitle.innerText = service.title;
      }
    }

    const imgElement = document.createElement("img");
    imgElement.src = service.imageUrl;
    imgElement.alt = service.title;
    imgElement.classList.add("h-[80px]", "w-[80px]", "object-contain");

    const pElement = document.createElement("p");
    pElement.classList.add("text-[16px]", "font-semibold");
    pElement.textContent = service.title;

    // Append elements to the service item
    serviceItem.appendChild(imgElement);
    serviceItem.appendChild(pElement);

    // Click event listener for each service item
    serviceItem.addEventListener("click", () => {
      // Remove active class from previously clicked service item
      const prevActiveItem = serviceContainer.querySelector(".bg-primary");
      if (prevActiveItem) {
        prevActiveItem.classList.remove("bg-primary");
        prevActiveItem.classList.add("bg-transparent");
        prevActiveItem.classList.remove("border-secondary");
        prevActiveItem.classList.add("border-primary");
        prevActiveItem.classList.remove("text-white");
        prevActiveItem.classList.add("text-primary");
      }

      // Add active class to the clicked service item
      serviceItem.classList.remove("bg-transparent");
      serviceItem.classList.add("bg-primary");
      serviceItem.classList.remove("border-primary");
      serviceItem.classList.add("border-secondary");
      serviceItem.classList.remove("text-primary");
      serviceItem.classList.add("text-white");

      // Update currentServiceItem to index + 1 (1-based index)
      currentServiceItem = index + 1;

      if (currentServiceItem === index + 1) {
        serviceCardContent.innerText = service.text;
        serviceCardTitle.innerText = service.title;
      }
    });

    // Append service item to the container
    serviceContainer && serviceContainer.appendChild(serviceItem);
  });
}

// nouvelle
async function nouvelleCard() {
  const nouvelleContainer = document.getElementById("nouvelle_container");

  // Fetch data from the JSON file
  const response = await fetch("/jsons/nouvelle.json");
  const nouvelleData = await response.json();

  // Loop through the data and create service items
  nouvelleData.forEach((nouvelle, index) => {
    // Create elements for each service item
    const nouvelleItem = document.createElement("div");

    nouvelleItem.classList.add(
      "h-full",
      "w-[350px]",
      "flex",
      "flex-col",
      "flex-shrink-0"
    );

    const imgElement = document.createElement("img");
    imgElement.src = nouvelle.img;
    imgElement.alt = nouvelle.type;
    imgElement.classList.add(
      "h-[70%]",
      "w-full",
      "object-cover",
      "rounded-t-lg"
    );

    const contentContainerElement = document.createElement("div");
    contentContainerElement.classList.add(
      "bg-primary",
      "w-full",
      "h-[30%]",
      "rounded-b-lg",
      "p-2",
      "shadow-md",
      "text-white"
    );

    const dateContenetContainerElement = document.createElement("div");
    dateContenetContainerElement.classList.add(
      "flex",
      "justify-between",
      "font-semibold",
      "text-[16px]"
    );

    const dateElement = document.createElement("div");
    dateElement.textContent = nouvelle.date;

    const typeElement = document.createElement("div");
    typeElement.textContent = nouvelle.type;

    const dividerElement = document.createElement("div");
    dividerElement.classList.add("bg-white", "h-[1px]", "w-full", "my-2");

    const contentElement = document.createElement("div");
    contentElement.classList.add("text-[14px]");
    contentElement.textContent = nouvelle.text;

    // Append elements to the date content container
    dateContenetContainerElement.appendChild(dateElement);
    dateContenetContainerElement.appendChild(typeElement);

    // Append elements to the content container
    contentContainerElement.appendChild(dateContenetContainerElement);
    contentContainerElement.appendChild(dividerElement);
    contentContainerElement.appendChild(contentElement);

    // Append elements to the nouvelle item
    nouvelleItem.appendChild(imgElement);
    nouvelleItem.appendChild(contentContainerElement);

    // Append nouvelle item to the nouvelleContainer
    nouvelleContainer && nouvelleContainer.appendChild(nouvelleItem);
  });
}

// menu component
function menuComponent() {
  const menu_button = document.getElementById("menu_button");
  const menu_nav_container = document.getElementById("menu_nav_container");

  let isButtonPressed = false;

  if (!isButtonPressed) {
    menu_nav_container.classList.add("invisible");
  }

  menu_button.addEventListener("click", () => {
    isButtonPressed = !isButtonPressed;

    if (!isButtonPressed) {
      menu_nav_container.classList.remove("visible");
      menu_nav_container.classList.add("invisible");
    } else if (isButtonPressed) {
      menu_nav_container.classList.remove("invisible");
      menu_nav_container.classList.add("visible");
    }
  });
}

// contact pop-up modal
function contactModal() {
  const contact_modal = document.getElementById("contact_modal");
  const pop_modal_button = document.getElementById("pop_modal_button");
  const close_contact_modal = document.getElementById("close_contact_modal");

  // display pop-up modal
  pop_modal_button.addEventListener("click", () => {
    contact_modal.classList.remove("hidden");
    contact_modal.classList.add("flex");
  });

  // close pop-up modal
  close_contact_modal.addEventListener("click", (event) => {
    event.preventDefault();

    contact_modal.classList.remove("flex");
    contact_modal.classList.add("hidden");
  });
}
