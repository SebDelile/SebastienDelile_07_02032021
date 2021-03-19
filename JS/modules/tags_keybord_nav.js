//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//trap the keyboard tab navigation by allowing only tab navigation within the element in the grid
let keyLog = function (e) {
  if (e.which === 27) {
    //ESC
    //exit the loop and go to the input field
    const category = e.target.dataset.category;
    document.querySelector(`.searchedtag__input[data-category=${category}]`).focus();
  } else if (e.which !== 9 && e.which !== 37 && e.which !== 38 && e.which !== 39 && e.which !== 40) {
    //TAB or arrows
  } else {
    e.preventDefault();
    const oldPosition = focusableElementsArray.findIndex((el) => el === e.target);
    let newPosition = oldPosition;
    const lastElement = focusableElementsArray.length - 1;
    if ((e.which === 9 && e.shiftKey) || e.which === 38) {
      //shift tab or up arrow
      newPosition--;
      if (newPosition < 0) {
        //exit the loop and go to the input field
        const category = e.target.dataset.category;
        document.querySelector(`.searchedtag__input[data-category=${category}]`).focus();
        return;
      }
    } else if (e.which === 9 || e.which === 40) {
      //shift tab or down arrow
      newPosition++;
      if (newPosition > lastElement) {
        focusableElementsArray[0].focus();
      }
    } else if (e.which === 37 && lastElement >= 10) {
      //left arrow (only if more than 10 elements)
      newPosition -= 10;
      if (newPosition < 0) {
        //go to last element, or go to last column same row
        if (oldPosition % 10 > lastElement % 10) {
          newPosition = lastElement;
        } else {
          newPosition = (lastElement % 10) + oldPosition;
        }
      }
    } else if (e.which === 39 && lastElement >= 10) {
      //right arrow (only if more than 10 elements)
      newPosition += 10;
      if (newPosition > lastElement) {
        //go to last element, or go to 1st column same row
        if (oldPosition !== lastElement) {
          newPosition = lastElement;
        } else {
          newPosition = lastElement % 10;
        }
      }
    }
    //not working....
    console.log(oldPosition);
    console.log(lastElement);
    console.log(newPosition);
    console.log(focusableElementsArray[newPosition]);
    focusableElementsArray[newPosition].focus();
  }
};

//--------------------------------------------------------------------------------------------
//------------------------------------ variables ---------------------------------------------
//--------------------------------------------------------------------------------------------

//is the list of the elements that should receive focus in the modal
const focusableElementsTemplate = ["[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'];

//is the list of the element in the grid that matches the template
let focusableElementsArray = [];

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//collect all focusable elements and gives focus to first one
export function tagKeyboardNavigation(tagGrid) {
  const focusableElements = tagGrid.querySelectorAll(focusableElementsTemplate);
  focusableElementsArray = [];
  for (let focusableElement of focusableElements) {
    focusableElementsArray.push(focusableElement);
    if (focusableElementsArray.length === 30) {
      break;
    }
  }
  focusableElementsArray[0].focus();
  //trapps focus inside the modal
  tagGrid.addEventListener("keydown", keyLog);
  tagGrid.addEventListener("focusout", function (event) {
    if (!tagGrid.contains(event.relatedTarget)) {
      tagGrid.removeEventListener("keydown", keyLog);
    }
  });
}
