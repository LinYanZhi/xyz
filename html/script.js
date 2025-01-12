let currentPath = 'C:\\';

function updateFileList() {
    fetch(`/get_files?path=${encodeURIComponent(currentPath)}`)
        .then(response => response.json())
        .then(data => {
            const filesList = document.getElementById('files-list');
            filesList.innerHTML = '';
            data.files.forEach(file => {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.textContent = file.name;
                item.onclick = () => enterFolder(file.path);
                filesList.appendChild(item);
            });
        });
}

function enterFolder(path) {
    currentPath = path;
    document.getElementById('current-path').textContent = currentPath;
    updateFileList();
}

function goBack() {
    currentPath = currentPath.substring(0, currentPath.lastIndexOf('\\'));
    document.getElementById('current-path').textContent = currentPath;
    updateFileList();
}

updateFileList();
