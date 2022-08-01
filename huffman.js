import { BinaryHeap } from './heap.js';
export { HuffmanCoder }

class HuffmanCoder {
    getMappings(node, path) {
        if (typeof (node[1]) === "string") {
            this.Mapping[node[1]] = path;
            return;
        }

        this.getMappings(node[1][0], path + "0");
        this.getMappings(node[1][1], path + "1");
    }
    stringify(Node) {
        if (typeof (Node[1]) === "string") {
            return '\'' + Node[1];
        }
        return '0' + this.stringify(Node[1][0]) + '1' + this.stringify(Node[1][1]);
    }
    destringify(str) {
        let Node = [];

        if (str[this.index] === '\'') {
            this.index++;
            Node.push(str[this.index]);
            this.index++;
            return Node;
        }
        this.index++;
        if (this.index < str.length) {
            const left = this.destringify(str);
            Node.push(left);
        }

        this.index++;
        if (this.index < str.length) {
            const right = this.destringify(str);
            Node.push(right);
        }

        return Node;
    }
    encode(data) {
        this.heap = new BinaryHeap();
        const mp = new Map();
        for (let i = 0; i < data.length; i++) {
            if (data[i] in mp) {
                mp[data[i]] = mp[data[i]] + 1;
            }
            else {
                mp[data[i]] = 1;
            }
        }

        for (const item in mp) {
            this.heap.insert([-mp[item], item]);
        }
        while (this.heap.size() > 1) {
            const node1 = this.heap.extractMax();
            const node2 = this.heap.extractMax();

            const node = [node1[0] + node2[0], [node1, node2]];
            this.heap.insert(node);
        }
        const huffman_encoder = this.heap.extractMax();

        this.Mapping = {};
        this.getMappings(huffman_encoder, "");

        let n_String = "";
        for (let i = 0; i < data.length; i++) {
            n_String = n_String + this.Mapping[data[i]];
        }
        let rem = (8 - n_String.length % 8) % 8;
        let padding = "";

        for (let i = 0; i < rem; i++) {
            padding = padding + "0";
        }
        n_String = n_String + padding;
        let result = "";
        for (let i = 0; i < n_String.length; i = i + 8) {
            let num = 0;
            for (let j = 0; j < 8; j++) {
                num = num * 2 + (n_String[i + j] - "0");
            }
            result = result + String.fromCharCode(num);
        }
        let res = this.stringify(huffman_encoder) + '\n' + rem + '\n' + result;
        let ratio = data.length / res.length;
        console.log(data.length);
        console.log(result.length);
        console.log("compression ratio = " + ratio);
        return res;
    }
    decode(data) {
        let idx = 0;
        for (let i = 2; i < data.length; i++) {
            if (data[i] === '\n' && data[i - 2] === '\n') {
                idx = i - 1;
            }
        }
        console.log(idx);
        //data=data.split('\n');
        //console.log(data.length);
        let ttree = data.substring(0, idx - 1);
        let text = data.substring(idx + 2, data.length);
        this.index = 0;

        const hoffman_decoder = this.destringify(ttree);
        console.log(hoffman_decoder);
        //const text=data[3];
        console.log(text);
        let binary_string = "";
        for (let i = 0; i < text.length; i++) {
            let num = text[i].charCodeAt(0);
            let binary = "";
            for (let j = 0; j < 8; j++) {
                binary = num % 2 + binary;
                num = Math.floor(num / 2);
            }
            binary_string = binary_string + binary;
        }
        binary_string = binary_string.substring(0, binary_string.length - data[idx]);
        let res = "";
        let tree = hoffman_decoder;
        console.log(binary_string);
        for (let i = 0; i < binary_string.length; i++) {
            if (binary_string[i] === '0') {
                tree = tree[0];
            }
            else {
                tree = tree[1];
            }
            if (tree.length === 1) {
                res = res + tree[0];
                console.log("ndjndj");
                tree = hoffman_decoder;
            }
        }
        return res;
    }
}