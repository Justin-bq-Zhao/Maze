class MinHeap {
    
    constructor (){
        this.minHeap = [];
    }

    getParent (i){
        return (i - 1) >> 1;
    }

    getLeftSon (i){
        return (i << 1) + 1;
    }

    getRightSon (i){
        return (i << 1) + 2;
    }

    insert(e){
        this.minHeap.push(e);
        let index = this.minHeap.length  -1;
        while (index > 0){
            let parentIndex = this.getParent(index);
            if (this.minHeap[index][3] < this.minHeap[parentIndex][3]){
                this.swap(index, parentIndex);
                index = parentIndex;
            }else{
                break;
            }
        }
    }

    pop(){
        let res = this.minHeap[0];
        let len = this.minHeap.length - 1;
        this.minHeap[0] = this.minHeap[len];
        this.minHeap.pop();
        let index = 0;
        
        while (index < len){
            let leftSon = this.getLeftSon(index);
            if (this.minHeap[leftSon] == undefined){
                break;
            }let rightSon = this.getRightSon(index);
            if (this.minHeap[rightSon] == undefined || this.minHeap[leftSon][3] < this.minHeap[rightSon][3]){
                if (this.minHeap[leftSon][3] < this.minHeap[index][3]){
                    this.swap(leftSon, index);
                    index = leftSon;
                }else {
                    break;
                }
            }else{
                if (this.minHeap[rightSon][3] < this.minHeap[index][3]){
                    this.swap(rightSon, index);
                    index = rightSon;
                }else {
                    break;
                }
            }
        }return res;
    }

    swap(i1, i2){
        let temp = this.minHeap[i1];
        this.minHeap[i1] = this.minHeap[i2];
        this.minHeap[i2] = temp;
    }

    getLength() {
        return this.minHeap.length;
    }
}
