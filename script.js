document.addEventListener("DOMContentLoaded", () => {
  // mobile here
  // Set up our variables.
  let classChange = "highlight";
  // let dropDown = document.querySelector("section");
  let switchButton = document.querySelector("#example");

  // change.classList.add('class-name','one','two')
  // change.classList.remove('rest','one')
  // change.classList.toggle('rest')

  // Dots scroll here
  // console.log("Divs found:", sections.length);

  // Select all divs you want to observe (better to use a class)
  // const sections = document.querySelectorAll(".scroll-section");
  // console.log("Divs found:", sections.length);

  // const addActiveClass = (entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       console.log("Visible div:", entry.target);
  //       entry.target.classList.add("active"); // Example: add a class
  //     } else {
  //       entry.target.classList.remove("active");
  //     }
  //   });
  // };

  // const options = {
  //   threshold: 0.5,
  // };

  // const observer = new IntersectionObserver(addActiveClass, options);

  // Attach observer to each div
  // sections.forEach((div) => observer.observe(div));

  // figure out how to click one
  // change it to white
  // scroll dow
  // get rid of the other
  // the fist thing is if and the second thing is elese if

  const navButtons = document.querySelectorAll(".dot");

  function highlightButton(targetId) {
    navButtons.forEach((button) => {
      if (button.dataset.target === targetId) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  const buttonObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.id;
          highlightButton(elementId);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-100px 0px",
    }
  );

  const buttonSections = document.querySelectorAll(".section");

  buttonSections.forEach((section) => {
    buttonObserver.observe(section);
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  });

  // tracking a div on top of the mouse
  // event liser is appoy to the whole document
  // and in that case if the event lisener is ture run the following
  // this is where e is defined and the prameter that the data is getting sent to
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  });

  // add a trail

  // varbile that keeps track of the the trail

  // add an array of divs

  // reference the DOM
});
