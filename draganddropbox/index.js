window.onload = () => {
    function preventDefaultActions(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function highlight(e, dropArea) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e, dropArea) {
        dropArea.classList.remove('highlight')
    }

    function handleDrop(event) {
        // this pickups the parent form of an element
        let parentNode = event?.srcElement?.parentElement?.parentElement;
        let uploadFiles = event.dataTransfer;
        // set let form to EVENTS PARENT NODE
        let formData = new FormData(parentNode);
        formData.append('file', uploadFiles);
    }

    const DRAG_AND_DROP_BOX_CLASS = 'dragAndDropBox';
    let dragAndDropBoxes = document.getElementsByClassName(DRAG_AND_DROP_BOX_CLASS);
    Array.from(dragAndDropBoxes).forEach((dropBox, index) => {
        const actions = ['dragenter', 'dragover', 'dragleave', 'drop'];
        const dragActions = ['dragenter', 'dragover'];
        const dragAwayActions = ['dragleave', 'drop'];
        let inputWrapper = document.createElement('div');
        let inputField = document.createElement('input');
        actions.forEach(key => {
            inputWrapper.addEventListener(key, preventDefaultActions, false);
        });
        dragActions.forEach(key => {
            inputWrapper.addEventListener(key, e => highlight(e, inputWrapper), false)
        });
        dragAwayActions.forEach(key => {
            inputWrapper.addEventListener(key, e => unhighlight(e, inputWrapper), false);
        });
        inputWrapper.addEventListener('drop', handleDrop, false)
        inputField.type = 'file';
        inputField.name = 'file';
        inputWrapper.className = 'dragAndDropBox-input-wrapper';
        inputWrapper.appendChild(inputField);

        dropBox.appendChild(inputWrapper);
    });
};
