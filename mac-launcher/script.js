const icons = document.querySelectorAll('.icon');
const folderIcons = document.querySelectorAll('.icon-folder');
const anySmallIcon = document.querySelector('.icon-in-folder');

const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

const iconsProps = {
  rowNumber: 7,
  colNumber: 4,
  width: icons[0].offsetWidth,
  height: icons[0].offsetHeight,
  fieldWidth: windowWidth,
  fieldHeight: windowHeight,
};

const iconsInFolderProps = {
  rowNumber: 7,
  colNumber: 4,
  width: iconsProps.width,
  height: iconsProps.height,
  fieldWidth: iconsProps.fieldWidth*.8,
  fieldHeight: iconsProps.fieldHeight*.8,
};

const smallIconsProps = {
  rowNumber: 3,
  colNumber: 3,
  width: anySmallIcon.offsetWidth,
  height: anySmallIcon.offsetHeight,
  fieldWidth: folderIcons[0].offsetWidth,
  fieldHeight: folderIcons[0].offsetHeight,
}

input.style.top = (input.offsetHeight*1.3) + 'px';

placeIcons(icons, iconsProps);

folderIcons.forEach((icon, index) => {
  icon.addEventListener('click', function() {
    if (!launcher.classList.contains('folder-opened')) {
      closeActiveFolders();

      const iconsInFolder = icon.querySelectorAll('.icon-in-folder');
      iconsInFolderProps.colNumber = Math.ceil(iconsInFolder.length/iconsInFolderProps.rowNumber);
      iconsInFolderProps.fieldHeight = iconsInFolderProps.height*(iconsInFolderProps.colNumber + 2);
      placeIcons(iconsInFolder, iconsInFolderProps);

      this.classList.add('icon-folder-active');
      this.style.height = iconsInFolderProps.fieldHeight + 'px';
      this.style.top = (windowHeight/2 - iconsInFolderProps.fieldHeight/2) + 'px';

      launcher.classList.add('folder-opened');
    } else {
      closeActiveFolders();
    }
  });
});

bg.addEventListener('click', e => {
  closeActiveFolders();
});

window.addEventListener('keyup', e => {
  const keyCodes = {
    escape: 27
  };

  if (e.keyCode === keyCodes.escape) {
    closeActiveFolders();
  }
});

function closeActiveFolders() {
  folderIcons.forEach(icon => {
    icon.classList.remove('icon-folder-active');
    icon.style.top = icon.dataset.initialTop;
    icon.style.height = icon.dataset.initialHeight;

    const iconsInFolder = icon.querySelectorAll('.icon-in-folder');
    placeIcons(iconsInFolder, smallIconsProps);
  });


  launcher.classList.remove('folder-opened');
}

function placeIcons(icons, props) {
  const {
    rowNumber,
    colNumber,
    width,
    height,
    fieldWidth,
    fieldHeight,
  } = props;

  console.log(fieldHeight, height, colNumber)
  const gapSizeX = (fieldWidth - width*rowNumber)/(rowNumber + 2);
  const gapSizeY = (fieldHeight - height*colNumber)/(colNumber + 2);
  const paddingX = gapSizeX*1.5;
  const paddingY = gapSizeY*1.2;

  icons.forEach((icon, index) => {
    const i = index%rowNumber;
    const j = parseInt(index/rowNumber);
    icon.style.left = `${paddingX + (gapSizeX + width)*i}px`;
    icon.style.top = `${paddingY + (gapSizeY + height)*j}px`;
    icon.dataset.initialTop = icon.style.top;
    icon.dataset.initialHeight = icon.style.height;

    if (icon.classList.contains('icon-folder')) {
      const iconsInFolder = icon.querySelectorAll('.icon-in-folder');
      placeIcons(iconsInFolder, smallIconsProps);
    }
  });
}