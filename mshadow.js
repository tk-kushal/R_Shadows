const shadowElements = document.getElementsByClassName('m-shadow')
let shadowProperties = [];
let mouseX, mouseY

function getElementPrpperties() {
  shadowProperties = [];
  for (let i = 0; i < shadowElements.length; i++) {
    let elmboxshadow = getComputedStyle(shadowElements[i]).boxShadow;
    let colorend = elmboxshadow.lastIndexOf(")") + 1;
    let shadowColor = elmboxshadow.substring(0, colorend);
    let posX = elmboxshadow.indexOf("x", colorend);
    let posY = elmboxshadow.indexOf("x", posX + 1);
    let shadowBlur = elmboxshadow.substring(
      posY + 1,
      elmboxshadow.indexOf("p", posY + 1)
    );
    shadowProperties.push({ color: shadowColor, blur: shadowBlur });
  }
}


//Update shadows on mouse move
addEventListener('mousemove', (e) => {
  mouseX = e.x
  mouseY = e.y
  mShadows(mouseX, mouseY)
})
//Update shadows on scroll
addEventListener('scroll', () => {
  mShadows(mouseX, mouseY)
})

// Shadow function
function mShadows(
  pointerX,
  pointerY,
  color = 'rgba(100, 100, 100, 0.3)',
  blur = 0,
  verticalMovement = 10,
  horizontalMovement = 8,
) {
  if (
    !shadowProperties.length &&
    document.getElementsByClassName("m-shadow")[0]
  ) {
    getElementPrpperties();
  }
  for (let i = 0; i < shadowElements.length; i++) {
    let element = shadowElements[i].getBoundingClientRect()
    let normalizeY = pointerY - element.top - element.height / 2
    let normalizeX = pointerX - element.left - element.width / 2
    if (shadowElements[i].style.opacity != '0')
      shadowElements[i].style.boxShadow = `${
        -normalizeX / (100 / horizontalMovement)
      }px ${-normalizeY / (100 / verticalMovement)}px ${shadowProperties[i].blur!=0?shadowProperties[i].blur:blur}px ${0}px ${shadowProperties[i].color?shadowProperties[i].color:color}`
  }
}
