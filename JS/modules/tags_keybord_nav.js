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
  } else if (e.which !== 37 && e.which !== 38 && e.which !== 39 && e.which !== 40) {
    //other than arrows, BTW TAB and shift+TAB will go to next previous or focusable elements (but not to the buttons because of tabindex=-1)
    return
  } else {
    //arrows
    e.preventDefault();
    const oldPosition = focusableElementsArray.findIndex((el) => el === e.target);
    let newPosition = oldPosition;
    const lastElement = focusableElementsArray.length - 1;
    if (e.which === 38) {
       //up arrow
      newPosition--;
      if (newPosition < 0) {
        //exit the loop and go to the input field
        const category = e.target.dataset.category;
        document.querySelector(`.searchedtag__input[data-category=${category}]`).focus();
        return;
      }
    } else if (e.which === 40) {
      //down arrow
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
          newPosition = lastElement - (lastElement % 10) + oldPosition;
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
    //set the new position
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
  //removes it on loose of focus
  tagGrid.addEventListener("focusout", function (event) {
    if (!tagGrid.contains(event.relatedTarget)) {
      tagGrid.removeEventListener("keydown", keyLog);
    }
  });
}
