import { HuffmanCoder } from './huffman.js';

const input = document.querySelector('input[type="file"]')
input.addEventListener('change', function (e) {
    console.log(input.files)
    const fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        const text = fileLoadedEvent.target.result;
        console.log(text);
        encode.onclick=function(){
            console.log(text);
            const coder = new HuffmanCoder();
            let info=coder.encode(text);
            downloadFile(input.files[0].name.split('.')[0]+'_encoded.txt',info);
            console.log(info);
        }
        decode.onclick=function(){
            console.log(text);
            const coder=new HuffmanCoder();
            let info=coder.decode(text);
            downloadFile(input.files[0].name.split('.')[0]+'_decoded.txt',info);
            console.log(info);
        }
    };
    fileReader.readAsText(input.files[0], "UTF-8");
}, false)
function downloadFile(fileName, data){
    let a = document.createElement('a');
    console.log(info.length);
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
}
