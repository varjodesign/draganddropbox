window.onload = () => {
    const DRAG_AND_DROP_BOX_CLASS = 'dragAndDropBox';
    let dragAndDropBoxes = document.getElementsByClassName(DRAG_AND_DROP_BOX_CLASS);

    function preventDefaultActions(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function highlight(e, dropArea, inputArea) {
        dropArea.classList.add('highlight');
        inputArea.className = 'dragAndDrop-input-field-active';
    }

    function unHighlight(e, dropArea, inputArea) {
        dropArea.classList.remove('highlight');
        inputArea.className = 'dragAndDrop-input-field-neutral';
    }

    function handleDrop(event, fileList) {
        let dragFiles = event?.dataTransfer?.files;
        dragFiles = Boolean(dragFiles && dragFiles[0]);
        let buttonFiles = event?.srcElement.files;
        buttonFiles = Boolean(buttonFiles && buttonFiles[0]);
        let inputNode = event?.srcElement?.children;
        console.log(event.srcElement);
        if (dragFiles && inputNode && inputNode[0]) {
            let uploadFiles = event?.dataTransfer?.files;
            const inputFile = uploadFiles[0];
            if (inputFile) {
                fileList.innerText = `${inputFile.name} (${inputFile.size}kb)`;
            }
            inputNode = inputNode[0];
            if (uploadFiles && uploadFiles[0]) {
                inputNode.files = uploadFiles;
            }
        } else if (buttonFiles) {
            let inputFile = event.srcElement.files[0];
            fileList.innerText = `${inputFile.name} (${inputFile.size}kb)`;
        }
    }

    Array.from(dragAndDropBoxes).forEach((dropBox, index) => {
        const actions = ['dragenter', 'dragover', 'dragleave', 'drop'];
        const dragActions = ['dragenter', 'dragover'];
        const dragAwayActions = ['dragleave', 'drop'];

        let inputWrapper = document.createElement('div');
        let fileList = document.createElement('div');
        let inputField = document.createElement('input');

        actions.forEach(key => {
            inputWrapper.addEventListener(key, preventDefaultActions, false);
        });

        dragActions.forEach(key => {
            inputWrapper.addEventListener(key, e => highlight(e, inputWrapper, inputField), false)
        });

        dragAwayActions.forEach(key => {
            inputWrapper.addEventListener(key, e => unHighlight(e, inputWrapper, inputField), false);
        });

        inputField.addEventListener('change', e => handleDrop(e, fileList), false);

        inputWrapper.addEventListener('drop', e => handleDrop(e, fileList), false);

        inputField.type = 'file';
        inputField.name = 'file';
        inputField.className = 'dragAndDrop-input-field-neutral';
        inputWrapper.className = 'dragAndDropBox-input-wrapper';
        fileList.className = 'dragAnDropBox-file-list';

        inputWrapper.appendChild(inputField);
        dropBox.appendChild(inputWrapper);
        dropBox.appendChild(fileList);
    });
};
